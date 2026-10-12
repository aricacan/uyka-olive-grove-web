import type { PhotoName } from "@/content/media";

/**
 * Serves the AVIF/WebP variants produced by `npm run assets`, or a labelled
 * placeholder when the media slot is still empty. Plain <picture> because the
 * static export has no runtime image optimizer.
 */
const WIDTHS = [640, 1280, 1920] as const;
const FALLBACK_WIDTH = 1280;

type PhotoProps = {
  name: PhotoName;
  alt: string;
  /** Shown inside the placeholder so it's clear which photo belongs here. */
  placeholderLabel?: string;
  sizes?: string;
  priority?: boolean;
  /** "contain" for transparent packshots: never cropped (give the wrapper a background). */
  fit?: "cover" | "contain";
  className?: string;
};

const FIT_CLASSES = { cover: "object-cover", contain: "object-contain" } as const;

function srcSet(name: string, format: "avif" | "webp") {
  return WIDTHS.map((width) => `/images/${name}-${width}.${format} ${width}w`).join(", ");
}

export function Photo({ name, alt, placeholderLabel, sizes = "100vw", priority = false, fit = "cover", className = "" }: PhotoProps) {
  if (!name) {
    return (
      <div role="img" aria-label={alt} className={`flex items-end justify-center bg-surface ${className}`}>
        {placeholderLabel && <span className="eyebrow p-6 text-center text-muted">{placeholderLabel}</span>}
      </div>
    );
  }

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(name, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(name, "webp")} sizes={sizes} />
      <img
        src={`/images/${name}-${FALLBACK_WIDTH}.webp`}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={`${FIT_CLASSES[fit]} ${className}`}
      />
    </picture>
  );
}
