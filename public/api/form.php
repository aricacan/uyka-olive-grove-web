<?php
/**
 * Form mail endpoint for the static site (quote + newsletter, see src/lib/forms.ts).
 *
 * Accepts one JSON submission { subject, replyTo, fields: { label: value } },
 * validates it and e-mails it to the site inbox over authenticated SMTP.
 * SMTP credentials live OUTSIDE the web root, one level above httpdocs:
 * uyka-form-config.php (template: hosting/uyka-form-config.example.php).
 *
 * Written for PHP 7.4+ (shared hosting), no dependencies.
 */
declare(strict_types=1);

const ALLOWED_ORIGIN_HOSTS = ['www.uyka.com.tr', 'uyka.com.tr'];
const CONFIG_FILE = __DIR__ . '/../../uyka-form-config.php';

const MAX_BODY_BYTES = 16384;
const MAX_FIELDS = 12;
const MAX_SUBJECT_LENGTH = 150;
const MAX_LABEL_LENGTH = 60;
const MAX_VALUE_LENGTH = 2000;
const MAX_EMAIL_LENGTH = 120;

/** At most RATE_LIMIT_MAX submissions per visitor IP within the window. */
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 600;

const SMTP_TIMEOUT_SECONDS = 15;
const SMTP_LINE_BYTES = 515;
const MAIL_SENDER_NAME = 'UYKA Web';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, bool $success): void
{
    http_response_code($status);
    echo json_encode(['success' => $success]);
    exit;
}

/** Single line (safe for mail headers): control characters incl. CR/LF removed, trimmed, capped. */
function clean_line($value, int $maxLength): string
{
    if (!is_string($value)) {
        return '';
    }
    $clean = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $value);
    return $clean === null ? '' : mb_substr(trim($clean), 0, $maxLength);
}

/** Multi-line text: keeps line breaks, removes other control characters, capped. */
function clean_text($value, int $maxLength): string
{
    if (!is_string($value)) {
        return '';
    }
    $clean = preg_replace('/[\x00-\x09\x0B-\x1F\x7F]+/u', ' ', str_replace("\r\n", "\n", $value));
    return $clean === null ? '' : mb_substr(trim($clean), 0, $maxLength);
}

/** File-based sliding window per hashed IP (no personal data stored in clear). */
function is_rate_limited(string $ip): bool
{
    $file = sys_get_temp_dir() . '/uyka-form-' . hash('sha256', $ip);
    $now = time();
    $recent = [];
    if (is_file($file)) {
        foreach (explode(',', (string) file_get_contents($file)) as $timestamp) {
            if ((int) $timestamp > $now - RATE_LIMIT_WINDOW_SECONDS) {
                $recent[] = (int) $timestamp;
            }
        }
    }
    if (count($recent) >= RATE_LIMIT_MAX) {
        return true;
    }
    $recent[] = $now;
    file_put_contents($file, implode(',', $recent), LOCK_EX);
    return false;
}

function encode_header(string $text): string
{
    return '=?UTF-8?B?' . base64_encode($text) . '?=';
}

function build_message(array $config, string $subject, string $replyTo, string $body): string
{
    $domain = substr(strrchr($config['username'], '@'), 1);
    $headers = [
        'Date: ' . date('r'),
        'From: ' . encode_header(MAIL_SENDER_NAME) . ' <' . $config['username'] . '>',
        'To: <' . $config['to'] . '>',
        'Reply-To: <' . $replyTo . '>',
        'Subject: ' . encode_header($subject),
        'Message-ID: <' . bin2hex(random_bytes(16)) . '@' . $domain . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
    ];
    // Mail bodies use CRLF line breaks; some webmail clients join LF-only lines.
    $body = str_replace("\n", "\r\n", $body);
    // Base64 lines never start with "." so no SMTP dot-stuffing is needed.
    return implode("\r\n", $headers) . "\r\n\r\n" . rtrim(chunk_split(base64_encode($body), 76, "\r\n"));
}

/** Minimal SMTP client: EHLO, optional STARTTLS, AUTH LOGIN, one message. */
function smtp_send(array $config, string $message): bool
{
    $socket = @stream_socket_client(
        'tcp://' . $config['host'] . ':' . $config['port'],
        $errorCode,
        $errorMessage,
        SMTP_TIMEOUT_SECONDS
    );
    if ($socket === false) {
        error_log("form.php: SMTP connect failed ($errorCode) $errorMessage");
        return false;
    }
    stream_set_timeout($socket, SMTP_TIMEOUT_SECONDS);

    $lastReply = '';
    $expect = function (string $code) use ($socket, &$lastReply): bool {
        $lastReply = '';
        do {
            $line = fgets($socket, SMTP_LINE_BYTES);
            if ($line === false) {
                return false;
            }
            $lastReply .= $line;
        } while (isset($line[3]) && $line[3] === '-');
        return strncmp($line, $code, 3) === 0;
    };
    $command = function (string $line, string $code) use ($socket, $expect): bool {
        fwrite($socket, $line . "\r\n");
        return $expect($code);
    };

    $hostname = gethostname() ?: 'localhost';
    $ok = $expect('220') && $command('EHLO ' . $hostname, '250');
    if ($ok && stripos($lastReply, 'STARTTLS') !== false) {
        $ok = $command('STARTTLS', '220')
            && stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)
            && $command('EHLO ' . $hostname, '250');
    }
    $ok = $ok
        && $command('AUTH LOGIN', '334')
        && $command(base64_encode($config['username']), '334')
        && $command(base64_encode($config['password']), '235')
        && $command('MAIL FROM:<' . $config['username'] . '>', '250')
        && $command('RCPT TO:<' . $config['to'] . '>', '250')
        && $command('DATA', '354')
        && $command($message . "\r\n.", '250');

    if (!$ok) {
        // The reply code only; never the credentials.
        error_log('form.php: SMTP failed: ' . trim(substr($lastReply, 0, 120)));
    }
    fwrite($socket, "QUIT\r\n");
    fclose($socket);
    return $ok;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, false);
}

$originHost = parse_url($_SERVER['HTTP_ORIGIN'] ?? '', PHP_URL_HOST);
if (!in_array($originHost, ALLOWED_ORIGIN_HOSTS, true)) {
    respond(403, false);
}

$raw = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if ($raw === false || strlen($raw) > MAX_BODY_BYTES) {
    respond(413, false);
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    respond(400, false);
}

$subject = clean_line($data['subject'] ?? '', MAX_SUBJECT_LENGTH);
$replyTo = clean_line($data['replyTo'] ?? '', MAX_EMAIL_LENGTH);
$fields = $data['fields'] ?? null;
if ($subject === '' || !filter_var($replyTo, FILTER_VALIDATE_EMAIL)
    || !is_array($fields) || count($fields) === 0 || count($fields) > MAX_FIELDS) {
    respond(422, false);
}

$lines = [];
foreach ($fields as $label => $value) {
    $lines[] = clean_line((string) $label, MAX_LABEL_LENGTH) . ': ' . clean_text($value, MAX_VALUE_LENGTH);
}

if (is_rate_limited($_SERVER['REMOTE_ADDR'] ?? 'unknown')) {
    respond(429, false);
}

if (!is_file(CONFIG_FILE)) {
    error_log('form.php: missing ' . CONFIG_FILE);
    respond(503, false);
}
$config = require CONFIG_FILE;

$message = build_message($config, $subject, $replyTo, implode("\n", $lines));
$isSent = smtp_send($config, $message);
respond($isSent ? 200 : 502, $isSent);
