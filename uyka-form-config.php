<?php
/**
 * SMTP settings for public/api/form.php.
 *
 * Copy to the hosting as  uyka-form-config.php  one level ABOVE httpdocs
 * (Plesk: "Ana dizin", /var/www/vhosts/uyka.com.tr/), then fill in the
 * mailbox password there. Never commit the real file.
 */
return [
    'host' => 'smtp.uyka.com.tr',
    'port' => 587,
    'username' => 'info@uyka.com.tr',
    'password' => '',
    'to' => 'info@uyka.com.tr',
];
