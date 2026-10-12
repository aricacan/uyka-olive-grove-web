"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { isMotionReduced } from "@/lib/motion";

/** How much slower than the page the background moves (0 = fixed, 1 = normal). */
const PARALLAX_FACTOR = 0.25;

/** Moves the hero background slower than the page; off for reduced motion. */
export function HeroParallax({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || isMotionReduced()) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      element.style.transform = `translate3d(0, ${window.scrollY * PARALLAX_FACTOR}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 will-change-transform">
      {children}
    </div>
  );
}
