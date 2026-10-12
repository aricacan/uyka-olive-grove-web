import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { getDictionary } from "@/content/index";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { NotFoundView } from "@/views/NotFoundView";

export const metadata: Metadata = { title: getDictionary(DEFAULT_LOCALE).pages.notFound.title };

/** 404 for any unmatched URL (needed because each locale has its own root layout). */
export default function GlobalNotFound() {
  return (
    <SiteShell locale={DEFAULT_LOCALE}>
      <NotFoundView locale={DEFAULT_LOCALE} />
    </SiteShell>
  );
}
