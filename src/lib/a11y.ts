/**
 * Visitor accessibility preferences (Partanna "Accessibly" reference).
 * Each setting becomes a data attribute on <html>; styles/a11y.css reacts to
 * them. Stored in localStorage purely as a per-visitor convenience.
 */
export const A11Y_STORAGE_KEY = "uyka-a11y";
export const A11Y_CHANGE_EVENT = "uyka:a11y-change";
export const TEXT_SCALE_STEPS = [0, 1, 2, 3] as const;
/** Each text-scale step adds this much to the root font size (see styles/a11y.css). */
export const TEXT_SCALE_STEP_PERCENT = 12.5;

export type A11ySettings = {
  textScale: (typeof TEXT_SCALE_STEPS)[number];
  highContrast: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
  highlightHeadings: boolean;
  readableFont: boolean;
  wideSpacing: boolean;
  hideImages: boolean;
  stopMotion: boolean;
  bigCursor: boolean;
  readingGuide: boolean;
};

export type A11yToggle = Exclude<keyof A11ySettings, "textScale">;

/** Panel sections, in display order. The text-size stepper sits at the top of "content". */
export const A11Y_GROUPS = [
  { id: "content", toggles: ["readableFont", "wideSpacing", "highlightHeadings", "highlightLinks"] },
  { id: "color", toggles: ["highContrast", "grayscale", "hideImages"] },
  { id: "navigation", toggles: ["stopMotion", "bigCursor", "readingGuide"] },
] as const satisfies readonly { id: string; toggles: readonly A11yToggle[] }[];

export type A11yGroupId = (typeof A11Y_GROUPS)[number]["id"];

export const DEFAULT_A11Y: A11ySettings = {
  textScale: 0,
  highContrast: false,
  grayscale: false,
  highlightLinks: false,
  highlightHeadings: false,
  readableFont: false,
  wideSpacing: false,
  hideImages: false,
  stopMotion: false,
  bigCursor: false,
  readingGuide: false,
};

/** Setting → <html data-*> attribute. */
const ATTRIBUTES: Record<keyof A11ySettings, string> = {
  textScale: "data-text-scale",
  highContrast: "data-contrast",
  grayscale: "data-grayscale",
  highlightLinks: "data-links",
  highlightHeadings: "data-headings",
  readableFont: "data-readable",
  wideSpacing: "data-spacing",
  hideImages: "data-hide-images",
  stopMotion: "data-motion-off",
  bigCursor: "data-big-cursor",
  readingGuide: "data-reading-guide",
};

/** Reading guide state for components outside the panel (see ReadingGuide.tsx). */
export function isReadingGuideOn(): boolean {
  return document.documentElement.hasAttribute(ATTRIBUTES.readingGuide);
}

export function applyA11y(settings: A11ySettings): void {
  const root = document.documentElement;
  for (const [key, attribute] of Object.entries(ATTRIBUTES) as [keyof A11ySettings, string][]) {
    const value = settings[key];
    if (value === false || value === 0) root.removeAttribute(attribute);
    else root.setAttribute(attribute, String(value));
  }
  window.dispatchEvent(new Event(A11Y_CHANGE_EVENT));
}

export function loadA11y(): A11ySettings {
  try {
    const stored = window.localStorage.getItem(A11Y_STORAGE_KEY);
    return stored ? { ...DEFAULT_A11Y, ...JSON.parse(stored) } : DEFAULT_A11Y;
  } catch {
    return DEFAULT_A11Y;
  }
}

export function saveA11y(settings: A11ySettings): void {
  try {
    window.localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Storage blocked (private mode): settings still apply for this page view.
  }
}

/**
 * Inline <head> script that applies stored settings before first paint, so a
 * visitor with larger text never sees the page jump. Mirrors applyA11y().
 */
export const A11Y_BOOT_SCRIPT = `try{var s=JSON.parse(localStorage.getItem("${A11Y_STORAGE_KEY}")||"{}"),m=${JSON.stringify(ATTRIBUTES)},r=document.documentElement;for(var k in m){var v=s[k];if(v&&v!==0)r.setAttribute(m[k],String(v))}}catch(e){}`;
