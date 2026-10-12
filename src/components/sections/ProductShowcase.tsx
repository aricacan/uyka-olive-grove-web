"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import type { Dictionary } from "@/content/index";
import type { PhotoName } from "@/content/media";
import { A11Y_CHANGE_EVENT } from "@/lib/a11y";
import { track } from "@/lib/analytics";
import { isMotionReduced } from "@/lib/motion";

export type ShowcaseSlide = {
  id: string;
  name: string;
  category: string;
  summary: string;
  href: string;
  packshot: PhotoName;
  isRepresentative: boolean;
};

type ProductShowcaseProps = { slides: ShowcaseSlide[]; copy: Dictionary["sections"]["hero"]["showcase"] };

const AUTOPLAY_MS = 4500;
const SWIPE_THRESHOLD_PX = 40;

/** Where each slide sits relative to the active one (−1 left, 0 centre, +1 right). */
const POSITIONS: Record<number, { transform: string; opacity: number; zIndex: number }> = {
  [-1]: { transform: "translateX(-58%) scale(0.58)", opacity: 0.45, zIndex: 1 },
  0: { transform: "translateX(0) scale(1)", opacity: 1, zIndex: 3 },
  1: { transform: "translateX(58%) scale(0.58)", opacity: 0.45, zIndex: 1 },
};
const HIDDEN = { transform: "translateX(0) scale(0.4)", opacity: 0, zIndex: 0 };

/** Shortest signed distance on a ring of `count` slides. */
function ringOffset(index: number, active: number, count: number) {
  const raw = (index - active + count) % count;
  return raw > count / 2 ? raw - count : raw;
}

/**
 * Hero product carousel: the centred bottle is large, its neighbours shrink and
 * fade at the sides. Auto-advances (paused on hover/focus, off-screen and for
 * reduced motion); arrows, swipe, keyboard and clicking a side bottle also work.
 */
export function ProductShowcase({ slides, copy }: ProductShowcaseProps) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [allowsMotion, setAllowsMotion] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const pointerStartX = useRef<number | null>(null);
  const count = slides.length;

  const goTo = useCallback((index: number) => setActive(((index % count) + count) % count), [count]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAllowsMotion(!isMotionReduced());
    update();
    query.addEventListener("change", update);
    window.addEventListener(A11Y_CHANGE_EVENT, update);
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting));
    if (stageRef.current) observer.observe(stageRef.current);
    return () => {
      query.removeEventListener("change", update);
      window.removeEventListener(A11Y_CHANGE_EVENT, update);
      observer.disconnect();
    };
  }, []);

  const isAutoplaying = allowsMotion && isVisible && !isPaused;

  useEffect(() => {
    if (!isAutoplaying) return;
    const timer = window.setTimeout(() => goTo(active + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [active, isAutoplaying, goTo]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") goTo(active + 1);
    if (event.key === "ArrowLeft") goTo(active - 1);
  };
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = event.clientX;
  };
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;
    const delta = event.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(delta) > SWIPE_THRESHOLD_PX) goTo(active + (delta < 0 ? 1 : -1));
  };

  const current = slides[active];

  return (
    <div
      ref={stageRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={copy.label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className="relative flex h-[27rem] flex-col sm:h-[34rem] lg:h-[min(38rem,72svh)]"
    >
      {/* Soft light behind the active bottle. */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[42%] size-72 -translate-1/2 rounded-full bg-accent-soft/25 blur-3xl" />

      <div
        className="relative flex-1 touch-pan-y select-none"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (pointerStartX.current = null)}
      >
        {slides.map((slide, index) => {
          const offset = ringOffset(index, active, count);
          const position = POSITIONS[offset] ?? HIDDEN;
          const isActive = offset === 0;
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${copy.slide} ${index + 1} / ${count}: ${slide.name}`}
              aria-hidden={!isActive}
              onClick={() => !isActive && goTo(index)}
              style={{ ...position, transition: "transform 800ms var(--ease-editorial), opacity 800ms var(--ease-editorial)" } as CSSProperties}
              className={`absolute inset-x-0 bottom-2 top-6 mx-auto w-1/2 max-w-56 ${isActive ? "" : "cursor-pointer"}`}
            >
              <Photo
                name={slide.packshot}
                alt={slide.name}
                priority={isActive}
                sizes="(min-width: 1024px) 14rem, 45vw"
                fit="contain"
                className="h-full w-full drop-shadow-[0_30px_30px_rgba(0,0,0,0.45)]"
              />
            </div>
          );
        })}
      </div>

      <div className="relative flex items-end justify-between gap-4 pb-6">
        <div key={current.id} className="min-w-0 animate-[showcase-caption_600ms_var(--ease-editorial)_both]">
          <p className="eyebrow truncate text-accent-soft">{current.category}</p>
          <p className="mt-1 truncate font-product text-3xl font-semibold sm:text-4xl">{current.name}</p>
          <p className="mt-2 line-clamp-2 max-w-md text-sm text-on-brand/75">{current.summary}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <Link
              href={current.href}
              onClick={() => track("product_cta_click", { location: "hero_showcase", product: current.id })}
              className="link-underline inline-flex items-center gap-1 py-3 text-on-brand"
            >
              {copy.view}
              <Icon name="arrowRight" className="size-4" />
            </Link>
            {current.isRepresentative && <span className="text-xs text-on-brand/50">{copy.representative}</span>}
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          {(["previous", "next"] as const).map((direction) => (
            <button
              key={direction}
              type="button"
              aria-label={copy[direction]}
              onClick={() => goTo(active + (direction === "next" ? 1 : -1))}
              className="flex size-11 items-center justify-center rounded-full border border-on-brand/25 transition-colors hover:bg-on-brand hover:text-brand"
            >
              <Icon name="arrowRight" className={`size-4 ${direction === "previous" ? "rotate-180" : ""}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Progress: one segment per product, the active one fills while autoplaying. */}
      <div className="relative flex gap-1.5 pb-2" aria-hidden>
        {slides.map((slide, index) => (
          <span key={slide.id} className="h-0.5 flex-1 overflow-hidden rounded-full bg-on-brand/20">
            {index === active && (
              <span
                key={`${active}-${isAutoplaying}`}
                className="block h-full origin-left bg-on-brand"
                style={{ animation: isAutoplaying ? `showcase-progress ${AUTOPLAY_MS}ms linear both` : "none" }}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
