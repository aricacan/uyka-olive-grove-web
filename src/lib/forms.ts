/**
 * Form transport shared by every form (quote, newsletter). Submissions go to
 * the site's own mail endpoint (public/api/form.php on the PHP hosting), which
 * e-mails them to the site inbox.
 *
 * Without an endpoint (a static-only host), forms fall back to their own
 * hand-off (WhatsApp / mail client).
 */
export const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Strips control characters, trims and caps length; keeps Turkish letters intact. */
export function cleanInput(value: string, maxLength: number): string {
  return value.replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, " ").trim().slice(0, maxLength);
}

type Submission = { subject: string; replyTo: string; fields: Record<string, string> };

/** Posts one submission; `fields` keys become the row names in the e-mail. */
export async function sendForm(submission: Submission): Promise<boolean> {
  const response = await fetch(formEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(submission),
  });
  if (!response.ok) return false;
  const result: { success?: boolean } = await response.json();
  return result.success === true;
}
