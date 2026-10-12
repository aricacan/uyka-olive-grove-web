/**
 * Signature motif: a single drop of oil landing with a ripple.
 * Animates when a parent <Reveal> is shown (see motion.css). Decorative only.
 */
export function OilDrop({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 72" aria-hidden className={`h-16 w-12 overflow-visible text-accent ${className}`}>
      <path
        className="oil-drop origin-bottom"
        fill="currentColor"
        d="M24 4C24 4 8 26 8 40a16 16 0 0 0 32 0C40 26 24 4 24 4Z"
      />
      <ellipse className="oil-ripple origin-center [transform-box:fill-box]" cx="24" cy="66" rx="22" ry="4" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
