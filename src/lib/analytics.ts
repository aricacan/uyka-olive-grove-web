/**
 * Thin analytics facade. Components call `track()`; the provider
 * is wired here (Plausible, cookieless), so components never touch it.
 */
export type AnalyticsEvent =
  | "hero_cta_click"
  | "product_view"
  | "product_cta_click"
  | "analysis_report_open"
  | "b2b_cta_click"
  | "quote_form_start"
  | "quote_form_submit"
  | "phone_click"
  | "email_click"
  | "whatsapp_click";

type AnalyticsWindow = Window & { plausible?: (event: string, options?: { props?: Record<string, string> }) => void };

export function track(event: AnalyticsEvent, props?: Record<string, string>): void {
  if (typeof window === "undefined") return;
  (window as AnalyticsWindow).plausible?.(event, props ? { props } : undefined);
}

/** Set NEXT_PUBLIC_PLAUSIBLE_DOMAIN (e.g. "uyka.com.tr") to turn analytics on. Cookieless. */
export const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "";
export const PLAUSIBLE_SCRIPT_SRC = "https://plausible.io/js/script.js";
