import { Reveal } from "@/components/motion/Reveal";
import { REVEAL_FOLLOW_MS } from "@/components/motion/timing";
import { Container } from "@/components/ui/Container";
import { EmphasisTitle } from "@/components/ui/EmphasisTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/content/index";
import type { Locale } from "@/i18n/config";

/**
 * "What to look for" table (Kosterina reference, without naming competitors).
 * Stacks into cards on mobile, becomes a 3-column table from md up.
 */
export function BuyersGuide({ locale }: { locale: Locale }) {
  const { guide } = getDictionary(locale).sections;

  return (
    <section id="rehber" className="section-y bg-surface">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={guide.eyebrow} title={<EmphasisTitle title={guide.title} emphasis={guide.emphasis} />} intro={guide.intro} />
        </Reveal>
        <Reveal delayMs={REVEAL_FOLLOW_MS} className="mt-14">
          <table className="w-full border-collapse text-left">
            <thead className="sr-only md:not-sr-only">
              <tr className="eyebrow text-muted">
                <th scope="col" className="pb-4 font-semibold">{guide.columns.question}</th>
                <th scope="col" className="pb-4 font-semibold">{guide.columns.why}</th>
                <th scope="col" className="pb-4 font-semibold">{guide.columns.answer}</th>
              </tr>
            </thead>
            <tbody>
              {guide.rows.map((row) => (
                <tr key={row.question} className="flex flex-col gap-2 border-t border-brand/20 py-6 md:table-row">
                  <th scope="row" className="font-display text-2xl font-normal text-brand md:w-1/3 md:py-6 md:pr-8">
                    {row.question}
                  </th>
                  <td className="text-ink/75 md:w-1/3 md:py-6 md:pr-8">{row.why}</td>
                  <td className="md:py-6">
                    <span className={row.upcoming ? "text-muted" : "text-brand"}>{row.answer}</span>
                    {row.upcoming && <span className="eyebrow ml-3 text-accent">{guide.upcomingLabel}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Container>
    </section>
  );
}
