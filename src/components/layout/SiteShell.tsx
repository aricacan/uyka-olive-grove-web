import Script from "next/script";
import type { ReactNode } from "react";
import { AnalyticsScript } from "@/components/analytics/AnalyticsScript";
import { AccessibilityPanel } from "@/components/layout/AccessibilityPanel";
import { BackToTopBottle } from "@/components/layout/BackToTopBottle";
import { Footer } from "@/components/layout/Footer";
import { Header, type HeaderNavItem } from "@/components/layout/Header";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";
import { ReadingGuide } from "@/components/layout/ReadingGuide";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { NewsletterBand } from "@/components/sections/NewsletterBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { company, telHref, whatsappLink } from "@/content/company";
import { getDictionary, getProducts } from "@/content/index";
import { media } from "@/content/media";
import { LOCALE_META, type Locale } from "@/i18n/config";
import { href, PAGE_TOP_ID, productHref, quoteHref } from "@/i18n/routes";
import { A11Y_BOOT_SCRIPT } from "@/lib/a11y";
import { organizationJsonLd } from "@/lib/seo";
import { fontVariables } from "@/styles/fonts";
import "@/app/globals.css";

/**
 * Shared <html> shell for every locale's root layout
 * (`app/(tr)/layout.tsx` now, `app/en/layout.tsx` later).
 */
export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const { nav, cta, announcement, whatsapp, backToTop, a11y, language, productsMenu } = getDictionary(locale);
  const products = getProducts(locale);
  const defaultWhatsappHref = whatsappLink(whatsapp.defaultMessage);
  const productMessages = Object.fromEntries(
    products.map((product) => [productHref(product.slug, locale), `${whatsapp.productMessage} ${product.name}`]),
  );

  const navItems: HeaderNavItem[] = nav.items.map((item) => ({
    href: href(item.route, locale),
    label: item.label,
    ...(item.route === "products" && {
      children: products.map((product) => ({
        href: productHref(product.slug, locale),
        label: product.name,
        image: media.packshots[product.id],
      })),
    }),
  }));

  return (
    <html lang={LOCALE_META[locale].htmlLang} className={`${fontVariables} antialiased`} suppressHydrationWarning>
      <body id={PAGE_TOP_ID} className="flex min-h-svh flex-col pb-14 sm:pb-0">
        {/* Applies saved accessibility preferences before first paint. SiteShell is rendered
            by the root layouts, where App Router supports beforeInteractive (docs: components/script). */}
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <Script id="a11y-boot" strategy="beforeInteractive">
          {A11Y_BOOT_SCRIPT}
        </Script>
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-canvas focus:p-3"
        >
          {nav.skipToContent}
        </a>
        <Header
          brandName={company.name}
          homeHref={href("home", locale)}
          items={navItems}
          cta={{ href: quoteHref(locale), label: cta.quote }}
          whatsapp={{ href: defaultWhatsappHref, label: whatsapp.fabLabel }}
          announcement={announcement}
          contact={{ phone: company.contact.phones[0], phoneHref: telHref(company.contact.phones[0]), email: company.contact.email }}
          language={language}
          allProductsLabel={productsMenu.all}
          labels={{
            home: nav.homeLabel,
            mainNav: nav.mainLabel,
            mobileNav: nav.mobileLabel,
            menuOpen: nav.menuOpen,
            menuClose: nav.menuClose,
          }}
        />
        <main id="icerik" className="flex-1">
          {children}
        </main>
        <NewsletterBand locale={locale} />
        <Footer locale={locale} />
        <BackToTopBottle label={backToTop} />
        <AccessibilityPanel copy={a11y} />
        <ReadingGuide />
        <WhatsAppFab
          title={whatsapp.fabTitle}
          subtitle={whatsapp.fabSubtitle}
          defaultMessage={whatsapp.defaultMessage}
          messagesByPath={productMessages}
        />
        <MobileStickyCta
          quoteHref={quoteHref(locale)}
          quoteLabel={cta.quote}
          whatsappHref={defaultWhatsappHref}
          whatsappLabel={cta.whatsapp}
        />
        <JsonLd data={organizationJsonLd()} />
        <AnalyticsScript />
      </body>
    </html>
  );
}
