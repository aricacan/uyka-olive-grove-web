/**
 * Locale setup. Turkish lives at the root (no prefix) so Turkish URLs stay
 * clean; other locales get a prefix (`/en/...`). Static export has no proxy,
 * so there is no Accept-Language redirect — each locale is its own route tree.
 *
 * To publish English: add "en" to ENABLED_LOCALES, add `content/en`, and add
 * thin route files under `app/en/` (see docs/PLAN.md → i18n).
 */
export const LOCALES = ["tr", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "tr";
export const ENABLED_LOCALES: readonly Locale[] = ["tr"];

export const LOCALE_META: Record<Locale, { htmlLang: string; ogLocale: string }> = {
  tr: { htmlLang: "tr", ogLocale: "tr_TR" },
  en: { htmlLang: "en", ogLocale: "en_US" },
};
