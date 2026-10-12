import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { QualityView } from "@/views/QualityView";

export const metadata: Metadata = pageMetadata("quality", "tr");

export default function QualityPage() {
  return <QualityView locale="tr" />;
}
