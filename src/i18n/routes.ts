import { ENABLED_LOCALES, type Locale } from "./config";

/** Every page's path per locale. Components never hardcode URLs. */
export const ROUTES = {
  home: { tr: "/", en: "/en/" },
  products: { tr: "/urunler/", en: "/en/products/" },
  story: { tr: "/hikayemiz/", en: "/en/our-story/" },
  production: { tr: "/uretim/", en: "/en/production/" },
  quality: { tr: "/kalite/", en: "/en/quality/" },
  b2b: { tr: "/b2b/", en: "/en/b2b/" },
  contact: { tr: "/iletisim/", en: "/en/contact/" },
  journal: { tr: "/gunluk/", en: "/en/journal/" },
  privacy: { tr: "/kvkk/", en: "/en/privacy/" },
  cookies: { tr: "/cerez-politikasi/", en: "/en/cookie-policy/" },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof ROUTES;

export const QUOTE_ANCHOR = "teklif";
/** Anchor at the very top of every page (footer "back to top" link). */
export const PAGE_TOP_ID = "sayfa-basi";

export function href(route: RouteKey, locale: Locale): string {
  return ROUTES[route][locale];
}

export function articleHref(slug: string, locale: Locale): string {
  return `${ROUTES.journal[locale]}${slug}/`;
}

export function productHref(slug: string, locale: Locale): string {
  return `${ROUTES.products[locale]}${slug}/`;
}

export function quoteHref(locale: Locale): string {
  return `${href("b2b", locale)}#${QUOTE_ANCHOR}`;
}

/** hreflang map across published locales only. */
export function languageAlternates(paths: Partial<Record<Locale, string>>): Record<string, string> {
  return Object.fromEntries(
    ENABLED_LOCALES.filter((locale) => paths[locale]).map((locale) => [locale, paths[locale] as string]),
  );
}
