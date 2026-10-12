import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { JournalView } from "@/views/JournalView";

export const metadata: Metadata = pageMetadata("journal", "tr");

export default function JournalPage() {
  return <JournalView locale="tr" />;
}
