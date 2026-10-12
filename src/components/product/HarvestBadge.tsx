type HarvestBadgeProps = { season: string; label: string; className?: string };

/** Round seal on the packshot, e.g. "2026/27 Hasat" (Oleamea reference). */
export function HarvestBadge({ season, label, className = "" }: HarvestBadgeProps) {
  return (
    <span
      className={`flex size-20 flex-col items-center justify-center rounded-full border border-accent bg-brand text-center text-on-brand ${className}`}
    >
      <span className="font-display text-lg leading-none">{season}</span>
      <span className="eyebrow mt-1 text-[0.55rem] text-accent-soft">{label}</span>
    </span>
  );
}
