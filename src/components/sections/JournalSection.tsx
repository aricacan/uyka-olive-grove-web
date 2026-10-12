import { ArticleCard } from "@/components/journal/ArticleCard";
import { Reveal } from "@/components/motion/Reveal";
import { REVEAL_FOLLOW_MS } from "@/components/motion/timing";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { getArticles, getDictionary } from "@/content/index";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";

/** Home "Zeytinyağı kültürü": centred heading, one feature article + two compact ones (Monini reference). */
export function JournalSection({ locale }: { locale: Locale }) {
  const { journalCopy } = getDictionary(locale);
  const [feature, ...rest] = getArticles(locale);

  return (
    <section id="gunluk" className="section-y bg-surface">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-accent">{journalCopy.eyebrow}</p>
          <h2 className="mt-3 text-5xl text-brand sm:text-6xl">{journalCopy.title}</h2>
          <p className="mt-4 text-ink/75">{journalCopy.intro}</p>
        </Reveal>
        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-10">
          <Reveal>
            <ArticleCard article={feature} locale={locale} layout="feature" />
          </Reveal>
          <Reveal delayMs={REVEAL_FOLLOW_MS} className="grid content-start gap-10">
            {rest.map((article) => (
              <ArticleCard key={article.id} article={article} locale={locale} />
            ))}
          </Reveal>
        </div>
        <div className="mt-14 flex justify-center">
          <ButtonLink href={href("journal", locale)} variant="ghost-dark">
            {journalCopy.all}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
