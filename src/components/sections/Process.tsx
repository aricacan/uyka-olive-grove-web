import { OilDrop } from "@/components/motion/OilDrop";
import { Reveal } from "@/components/motion/Reveal";
import { REVEAL_STAGGER_MS } from "@/components/motion/timing";
import { ClaimText } from "@/components/ui/ClaimText";
import { Container } from "@/components/ui/Container";
import { EmphasisTitle } from "@/components/ui/EmphasisTitle";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/content/index";
import { media } from "@/content/media";
import { PROCESS_STEP_IDS } from "@/content/process";
import type { Locale } from "@/i18n/config";

const STEP_NUMBER_DIGITS = 2;
/**
 * Horizontal scroll-snap timeline on mobile, grid on desktop.
 * A step shows its photo only once its media slot is filled.
 */
export function Process({ locale }: { locale: Locale }) {
  const { process } = getDictionary(locale).sections;

  return (
    <section id="uretim" className="section-y bg-surface">
      <Container>
        <Reveal className="flex items-end justify-between gap-8">
          <SectionHeading eyebrow={process.eyebrow} title={<EmphasisTitle title={process.title} emphasis={process.emphasis} />} />
          <OilDrop className="hidden sm:block" />
        </Reveal>
        <ol className="mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 lg:grid lg:grid-cols-7 lg:overflow-visible">
          {PROCESS_STEP_IDS.map((stepId, index) => {
            const step = process.steps[stepId];
            const photo = media.process[stepId];
            return (
              <Reveal as="li" key={stepId} delayMs={index * REVEAL_STAGGER_MS} className="w-64 shrink-0 snap-start border-t border-brand/30 pt-6 lg:w-auto">
                {photo && <Photo name={photo} alt={step.title} sizes="16rem" className="mb-6 aspect-square w-full" />}
                <span className="font-display text-5xl text-accent">{String(index + 1).padStart(STEP_NUMBER_DIGITS, "0")}</span>
                <h3 className="mt-4 text-2xl text-brand">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">{step.body}</p>
              </Reveal>
            );
          })}
        </ol>
        <p className="mt-10 text-sm text-muted">
          {process.coldNoteLabel} <ClaimText id="coldExtraction27" locale={locale} />
        </p>
      </Container>
    </section>
  );
}
