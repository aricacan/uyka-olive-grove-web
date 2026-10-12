import type { JournalId } from "@/content/journal";

export type ArticleCopy = {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  body: { heading?: string; paragraphs: string[] }[];
};

/** Journal page + section copy. */
export const journalCopy = {
  eyebrow: "Günlük",
  title: "Zeytinyağı kültürü",
  intro: "Zeytinyağını tanımak, onu doğru seçmeyi ve değerini bilmeyi öğretir.",
  readMore: "Yazıyı oku",
  all: "Tüm yazılar",
  back: "Günlüğe dön",
  published: "Yayın",
};

export const articles: Record<JournalId, ArticleCopy> = {
  extraVirgin: {
    slug: "naturel-sizma-zeytinyagi-nedir",
    tag: "Zeytinyağı sözlüğü",
    title: "Natürel sızma zeytinyağı nedir?",
    excerpt: "Etiketlerde en sık gördüğümüz iki kelimenin ardında net bir tanım var: yalnızca mekanik yöntem ve düşük asitlik.",
    body: [
      {
        paragraphs: [
          "Natürel sızma, zeytinyağı sınıflarının en üst basamağıdır. Zeytinden yalnızca mekanik ve fiziksel yöntemlerle, yani ezme, yoğurma ve ayırma ile elde edilir; kimyasal işlem ya da rafinasyon görmez.",
          "Türk Gıda Kodeksi ve Uluslararası Zeytin Konseyi tanımlarına göre natürel sızma zeytinyağının serbest yağ asitliği (oleik asit cinsinden) %0,8'i geçemez. Aynı zamanda tadım panelinde kusursuz bulunmalı ve meyvemsi bir karakter taşımalıdır.",
        ],
      },
      {
        heading: "Diğer sınıflardan farkı",
        paragraphs: [
          "Natürel birinci zeytinyağında asitlik sınırı daha yüksektir ve küçük duyusal kusurlara izin verilir. Riviera zeytinyağı ise rafine zeytinyağı ile natürel zeytinyağının harmanıdır; daha yumuşak içimlidir ve yüksek ısıda pişirmeye uygundur.",
          "Kısacası sınıf, yağın nasıl elde edildiğini ve laboratuvar ile tadım testlerinden nasıl geçtiğini anlatır. Etiketteki sınıf adı, bu testlerin sonucudur.",
        ],
      },
    ],
  },
  coldExtraction: {
    slug: "soguk-sikim-ne-demek",
    tag: "Üretim",
    title: "Soğuk sıkım ne demek?",
    excerpt: "Bir sıcaklık sınırı: sıkım sırasında zeytin hamuru 27 °C'yi geçmediğinde etikete “soğuk sıkım” yazılabilir.",
    body: [
      {
        paragraphs: [
          "Zeytinler ezilip hamur hâline getirildikten sonra yağın ayrışması için bir süre yoğrulur. Bu aşamada sıcaklık yükseldikçe yağ verimi artar; ancak aroma bileşenlerinin bir kısmı da kaybolur.",
          "Avrupa Birliği etiketleme kurallarında ve buna paralel Türk mevzuatında, “soğuk sıkım” ya da “soğuk ekstraksiyon” ifadesi yalnızca işlem sıcaklığı 27 °C'nin altında tutulduğunda kullanılabilir.",
        ],
      },
      {
        heading: "Neden önemli?",
        paragraphs: [
          "Düşük sıcaklık, zeytinin taze ve meyvemsi kokusunu yağa taşımayı kolaylaştırır. Bu yüzden soğuk sıkım yağlar çoğunlukla çiğ kullanımda — salatada, kahvaltıda, yemeğin son dokunuşunda — tercih edilir.",
        ],
      },
    ],
  },
  storage: {
    slug: "zeytinyagi-nasil-saklanir",
    tag: "Mutfakta",
    title: "Zeytinyağı nasıl saklanır?",
    excerpt: "Işık, ısı ve hava: zeytinyağının üç düşmanı. Birkaç basit alışkanlıkla tazeliği aylarca korunur.",
    body: [
      {
        paragraphs: [
          "Zeytinyağı ışıkla, ısıyla ve havayla temas ettikçe yavaş yavaş okside olur; aroması azalır. Bu yüzden koyu renkli cam şişe ya da teneke gibi ışık geçirmeyen ambalajlar tercih edilir.",
          "Şişeyi ocaktan ve güneş alan pencereden uzak, serin ve karanlık bir dolapta saklayın. Buzdolabı gerekmez; soğukta yağ bulanıklaşabilir, oda sıcaklığında yeniden berraklaşır.",
        ],
      },
      {
        heading: "Açıldıktan sonra",
        paragraphs: [
          "Kapağı her kullanımdan sonra sıkıca kapatın. Büyük ambalajlardan küçük bir şişeye aktararak kullanmak, ana ambalajdaki yağın havayla temasını azaltır.",
          "Mutfak hızınıza uygun hacmi seçmek de tazeliğin bir parçasıdır: az tüketiyorsanız küçük şişe, profesyonel mutfakta ise teneke daha doğru tercihtir.",
        ],
      },
    ],
  },
};
