import { company } from "@/content/company";

/**
 * Absolute origin used in canonical URLs, sitemap, Open Graph and JSON-LD.
 *
 *   1. NEXT_PUBLIC_SITE_URL — set this once the real domain is live
 *      (e.g. https://www.uyka.com.tr).
 *   2. VERCEL_PROJECT_PRODUCTION_URL — provided by Vercel at build time, so a
 *      Vercel deployment points link previews at an address that works.
 *   3. company.url — final fallback (local builds).
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) return `https://${vercelProduction}`;
  return company.url;
}

export const siteUrl = resolveSiteUrl();
