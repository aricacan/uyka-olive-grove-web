"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

const VISIBLE_THRESHOLD = 0.15;

type RevealProps = {
  children: ReactNode;
  as?: "div" | "li";
  delayMs?: number;
  className?: string;
};

/**
 * Fades its children in when scrolled into view. Toggles a data attribute
 * directly (no React state → no re-render); styling lives in motion.css.
 */
export function Reveal({ children, as: Tag = "div", delayMs = 0, className }: RevealProps) {
  // Intersection type so the same ref fits both <div> and <li>.
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.reveal = "shown";
        observer.disconnect();
      },
      { threshold: VISIBLE_THRESHOLD },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const style = delayMs ? ({ "--reveal-delay": `${delayMs}ms` } as CSSProperties) : undefined;

  return (
    <Tag ref={ref} data-reveal="" style={style} className={className}>
      {children}
    </Tag>
  );
}
