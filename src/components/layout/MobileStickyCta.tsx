"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/analytics";

type MobileStickyCtaProps = { quoteHref: string; quoteLabel: string; whatsappHref: string; whatsappLabel: string };

/** Mobile-only bottom bar: one commercial action + WhatsApp (Nermin Hanım reference). */
export function MobileStickyCta({ quoteHref, quoteLabel, whatsappHref, whatsappLabel }: MobileStickyCtaProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-on-brand/10 bg-brand pb-[env(safe-area-inset-bottom)] sm:hidden">
      <Link
        href={quoteHref}
        onClick={() => track("b2b_cta_click", { location: "sticky" })}
        className="eyebrow flex min-h-14 items-center justify-center gap-2 text-on-brand"
      >
        {quoteLabel}
        <Icon name="arrowRight" className="size-4" />
      </Link>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_click", { location: "sticky" })}
        className="eyebrow flex min-h-14 items-center justify-center gap-2 border-l border-on-brand/10 bg-whatsapp text-white"
      >
        <Icon name="whatsapp" className="size-5" />
        {whatsappLabel}
      </a>
    </div>
  );
}
