import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { getDictionary, type Article } from "@/content/index";
import type { Locale } from "@/i18n/config";
import { articleHref } from "@/i18n/routes";
import { formatDate } from "@/lib/format";

type ArticleCardProps = { article: Article; locale: Locale; layout?: "feature" | "compact" };

/**
 * Journal teaser (Monini "Culture of oil" reference): photo, bordered tag
 * chip, title, excerpt, date and a "read" link. `feature` stacks vertically
 * with a large photo; `compact` puts a small photo beside the text.
 */
export function ArticleCard({ article, locale, layout = "compact" }: ArticleCardProps) {
  const { journalCopy } = getDictionary(locale);
  const isFeature = layout === "feature";

  return (
    <Link
      href={articleHref(article.slug, locale)}
      className={`group grid gap-5 ${isFeature ? "" : "sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:items-start"}`}
    >
      <div className="overflow-hidden rounded-2xl">
        <Photo
          name={article.image}
          alt=""
          sizes={isFeature ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 20vw, 100vw"}
          className={`w-full transition-transform duration-700 ease-editorial group-hover:scale-105 ${isFeature ? "aspect-[4/3]" : "aspect-[4/3] sm:aspect-square"}`}
        />
      </div>
      <div>
        <span className="inline-block border border-brand px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-brand">
          {article.tag}
        </span>
        <h3 className={`mt-3 font-display text-brand transition-colors group-hover:text-accent ${isFeature ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
          {article.title}
        </h3>
        <p className="mt-2 text-ink/75">{article.excerpt}</p>
        <div className="mt-4 flex items-center justify-between gap-4 text-xs text-muted">
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, locale)}</time>
          <span className="eyebrow inline-flex items-center gap-1 text-brand">
            {journalCopy.readMore}
            <Icon name="arrowRight" className="size-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
