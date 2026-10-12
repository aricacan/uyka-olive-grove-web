import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ContactView } from "@/views/ContactView";

export const metadata: Metadata = pageMetadata("contact", "tr");

export default function ContactPage() {
  return <ContactView locale="tr" />;
}
