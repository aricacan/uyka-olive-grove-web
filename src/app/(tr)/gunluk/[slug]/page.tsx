import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticles } from "@/content/index";
import { articleMetadata } from "@/lib/seo";
import { ArticleView } from "@/views/ArticleView";

const LOCALE = "tr";

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticles(LOCALE).map((article) => ({ slug: article.slug }));
}

export async function generateMetadata(props: PageProps<"/gunluk/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getArticleBySlug(LOCALE, slug);
  return article ? articleMetadata(article, LOCALE) : {};
}

export default async function ArticlePage(props: PageProps<"/gunluk/[slug]">) {
  const { slug } = await props.params;
  const article = getArticleBySlug(LOCALE, slug);
  if (!article) notFound();
  return <ArticleView article={article} locale={LOCALE} />;
}
