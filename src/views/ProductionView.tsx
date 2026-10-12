import { PageIntro } from "@/components/layout/PageIntro";
import { Origin } from "@/components/sections/Origin";
import { Process } from "@/components/sections/Process";
import { getDictionary } from "@/content/index";
import type { Locale } from "@/i18n/config";

export function ProductionView({ locale }: { locale: Locale }) {
  const { production } = getDictionary(locale).pages;

  return (
    <>
      <PageIntro eyebrow={production.eyebrow} title={production.title} intro={production.intro} />
      <Process locale={locale} />
      <Origin locale={locale} />
    </>
  );
}
