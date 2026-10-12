import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { REVEAL_STAGGER_MS } from "@/components/motion/timing";
import { Container } from "@/components/ui/Container";
import { EmphasisTitle } from "@/components/ui/EmphasisTitle";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/content/index";
import { media } from "@/content/media";
import { USAGE_MOMENTS } from "@/content/usage";
import type { Locale } from "@/i18n/config";
import { productHref } from "@/i18n/routes";

/** "How to enjoy" — one photo per moment + the recommended oil (La Tourangelle reference). */
export function UsageGrid({ locale }: { locale: Locale }) {
  const { sections, products } = getDictionary(locale);
  const { usage } = sections;

  return (
    <section id="kullanim" className="section-y bg-canvas">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={usage.eyebrow} title={<EmphasisTitle title={usage.title} emphasis={usage.emphasis} />} />
        </Reveal>
        <ul className="mt-12 grid gap-x-6 gap-y-12 max-sm:rail sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {USAGE_MOMENTS.map((moment, index) => {
            const copy = usage.moments[moment.id];
            const product = products[moment.product];
            return (
              <Reveal as="li" key={moment.id} delayMs={index * REVEAL_STAGGER_MS}>
                <Photo
                  name={media.usage[moment.id]}
                  alt={copy.title}
                  placeholderLabel={copy.title}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[4/3] w-full"
                />
                <h3 className="mt-5 text-3xl text-brand">{copy.title}</h3>
                <p className="mt-2 text-ink/75">{copy.body}</p>
                <p className="mt-3 text-sm">
                  <span className="eyebrow text-muted">{usage.recommendedLabel}: </span>
                  <Link href={productHref(product.slug, locale)} className="text-brand underline underline-offset-4 hover:text-accent">
                    {product.name}
                  </Link>
                </p>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
