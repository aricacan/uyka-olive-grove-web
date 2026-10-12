"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/ui/Icon";
import type { Dictionary } from "@/content/index";
import {
  A11Y_GROUPS,
  applyA11y,
  DEFAULT_A11Y,
  loadA11y,
  saveA11y,
  TEXT_SCALE_STEP_PERCENT,
  TEXT_SCALE_STEPS,
  type A11ySettings,
  type A11yToggle,
} from "@/lib/a11y";

type AccessibilityPanelProps = { copy: Dictionary["a11y"] };

const MAX_SCALE = TEXT_SCALE_STEPS[TEXT_SCALE_STEPS.length - 1];
const subscribeNever = () => () => {};

/**
 * Floating button (bottom right, above WhatsApp) + slide-in drawer with visitor accessibility preferences
 * (Partanna "Accessibly" reference). Closes on Esc or backdrop click.
 */
export function AccessibilityPanel({ copy }: AccessibilityPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(DEFAULT_A11Y);
  const closeRef = useRef<HTMLButtonElement>(null);

  // True only in the browser, so the portal never renders during SSR.
  const isClient = useSyncExternalStore(subscribeNever, () => true, () => false);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Changes build on the latest settings (not the last render) so quick successive clicks never drop one.
  const latestRef = useRef<A11ySettings>(DEFAULT_A11Y);
  const update = (change: (current: A11ySettings) => A11ySettings) => {
    const next = change(latestRef.current);
    latestRef.current = next;
    setSettings(next);
    applyA11y(next);
    saveA11y(next);
  };
  const toggle = (key: A11yToggle) => update((current) => ({ ...current, [key]: !current[key] }));
  const scaleBy = (step: number) =>
    update((current) => ({
      ...current,
      textScale: Math.min(MAX_SCALE, Math.max(0, current.textScale + step)) as A11ySettings["textScale"],
    }));
  const open = () => {
    latestRef.current = loadA11y();
    setSettings(latestRef.current);
    setIsOpen(true);
  };

  return (
    <>
      <button
        type="button"
        aria-label={copy.open}
        aria-expanded={isOpen}
        aria-controls="a11y-panel"
        onClick={open}
        className="fixed bottom-20 right-3 z-40 flex size-12 items-center justify-center rounded-full border border-on-brand/10 bg-brand-deep text-on-brand shadow-xl shadow-brand/25 transition-[transform,background-color] duration-500 ease-editorial hover:-translate-y-1 hover:bg-brand sm:bottom-[6.25rem] sm:right-[1.875rem]"
      >
        <Icon name="accessibility" className="size-6" />
      </button>

      {/* Portalled to <body> so the drawer never moves with the auto-hiding header. */}
      {isClient &&
        createPortal(
          <>
            <div
              aria-hidden
              onClick={() => setIsOpen(false)}
              className={`fixed inset-0 z-[70] bg-ink/40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
            />
            <div
              id="a11y-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="a11y-title"
              inert={!isOpen}
              className={`fixed inset-y-0 right-0 z-[80] flex w-full max-w-sm flex-col bg-canvas text-ink shadow-2xl transition-[transform,visibility] duration-500 ease-editorial ${isOpen ? "visible translate-x-0" : "invisible translate-x-full"}`}
            >
              <div className="flex items-center justify-between border-b border-line px-6 py-5">
                <p id="a11y-title" className="flex items-center gap-3 font-display text-3xl text-brand">
                  <Icon name="accessibility" className="size-7" />
                  {copy.title}
                </p>
                <button
                  ref={closeRef}
                  type="button"
                  aria-label={copy.close}
                  onClick={() => setIsOpen(false)}
                  className="flex size-11 items-center justify-center rounded-full hover:bg-surface"
                >
                  <Icon name="close" className="size-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6">
                <p className="px-4 text-sm text-muted">{copy.intro}</p>

                {A11Y_GROUPS.map((group) => (
                  <section key={group.id} aria-labelledby={`a11y-group-${group.id}`} className="mt-6">
                    <h2 id={`a11y-group-${group.id}`} className="eyebrow mb-2 px-4 text-accent">
                      {copy.groups[group.id]}
                    </h2>

                    {group.id === "content" && (
                      <div className="flex items-center justify-between rounded-2xl bg-surface px-4 py-3">
                        <span className="font-semibold">{copy.textSize}</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            aria-label={copy.smaller}
                            disabled={settings.textScale === 0}
                            onClick={() => scaleBy(-1)}
                            className="flex size-10 items-center justify-center rounded-full border border-line disabled:opacity-40"
                          >
                            <Icon name="minus" className="size-4" />
                          </button>
                          <span aria-live="polite" className="w-14 text-center tabular-nums">
                            {100 + settings.textScale * TEXT_SCALE_STEP_PERCENT}%
                          </span>
                          <button
                            type="button"
                            aria-label={copy.larger}
                            disabled={settings.textScale === MAX_SCALE}
                            onClick={() => scaleBy(1)}
                            className="flex size-10 items-center justify-center rounded-full border border-line disabled:opacity-40"
                          >
                            <Icon name="plus" className="size-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {group.toggles.map((key) => (
                      <button
                        key={key}
                        type="button"
                        role="switch"
                        aria-checked={settings[key]}
                        onClick={() => toggle(key)}
                        className="flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-3 text-left transition-colors hover:bg-surface"
                      >
                        <span>
                          <span className="block">{copy.toggles[key].label}</span>
                          <span className="block text-xs text-muted">{copy.toggles[key].hint}</span>
                        </span>
                        <span
                          aria-hidden
                          className={`flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors ${settings[key] ? "bg-brand" : "bg-line"}`}
                        >
                          <span
                            className={`size-5 rounded-full bg-canvas shadow transition-transform ${settings[key] ? "translate-x-5" : ""}`}
                          />
                        </span>
                      </button>
                    ))}
                  </section>
                ))}
              </div>

              <div className="border-t border-line px-6 py-5">
                <button
                  type="button"
                  onClick={() => update(() => DEFAULT_A11Y)}
                  className="eyebrow min-h-11 w-full rounded-full border border-brand text-brand transition-colors hover:bg-brand hover:text-on-brand"
                >
                  {copy.reset}
                </button>
                <p className="mt-3 text-center text-xs text-muted">{copy.note}</p>
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
