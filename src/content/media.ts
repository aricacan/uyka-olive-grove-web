/**
 * MEDIA — the single place that decides which photo appears where.
 *
 * Each slot holds a photo name from `assets/photos/` (without extension),
 * or `null` while the photo is missing — the site then shows a labelled
 * placeholder in that spot. To fill a slot:
 *   1. put `my-photo.jpg` into assets/photos/
 *   2. run `npm run assets`
 *   3. set the slot below to "my-photo"
 *
 * Packshots are transparent cut-outs (see scripts/cutout-bottle.mjs) and are
 * shown uncropped (object-contain). Only coldPressed is a real photo; the
 * others are REPRESENTATIVE (same bottle + generated label) until photographed.
 */
import type { ProductId } from "./catalog";
import type { ProcessStepId } from "./process";
import type { UsageId } from "./usage";

export type PhotoName = string | null;

export const media = {
  hero: "hero-grove",
  origin: "grove-aerial",
  professionals: "istanbul-teras",
  footer: "grove-aerial",
  cooking: "galata-kopru",
  storyArchive: null,
  packshots: {
    coldPressed: "packshot-erken-hasat",
    extraVirgin: "packshot-naturel-sizma",
    riviera: "packshot-riviera",
    naturalFirst: "packshot-naturel-birinci",
  } satisfies Record<ProductId, PhotoName>,
  usage: {
    breakfast: null,
    salad: null,
    bread: null,
    vegetables: null,
    fish: "galata-kopru",
    cooking: null,
  },
  process: {
    harvest: null,
    selection: null,
    transport: null,
    milling: null,
    filtering: null,
    storage: null,
    bottling: null,
  },
} as const satisfies {
  hero: PhotoName;
  origin: PhotoName;
  professionals: PhotoName;
  footer: PhotoName;
  cooking: PhotoName;
  storyArchive: PhotoName;
  packshots: Record<ProductId, PhotoName>;
  usage: Record<UsageId, PhotoName>;
  process: Record<ProcessStepId, PhotoName>;
};

/**
 * 3D bottle per product: the front-label texture wrapped on the procedural
 * bottle (components/product/bottle). `null` → the product page shows the packshot only.
 */
export const bottleModels: Record<ProductId, string | null> = {
  coldPressed: "/textures/label-erken-hasat.webp",
  extraVirgin: "/textures/label-naturel-sizma.webp",
  riviera: "/textures/label-riviera.webp",
  naturalFirst: "/textures/label-naturel-birinci.webp",
};

/** Products whose packshot is representative (generated label), flagged in the UI. */
export const REPRESENTATIVE_PACKSHOTS: ReadonlySet<ProductId> = new Set(["extraVirgin", "riviera", "naturalFirst"]);
