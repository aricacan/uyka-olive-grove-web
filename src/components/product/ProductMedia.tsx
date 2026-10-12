"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Photo } from "@/components/ui/Photo";
import type { Dictionary } from "@/content/index";
import type { PhotoName } from "@/content/media";
import { isMotionReduced } from "@/lib/motion";

/** three.js is ~150 kB gzipped — loaded only when the 3D view is actually shown. */
const BottleScene = dynamic(() => import("@/components/product/bottle/BottleScene"), { ssr: false });

/** Desktop opens straight into 3D; phones start on the photo and opt in (strategy §33: no heavy WebGL on mobile by default). */
const AUTO_3D_QUERY = "(min-width: 1024px)";

type ProductMediaProps = {
  packshot: PhotoName;
  alt: string;
  placeholderLabel: string;
  modelTexture: string | null;
  copy: Dictionary["productLabels"]["viewer"];
};

export function ProductMedia({ packshot, alt, placeholderLabel, modelTexture, copy }: ProductMediaProps) {
  const [mode, setMode] = useState<"photo" | "3d">("photo");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || !modelTexture || !window.matchMedia(AUTO_3D_QUERY).matches || isMotionReduced()) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setMode("3d");
      observer.disconnect();
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [modelTexture]);

  return (
    <div ref={containerRef} className="relative aspect-[4/5] w-full overflow-hidden bg-surface">
      {mode === "3d" && modelTexture ? (
        <>
          <BottleScene labelTexture={modelTexture} label={copy.modelLabel} hint={copy.hint} />
          <span aria-hidden className="eyebrow pointer-events-none absolute inset-x-0 bottom-6 text-center text-muted">
            {copy.hint}
          </span>
          {/* Soft floor shadow under the bottle. */}
          <span aria-hidden className="pointer-events-none absolute bottom-[12%] left-1/2 h-6 w-1/3 -translate-x-1/2 rounded-full bg-brand/20 blur-xl" />
        </>
      ) : (
        <Photo name={packshot} alt={alt} placeholderLabel={placeholderLabel} fit="contain" priority sizes="(min-width: 1024px) 50vw, 100vw" className="h-full w-full p-[8%]" />
      )}

      {modelTexture && (
        <div role="group" className="absolute right-4 top-4 flex rounded-full bg-canvas p-1 text-xs shadow-sm">
          {(["photo", "3d"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={mode === option}
              onClick={() => setMode(option)}
              className="eyebrow min-h-9 rounded-full px-4 transition-colors aria-pressed:bg-brand aria-pressed:text-on-brand"
            >
              {option === "3d" ? copy.show3d : copy.showPhoto}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
