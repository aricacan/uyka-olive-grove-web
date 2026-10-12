import type { ProcessStepId } from "@/content/process";
import type { UsageId } from "@/content/usage";

type Copy = { title: string; body: string };

/** Copy for the storytelling sections (used on home and inner pages). */
export const sections = {
  hero: {
    title: "İznik'ten gelen",
    emphasis: "zeytin karakteri.",
    intro: "Üç kuşaktır İznik ovasında zeytin yetiştiren bir ailenin, bahçeden sofraya zeytinyağları.",
    imageAlt: "Sabah ışığında İznik zeytinliği",
    showcase: {
      label: "UYKA ürün vitrini",
      slide: "Ürün",
      previous: "Önceki ürün",
      next: "Sonraki ürün",
      view: "Ürünü incele",
      representative: "Temsili görsel",
    },
  },
  trust: {
    ariaLabel: "UYKA kısaca",
    formatsUnit: "format",
    formatsLabel: "250 ml — 18 L",
  },
  collection: {
    eyebrow: "Ürünlerimiz",
    cta: "Tüm ürünler",
  },
  origin: {
    eyebrow: "Köken",
    title: "İznik'ten,",
    emphasis: "zeytinin toprağından.",
    intro:
      "İznik ovasının bereketli toprakları, gölün yumuşattığı iklim ve dağların temiz havası. Zeytinlerimiz bu coğrafyada yetişiyor.",
    imageAlt: "Yamaçlara uzanan zeytin bahçeleri",
    cta: "Üretimi keşfet",
    facts: [
      { label: "Bölge", value: "İznik Gölü havzası, Bursa" },
      { label: "İklim", value: "Göl etkili ılıman Marmara iklimi" },
      { label: "Çevre", value: "Samanlı Dağları ve Uludağ arası" },
    ],
  },
  process: {
    eyebrow: "Zeytinden yağa",
    title: "Yedi adımda",
    emphasis: "bahçeden şişeye.",
    coldNoteLabel: "Soğuk sıkım:",
    steps: {
      harvest: { title: "Hasat", body: "Zeytinler İznik ovasındaki bahçelerden, doğru olgunlukta toplanır." },
      selection: { title: "Seçim", body: "Yaprak ve dal ayrılır, hasarlı taneler ayıklanır." },
      transport: { title: "Taşıma", body: "Kasalarla, bekletilmeden işleme tesisine ulaştırılır." },
      milling: { title: "Sıkım", body: "Kontrollü sıcaklıkta, mekanik yöntemle yağ elde edilir." },
      filtering: { title: "Süzme", body: "Tortudan arındırılarak berraklaştırılır." },
      storage: { title: "Depolama", body: "Işık ve oksijenden korunarak paslanmaz tanklarda dinlendirilir." },
      bottling: { title: "Dolum", body: "250 ml'den 18 L'ye kadar ihtiyaca göre ambalajlanır." },
    } satisfies Record<ProcessStepId, Copy>,
  },
  quality: {
    eyebrow: "Kalite",
    title: "Az iddia,",
    emphasis: "çok kanıt.",
    intro:
      "Her parti için laboratuvar analizi, belge ve hasat bilgisini açıkça paylaşmayı hedefliyoruz. Kalite sayfası, sonuçlar geldikçe güncellenir.",
    cta: "Kalite sayfası",
  },
  guide: {
    eyebrow: "Neye dikkat etmeli?",
    title: "İyi zeytinyağını",
    emphasis: "tanımanın yolu.",
    intro: "Etikete bakarken sorulacak dört soru — ve UYKA'daki karşılıkları.",
    columns: { question: "Soru", why: "Neden önemli?", answer: "UYKA'da" },
    rows: [
      { question: "Köken belli mi?", why: "Tek bölgeden gelen yağın karakteri izlenebilir.", answer: "İznik / Bursa", upcoming: false },
      { question: "Üretici kim?", why: "Bahçeden şişeye aynı elde kalan süreç daha kontrollüdür.", answer: "Öz Uygun Kardeşler, İznik", upcoming: false },
      { question: "Analiz sonuçları açık mı?", why: "Asitlik ve peroksit, kaliteyi sayıyla gösterir.", answer: "Kalite sayfasında yayınlanacak", upcoming: true },
      { question: "Doğru hacim var mı?", why: "Açık kalan yağ zamanla yıpranır; ihtiyaca uygun hacim tazeliği korur.", answer: "250 ml'den 18 L'ye 7 format", upcoming: false },
    ],
    upcomingLabel: "Yakında",
  },
  cooking: {
    title: "Bu akşam UYKA ile ne pişiriyorsunuz?",
    body: "Kahvaltıdan ızgaraya, her tabak için doğru zeytinyağı. Kullanım önerilerimize göz atın.",
    cta: "Kullanım önerileri",
    imageAlt: "Galata Köprüsü'nde oltaların arasında UYKA şişesi",
  },
  usage: {
    eyebrow: "Sofrada",
    title: "Her tabakta",
    emphasis: "bir damla İznik.",
    recommendedLabel: "Önerilen",
    moments: {
      breakfast: { title: "Kahvaltı", body: "Peynir, domates, zeytin — üzerine çiğ olarak." },
      salad: { title: "Salata", body: "Yeşillik ve mevsim sebzeleriyle, son anda." },
      bread: { title: "Ekmek & dip", body: "Taze ekmek, bir tutam tuz, biraz kekik." },
      vegetables: { title: "Zeytinyağlılar", body: "Enginar, fasulye, dolma; ağır ateşte." },
      fish: { title: "Balık & ızgara", body: "Pişirmeden önce marine, servis öncesi bir tur." },
      cooking: { title: "Pişirme & kızartma", body: "Yüksek ısıda dengeli, yumuşak içim." },
    } satisfies Record<UsageId, Copy>,
  },
  story: {
    eyebrow: "Hikâyemiz",
    heading: "1950'den bugüne, üç kuşağın emeği",
    paragraphs: [
      "Zeytinle ilk tanışmamız dedemizin döneminde başladı. İznik'in bereketli ovalarında, Samanlı Dağları ile Uludağ'ın temiz havasında zeytin yetiştiren bir aileyiz.",
      "İznik ovasının tarihi topraklarında, atalarımızdan öğrendiğimiz yöntemlerle hem sofralık zeytin hem de zeytinyağı üretiyoruz.",
      "Bugün bu mirasın üçüncü kuşağıyız. Dedemizden babamıza, babamızdan bize geçen bayrağı aynı heyecanla taşıyoruz.",
    ],
    quote: { text: "Tarlada izi olmayanın harmanda yüzü olmaz.", attribution: "Dedemizin sözü" },
    cta: "Üç kuşağın hikâyesi",
  },
  professionals: {
    eyebrow: "Profesyoneller için",
    title: "Restoranınızın sofrasına",
    emphasis: "layık zeytinyağı.",
    intro: "Restoran, otel ve catering işletmelerine özel fiyatlandırma ve teslimat planı.",
    imageAlt: "İstanbul'da bir teras restoranında UYKA Erken Hasat şişesi",
    offerings: [
      { title: "Masa servisi", body: "250 ml şişe, doğrudan masada zeytinyağlığı olarak." },
      { title: "Profesyonel mutfak", body: "3 L — 18 L teneke; pişirmeden son dokunuşa." },
      { title: "Düzenli tedarik", body: "Toplu sipariş, planlı teslimat, kurumsal fatura." },
    ],
  },
};
