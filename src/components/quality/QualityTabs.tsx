"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";

type Tab = { id: string; label: string; panel: ReactNode };

/**
 * Accessible tabs (WAI-ARIA tabs pattern, arrow-key navigation).
 * Panels are server-rendered and passed in; this only switches visibility.
 */
export function QualityTabs({ label, tabs }: { label: string; tabs: Tab[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const baseId = useId();

  const focusTab = (index: number) => {
    const next = (index + tabs.length) % tabs.length;
    setActiveIndex(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowRight") focusTab(activeIndex + 1);
    if (event.key === "ArrowLeft") focusTab(activeIndex - 1);
  };

  return (
    <div>
      <div role="tablist" aria-label={label} className="flex flex-wrap gap-2 border-b border-line">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            id={`${baseId}-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-controls={`${baseId}-panel-${index}`}
            tabIndex={index === activeIndex ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={onKeyDown}
            className="eyebrow -mb-px min-h-12 border-b-2 border-transparent px-4 text-muted transition-colors hover:text-brand aria-selected:border-brand aria-selected:text-brand"
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          id={`${baseId}-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${index}`}
          hidden={index !== activeIndex}
          className="pt-10"
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}
