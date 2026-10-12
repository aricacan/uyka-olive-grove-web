import type { MetadataRoute } from "next";
import { getArticles, getProducts } from "@/content/index";
import { ENABLED_LOCALES } from "@/i18n/config";
import { siteUrl } from "@/lib/site-url";
import { articleHref, href, productHref, type RouteKey } from "@/i18n/routes";

export const dynamic = "force-static";

const INDEXED_ROUTES: RouteKey[] = ["home", "products", "story", "production", "quality", "b2b", "contact", "journal"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ENABLED_LOCALES.flatMap((locale) => [
    ...INDEXED_ROUTES.map((route) => href(route, locale)),
    ...getProducts(locale).map((product) => productHref(product.slug, locale)),
    ...getArticles(locale).map((article) => articleHref(article.slug, locale)),
  ]).map((path) => ({ url: `${siteUrl}${path}` }));
}
