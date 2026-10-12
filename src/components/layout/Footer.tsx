import Link from "next/link";
import { TrackedAnchor } from "@/components/analytics/TrackedAnchor";
import { Logo } from "@/components/brand/Logo";
import { TreeRings } from "@/components/brand/TreeRings";
import { FooterLinkGroup } from "@/components/layout/FooterLinkGroup";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Marquee } from "@/components/motion/Marquee";
import { Container } from "@/components/ui/Container";
import { EmphasisTitle } from "@/components/ui/EmphasisTitle";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { company, telHref, whatsappLink } from "@/content/company";
import { getDictionary, getProducts } from "@/content/index";
import { media } from "@/content/media";
import type { Locale } from "@/i18n/config";
import { href, PAGE_TOP_ID, productHref, quoteHref } from "@/i18n/routes";

/**
 * Footer, top to bottom (reference in brackets):
 * marquee [Brightland] → everything else sits on a darkened grove photo
 * [Castillo de Canena]: B2B call-to-action band [Partanna] → logo + social, link columns (accordion on mobile, Nermin Hanım)
 * and "find us" → tone-on-tone wordmark [Graza / Monini] → legal bar with
 * back-to-top [La Tourangelle].
 */
export function Footer({ locale }: { locale: Locale }) {
  const { nav, labels, footer, whatsapp, backToTop, social } = getDictionary(locale);
  const { contact, legal, origin } = company;
  const currentYear = new Date().getFullYear();
  const linkClass = "link-underline text-on-brand/80 transition-colors hover:text-on-brand";

  return (
    <footer className="bg-brand text-on-brand">
      <Marquee items={footer.marquee} className="border-b border-on-brand/10 bg-brand-deep text-accent-soft" />

      <div className="relative isolate overflow-hidden">
        {/* Background landscape, darkest at the top where the text is densest. */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <Photo name={media.footer} alt="" sizes="100vw" className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand via-brand/90 to-brand/60" />
        </div>

        <Container className="relative py-20">
          <TreeRings className="pointer-events-none absolute -right-24 -top-24 size-[28rem] text-on-brand/10" />
          <div className="relative flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow text-accent-soft">{footer.ctaEyebrow}</p>
              <p className="mt-4 max-w-2xl font-display text-4xl leading-tight sm:text-6xl">
                <EmphasisTitle title={footer.ctaTitle} emphasis={footer.ctaEmphasis} />
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={quoteHref(locale)}
                className="eyebrow group inline-flex min-h-12 items-center gap-2 rounded-full bg-on-brand px-6 text-brand transition-colors hover:bg-accent-soft"
              >
                {footer.ctaQuote}
                <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <TrackedAnchor
                event="whatsapp_click"
                href={whatsappLink(whatsapp.defaultMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow inline-flex min-h-12 items-center gap-2 rounded-full border border-on-brand/30 px-6 transition-colors hover:border-whatsapp hover:bg-whatsapp hover:text-white"
              >
                <Icon name="whatsapp" className="size-5" />
                {whatsapp.orderLine}
              </TrackedAnchor>
            </div>
          </div>
        </Container>

        <Container className="grid gap-x-12 border-t border-on-brand/15 pt-6 md:grid-cols-12 md:gap-y-12 md:pt-16">
          <div className="mb-8 md:col-span-3 md:mb-0">
            <Logo label={company.name} className="hidden h-24 md:inline-block" />
            <p className="eyebrow text-on-brand/60 md:mt-6">
              {origin.district} · {origin.province} · {origin.country}
            </p>
            <p className="mt-6 text-sm text-on-brand/70">{social.title}</p>
            <SocialLinks className="mt-3" />
          </div>

          <div className="md:col-span-3">
            <FooterLinkGroup title={footer.columns.explore}>
              <ul className="space-y-3">
                {nav.items.map((item) => (
                  <li key={item.route}>
                    <Link href={href(item.route, locale)} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={href("journal", locale)} className={linkClass}>
                    {footer.journal}
                  </Link>
                </li>
              </ul>
            </FooterLinkGroup>
          </div>

          <div className="md:col-span-3">
            <FooterLinkGroup title={footer.columns.products}>
              <ul className="space-y-3">
                {getProducts(locale).map((product) => (
                  <li key={product.id}>
                    <Link href={productHref(product.slug, locale)} className={linkClass}>
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterLinkGroup>
          </div>

          <address className="mt-10 space-y-4 not-italic md:col-span-3 md:mt-0">
            <p className="eyebrow text-accent-soft">{footer.columns.findUs}</p>
            <p className="text-on-brand/80">
              {contact.address.street}
              <br />
              {contact.address.district} / {contact.address.province}
            </p>
            <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 py-2.5 ${linkClass}`}>
              <Icon name="pin" className="size-4" />
              {footer.directions}
            </a>
            <div className="pt-1">
              {contact.phones.map((phone) => (
                <TrackedAnchor key={phone} event="phone_click" href={telHref(phone)} className={`flex w-fit items-center gap-2 py-2.5 ${linkClass}`}>
                  <Icon name="phone" className="size-4" />
                  {phone}
                </TrackedAnchor>
              ))}
              <TrackedAnchor event="email_click" href={`mailto:${contact.email}`} className={`flex w-fit items-center gap-2 py-2.5 ${linkClass}`}>
                <Icon name="mail" className="size-4" />
                {contact.email}
              </TrackedAnchor>
            </div>
          </address>
        </Container>

        {/* Giant tone-on-tone wordmark that bleeds off the bottom edge. */}
        <div className="mt-16 overflow-hidden text-on-brand/10">
          <Logo variant="wordmark" className="block w-full" />
        </div>
      </div>

      <div className="border-t border-on-brand/10 bg-brand-deep">
        <Container className="flex flex-col gap-4 py-6 text-xs text-on-brand/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {currentYear} {legal.company} · {labels.registry} {legal.registry}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6">
            {nav.legal.map((item) => (
              <li key={item.route}>
                <Link href={href(item.route, locale)} className="link-underline inline-block py-3 hover:text-on-brand">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={`#${PAGE_TOP_ID}`} className="link-underline inline-flex items-center gap-1 py-3 hover:text-on-brand">
                {backToTop}
                <Icon name="arrowUp" className="size-3.5" />
              </a>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
