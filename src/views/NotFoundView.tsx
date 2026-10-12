import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/content/index";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";

export function NotFoundView({ locale }: { locale: Locale }) {
  const { notFound } = getDictionary(locale).pages;

  return (
    <section className="flex min-h-svh items-center bg-brand text-on-brand">
      <Container>
        <p className="eyebrow text-accent-soft">{notFound.eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-5xl sm:text-7xl">{notFound.title}</h1>
        <p className="mt-6 text-lg text-on-brand/80">{notFound.body}</p>
        <div className="mt-10">
          <ButtonLink href={href("home", locale)}>{notFound.cta}</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
