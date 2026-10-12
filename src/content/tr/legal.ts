import { company } from "@/content/company";

/**
 * Legal pages. TEMPLATE TEXT — must be reviewed by the company's legal
 * adviser before launch (KVKK Art. 10 disclosure + cookie policy).
 */
type LegalSection = { heading: string; paragraphs: string[] };
type LegalPage = { eyebrow: string; title: string; updated: string; sections: LegalSection[] };

const { legal, contact } = company;
const controller = `${legal.company}, ${contact.address.street}, ${contact.address.district} / ${contact.address.province}`;

export const legalPages: { privacy: LegalPage; cookies: LegalPage } = {
  privacy: {
    eyebrow: "KVKK",
    title: "Kişisel Verilerin Korunması Aydınlatma Metni",
    updated: "Son güncelleme: Eylül 2026",
    sections: [
      {
        heading: "Veri sorumlusu",
        paragraphs: [
          `6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu ${controller} adresinde bulunan ${legal.company}'dir.`,
        ],
      },
      {
        heading: "İşlenen kişisel veriler",
        paragraphs: [
          "Teklif formu aracılığıyla paylaştığınız firma adı, ad soyad, e-posta adresi, telefon numarası, firma türü, tahmini ihtiyaç ve mesaj içeriği.",
          "Bülten (UYKA Günlüğü) kaydında paylaştığınız e-posta adresi.",
          "Bu site, ziyaretçileri tanımlayan çerez kullanmaz.",
        ],
      },
      {
        heading: "İşleme amaçları ve hukuki sebep",
        paragraphs: [
          "Verileriniz; teklif talebinizi değerlendirmek, size dönüş yapmak ve olası bir sözleşmenin kurulması amacıyla, KVKK m. 5/2-c (sözleşmenin kurulması) ve m. 5/2-f (meşru menfaat) hukuki sebeplerine dayanarak işlenir.",
          "Bülten e-posta adresiniz yalnızca bülten göndermek amacıyla, KVKK m. 5/1 kapsamındaki açık rızanıza dayanarak işlenir; her e-postadaki bağlantıdan ya da bize yazarak dilediğiniz an ayrılabilirsiniz.",
        ],
      },
      {
        heading: "Aktarım",
        paragraphs: [
          "Form gönderimleri, sitemizin barındırıldığı hosting sağlayıcımızın sunucuları üzerinden e-posta olarak kurumsal adresimize iletilir; üçüncü taraf bir form hizmeti kullanılmaz.",
          "Verileriniz bunun dışında üçüncü kişilerle paylaşılmaz; yasal zorunluluk hâlinde yetkili kamu kurumlarına aktarılabilir.",
        ],
      },
      {
        heading: "Saklama süresi",
        paragraphs: ["Teklif yazışmaları, talebin sonuçlanmasından itibaren ilgili mevzuatta öngörülen süreler boyunca saklanır ve ardından silinir."],
      },
      {
        heading: "Haklarınız",
        paragraphs: [
          `KVKK m. 11 kapsamındaki haklarınızı (bilgi talep etme, düzeltme, silme, itiraz vb.) kullanmak için ${contact.email} adresine yazabilirsiniz.`,
        ],
      },
    ],
  },
  cookies: {
    eyebrow: "Çerezler",
    title: "Çerez Politikası",
    updated: "Son güncelleme: Eylül 2026",
    sections: [
      {
        heading: "Çerez kullanıyor muyuz?",
        paragraphs: [
          "Hayır. Bu site ziyaretçileri tanımlayan veya takip eden çerez kullanmaz; bu nedenle çerez onay bandı gösterilmez.",
          "Yazı tipleri sitenin kendi sunucusundan yüklenir; Google gibi üçüncü taraflara istek gönderilmez.",
        ],
      },
      {
        heading: "Ziyaret istatistikleri",
        paragraphs: [
          "Site kullanımını anlamak için çerezsiz ve kişisel veri toplamayan bir istatistik aracı kullanılabilir. Bu araç IP adresi saklamaz ve ziyaretçileri siteler arasında izlemez.",
        ],
      },
      {
        heading: "Değişiklikler",
        paragraphs: ["Çerez kullanan bir hizmet eklenirse bu politika güncellenir ve kullanım öncesinde onayınız istenir."],
      },
    ],
  },
};
