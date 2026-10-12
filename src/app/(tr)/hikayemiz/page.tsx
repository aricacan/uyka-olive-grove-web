import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { StoryView } from "@/views/StoryView";

export const metadata: Metadata = pageMetadata("story", "tr");

export default function StoryPage() {
  return <StoryView locale="tr" />;
}
