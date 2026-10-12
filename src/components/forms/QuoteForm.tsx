"use client";

import Link from "next/link";
import { useState, type ReactNode, type SubmitEvent } from "react";
import { ChoiceChips } from "@/components/forms/ChoiceChips";
import { FloatingField } from "@/components/forms/FloatingField";
import { Icon } from "@/components/ui/Icon";
import type { Dictionary } from "@/content/index";
import { track } from "@/lib/analytics";
import { formEndpoint } from "@/lib/forms";
import {
  EMPTY_QUOTE,
  invalidQuoteFields,
  mailtoUrl,
  sanitizeQuote,
  submitQuote,
  whatsappUrl,
  type QuoteField,
  type QuoteRequest,
} from "@/lib/quote";

type Status = "idle" | "sending" | "sent" | "handoff" | "error";

type QuoteFormProps = { copy: Dictionary["quoteForm"]; productNames: string[]; privacyHref: string };

const HONEYPOT_FIELD = "website";
const LIST_SEPARATOR = ", ";
const GROUP_NUMBER_DIGITS = 2;

function FormGroup({ index, title, children }: { index: number; title: string; children: ReactNode }) {
  return (
    <fieldset className="grid gap-8 border-t border-line pt-8 sm:grid-cols-[10rem_1fr]">
      <legend className="contents">
        <span className="flex items-baseline gap-3 font-display text-2xl text-brand">
          <span className="eyebrow text-accent">{String(index).padStart(GROUP_NUMBER_DIGITS, "0")}</span>
          {title}
        </span>
      </legend>
      <div className="grid gap-8">{children}</div>
    </fieldset>
  );
}

export function QuoteForm({ copy, productNames, privacyHref }: QuoteFormProps) {
  const [quote, setQuote] = useState<QuoteRequest>(EMPTY_QUOTE);
  const [hasConsent, setHasConsent] = useState(false);
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  // Errors appear only after the first submit attempt, then update live as fields are fixed.
  const invalidFields = hasTriedSubmit ? invalidQuoteFields(sanitizeQuote(quote)) : [];
  const showConsentError = hasTriedSubmit && !hasConsent;
  const errorFor = (field: QuoteField) =>
    invalidFields.includes(field) ? (copy.errors as Partial<Record<QuoteField, string>>)[field] : undefined;

  const update = (field: QuoteField, value: string) => {
    // The initial object is only replaced on the first edit, so this fires once.
    if (quote === EMPTY_QUOTE) track("quote_form_start");
    setQuote((current) => ({ ...current, [field]: value }));
  };

  const toggleProduct = (name: string) => {
    const current = quote.products ? quote.products.split(LIST_SEPARATOR) : [];
    const next = current.includes(name) ? current.filter((item) => item !== name) : [...current, name];
    update("products", next.join(LIST_SEPARATOR));
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (new FormData(event.currentTarget).get(HONEYPOT_FIELD)) return;

    setHasTriedSubmit(true);
    const cleaned = sanitizeQuote(quote);
    if (invalidQuoteFields(cleaned).length > 0 || !hasConsent) return;

    track("quote_form_submit", { channel: formEndpoint ? "email" : "handoff" });
    if (!formEndpoint) {
      setStatus("handoff");
      return;
    }

    setStatus("sending");
    try {
      setStatus((await submitQuote(cleaned, copy.fields, copy.subject)) ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const cleaned = sanitizeQuote(quote);
  const handoffLinks = (
    <div className="flex flex-wrap gap-3">
      <a
        href={whatsappUrl(cleaned, copy.fields, copy.subject)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_click", { location: "quote_form" })}
        className="eyebrow inline-flex min-h-12 items-center gap-2 rounded-full bg-whatsapp px-6 text-white"
      >
        <Icon name="whatsapp" className="size-5" />
        {copy.viaWhatsapp}
      </a>
      <a
        href={mailtoUrl(cleaned, copy.fields, copy.subject)}
        onClick={() => track("email_click", { location: "quote_form" })}
        className="eyebrow inline-flex min-h-12 items-center gap-2 rounded-full border border-brand px-6 text-brand"
      >
        <Icon name="mail" className="size-5" />
        {copy.viaEmail}
      </a>
    </div>
  );

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-start gap-6 border-t border-line pt-10">
        <span className="flex size-16 items-center justify-center rounded-full bg-brand text-on-brand">
          <Icon name="check" className="size-8 [stroke-dasharray:24] [animation:draw-check_600ms_ease-out_both]" />
        </span>
        <p className="font-display text-4xl text-brand">{copy.sentTitle}</p>
        <p className="text-ink/75">{copy.sent}</p>
      </div>
    );
  }

  if (status === "handoff" || status === "error") {
    return (
      <div role="status" className="space-y-6 border-t border-line pt-10">
        <p className="text-lg text-brand">
          {status === "error" && `${copy.sendError} `}
          {copy.handoffIntro}
        </p>
        {handoffLinks}
      </div>
    );
  }

  const selectedProducts = quote.products ? quote.products.split(LIST_SEPARATOR) : [];

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-12">
      <FormGroup index={1} title={copy.groups.company}>
        <div className="grid gap-8 sm:grid-cols-2">
          <FloatingField name="company" label={copy.fields.company} autoComplete="organization" value={quote.company} onChange={(value) => update("company", value)} error={errorFor("company")} />
          <FloatingField name="contactName" label={copy.fields.contactName} autoComplete="name" value={quote.contactName} onChange={(value) => update("contactName", value)} error={errorFor("contactName")} />
          <FloatingField name="email" type="email" label={copy.fields.email} autoComplete="email" value={quote.email} onChange={(value) => update("email", value)} error={errorFor("email")} />
          <FloatingField name="phone" type="tel" label={copy.fields.phone} autoComplete="tel" value={quote.phone} onChange={(value) => update("phone", value)} error={errorFor("phone")} />
        </div>
      </FormGroup>

      <FormGroup index={2} title={copy.groups.need}>
        <ChoiceChips
          name="businessType"
          legend={copy.fields.businessType}
          options={copy.businessTypes}
          selected={[quote.businessType]}
          onToggle={(option) => update("businessType", option)}
          error={errorFor("businessType")}
        />
        <ChoiceChips
          name="monthlyVolume"
          legend={copy.fields.monthlyVolume}
          options={copy.monthlyVolumes}
          selected={[quote.monthlyVolume]}
          onToggle={(option) => update("monthlyVolume", option)}
        />
        <ChoiceChips
          name="products"
          legend={copy.fields.products}
          hint={copy.productsHint}
          options={[...productNames, copy.mixedOrder]}
          selected={selectedProducts}
          onToggle={toggleProduct}
          multiple
        />
      </FormGroup>

      <FormGroup index={3} title={copy.groups.message}>
        <FloatingField name="message" label={copy.fields.message} multiline value={quote.message} onChange={(value) => update("message", value)} />

        <label className="flex gap-3 text-sm leading-relaxed text-ink/80">
          <input
            type="checkbox"
            name="consent"
            checked={hasConsent}
            onChange={(event) => setHasConsent(event.target.checked)}
            aria-invalid={showConsentError}
            className="mt-0.5 size-5 shrink-0 accent-brand"
          />
          <span>
            <Link href={privacyHref} target="_blank" className="text-brand underline underline-offset-4">
              {copy.consentLink}
            </Link>
            {copy.consentAfter}
            {showConsentError && <span className="mt-1 block text-danger">{copy.consentError}</span>}
          </span>
        </label>

        {/* Spam honeypot: hidden from people, filled by bots. */}
        <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

        <button
          type="submit"
          disabled={status === "sending"}
          className="eyebrow group inline-flex min-h-14 items-center justify-center gap-3 justify-self-start rounded-full bg-brand px-8 text-on-brand transition-colors hover:bg-brand-deep disabled:opacity-60"
        >
          {status === "sending" ? copy.sending : copy.submit}
          <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-1" />
        </button>
      </FormGroup>
    </form>
  );
}
