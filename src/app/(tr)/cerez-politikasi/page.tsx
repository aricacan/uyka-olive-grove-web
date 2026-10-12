import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalView } from "@/views/LegalView";

export const metadata: Metadata = pageMetadata("cookies", "tr");

export default function CookiesPage() {
  return <LegalView page="cookies" locale="tr" />;
}
