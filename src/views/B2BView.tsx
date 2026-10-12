import { QuoteForm } from "@/components/forms/QuoteForm";
import { PageIntro } from "@/components/layout/PageIntro";
import { ProfessionalsCta } from "@/components/sections/ProfessionalsCta";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary, getProducts } from "@/content/index";
import type { Locale } from "@/i18n/config";
import { href, QUOTE_ANCHOR } from "@/i18n/routes";

export function B2BView({ locale }: { locale: Locale }) {
  const { pages, quoteForm } = getDictionary(locale);
  const { b2b } = pages;

  return (
    <>
      <PageIntro eyebrow={b2b.eyebrow} title={b2b.title} intro={b2b.intro} />
      <ProfessionalsCta locale={locale} withHeading={false} />
      <section id={QUOTE_ANCHOR} className="section-y scroll-mt-24 bg-canvas">
        <Container className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <SectionHeading eyebrow={b2b.formEyebrow} title={b2b.formTitle} />
          <QuoteForm
            copy={quoteForm}
            productNames={getProducts(locale).map((product) => product.name)}
            privacyHref={href("privacy", locale)}
          />
        </Container>
      </section>
    </>
  );
}
