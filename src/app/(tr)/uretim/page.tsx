import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ProductionView } from "@/views/ProductionView";

export const metadata: Metadata = pageMetadata("production", "tr");

export default function ProductionPage() {
  return <ProductionView locale="tr" />;
}
