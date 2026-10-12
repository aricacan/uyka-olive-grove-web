import type { ClaimId } from "@/content/claims";
import type { AnalysisParameter, Medal } from "@/content/quality";

/** Inner-page headers and page-specific copy. */
export const pages = {
  products: {
    eyebrow: "UYKA Koleksiyonu",
    title: "Zeytinyağlarımız",
    intro: "Dört çeşit, yedi ambalaj formatı. Sofradan profesyonel mutfağa tek kökenden.",
  },
  production: { eyebrow: "Üretim", title: "Zeytinden yağa", intro: "Bahçeden şişeye her adım, İznik'te." },
  story: {
    values: {
      eyebrow: "Değerlerimiz",
      title: "Dört kelimede",
      emphasis: "UYKA.",
      items: [
        { title: "Gelenek", body: "Dededen toruna aktarılan bilgi; bahçeyi tanımak, zamanı beklemek." },
        { title: "Toprak", body: "İznik ovası ve gölün iklimi. Yağın karakteri buradan gelir." },
        { title: "Emek", body: "Hasattan doluma her adımda ailenin gözü ve eli." },
        { title: "Şeffaflık", body: "Ne ürettiğimizi, nasıl ürettiğimizi belgeleriyle anlatmak." },
      ],
    },
    timeline: {
      eyebrow: "Zaman çizelgesi",
      title: "Üç kuşak,",
      emphasis: "tek bahçe.",
      note: "Tarihler aile arşiviyle doğrulanmaktadır.",
      milestones: [
        { period: "1950", title: "İlk bahçeler", body: "Dedemiz İznik ovasında zeytinciliğe başlar." },
        { period: "2. kuşak", title: "Büyüyen üretim", body: "Bahçeler genişler, zeytinyağı üretimi aileye yerleşir." },
        { period: "3. kuşak", title: "UYKA", body: "Aile üretimi kendi markasıyla sofralara ve profesyonel mutfaklara ulaşır." },
      ],
    },
    archiveAlt: "UYKA ailesinin arşiv fotoğrafı",
    archivePlaceholder: "Aile arşivi fotoğrafı",
  },
  quality: {
    eyebrow: "Kalite",
    title: "Az iddia,",
    emphasis: "çok kanıt.",
    intro: "Analiz raporları, belgeler ve ödüller; her biri kaynağıyla birlikte.",
    tabs: { analysis: "Analiz raporları", documents: "Belgeler", awards: "Ödüller" },
    tabsLabel: "Kalite kanıtları",
    analysisEmpty: "Bu hasat dönemine ait laboratuvar analizleri hazırlanıyor. Sonuçlar geldiğinde bu sekmede parti numarasıyla yayınlanacak.",
    documentsEmpty: "Belgeler dijital ortama aktarılıyor.",
    parameters: {
      acidity: "Serbest yağ asitliği (% oleik asit)",
      peroxide: "Peroksit (meq O₂/kg)",
      k232: "K232",
      k270: "K270",
      polyphenols: "Toplam polifenol (mg/kg)",
    } satisfies Record<AnalysisParameter, string>,
    reportLabels: {
      parameter: "Parametre",
      value: "Değer",
      lot: "Parti",
      harvest: "Hasat",
      laboratory: "Laboratuvar",
      date: "Analiz tarihi",
      pdf: "Raporu indir (PDF)",
      documentPdf: "PDF",
    },
    medals: { gold: "Altın", silver: "Gümüş", bronze: "Bronz", platinum: "Platin" } satisfies Record<Medal, string>,
    documentTitles: {} as Record<string, string>,
    claimsHeading: "Kalite başlıkları",
    verified: "Belgelendi",
    pending: "Belge hazırlanıyor",
  },
  b2b: {
    eyebrow: "Profesyoneller",
    title: "Profesyonel mutfaklar için",
    intro: "Toplu sipariş, planlı teslimat ve kurumsal faturalandırma.",
    formEyebrow: "Teklif formu",
    formTitle: "Kurumsal teklif alın",
  },
  contact: {
    eyebrow: "İletişim",
    title: "Bize ulaşın",
    phone: "Telefon",
    email: "E-posta",
    whatsapp: "WhatsApp",
    address: "Adres",
  },
  notFound: {
    eyebrow: "404",
    title: "Aradığınız sayfa bulunamadı.",
    body: "Adres değişmiş ya da sayfa kaldırılmış olabilir.",
    cta: "Ana sayfaya dön",
  },
};

export const claims: Record<ClaimId, string> = {
  founded1950: "1950'den bu yana",
  thirdGeneration: "3. kuşak üretici",
  coldExtraction27: "27°C altında işlem",
  earlyHarvest: "Erken hasat",
  ts341: "TS 341 · Türk Gıda Kodeksi uyumlu",
};
