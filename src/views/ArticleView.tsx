import Link from "next/link";
import { ArticleCard } from "@/components/journal/ArticleCard";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { getArticles, getDictionary, type Article } from "@/content/index";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import { formatDate } from "@/lib/format";

export function ArticleView({ article, locale }: { article: Article; locale: Locale }) {
  const { journalCopy } = getDictionary(locale);
  const others = getArticles(locale).filter((other) => other.id !== article.id);

  return (
    <>
      <PageIntro eyebrow={article.tag} title={article.title} intro={article.excerpt} />
      <Container className="section-y max-w-3xl">
        <Photo name={article.image} alt="" priority sizes="(min-width: 768px) 48rem, 100vw" className="aspect-[16/9] w-full rounded-3xl" />
        <p className="mt-6 text-sm text-muted">
          {journalCopy.published}: <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, locale)}</time>
        </p>
        <article className="mt-10 space-y-10 text-lg leading-relaxed text-ink/85">
          {article.body.map((block, index) => (
            <section key={block.heading ?? index} className="space-y-5">
              {block.heading && <h2 className="text-3xl text-brand">{block.heading}</h2>}
              {block.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </article>
        <Link href={href("journal", locale)} className="link-underline mt-14 inline-flex items-center gap-2 font-semibold text-brand">
          <Icon name="arrowRight" className="size-4 rotate-180" />
          {journalCopy.back}
        </Link>
      </Container>
      <section className="section-y bg-surface">
        <Container className="grid gap-12 lg:grid-cols-2">
          {others.map((other) => (
            <ArticleCard key={other.id} article={other} locale={locale} />
          ))}
        </Container>
      </section>
    </>
  );
}
