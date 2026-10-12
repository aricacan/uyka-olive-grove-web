import type { QuoteField } from "@/lib/quote";

/** B2B quote form copy. Option lists are sent as-is in the request. */
export const quoteForm = {
  fields: {
    company: "Firma adı",
    contactName: "Yetkili ad soyad",
    email: "E-posta",
    phone: "Telefon",
    businessType: "Firma türü",
    monthlyVolume: "Tahmini aylık ihtiyaç",
    products: "İlgilendiğiniz ürün",
    message: "Mesaj",
  } satisfies Record<QuoteField, string>,
  errors: {
    company: "Firma adı gerekli.",
    contactName: "Ad soyad gerekli.",
    email: "Geçerli bir e-posta girin.",
    phone: "Geçerli bir telefon girin.",
    businessType: "Firma türünü seçin.",
  } satisfies Partial<Record<QuoteField, string>>,
  businessTypes: ["Restoran", "Otel", "Catering", "Market / Şarküteri", "Diğer"],
  monthlyVolumes: ["< 50 L", "50–200 L", "200–1000 L", "> 1000 L"],
  mixedOrder: "Karma sipariş",
  consentError: "Devam etmek için onay gerekli.",
  consentLink: "KVKK Aydınlatma Metni",
  consentAfter: "'ni okudum; verilerimin teklif için işlenmesine ve form hizmeti aracılığıyla yurt dışına aktarılmasına onay veriyorum.",
  groups: { company: "Firma bilgileri", need: "İhtiyacınız", message: "Mesajınız" },
  productsHint: "Birden fazla seçebilirsiniz.",
  sentTitle: "Teşekkürler!",
  subject: "Teklif talebi",
  submit: "Teklif Talebi Gönder",
  sending: "Gönderiliyor…",
  sent: "Talebiniz alındı. En kısa sürede dönüş yapacağız.",
  sendError: "Form gönderilemedi.",
  handoffIntro: "Talebinizi hazırladık — tercih ettiğiniz kanaldan gönderin:",
  viaWhatsapp: "WhatsApp ile gönder",
  viaEmail: "E-posta ile gönder",
};
