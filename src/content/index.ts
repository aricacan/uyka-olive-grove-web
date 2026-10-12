import { catalog, type CatalogEntry } from "@/content/catalog";
import type { Locale } from "@/i18n/config";
import { journal, type JournalEntry } from "./journal";
import type { ArticleCopy } from "./tr/journal";
import type { ProductCopy } from "./tr/products";
import { tr } from "./tr";

export type Dictionary = typeof tr;

/** Add `en` here (typed as Dictionary) when the English site is published. */
const dictionaries: Partial<Record<Locale, Dictionary>> = { tr };

export function hasDictionary(locale: Locale): boolean {
  return locale in dictionaries;
}

export function getDictionary(locale: Locale): Dictionary {
  const dictionary = dictionaries[locale];
  if (!dictionary) throw new Error(`No dictionary for locale "${locale}"`);
  return dictionary;
}

export type Product = CatalogEntry & ProductCopy;

export function getProducts(locale: Locale): Product[] {
  const { products } = getDictionary(locale);
  return catalog.map((entry) => ({ ...entry, ...products[entry.id] }));
}

export function getProductBySlug(locale: Locale, slug: string): Product | undefined {
  return getProducts(locale).find((product) => product.slug === slug);
}

export type Article = JournalEntry & ArticleCopy;

export function getArticles(locale: Locale): Article[] {
  const { articles } = getDictionary(locale);
  return journal.map((entry) => ({ ...entry, ...articles[entry.id] }));
}

export function getArticleBySlug(locale: Locale, slug: string): Article | undefined {
  return getArticles(locale).find((article) => article.slug === slug);
}
