/**
 * Quality evidence (locale-independent). Everything here must come from a
 * real document — lists stay empty until one is on file; the UI then shows
 * an honest "in preparation" state.
 *
 * PDFs go into `public/documents/` and are referenced as "/documents/<file>.pdf".
 */
import type { ProductId } from "./catalog";

export const ANALYSIS_PARAMETERS = ["acidity", "peroxide", "k232", "k270", "polyphenols"] as const;
export type AnalysisParameter = (typeof ANALYSIS_PARAMETERS)[number];

export type AnalysisReport = {
  productId: ProductId;
  lot: string;
  harvestSeason: string;
  laboratory: string;
  /** ISO date, e.g. "2026-11-20". */
  date: string;
  pdf?: string;
  values: Partial<Record<AnalysisParameter, number>>;
};

export type QualityDocument = {
  id: string;
  issuer: string;
  year: number;
  pdf?: string;
};

export const MEDALS = ["gold", "silver", "bronze", "platinum"] as const;
export type Medal = (typeof MEDALS)[number];

export type Award = {
  competition: string;
  year: number;
  medal: Medal;
  productId: ProductId;
};

export const analysisReports: AnalysisReport[] = [];
export const qualityDocuments: QualityDocument[] = [];
export const awards: Award[] = [];

export function reportsForProduct(productId: ProductId): AnalysisReport[] {
  return analysisReports.filter((report) => report.productId === productId);
}
