"use client";

import type { AnchorHTMLAttributes } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type TrackedAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & { event?: AnalyticsEvent };

/** Plain <a> (tel:, mailto:, wa.me, maps) that reports a click event when one is given. */
export function TrackedAnchor({ event, onClick, ...anchorProps }: TrackedAnchorProps) {
  return (
    <a
      {...anchorProps}
      onClick={(clickEvent) => {
        if (event) track(event, { href: anchorProps.href ?? "" });
        onClick?.(clickEvent);
      }}
    />
  );
}
