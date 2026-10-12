/** Concentric "olive tree rings" (Cobram Estate reference) — decorative, currentColor. */
const RING_COUNT = 9;
const RING_GAP = 11;
const CENTER = 100;

export function TreeRings({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="0.6">
      {Array.from({ length: RING_COUNT }, (_, index) => (
        <circle key={index} cx={CENTER} cy={CENTER} r={RING_GAP * (index + 1)} />
      ))}
    </svg>
  );
}
