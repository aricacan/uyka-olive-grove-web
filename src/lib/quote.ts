/**
 * B2B quote request: sent to the site's mail endpoint when one is configured,
 * otherwise handed to the visitor's WhatsApp or mail client.
 */
import { company, whatsappHref } from "@/content/company";
import { cleanInput, EMAIL_PATTERN, sendForm } from "@/lib/forms";

export const QUOTE_FIELDS = [
  "company",
  "contactName",
  "email",
  "phone",
  "businessType",
  "monthlyVolume",
  "products",
  "message",
] as const;
export type QuoteField = (typeof QUOTE_FIELDS)[number];
export type QuoteRequest = Record<QuoteField, string>;
export type QuoteLabels = Record<QuoteField, string>;

const MAX_FIELD_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 2000;
const PHONE_PATTERN = /^[+\d][\d\s()-]{8,19}$/;

export const EMPTY_QUOTE = Object.fromEntries(QUOTE_FIELDS.map((field) => [field, ""])) as QuoteRequest;

export function sanitizeQuote(raw: QuoteRequest): QuoteRequest {
  return Object.fromEntries(
    QUOTE_FIELDS.map((field) => [field, cleanInput(raw[field], field === "message" ? MAX_MESSAGE_LENGTH : MAX_FIELD_LENGTH)]),
  ) as QuoteRequest;
}

/** Returns the fields that fail validation. */
export function invalidQuoteFields(quote: QuoteRequest): QuoteField[] {
  const invalid: QuoteField[] = [];
  if (!quote.company) invalid.push("company");
  if (!quote.contactName) invalid.push("contactName");
  if (!EMAIL_PATTERN.test(quote.email)) invalid.push("email");
  if (!PHONE_PATTERN.test(quote.phone)) invalid.push("phone");
  if (!quote.businessType) invalid.push("businessType");
  return invalid;
}

function toPlainText(quote: QuoteRequest, labels: QuoteLabels): string {
  return QUOTE_FIELDS.filter((field) => field !== "message")
    .map((field) => `${labels[field]}: ${quote[field] || "-"}`)
    .concat("", quote.message)
    .join("\n");
}

export function whatsappUrl(quote: QuoteRequest, labels: QuoteLabels, subject: string): string {
  return `${whatsappHref}?text=${encodeURIComponent(`${subject}\n\n${toPlainText(quote, labels)}`)}`;
}

export function mailtoUrl(quote: QuoteRequest, labels: QuoteLabels, subject: string): string {
  const mailSubject = encodeURIComponent(`${subject} — ${quote.company}`);
  return `mailto:${company.contact.email}?subject=${mailSubject}&body=${encodeURIComponent(toPlainText(quote, labels))}`;
}

/** Sends via the form endpoint; field labels become the e-mail's row names. */
export function submitQuote(quote: QuoteRequest, labels: QuoteLabels, subject: string): Promise<boolean> {
  return sendForm({
    subject: `${subject} — ${quote.company}`,
    replyTo: quote.email,
    fields: Object.fromEntries(QUOTE_FIELDS.map((field) => [labels[field], quote[field]])),
  });
}
