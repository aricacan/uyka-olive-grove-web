import { PageIntro } from "@/components/layout/PageIntro";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductFilter } from "@/components/product/ProductFilter";
import { UsageGrid } from "@/components/sections/UsageGrid";
import { Container } from "@/components/ui/Container";
import { USE_CASES } from "@/content/catalog";
import { getDictionary, getProducts } from "@/content/index";
import type { Locale } from "@/i18n/config";

export function ProductsView({ locale }: { locale: Locale }) {
  const { pages, productLabels, useCases } = getDictionary(locale);

  return (
    <>
      <PageIntro eyebrow={pages.products.eyebrow} title={pages.products.title} intro={pages.products.intro} />
      <Container className="section-y">
        <ProductFilter
          label={productLabels.filterLabel}
          allLabel={productLabels.filterAll}
          options={USE_CASES.map((useCase) => ({ id: useCase, label: useCases[useCase] }))}
          items={getProducts(locale).map((product) => ({
            id: product.id,
            tags: product.useCases,
            content: <ProductCard product={product} locale={locale} />,
          }))}
        />
      </Container>
      <UsageGrid locale={locale} />
    </>
  );
}
