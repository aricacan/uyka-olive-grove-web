import { ArticleCard } from "@/components/journal/ArticleCard";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { getArticles, getDictionary } from "@/content/index";
import type { Locale } from "@/i18n/config";

export function JournalView({ locale }: { locale: Locale }) {
  const { journalCopy } = getDictionary(locale);

  return (
    <>
      <PageIntro eyebrow={journalCopy.eyebrow} title={journalCopy.title} intro={journalCopy.intro} />
      <Container className="section-y grid gap-14 sm:grid-cols-2 lg:grid-cols-3">
        {getArticles(locale).map((article) => (
          <ArticleCard key={article.id} article={article} locale={locale} layout="feature" />
        ))}
      </Container>
    </>
  );
}
