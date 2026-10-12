"use client";

import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { whatsappLink } from "@/content/company";
import { track } from "@/lib/analytics";

type WhatsAppFabProps = {
  title: string;
  subtitle: string;
  defaultMessage: string;
  /** Page-specific messages keyed by pathname (e.g. product pages name the product). */
  messagesByPath: Record<string, string>;
};

/**
 * Desktop WhatsApp button (phones use the bottom bar): a dark pill with the
 * green WhatsApp mark that expands into "WhatsApp · Sipariş hattı" on hover
 * or keyboard focus. A soft ping draws the eye three times, then stops.
 */
export function WhatsAppFab({ title, subtitle, defaultMessage, messagesByPath }: WhatsAppFabProps) {
  const pathname = usePathname();
  const message = messagesByPath[pathname] ?? defaultMessage;

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} — ${subtitle}`}
      onClick={() => track("whatsapp_click", { location: "floating", path: pathname })}
      className="group fixed bottom-6 right-6 z-40 hidden items-center rounded-full border border-on-brand/10 bg-brand-deep p-1.5 text-on-brand shadow-xl shadow-brand/25 transition-transform duration-500 ease-editorial hover:-translate-y-1 focus-visible:-translate-y-1 sm:flex"
    >
      <span className="relative flex size-12 items-center justify-center rounded-full bg-whatsapp text-white">
        <span aria-hidden className="absolute inset-0 animate-[ping_2.4s_ease-out_3] rounded-full bg-whatsapp/60" />
        <Icon name="whatsapp" className="relative size-6" />
      </span>
      <span className="grid max-w-0 overflow-hidden whitespace-nowrap transition-[max-width,padding] duration-500 ease-editorial group-hover:max-w-52 group-hover:px-4 group-focus-visible:max-w-52 group-focus-visible:px-4">
        <span className="eyebrow text-[0.65rem] text-accent-soft">{title}</span>
        <span className="text-sm font-semibold">{subtitle}</span>
      </span>
    </a>
  );
}
