"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { A11Y_CHANGE_EVENT, isReadingGuideOn } from "@/lib/a11y";

/** Height of the clear reading window around the pointer, in px. */
const WINDOW_HEIGHT = 96;

const subscribe = (onChange: () => void) => {
  window.addEventListener(A11Y_CHANGE_EVENT, onChange);
  return () => window.removeEventListener(A11Y_CHANGE_EVENT, onChange);
};

/**
 * Reading guide (accessibility panel): dims the page above and below a band
 * that follows the pointer, so one line of text stays in focus. Positions are
 * written straight to the DOM on pointer move — no re-render per frame.
 */
export function ReadingGuide() {
  const isOn = useSyncExternalStore(subscribe, isReadingGuideOn, () => false);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOn) return;
    let frame = 0;
    let pointerY = window.innerHeight / 2;
    const place = () => {
      frame = 0;
      const top = Math.max(0, pointerY - WINDOW_HEIGHT / 2);
      if (topRef.current) topRef.current.style.height = `${top}px`;
      if (bottomRef.current) bottomRef.current.style.top = `${top + WINDOW_HEIGHT}px`;
    };
    const onPointerMove = (event: PointerEvent) => {
      pointerY = event.clientY;
      if (!frame) frame = requestAnimationFrame(place);
    };
    place();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, [isOn]);

  if (!isOn) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[65]">
      <div ref={topRef} className="absolute inset-x-0 top-0 border-b-2 border-accent-soft bg-ink/55" />
      <div ref={bottomRef} className="absolute inset-x-0 bottom-0 border-t-2 border-accent-soft bg-ink/55" />
    </div>
  );
}
