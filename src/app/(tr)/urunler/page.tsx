import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ProductsView } from "@/views/ProductsView";

export const metadata: Metadata = pageMetadata("products", "tr");

export default function ProductsPage() {
  return <ProductsView locale="tr" />;
}
