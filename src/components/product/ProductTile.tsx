import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { getDictionary, type Product } from "@/content/index";
import { media, REPRESENTATIVE_PACKSHOTS } from "@/content/media";
import type { Locale } from "@/i18n/config";
import { productHref } from "@/i18n/routes";

/**
 * Frameless product tile (Monini "Our products" reference): category above,
 * a large floating packshot, the name in the product face below.
 */
export function ProductTile({ product, locale }: { product: Product; locale: Locale }) {
  const { productLabels, cta } = getDictionary(locale);

  return (
    <Link href={productHref(product.slug, locale)} className="group flex h-full flex-col items-center text-center">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink/80">{product.category}</p>
      <div className="relative mt-6 flex h-80 w-full items-end justify-center">
        <span
          aria-hidden
          className="absolute bottom-1 h-4 w-2/5 rounded-[50%] bg-brand/15 blur-md transition-transform duration-700 ease-editorial group-hover:scale-x-75"
        />
        <Photo
          name={media.packshots[product.id]}
          alt={product.name}
          placeholderLabel={productLabels.packshotPlaceholder}
          fit="contain"
          sizes="(min-width: 1280px) 20vw, (min-width: 640px) 40vw, 80vw"
          className="relative h-80 w-full transition-transform duration-700 ease-editorial group-hover:-translate-y-3 group-hover:scale-[1.03]"
        />
      </div>
      <h3 className="mt-6 font-product text-3xl font-semibold leading-tight text-brand transition-colors group-hover:text-accent">
        {product.name}
      </h3>
      <span className="eyebrow mt-5 inline-flex min-h-10 items-center rounded-full border border-brand/30 px-5 text-brand transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-on-brand">
        {cta.discover}
      </span>
      {REPRESENTATIVE_PACKSHOTS.has(product.id) && <p className="mt-3 text-xs text-muted">{productLabels.representative}</p>}
    </Link>
  );
}
