"use client";

import Link from "next/link";
import { useState, type SubmitEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { company } from "@/content/company";
import type { Dictionary } from "@/content/index";
import { cleanInput, EMAIL_PATTERN, formEndpoint, sendForm } from "@/lib/forms";

type Status = "idle" | "sending" | "sent" | "error";

const MAX_EMAIL_LENGTH = 120;
const HONEYPOT_FIELD = "website";

type NewsletterFormProps = { copy: Dictionary["newsletter"]; privacyHref: string };

/**
 * "Günlüğümüze katılın" sign-up (Kosterina / Brightland reference): one
 * underlined e-mail field with an arrow button and a KVKK consent box.
 * Sends through the form endpoint; without one it opens a pre-filled e-mail instead.
 */
export function NewsletterForm({ copy, privacyHref }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [hasConsent, setHasConsent] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (new FormData(event.currentTarget).get(HONEYPOT_FIELD)) return;
    const cleaned = cleanInput(email, MAX_EMAIL_LENGTH);
    if (!EMAIL_PATTERN.test(cleaned)) return setError(copy.invalid);
    if (!hasConsent) return setError(copy.consentError);
    setError("");

    if (!formEndpoint) {
      window.location.href = `mailto:${company.contact.email}?subject=${encodeURIComponent(copy.subject)}&body=${encodeURIComponent(cleaned)}`;
      return;
    }
    setStatus("sending");
    try {
      const ok = await sendForm({ subject: copy.subject, replyTo: cleaned, fields: { "E-posta": cleaned } });
      setStatus(ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <p role="status" className="flex items-center gap-3 text-lg">
        <Icon name="check" className="size-6 text-accent" />
        {copy.success}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-lg">
      <label className="flex items-center rounded-full border border-line bg-canvas p-1.5 pl-6 shadow-sm transition-colors focus-within:border-brand">
        <span className="sr-only">{copy.placeholder}</span>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={copy.placeholder}
          aria-invalid={Boolean(error)}
          className="min-h-11 min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          aria-label={copy.submit}
          className="group flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-brand px-5 font-semibold text-on-brand transition-colors hover:bg-brand-deep disabled:opacity-60"
        >
          {status === "sending" ? copy.sending : copy.submit}
          <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-1" />
        </button>
      </label>
      <label className="mt-4 flex gap-3 text-xs leading-relaxed text-muted">
        <input type="checkbox" checked={hasConsent} onChange={(event) => setHasConsent(event.target.checked)} className="mt-0.5 size-4 shrink-0 accent-brand" />
        <span>
          <Link href={privacyHref} className="text-brand underline underline-offset-2">
            {copy.consentLink}
          </Link>
          {copy.consentAfter}
        </span>
      </label>
      <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {(error || status === "error") && (
        <p role="alert" className="mt-3 text-sm text-danger">
          {error || copy.error}
        </p>
      )}
    </form>
  );
}
