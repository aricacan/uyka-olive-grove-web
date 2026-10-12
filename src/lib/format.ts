import { LOCALE_META, type Locale } from "@/i18n/config";

/** "2026-09-27" → "27 Eylül 2026" in the page's language. */
export function formatDate(isoDate: string, locale: Locale): string {
  return new Intl.DateTimeFormat(LOCALE_META[locale].htmlLang, { dateStyle: "long" }).format(new Date(isoDate));
}
