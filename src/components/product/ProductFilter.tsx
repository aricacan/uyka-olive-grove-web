"use client";

import { useState, type ReactNode } from "react";

type FilterOption = { id: string; label: string };
type FilterItem = { id: string; tags: readonly string[]; content: ReactNode };

type ProductFilterProps = {
  label: string;
  allLabel: string;
  options: FilterOption[];
  items: FilterItem[];
};

const ALL = "all";

/**
 * Pill filter (Brightland reference). Cards are server-rendered and passed in
 * as `content`; this component only decides which ones are visible.
 */
export function ProductFilter({ label, allLabel, options, items }: ProductFilterProps) {
  const [active, setActive] = useState(ALL);
  const pills = [{ id: ALL, label: allLabel }, ...options];

  return (
    <>
      <div role="group" aria-label={label} className="flex flex-wrap items-center gap-3">
        <span className="eyebrow mr-2 text-muted">{label}</span>
        {pills.map((pill) => (
          <button
            key={pill.id}
            type="button"
            aria-pressed={active === pill.id}
            onClick={() => setActive(pill.id)}
            className="min-h-11 rounded-full border border-line px-5 text-sm transition-colors hover:border-brand aria-pressed:border-brand aria-pressed:bg-brand aria-pressed:text-on-brand"
          >
            {pill.label}
          </button>
        ))}
      </div>
      <ul className="mt-10 grid gap-6 max-sm:rail sm:mt-12 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <li key={item.id} hidden={active !== ALL && !item.tags.includes(active)}>
            {item.content}
          </li>
        ))}
      </ul>
    </>
  );
}
