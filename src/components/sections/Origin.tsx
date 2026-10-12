import { Reveal } from "@/components/motion/Reveal";
import { REVEAL_FOLLOW_MS } from "@/components/motion/timing";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { EmphasisTitle } from "@/components/ui/EmphasisTitle";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/content/index";
import { media } from "@/content/media";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";

/**
 * Origin on a blurred, darkened copy of its own photo, with the sharp photo as
 * a rounded card (Monini "Our Mill" reference).
 */
export function Origin({ locale }: { locale: Locale }) {
  const { origin } = getDictionary(locale).sections;

  return (
    <section id="koken" className="section-y relative isolate overflow-hidden bg-brand text-on-brand">
      <div aria-hidden className="absolute inset-0 -z-10 scale-110 blur-2xl">
        <Photo name={media.origin} alt="" sizes="50vw" className="h-full w-full" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-brand/80" />

      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading
            tone="light"
            eyebrow={origin.eyebrow}
            title={<EmphasisTitle title={origin.title} emphasis={origin.emphasis} />}
            intro={origin.intro}
          />
          <dl className="mt-10 divide-y divide-on-brand/15 border-y border-on-brand/15">
            {origin.facts.map((fact) => (
              <div key={fact.label} className="flex justify-between gap-6 py-4">
                <dt className="eyebrow text-accent-soft">{fact.label}</dt>
                <dd className="text-right text-on-brand/85">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10">
            <ButtonLink href={href("production", locale)} variant="ghost-light">
              {origin.cta}
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delayMs={REVEAL_FOLLOW_MS}>
          <Photo
            name={media.origin}
            alt={origin.imageAlt}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3] w-full rounded-3xl shadow-2xl shadow-black/30 lg:aspect-[5/4]"
          />
        </Reveal>
      </Container>
    </section>
  );
}
