import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { company } from "@/content/company";
import { getDictionary } from "@/content/index";
import { siteUrl } from "@/lib/site-url";
import { baseOpenGraph, SOCIAL_CARD } from "@/lib/seo";

const LOCALE = "tr";
const { meta } = getDictionary(LOCALE);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: meta.siteTitle, template: `%s | ${company.name}` },
  description: meta.siteDescription,
  openGraph: baseOpenGraph(LOCALE),
  twitter: { card: "summary_large_image", images: [SOCIAL_CARD.url] },
};

/** Turkish root layout. English gets its own root layout at `app/en/layout.tsx`. */
export default function TurkishRootLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale={LOCALE}>{children}</SiteShell>;
}
