"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type Variant = "primary" | "ghost-light" | "ghost-dark";

/**
 * Button looks (theme tokens only). On hover a fill sweeps in from the left
 * (the ::before layer) and the arrow nudges right.
 */
const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-on-brand text-brand before:bg-accent-soft",
  "ghost-light": "border border-on-brand/50 text-on-brand before:bg-on-brand hover:text-brand",
  "ghost-dark": "border border-brand/40 text-brand before:bg-brand hover:text-on-brand",
};

const SWEEP =
  "relative isolate overflow-hidden before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:transition-transform before:duration-500 before:ease-editorial hover:before:scale-x-100 focus-visible:before:scale-x-100";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Analytics event sent on click (strategy §45). */
  trackEvent?: AnalyticsEvent;
};

/** Min 44px touch target; all CTAs are links because the site has no server actions. */
export function ButtonLink({ href, children, variant = "primary", trackEvent }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      onClick={trackEvent ? () => track(trackEvent, { href }) : undefined}
      className={`eyebrow group inline-flex min-h-11 items-center justify-center gap-3 px-7 py-3 transition-colors duration-500 ${SWEEP} ${VARIANT_CLASSES[variant]}`}
    >
      {children}
      <Icon name="arrowRight" className="size-4 transition-transform duration-500 ease-editorial group-hover:translate-x-1" />
    </Link>
  );
}
