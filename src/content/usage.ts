import type { ProductId } from "./catalog";

/** "How to enjoy" moments and the product recommended for each. */
export const USAGE_MOMENTS = [
  { id: "breakfast", product: "coldPressed" },
  { id: "salad", product: "coldPressed" },
  { id: "bread", product: "coldPressed" },
  { id: "vegetables", product: "extraVirgin" },
  { id: "fish", product: "extraVirgin" },
  { id: "cooking", product: "riviera" },
] as const satisfies readonly { id: string; product: ProductId }[];

export type UsageId = (typeof USAGE_MOMENTS)[number]["id"];
