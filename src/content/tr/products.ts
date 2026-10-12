import type { ProductId, TastingScore, UseCase } from "@/content/catalog";

export type ProductCopy = { slug: string; name: string; category: string; method: string; summary: string };

/**
 * Product names follow one pattern: "<quality grade> [<method>]".
 * "Extra virgin" is the English term for "natürel sızma", so it is used as
 * the category line instead of being repeated in the name.
 */
export const products: Record<ProductId, ProductCopy> = {
  coldPressed: {
    slug: "naturel-sizma-soguk-sikim",
    name: "Natürel Sızma Soğuk Sıkım",
    category: "Extra virgin · soğuk sıkım",
    method: "Soğuk sıkım",
    summary:
      "İznik'in verimli topraklarından soğuk sıkım yöntemiyle elde edilir. Doğal aromasını korumak için sofrada, çiğ kullanım için.",
  },
  extraVirgin: {
    slug: "naturel-sizma-extra-virgin",
    name: "Natürel Sızma",
    category: "Extra virgin",
    method: "Mekanik yöntem",
    summary: "Günlük mutfağın temel yağı. Salatadan sıcak yemeğe geniş kullanım alanı.",
  },
  riviera: {
    slug: "riviera",
    name: "Riviera",
    category: "Rafine + natürel harman",
    method: "Rafine ve natürel zeytinyağı harmanı",
    summary: "Yüksek ısıda pişirme ve kızartma için dengeli, yumuşak içimli yağ.",
  },
  naturalFirst: {
    slug: "naturel-birinci",
    name: "Natürel Birinci",
    category: "Natürel",
    method: "Mekanik yöntem",
    summary: "Ekonomik profesyonel kullanım için natürel zeytinyağı.",
  },
};

export const useCases: Record<UseCase, string> = {
  table: "Sofra & son dokunuş",
  cooking: "Pişirme",
  professional: "Profesyonel mutfak",
};

export const productLabels = {
  method: "Yöntem",
  use: "Kullanım",
  packaging: "Ambalaj",
  origin: "Köken",
  harvest: "Hasat",
  harvestPending: "Sezon bilgisi yakında",
  harvestBadge: "Hasat",
  formatsHeading: "Ambalaj seçenekleri",
  packshotPlaceholder: "Ürün fotoğrafı",
  representative: "Temsili görsel",
  viewer: {
    show3d: "3D incele",
    showPhoto: "Fotoğraf",
    loading: "3D model yükleniyor…",
    modelLabel: "Şişenin döndürülebilir 3D modeli",
    hint: "Döndürmek için sürükleyin",
  },
  filterLabel: "Kullanıma göre",
  filterAll: "Tümü",
  tastingHeading: "Tadım profili",
  tastingSource: "Profesyonel panel değerlendirmesi",
  analysisHeading: "Analiz",
  analysisPending: "Bu ürünün analiz raporu hazırlanıyor.",
  analysisLink: "Kalite sayfasında incele",
  tasting: {
    fruitiness: "Meyvemsi",
    bitterness: "Acılık",
    pungency: "Yakıcılık",
  } satisfies Record<TastingScore["attribute"], string>,
};
