"use client";

import { useEffect, useState } from "react";

/** Below this scroll offset the header is transparent over the dark hero. */
const TOP_THRESHOLD_PX = 32;
/** The header may only hide once the user is past the hero area. */
const HIDE_AFTER_PX = 400;
/** Ignore tiny scroll jitters (trackpads). */
const DIRECTION_TOLERANCE_PX = 6;

export type HeaderState = { isAtTop: boolean; isHidden: boolean };

/**
 * Smart sticky header (Brightland / Kosterina reference):
 * hides while scrolling down, reappears as soon as the user scrolls up.
 */
export function useHeaderState(isLocked: boolean): HeaderState {
  const [state, setState] = useState<HeaderState>({ isAtTop: true, isHidden: false });

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) < DIRECTION_TOLERANCE_PX) return;

      const isAtTop = y < TOP_THRESHOLD_PX;
      const isHidden = !isLocked && delta > 0 && y > HIDE_AFTER_PX;
      setState((previous) =>
        previous.isAtTop === isAtTop && previous.isHidden === isHidden ? previous : { isAtTop, isHidden },
      );
      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [isLocked]);

  return state;
}
