import { BuyersGuide } from "@/components/sections/BuyersGuide";
import { CookingBanner } from "@/components/sections/CookingBanner";
import { Hero } from "@/components/sections/Hero";
import { JournalSection } from "@/components/sections/JournalSection";
import { Origin } from "@/components/sections/Origin";
import { Process } from "@/components/sections/Process";
import { ProductRange } from "@/components/sections/ProductRange";
import { ProfessionalsCta } from "@/components/sections/ProfessionalsCta";
import { QualityTeaser } from "@/components/sections/QualityTeaser";
import { StoryTeaser } from "@/components/sections/StoryTeaser";
import { TrustStrip } from "@/components/sections/TrustStrip";
import type { Locale } from "@/i18n/config";

/**
 * Home follows the reader's questions (strategy §8):
 * Nesin? → Ne satıyorsun? → Nereden? → Nasıl? → Kanıt? → Neye dikkat? →
 * Nasıl kullanılır? → Kim? → Daha fazlasını öğren → Nasıl çalışırız?
 */
export function HomeView({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <TrustStrip locale={locale} />
      <ProductRange locale={locale} />
      <Origin locale={locale} />
      <Process locale={locale} />
      <QualityTeaser locale={locale} />
      <BuyersGuide locale={locale} />
      <CookingBanner locale={locale} />
      <StoryTeaser locale={locale} />
      <JournalSection locale={locale} />
      <ProfessionalsCta locale={locale} />
    </>
  );
}
