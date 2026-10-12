import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { REVEAL_STAGGER_MS } from "@/components/motion/timing";
import { ProductTile } from "@/components/product/ProductTile";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { getDictionary, getProducts } from "@/content/index";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";

/** "Ürünlerimiz" row (Monini reference): eyebrow with a running rule, four frameless tiles. */
export function ProductRange({ locale }: { locale: Locale }) {
  const { collection } = getDictionary(locale).sections;

  return (
    <section id="koleksiyon" className="section-y bg-canvas">
      <Container>
        <div className="flex items-center gap-6">
          <h2 className="shrink-0 font-sans text-sm font-semibold uppercase tracking-[0.3em] text-brand">{collection.eyebrow}</h2>
          <span aria-hidden className="h-px flex-1 bg-brand/40" />
          <Link href={href("products", locale)} className="link-underline hidden shrink-0 items-center gap-2 text-sm font-medium text-brand sm:inline-flex">
            {collection.cta}
            <Icon name="arrowRight" className="size-4" />
          </Link>
        </div>
        <ul className="mt-14 grid gap-x-8 gap-y-16 max-sm:rail sm:mt-20 sm:grid-cols-2 xl:grid-cols-4">
          {getProducts(locale).map((product, index) => (
            <Reveal as="li" key={product.id} delayMs={index * REVEAL_STAGGER_MS}>
              <ProductTile product={product} locale={locale} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
