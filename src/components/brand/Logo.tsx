/**
 * The traced UYKA logo, painted with `currentColor` via CSS mask so it takes
 * any theme color (`text-on-brand`, `text-brand`…). Size it with a height or
 * width class.
 *   full     → branch + script + tagline (header, favicon-like uses)
 *   wordmark → the "Uyka" script only, cropped to bleed off the bottom edge
 */
const VARIANTS = {
  full: { src: "/images/logo.svg", aspectRatio: "1538 / 1395" },
  wordmark: { src: "/images/logo-wordmark.svg", aspectRatio: "1538 / 470" },
} as const;

/** Omit `label` for decorative use — the logo is then hidden from screen readers. */
type LogoProps = { label?: string; variant?: keyof typeof VARIANTS; className?: string };

export function Logo({ label, variant = "full", className = "" }: LogoProps) {
  const { src, aspectRatio } = VARIANTS[variant];

  return (
    <span
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      className={`inline-block bg-current ${className}`}
      style={{ aspectRatio, mask: `url(${src}) center / contain no-repeat` }}
    />
  );
}
