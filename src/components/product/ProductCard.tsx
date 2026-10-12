import Link from "next/link";
import { HarvestBadge } from "@/components/product/HarvestBadge";
import { Photo } from "@/components/ui/Photo";
import { getDictionary, type Product } from "@/content/index";
import { media, REPRESENTATIVE_PACKSHOTS } from "@/content/media";
import type { Locale } from "@/i18n/config";
import { productHref } from "@/i18n/routes";

/** Card shows only: name, category, method, use, formats, CTA (strategy §11). */
export function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  const { productLabels, useCases, cta } = getDictionary(locale);
  const specs = [
    { label: productLabels.method, value: product.method },
    { label: productLabels.use, value: product.useCases.map((useCase) => useCases[useCase]).join(", ") },
    { label: productLabels.packaging, value: `${product.formats[0]} — ${product.formats[product.formats.length - 1]}` },
  ];

  return (
    <article className="group flex h-full flex-col border border-line bg-canvas transition-colors hover:border-muted">
      <div className="relative">
        <Photo
          name={media.packshots[product.id]}
          alt={product.name}
          placeholderLabel={productLabels.packshotPlaceholder}
          fit="contain"
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[4/5] w-full bg-surface p-[8%]"
        />
        {product.harvestSeason && (
          <HarvestBadge season={product.harvestSeason} label={productLabels.harvestBadge} className="absolute right-4 top-4" />
        )}
        {REPRESENTATIVE_PACKSHOTS.has(product.id) && (
          <span className="absolute bottom-3 left-3 text-xs text-muted">{productLabels.representative}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow text-accent">{product.category}</p>
        <h3 className="mt-3 font-product text-2xl font-semibold leading-tight text-brand">{product.name}</h3>
        <dl className="mt-5 space-y-2 text-sm text-ink/80">
          {specs.map((spec) => (
            <div key={spec.label} className="flex justify-between gap-4">
              <dt>{spec.label}</dt>
              <dd className="text-right">{spec.value}</dd>
            </div>
          ))}
        </dl>
        <Link
          href={productHref(product.slug, locale)}
          className="eyebrow mt-auto inline-flex min-h-11 items-center pt-6 text-brand underline-offset-8 group-hover:underline"
        >
          {cta.viewProduct}
        </Link>
      </div>
    </article>
  );
}
