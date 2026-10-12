import Link from "next/link";
import { TrackOnMount } from "@/components/analytics/TrackOnMount";
import { PageIntro } from "@/components/layout/PageIntro";
import { ProductMedia } from "@/components/product/ProductMedia";
import { HarvestBadge } from "@/components/product/HarvestBadge";
import { TastingProfile } from "@/components/product/TastingProfile";
import { AnalysisReportCard } from "@/components/quality/AnalysisReportCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { company } from "@/content/company";
import { getDictionary, type Product } from "@/content/index";
import { bottleModels, media } from "@/content/media";
import { reportsForProduct } from "@/content/quality";
import type { Locale } from "@/i18n/config";
import { href, quoteHref } from "@/i18n/routes";
import { productJsonLd } from "@/lib/seo";

export function ProductView({ product, locale }: { product: Product; locale: Locale }) {
  const { productLabels, useCases, cta } = getDictionary(locale);
  const reports = reportsForProduct(product.id);
  const specs = [
    { label: productLabels.origin, value: `${company.origin.district} / ${company.origin.province}` },
    { label: productLabels.method, value: product.method },
    { label: productLabels.harvest, value: product.harvestSeason ?? productLabels.harvestPending },
    { label: productLabels.use, value: product.useCases.map((useCase) => useCases[useCase]).join(", ") },
  ];

  return (
    <>
      <PageIntro eyebrow={product.category} title={product.name} intro={product.summary} />
      <Container className="section-y grid gap-16 lg:grid-cols-2">
        <div className="relative lg:sticky lg:top-28 lg:self-start">
          <ProductMedia
            packshot={media.packshots[product.id]}
            alt={product.name}
            placeholderLabel={productLabels.packshotPlaceholder}
            modelTexture={bottleModels[product.id]}
            copy={productLabels.viewer}
          />
          {product.harvestSeason && (
            <HarvestBadge season={product.harvestSeason} label={productLabels.harvestBadge} className="absolute left-6 top-6" />
          )}
        </div>

        <div className="space-y-16">
          <dl className="divide-y divide-line border-y border-line">
            {specs.map((spec) => (
              <div key={spec.label} className="flex justify-between gap-6 py-4">
                <dt className="eyebrow text-accent">{spec.label}</dt>
                <dd className="text-right">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <section>
            <h2 className="text-3xl text-brand">{productLabels.formatsHeading}</h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {product.formats.map((format) => (
                <li key={format} className="border border-line px-4 py-2 text-sm">
                  {format}
                </li>
              ))}
            </ul>
          </section>

          {product.tasting.length > 0 && (
            <TastingProfile
              scores={product.tasting}
              labels={productLabels.tasting}
              heading={productLabels.tastingHeading}
              source={productLabels.tastingSource}
            />
          )}

          <section>
            <h2 className="text-3xl text-brand">{productLabels.analysisHeading}</h2>
            {reports.length ? (
              <div className="mt-6 space-y-6">
                {reports.map((report) => (
                  <AnalysisReportCard key={report.lot} report={report} productName={product.name} locale={locale} />
                ))}
              </div>
            ) : (
              <p className="mt-4 text-ink/75">
                {productLabels.analysisPending}{" "}
                <Link href={href("quality", locale)} className="text-brand underline underline-offset-4">
                  {productLabels.analysisLink}
                </Link>
              </p>
            )}
          </section>

          <ButtonLink href={quoteHref(locale)} variant="ghost-dark" trackEvent="product_cta_click">
            {cta.quote}
          </ButtonLink>
        </div>
      </Container>
      <JsonLd data={productJsonLd(product, locale)} />
      <TrackOnMount event="product_view" label={product.id} />
    </>
  );
}
