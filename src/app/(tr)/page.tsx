import type { Metadata } from "next";
import { href } from "@/i18n/routes";
import { HomeView } from "@/views/HomeView";

const LOCALE = "tr";

export const metadata: Metadata = {
  alternates: { canonical: href("home", LOCALE) },
};

export default function HomePage() {
  return <HomeView locale={LOCALE} />;
}
