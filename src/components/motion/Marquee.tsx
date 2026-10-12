/**
 * Endless horizontal strip (Brightland reference). Items are rendered twice
 * so the loop is seamless; the copy is hidden from screen readers.
 * Pauses on hover and stops for reduced motion (motion.css).
 */
export function Marquee({ items, className = "" }: { items: readonly string[]; className?: string }) {
  const renderRow = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="px-8 font-display text-2xl italic sm:text-3xl">{item}</span>
          <span aria-hidden className="size-1.5 rounded-full bg-current opacity-50" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`marquee overflow-hidden py-6 ${className}`}>
      <div className="marquee-track flex w-max">
        {renderRow(false)}
        {renderRow(true)}
      </div>
    </div>
  );
}
