import { Reveal } from "@/components/motion/Reveal";
import { REVEAL_FOLLOW_MS } from "@/components/motion/timing";
import { ClaimStatusList } from "@/components/quality/ClaimStatusList";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { EmphasisTitle } from "@/components/ui/EmphasisTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/content/index";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";

/** Home "PROOF" block: what we claim and where each claim stands. */
export function QualityTeaser({ locale }: { locale: Locale }) {
  const { quality } = getDictionary(locale).sections;

  return (
    <section id="kalite" className="section-y bg-canvas">
      <Container className="grid gap-16 lg:grid-cols-2">
        <Reveal>
          <SectionHeading eyebrow={quality.eyebrow} title={<EmphasisTitle title={quality.title} emphasis={quality.emphasis} />} intro={quality.intro} />
          <div className="mt-10">
            <ButtonLink href={href("quality", locale)} variant="ghost-dark" trackEvent="analysis_report_open">
              {quality.cta}
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delayMs={REVEAL_FOLLOW_MS}>
          <ClaimStatusList locale={locale} />
        </Reveal>
      </Container>
    </section>
  );
}
