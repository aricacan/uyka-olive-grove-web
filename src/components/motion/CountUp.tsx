"use client";

import { useEffect, useRef } from "react";
import { isMotionReduced } from "@/lib/motion";

const DURATION_MS = 1600;

type CountUpProps = { value: number; suffix?: string };

/**
 * Server-renders the final number (SEO, no-JS, reduced motion); counts up
 * once when scrolled into view. Writes to the DOM directly to avoid re-renders.
 */
export function CountUp({ value, suffix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || isMotionReduced()) return;

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / DURATION_MS, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = `${Math.round(value * eased)}${suffix}`;
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, suffix]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
