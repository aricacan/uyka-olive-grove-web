/**
 * Claim register ("Less claim, more proof").
 * Status and evidence are locale-independent; claim wording is per locale.
 * `pending` claims render with a footnote marker until the document is on file.
 */
export type ClaimStatus = "verified" | "pending";

export const CLAIM_IDS = ["founded1950", "thirdGeneration", "coldExtraction27", "earlyHarvest", "ts341"] as const;
export type ClaimId = (typeof CLAIM_IDS)[number];

export const claimRegister: Record<ClaimId, { status: ClaimStatus; evidence: string }> = {
  founded1950: { status: "pending", evidence: "Şirket kaydı / aile arşivi" },
  thirdGeneration: { status: "pending", evidence: "Şirket beyanı" },
  coldExtraction27: { status: "pending", evidence: "Üretim prosedürü / tesis kaydı" },
  earlyHarvest: { status: "pending", evidence: "Hasat kaydı (tarih)" },
  ts341: { status: "pending", evidence: "Uygunluk belgesi" },
};
