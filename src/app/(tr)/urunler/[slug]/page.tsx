import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/content/index";
import { productMetadata } from "@/lib/seo";
import { ProductView } from "@/views/ProductView";

const LOCALE = "tr";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProducts(LOCALE).map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(props: PageProps<"/urunler/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(LOCALE, slug);
  return product ? productMetadata(product, LOCALE) : {};
}

export default async function ProductPage(props: PageProps<"/urunler/[slug]">) {
  const { slug } = await props.params;
  const product = getProductBySlug(LOCALE, slug);
  if (!product) notFound();
  return <ProductView product={product} locale={LOCALE} />;
}
