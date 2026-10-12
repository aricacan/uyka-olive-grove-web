import type { ReactNode } from "react";
import { PageIntro } from "@/components/layout/PageIntro";
import { ClaimStatusList } from "@/components/quality/ClaimStatusList";
import { AnalysisReportCard } from "@/components/quality/AnalysisReportCard";
import { QualityTabs } from "@/components/quality/QualityTabs";
import { BuyersGuide } from "@/components/sections/BuyersGuide";
import { Container } from "@/components/ui/Container";
import { EmphasisTitle } from "@/components/ui/EmphasisTitle";
import { getDictionary } from "@/content/index";
import { analysisReports, awards, qualityDocuments } from "@/content/quality";
import type { Locale } from "@/i18n/config";

function EmptyState({ children }: { children: ReactNode }) {
  return <p className="max-w-2xl border-l-2 border-accent pl-6 text-lg text-ink/75">{children}</p>;
}

/**
 * Evidence page (Nermin Hanım reference): Analysis · Documents · Awards.
 * The awards tab only appears once there is at least one real award.
 */
export function QualityView({ locale }: { locale: Locale }) {
  const { pages, products } = getDictionary(locale);
  const { quality } = pages;

  const tabs = [
    {
      id: "analysis",
      label: quality.tabs.analysis,
      panel: analysisReports.length ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {analysisReports.map((report) => (
            <AnalysisReportCard key={report.lot} report={report} productName={products[report.productId].name} locale={locale} />
          ))}
        </div>
      ) : (
        <EmptyState>{quality.analysisEmpty}</EmptyState>
      ),
    },
    {
      id: "documents",
      label: quality.tabs.documents,
      panel: qualityDocuments.length ? (
        <ul className="divide-y divide-line border-y border-line">
          {qualityDocuments.map((document) => (
            <li key={document.id} className="flex flex-wrap items-baseline justify-between gap-4 py-5">
              <span className="text-lg">{quality.documentTitles[document.id] ?? document.id}</span>
              <span className="text-sm text-muted">
                {document.issuer} · {document.year}
              </span>
              {document.pdf && (
                <a href={document.pdf} target="_blank" rel="noopener noreferrer" className="eyebrow text-brand underline underline-offset-8">
                  {quality.reportLabels.documentPdf}
                </a>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState>{quality.documentsEmpty}</EmptyState>
      ),
    },
    ...(awards.length
      ? [
          {
            id: "awards",
            label: quality.tabs.awards,
            panel: (
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {awards.map((award) => (
                  <li key={`${award.competition}-${award.year}-${award.productId}`} className="border border-line p-6">
                    <p className="eyebrow text-accent">{quality.medals[award.medal]}</p>
                    <p className="mt-2 font-display text-2xl text-brand">{award.competition}</p>
                    <p className="mt-1 text-sm text-muted">
                      {award.year} · {products[award.productId].name}
                    </p>
                  </li>
                ))}
              </ul>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      <PageIntro eyebrow={quality.eyebrow} title={<EmphasisTitle title={quality.title} emphasis={quality.emphasis} />} intro={quality.intro} />
      <Container className="section-y">
        <QualityTabs label={quality.tabsLabel} tabs={tabs} />

        <h2 className="mt-24 text-3xl text-brand">{quality.claimsHeading}</h2>
        <div className="mt-8">
          <ClaimStatusList locale={locale} />
        </div>
      </Container>
      <BuyersGuide locale={locale} />
    </>
  );
}
