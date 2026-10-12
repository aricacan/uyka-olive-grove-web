import type { ReactNode } from "react";
import { CountUp } from "@/components/motion/CountUp";
import { ClaimText } from "@/components/ui/ClaimText";
import { Container } from "@/components/ui/Container";
import { PACKAGE_FORMATS } from "@/content/catalog";
import { company } from "@/content/company";
import { getDictionary } from "@/content/index";
import type { Locale } from "@/i18n/config";

type Fact = { key: string; value: ReactNode; label: ReactNode };

export function TrustStrip({ locale }: { locale: Locale }) {
  const { trust } = getDictionary(locale).sections;
  const facts: Fact[] = [
    { key: "founded", value: <CountUp value={company.foundedYear} />, label: <ClaimText id="founded1950" locale={locale} /> },
    { key: "generation", value: <CountUp value={company.generation} suffix="." />, label: <ClaimText id="thirdGeneration" locale={locale} /> },
    { key: "origin", value: company.origin.district, label: `${company.origin.province} / ${company.origin.country}` },
    {
      key: "formats",
      value: (
        <>
          <CountUp value={PACKAGE_FORMATS.length} /> {trust.formatsUnit}
        </>
      ),
      label: trust.formatsLabel,
    },
  ];

  return (
    <section aria-label={trust.ariaLabel} className="border-b border-line bg-canvas">
      <Container>
        <dl className="grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
          {facts.map((fact) => (
            <div key={fact.key} className="flex flex-col-reverse gap-3 px-2 py-10 text-center md:py-14">
              <dt className="eyebrow text-muted">{fact.label}</dt>
              <dd className="font-display text-4xl tabular-nums text-brand sm:text-5xl">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
