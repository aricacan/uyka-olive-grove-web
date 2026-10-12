import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import type { PhotoName } from "@/content/media";

export type NavChild = { href: string; label: string; image?: PhotoName };

type NavDropdownProps = {
  label: string;
  href: string;
  items: NavChild[];
  allLabel: string;
  isCurrent: boolean;
};

/**
 * Desktop dropdown (Monini "Products ⌄" reference): opens on hover and on
 * click/keyboard, shows a small packshot per product plus an "all" link.
 */
export function NavDropdown({ label, href, items, allLabel, isCurrent }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
      }}
      onKeyDown={(event) => event.key === "Escape" && setIsOpen(false)}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className={`link-underline flex items-center gap-1 pb-1 text-[0.95rem] font-medium transition-colors hover:text-on-brand ${isCurrent ? "text-accent-soft" : "text-on-brand/85"}`}
      >
        {label}
        <Icon name="chevronDown" className={`size-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`absolute left-1/2 top-full z-10 w-[36rem] -translate-x-1/2 pt-5 transition-[opacity,translate] duration-300 ease-editorial ${isOpen ? "opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`}
      >
        <div className="rounded-3xl bg-canvas p-4 text-ink shadow-2xl">
          <ul className="grid grid-cols-4 gap-2">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  tabIndex={isOpen ? 0 : -1}
                  onClick={() => setIsOpen(false)}
                  className="group flex h-full flex-col items-center rounded-2xl p-3 text-center transition-colors hover:bg-surface"
                >
                  <Photo
                    name={item.image ?? null}
                    alt=""
                    fit="contain"
                    sizes="6rem"
                    className="h-28 w-full transition-transform duration-500 ease-editorial group-hover:-translate-y-1"
                  />
                  <span className="mt-3 font-product text-sm font-semibold leading-tight text-brand">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={href}
            tabIndex={isOpen ? 0 : -1}
            onClick={() => setIsOpen(false)}
            className="eyebrow mt-3 flex min-h-11 items-center justify-center gap-2 rounded-full bg-surface text-brand transition-colors hover:bg-brand hover:text-on-brand"
          >
            {allLabel}
            <Icon name="arrowRight" className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
