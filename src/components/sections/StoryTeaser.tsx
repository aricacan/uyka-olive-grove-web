import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/content/index";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";

export function StoryTeaser({ locale, showCta = true }: { locale: Locale; showCta?: boolean }) {
  const { story } = getDictionary(locale).sections;

  return (
    <section id="hikaye" className="section-y bg-accent-soft/45">
      <Container className="max-w-4xl text-center">
        <p className="eyebrow text-accent">{story.eyebrow}</p>
        <blockquote className="mt-8">
          <p className="font-display text-4xl italic leading-tight text-brand sm:text-6xl">&ldquo;{story.quote.text}&rdquo;</p>
          <footer className="eyebrow mt-6 text-muted">— {story.quote.attribution}</footer>
        </blockquote>
        {showCta && (
          <>
            <p className="mx-auto mt-10 max-w-2xl leading-relaxed text-ink/80">{story.paragraphs[0]}</p>
            <div className="mt-10">
              <ButtonLink href={href("story", locale)} variant="ghost-dark">
                {story.cta}
              </ButtonLink>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
