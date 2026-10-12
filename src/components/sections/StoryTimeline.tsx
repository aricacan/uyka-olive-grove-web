import { Reveal } from "@/components/motion/Reveal";
import { REVEAL_STAGGER_MS } from "@/components/motion/timing";
import { Container } from "@/components/ui/Container";
import { EmphasisTitle } from "@/components/ui/EmphasisTitle";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/content/index";
import { media } from "@/content/media";
import type { Locale } from "@/i18n/config";

/** 1950 → today, as a vertical line of milestones next to the family archive photo. */
export function StoryTimeline({ locale }: { locale: Locale }) {
  const { timeline, archiveAlt, archivePlaceholder } = getDictionary(locale).pages.story;

  return (
    <section className="section-y bg-canvas">
      <Container className="grid gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <SectionHeading eyebrow={timeline.eyebrow} title={<EmphasisTitle title={timeline.title} emphasis={timeline.emphasis} />} />
          </Reveal>
          <ol className="mt-12 border-l border-line">
            {timeline.milestones.map((milestone, index) => (
              <Reveal as="li" key={milestone.period} delayMs={index * REVEAL_STAGGER_MS} className="relative pb-10 pl-8 last:pb-0">
                <span aria-hidden className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-accent" />
                <p className="font-display text-4xl text-accent">{milestone.period}</p>
                <h3 className="mt-2 text-2xl text-brand">{milestone.title}</h3>
                <p className="mt-2 text-ink/75">{milestone.body}</p>
              </Reveal>
            ))}
          </ol>
          <p className="mt-8 text-sm text-muted">{timeline.note}</p>
        </div>
        <Photo
          name={media.storyArchive}
          alt={archiveAlt}
          placeholderLabel={archivePlaceholder}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="aspect-[4/5] w-full"
        />
      </Container>
    </section>
  );
}
