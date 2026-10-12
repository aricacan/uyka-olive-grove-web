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
import { quoteHref } from "@/i18n/routes";

/** `withHeading={false}` on the B2B page, where PageIntro already carries the title. */
export function ProfessionalsCta({ locale, withHeading = true }: { locale: Locale; withHeading?: boolean }) {
  const { sections, cta } = getDictionary(locale);
  const { professionals } = sections;

  return (
    <section id="profesyoneller" className="section-y bg-brand-deep text-on-brand">
      <Container>
        {withHeading && (
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                tone="light"
                eyebrow={professionals.eyebrow}
                title={<EmphasisTitle title={professionals.title} emphasis={professionals.emphasis} />}
                intro={professionals.intro}
              />
              <div className="mt-10">
                <ButtonLink href={quoteHref(locale)} trackEvent="b2b_cta_click">
                  {cta.corporateQuote}
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delayMs={REVEAL_FOLLOW_MS}>
              <Photo
                name={media.professionals}
                alt={professionals.imageAlt}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[4/5] w-full rounded-3xl lg:aspect-[5/6]"
              />
            </Reveal>
          </div>
        )}
        <ul className={`grid gap-px overflow-hidden rounded-3xl bg-on-brand/10 md:grid-cols-3 ${withHeading ? "mt-16" : ""}`}>
          {professionals.offerings.map((offering) => (
            <li key={offering.title} className="bg-brand-deep p-8">
              <h3 className="text-3xl">{offering.title}</h3>
              <p className="mt-3 text-on-brand/75">{offering.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
