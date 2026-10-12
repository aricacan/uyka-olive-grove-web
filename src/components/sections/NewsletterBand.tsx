import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { OilDrop } from "@/components/motion/OilDrop";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/content/index";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";

/**
 * Newsletter sign-up as its own light band, clearly separated from the dark
 * footer below it (rounded card on the canvas).
 */
export function NewsletterBand({ locale }: { locale: Locale }) {
  const { newsletter } = getDictionary(locale);

  return (
    <section aria-labelledby="newsletter-title" className="bg-canvas py-16 sm:py-24">
      <Container>
        <Reveal className="relative grid grid-cols-1 items-center gap-10 overflow-hidden rounded-[2rem] bg-accent-soft/35 px-6 py-12 sm:px-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-16">
          <OilDrop className="pointer-events-none absolute -right-2 top-6 hidden opacity-40 lg:block" />
          <div>
            <p className="eyebrow text-accent">{newsletter.eyebrow}</p>
            <h2 id="newsletter-title" className="mt-3 text-4xl text-brand sm:text-5xl">
              {newsletter.title}
            </h2>
            <p className="mt-4 max-w-md text-ink/75">{newsletter.body}</p>
          </div>
          <NewsletterForm copy={newsletter} privacyHref={href("privacy", locale)} />
        </Reveal>
      </Container>
    </section>
  );
}
