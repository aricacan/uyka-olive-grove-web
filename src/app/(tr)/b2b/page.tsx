import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { B2BView } from "@/views/B2BView";

export const metadata: Metadata = pageMetadata("b2b", "tr");

export default function B2BPage() {
  return <B2BView locale="tr" />;
}
