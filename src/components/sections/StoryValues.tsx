import { Reveal } from "@/components/motion/Reveal";
import { REVEAL_STAGGER_MS } from "@/components/motion/timing";
import { Container } from "@/components/ui/Container";
import { EmphasisTitle } from "@/components/ui/EmphasisTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/content/index";
import type { Locale } from "@/i18n/config";

/** Four brand values (Castillo de Canena reference). */
export function StoryValues({ locale }: { locale: Locale }) {
  const { values } = getDictionary(locale).pages.story;

  return (
    <section className="section-y bg-brand text-on-brand">
      <Container>
        <Reveal>
          <SectionHeading tone="light" eyebrow={values.eyebrow} title={<EmphasisTitle title={values.title} emphasis={values.emphasis} />} />
        </Reveal>
        <ul className="mt-16 grid gap-px bg-on-brand/10 sm:grid-cols-2 lg:grid-cols-4">
          {values.items.map((value, index) => (
            <Reveal as="li" key={value.title} delayMs={index * REVEAL_STAGGER_MS} className="bg-brand p-8">
              <h3 className="text-4xl text-accent-soft">{value.title}</h3>
              <p className="mt-4 leading-relaxed text-on-brand/75">{value.body}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
