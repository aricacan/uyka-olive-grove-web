import Link from "next/link";
import { useEffect, type CSSProperties } from "react";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/analytics";

type NavLink = { href: string; label: string };

type MobileMenuProps = {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  label: string;
  items: NavLink[];
  pathname: string;
  cta: NavLink;
  whatsapp: NavLink;
  contact: { phone: string; phoneHref: string; email: string };
};

const ITEM_STAGGER_MS = 60;
const STEP_NUMBER_DIGITS = 2;

/**
 * Full-screen menu under the header bar: large serif links with a staggered
 * entrance, contact shortcuts at the bottom. Locks page scroll, closes on Esc.
 */
export function MobileMenu({ id, isOpen, onClose, label, items, pathname, cta, whatsapp, contact }: MobileMenuProps) {
  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <nav
      id={id}
      aria-label={label}
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={`fixed inset-0 -z-10 flex flex-col bg-brand pt-32 text-on-brand transition-[opacity,visibility] duration-500 lg:hidden ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
    >
      <Container className="flex flex-1 flex-col overflow-y-auto pb-10">
        <ul className="flex-1 divide-y divide-on-brand/10 border-y border-on-brand/10">
          {items.map((item, index) => (
            <li
              key={item.href}
              style={{ transitionDelay: isOpen ? `${index * ITEM_STAGGER_MS}ms` : "0ms" } as CSSProperties}
              className={`transition-[opacity,transform] duration-500 ease-editorial ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              <Link
                href={item.href}
                onClick={onClose}
                aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                className="flex items-baseline gap-5 py-4 font-display text-4xl aria-[current=page]:text-accent-soft"
              >
                <span className="eyebrow text-on-brand/40">{String(index + 1).padStart(STEP_NUMBER_DIGITS, "0")}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-3">
          <Link
            href={cta.href}
            onClick={() => {
              track("b2b_cta_click", { location: "mobile_menu" });
              onClose();
            }}
            className="eyebrow flex min-h-12 items-center justify-center gap-2 rounded-full bg-on-brand text-brand"
          >
            {cta.label}
            <Icon name="arrowRight" className="size-4" />
          </Link>
          <a
            href={whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { location: "mobile_menu" })}
            className="eyebrow flex min-h-12 items-center justify-center gap-2 rounded-full border border-on-brand/30"
          >
            <Icon name="whatsapp" className="size-5 text-whatsapp" />
            {whatsapp.label}
          </a>
          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-on-brand/70">
            <a href={contact.phoneHref} onClick={() => track("phone_click", { location: "mobile_menu" })}>
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} onClick={() => track("email_click", { location: "mobile_menu" })}>
              {contact.email}
            </a>
          </div>
          <SocialLinks className="mt-4 justify-center" />
        </div>
      </Container>
    </nav>
  );
}
