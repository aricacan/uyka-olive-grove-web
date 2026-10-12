import { HeroParallax } from "@/components/motion/HeroParallax";
import { ProductShowcase, type ShowcaseSlide } from "@/components/sections/ProductShowcase";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { EmphasisTitle } from "@/components/ui/EmphasisTitle";
import { Photo } from "@/components/ui/Photo";
import { company } from "@/content/company";
import { getDictionary, getProducts } from "@/content/index";
import { media, REPRESENTATIVE_PACKSHOTS } from "@/content/media";
import type { Locale } from "@/i18n/config";
import { href, productHref } from "@/i18n/routes";

/**
 * Grove photo in the background, headline on the left and the product
 * showcase on the right (stacked on phones): UYKA + zeytinyağı + İznik, then
 * the range, within the first screen.
 */
export function Hero({ locale }: { locale: Locale }) {
  const { sections, cta } = getDictionary(locale);
  const { hero } = sections;
  const { origin } = company;

  const slides: ShowcaseSlide[] = getProducts(locale).map((product) => ({
    id: product.id,
    name: product.name,
    category: product.category,
    summary: product.summary,
    href: productHref(product.slug, locale),
    packshot: media.packshots[product.id],
    isRepresentative: REPRESENTATIVE_PACKSHOTS.has(product.id),
  }));

  return (
    <section className="relative overflow-hidden bg-brand text-on-brand">
      <HeroParallax>
        <Photo name={media.hero} alt={hero.imageAlt} priority className="h-[115%] w-full" />
      </HeroParallax>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-brand via-brand/75 to-brand/40" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand via-transparent to-brand/40" />

      <Container className="relative grid grid-cols-1 gap-10 pb-16 pt-36 sm:pt-40 lg:min-h-svh lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:pb-20">
        <div>
          <p className="eyebrow text-accent-soft">
            {origin.district} · {origin.province} · {origin.country}
          </p>
          <h1 className="mt-6 text-[2.9rem] sm:text-7xl lg:text-[5.5rem] [&_em]:text-accent-soft">
            <EmphasisTitle title={hero.title} emphasis={hero.emphasis} />
          </h1>
          <p className="mt-6 max-w-xl text-lg text-on-brand/80">{hero.intro}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href={href("products", locale)} trackEvent="hero_cta_click">
              {cta.discoverProducts}
            </ButtonLink>
            <ButtonLink href={href("story", locale)} variant="ghost-light" trackEvent="hero_cta_click">
              {cta.ourStory}
            </ButtonLink>
          </div>
        </div>

        <ProductShowcase slides={slides} copy={hero.showcase} />
      </Container>
    </section>
  );
}
