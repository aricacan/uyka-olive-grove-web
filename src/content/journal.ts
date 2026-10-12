/**
 * Journal ("Zeytinyağı kültürü", Monini "Culture of oil" reference).
 * Locale-independent data per article; text lives in `content/<locale>/journal.ts`.
 * Articles explain general olive-oil knowledge only — no UYKA product claims.
 */
import type { PhotoName } from "./media";

export const JOURNAL_IDS = ["extraVirgin", "coldExtraction", "storage"] as const;
export type JournalId = (typeof JOURNAL_IDS)[number];

export type JournalEntry = { id: JournalId; publishedAt: string; image: PhotoName };

export const journal: JournalEntry[] = [
  { id: "extraVirgin", publishedAt: "2026-09-27", image: "grove-aerial" },
  { id: "coldExtraction", publishedAt: "2026-09-27", image: "hero-grove" },
  { id: "storage", publishedAt: "2026-09-27", image: "istanbul-teras" },
];
