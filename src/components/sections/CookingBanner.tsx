import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { getDictionary } from "@/content/index";
import { media } from "@/content/media";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";

/** Wide photo banner with a centred uppercase question (Monini "What are you cooking tonight?" reference). */
export function CookingBanner({ locale }: { locale: Locale }) {
  const { cooking } = getDictionary(locale).sections;

  return (
    <section className="bg-canvas py-10 sm:py-16">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] text-on-brand">
          <Photo name={media.cooking} alt={cooking.imageAlt} sizes="100vw" className="absolute inset-0 -z-10 h-full w-full" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-brand/60" />
          <div className="mx-auto flex min-h-[26rem] max-w-3xl flex-col items-center justify-center px-6 py-16 text-center sm:min-h-[32rem]">
            <h2 className="text-4xl uppercase leading-tight sm:text-6xl">{cooking.title}</h2>
            <p className="mt-5 max-w-xl text-on-brand/85">{cooking.body}</p>
            <div className="mt-8">
              <ButtonLink href={`${href("products", locale)}#kullanim`}>{cooking.cta}</ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
