"use client";

import { useEffect, useId, useRef, useState } from "react";
import { isMotionReduced } from "@/lib/motion";

/** Appears after roughly one screen of scrolling. */
const SHOW_AFTER_VIEWPORTS = 0.8;
/** Liquid level in SVG units: empty at the base, full at the neck. */
const LEVEL_EMPTY_Y = 86;
const LEVEL_FULL_Y = 16;
/** Wave crest height above the liquid line. */
const WAVE_HEIGHT = 5;

/** Bottle outline (viewBox 0 0 40 90): the same Marasca shape as the product. */
const BOTTLE_BODY = "M16 14h8v7c0 5 11 8 11 18v44a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V39c0-10 11-13 11-18v-7Z";
const BOTTLE_CAP = "M14.5 3.5h11v10.5h-11z";
/** Up chevron floating above the cap (outside the viewBox; the button's top padding makes room). */
const CHEVRON = "M13 -5 20 -12 27 -5";
/** Two periods of a gentle wave; sliding it by one period (40 units) loops seamlessly. */
const WAVE = "M0 5 Q10 0 20 5 T40 5 T60 5 T80 5 V100 H0 Z";

/**
 * Back-to-top control drawn as an olive-oil bottle outline that fills with a
 * moving wave as the page is scrolled (fill level = scroll progress).
 */
export function BackToTopBottle({ label }: { label: string }) {
  const clipId = useId();
  const liquidRef = useRef<SVGGElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      const level = LEVEL_EMPTY_Y - (LEVEL_EMPTY_Y - LEVEL_FULL_Y) * progress - WAVE_HEIGHT;
      liquidRef.current?.setAttribute("transform", `translate(0 ${level})`);
      setIsVisible(window.scrollY > window.innerHeight * SHOW_AFTER_VIEWPORTS);
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
  }, []);

  return (
    <button
      type="button"
      aria-label={label}
      tabIndex={isVisible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: isMotionReduced() ? "auto" : "smooth" })}
      className={`group fixed bottom-20 left-3 z-40 px-1 pb-1 pt-4 transition-[opacity,transform] duration-500 ease-editorial sm:bottom-6 sm:left-6 ${isVisible ? "opacity-100 hover:-translate-y-1" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <svg viewBox="0 0 40 90" aria-hidden className="h-16 w-7 overflow-visible sm:h-20 sm:w-9 drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
        <defs>
          <clipPath id={clipId}>
            <path d={BOTTLE_BODY} />
          </clipPath>
        </defs>
        {/* Light halo so the outline reads on both dark and light sections. */}
        <path d={BOTTLE_BODY} fill="none" className="stroke-on-brand/90" strokeWidth="3.5" />
        <path d={BOTTLE_CAP} fill="none" className="stroke-on-brand/90" strokeWidth="3.5" />
        <g clipPath={`url(#${clipId})`}>
          <g ref={liquidRef} transform={`translate(0 ${LEVEL_EMPTY_Y})`}>
            <path d={WAVE} className="oil-wave fill-oil" />
          </g>
        </g>
        <path d={BOTTLE_BODY} fill="none" className="stroke-brand transition-colors group-hover:stroke-accent" strokeWidth="1.6" />
        <path d={BOTTLE_CAP} className="fill-brand transition-colors group-hover:fill-accent" />
        {/* Thin chevron above the cap, drawn like the outline, so the bottle reads as "back to top". */}
        <g className="nudge-up">
          <path d={CHEVRON} fill="none" className="stroke-on-brand/90" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d={CHEVRON} fill="none" className="stroke-brand transition-colors group-hover:stroke-accent" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </button>
  );
}
