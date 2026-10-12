"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/** Fires one analytics event when the page mounts (e.g. product_view). */
export function TrackOnMount({ event, label }: { event: AnalyticsEvent; label: string }) {
  useEffect(() => {
    track(event, { label });
  }, [event, label]);

  return null;
}
