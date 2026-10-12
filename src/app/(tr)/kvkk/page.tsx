import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalView } from "@/views/LegalView";

export const metadata: Metadata = pageMetadata("privacy", "tr");

export default function PrivacyPage() {
  return <LegalView page="privacy" locale="tr" />;
}
