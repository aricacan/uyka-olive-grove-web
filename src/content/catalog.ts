/**
 * Locale-independent product data. Names/descriptions per locale are in
 * `content/<locale>/products.ts`, keyed by the same `ProductId`.
 * Tasting scores stay empty until a professional panel result exists.
 */
export const PACKAGE_FORMATS = ["250 ml", "500 ml", "1 L", "3 L", "5 L", "10 L", "18 L"] as const;
export type PackageFormat = (typeof PACKAGE_FORMATS)[number];

export const USE_CASES = ["table", "cooking", "professional"] as const;
export type UseCase = (typeof USE_CASES)[number];

export const PRODUCT_IDS = ["coldPressed", "extraVirgin", "riviera", "naturalFirst"] as const;
export type ProductId = (typeof PRODUCT_IDS)[number];

export type TastingScore = { attribute: "fruitiness" | "bitterness" | "pungency"; score: number };

export type CatalogEntry = {
  id: ProductId;
  useCases: UseCase[];
  formats: PackageFormat[];
  tasting: TastingScore[];
  harvestSeason?: string;
};

export const catalog: CatalogEntry[] = [
  { id: "coldPressed", useCases: ["table", "professional"], formats: [...PACKAGE_FORMATS], tasting: [] },
  { id: "extraVirgin", useCases: ["table", "cooking", "professional"], formats: [...PACKAGE_FORMATS], tasting: [] },
  { id: "riviera", useCases: ["cooking", "professional"], formats: [...PACKAGE_FORMATS], tasting: [] },
  { id: "naturalFirst", useCases: ["cooking", "professional"], formats: [...PACKAGE_FORMATS], tasting: [] },
];
