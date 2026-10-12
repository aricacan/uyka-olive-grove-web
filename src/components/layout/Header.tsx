"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavDropdown, type NavChild } from "@/components/layout/NavDropdown";
import { useHeaderState } from "@/components/layout/useHeaderState";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/analytics";

type NavLink = { href: string; label: string };
export type HeaderNavItem = NavLink & { children?: NavChild[] };

/** How many nav items sit left of the centred logo; the rest go right. */
const ITEMS_LEFT_OF_LOGO = 3;

export type HeaderProps = {
  brandName: string;
  homeHref: string;
  items: HeaderNavItem[];
  cta: NavLink;
  whatsapp: NavLink;
  announcement: { text: string; cta: string };
  contact: { phone: string; phoneHref: string; email: string };
  language: { label: string; current: string };
  allProductsLabel: string;
  labels: { home: string; mainNav: string; mobileNav: string; menuOpen: string; menuClose: string };
};

/**
 * Monini-style header: translucent green bar, nav split around a white oval
 * logo badge that hangs below the bar; language and the quote
 * CTA on the right. Hides on scroll down, returns compact on scroll up.
 */
export function Header(props: HeaderProps) {
  const { brandName, homeHref, items, cta, whatsapp, announcement, contact, language, allProductsLabel, labels } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAtTop, isHidden } = useHeaderState(isMenuOpen);
  const pathname = usePathname();
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const isCurrent = (href: string) => pathname.startsWith(href);
  const renderItem = (item: HeaderNavItem) =>
    item.children ? (
      <NavDropdown label={item.label} href={item.href} items={item.children} allLabel={allProductsLabel} isCurrent={isCurrent(item.href)} />
    ) : (
      <Link
        href={item.href}
        aria-current={isCurrent(item.href) ? "page" : undefined}
        className="link-underline pb-1 text-[0.95rem] font-medium text-on-brand/85 transition-colors hover:text-on-brand aria-[current=page]:text-accent-soft"
      >
        {item.label}
      </Link>
    );

  const barHeight = isAtTop ? "h-header" : "h-header-compact";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-editorial ${isHidden ? "-translate-y-full" : ""}`}>
      {/* Announcement bar — collapses once the page scrolls (Brightland / Partanna reference). */}
      <div className={`overflow-hidden bg-brand-deep text-on-brand transition-[max-height] duration-500 ease-editorial ${isAtTop ? "max-h-10" : "max-h-0"}`}>
        <Container className="flex h-10 items-center justify-center gap-3 text-xs sm:justify-between">
          <p className="truncate text-on-brand/80">{announcement.text}</p>
          <a
            href={whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { location: "announcement" })}
            className="link-underline hidden shrink-0 items-center gap-2 text-accent-soft sm:inline-flex"
          >
            <Icon name="whatsapp" className="size-4" />
            {announcement.cta}
          </a>
        </Container>
      </div>

      <div
        className={`border-b text-on-brand transition-colors duration-500 ${isAtTop && !isMenuOpen ? "border-transparent bg-brand/40 backdrop-blur-sm" : "border-on-brand/10 bg-brand/90 backdrop-blur-md"}`}
      >
        {/* One fixed-height row: the hanging logo overflows it instead of stretching the row off-centre. */}
        <Container className={`grid grid-cols-[1fr_auto_1fr] grid-rows-[100%] items-center gap-6 transition-[height] duration-500 ease-editorial ${barHeight}`}>
          <nav aria-label={labels.mainNav} className="hidden justify-end lg:flex">
            <ul className="flex items-center gap-8">
              {items.slice(0, ITEMS_LEFT_OF_LOGO).map((item) => (
                <li key={item.href}>{renderItem(item)}</li>
              ))}
            </ul>
          </nav>

          {/* Oval logo badge, hanging below the bar (Monini reference). Left-aligned on phones. */}
          <Link
            href={homeHref}
            aria-label={labels.home}
            className={`col-start-1 flex items-center justify-center self-start rounded-[50%] bg-on-brand text-brand shadow-lg shadow-brand/30 transition-[width,height,margin] duration-500 ease-editorial lg:col-start-2 ${isAtTop ? "mt-2 h-20 w-28 lg:mt-3 lg:h-24 lg:w-36" : "mt-1.5 h-14 w-20 lg:h-[4.75rem] lg:w-28"}`}
          >
            <Logo label={brandName} className="h-[78%]" />
          </Link>

          <div className="col-start-3 flex items-center justify-end gap-6">
            <nav aria-label={labels.mainNav} className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {items.slice(ITEMS_LEFT_OF_LOGO).map((item) => (
                  <li key={item.href}>{renderItem(item)}</li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center gap-1">
              <span title={language.label} className="hidden items-center gap-1 px-2 text-sm font-medium text-on-brand/85 xl:flex">
                <Icon name="globe" className="size-4" />
                {language.current}
              </span>
              <Link
                href={cta.href}
                onClick={() => track("b2b_cta_click", { location: "header" })}
                className="group ml-2 hidden min-h-9 items-center gap-2 whitespace-nowrap rounded-lg bg-on-brand px-3.5 text-sm font-semibold text-brand transition-colors hover:bg-accent-soft xl:inline-flex"
              >
                {cta.label}
                <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center lg:hidden"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? labels.menuClose : labels.menuOpen}
                onClick={() => setIsMenuOpen((open) => !open)}
              >
                <Icon name={isMenuOpen ? "close" : "menu"} className="size-7" />
              </button>
            </div>
          </div>
        </Container>
      </div>

      <MobileMenu
        id="mobile-menu"
        isOpen={isMenuOpen}
        onClose={closeMenu}
        label={labels.mobileNav}
        items={items}
        pathname={pathname}
        cta={cta}
        whatsapp={whatsapp}
        contact={contact}
      />
    </header>
  );
}
