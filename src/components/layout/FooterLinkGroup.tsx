import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

type FooterLinkGroupProps = { title: string; children: ReactNode };

/**
 * Link column that is an accordion on mobile and an open list from md up
 * (Nermin Hanım reference). Two renderings because <details> can't be
 * force-opened responsively with CSS alone.
 */
export function FooterLinkGroup({ title, children }: FooterLinkGroupProps) {
  return (
    <div>
      <details className="group border-b border-on-brand/10 md:hidden">
        <summary className="eyebrow flex min-h-14 cursor-pointer list-none items-center justify-between text-accent-soft [&::-webkit-details-marker]:hidden">
          {title}
          <Icon name="plus" className="size-5 transition-transform duration-300 group-open:rotate-45" />
        </summary>
        <div className="pb-6">{children}</div>
      </details>
      <div className="hidden md:block">
        <p className="eyebrow text-accent-soft">{title}</p>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
