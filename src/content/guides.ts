import type { FaqItem } from "./faq";

/**
 * Hasta rehberi sayfaları.
 * Onaylanmış metinler CONTENT.md'den; kalanlar [yer tutucu].
 */

export type GuideSection = { id: string; heading: string; body: string[]; list?: string[] };

export type Guide = {
  slug: string;
  name: string;
  h1: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
  sections: GuideSection[];
  faq: FaqItem[];
};

const parentTrail = { name: "Hasta Rehberi", href: "/hasta-rehberi" };
export { parentTrail };

export const guides: Guide[] = [
  {
    slug: "/hasta-rehberi/operasyon-oncesi",
    name: "Operasyon Öncesi",
    h1: "Saç Ekimi Öncesi Nelere Dikkat Edilir?",
    lead: "Operasyon öncesi hazırlık, klinik muayene ve kan tahlilleriyle başlar. Bu aşamada donör alan yoğunluğu ölçülür, greft sayısı ve saç çizgisi birlikte planlanır; kullandığınız ilaçlar ve sistemik hastalıklarınız hekiminizle paylaşılır.",
    metaTitle: "Saç Ekimi Öncesi Hazırlık — Vionte Hair Transplant",
    metaDescription:
      "Saç ekimi öncesi klinik muayene, kan tahlilleri ve greft planlaması. Hangi ilaçların bildirilmesi gerektiği ve operasyon öncesi hazırlık adımları.",
    sections: [
      {
        id: "muayene",
        heading: "Klinik muayenede ne yapılır?",
        body: [
          "Donör alan yoğunluğu ölçülür, kan tahlilleri yapılır, greft sayısı ve saç çizgisi birlikte planlanır.",
        ],
      },
      {
        id: "bildirilmesi-gerekenler",
        heading: "Hekiminize bildirmeniz gerekenler",
        body: ["[Klinik uygulamasına göre doldurulacak — tıbbi inceleyen onayı sonrası.]"],
        list: [
          "[Düzenli kullanılan ilaçlar]",
          "[Kan sulandırıcı kullanımı]",
          "[Bilinen sistemik hastalıklar]",
          "[Alerji öyküsü]",
        ],
      },
      {
        id: "operasyondan-once",
        heading: "Operasyondan önceki gün ve sabahı",
        body: ["[Klinik uygulamasına göre doldurulacak — tıbbi inceleyen onayı sonrası.]"],
      },
    ],
    faq: [
      {
        question: "Herkese saç ekimi yapılabilir mi?",
        answer:
          "Hayır. Donör alan yoğunluğu yetersiz olanlar, dökülmesi aktif olarak devam eden ve henüz stabilize olmamış kişiler ile bazı sistemik hastalığı bulunanlar için uygulama uygun olmayabilir. Uygunluk kararı muayene ve tahliller sonrasında hekim tarafından verilir.",
      },
      {
        question: "Kaç greft gerekir?",
        answer:
          "Greft sayısı dökülme seviyeniz, ekim yapılacak alanın genişliği ve donör alanınızın yoğunluğu ölçülerek belirlenir. Bu ölçüm klinik muayenede yapılır; fotoğraf üzerinden verilen sayılar yalnızca yaklaşık bir aralık gösterir.",
      },
    ],
  },
  {
    slug: "/hasta-rehberi/operasyon-gunu",
    name: "Operasyon Günü",
    h1: "Saç Ekimi Operasyonu Günü Nasıl Geçer?",
    lead: "Lokal anestezi altında greftler alınır ve yerleştirilir. Aynı gün taburcu olursunuz. Kanal açma aşamasını saç ekimi uygulayıcı sertifikasına sahip hekim yürütür; greft alımı ve yerleştirme, Sağlık Bakanlığı tescilli yardımcı uygulayıcı sertifikasına sahip sağlık personeli tarafından hekim sorumluluğunda yapılır.",
    metaTitle: "Saç Ekimi Operasyon Günü — Vionte Hair Transplant",
    metaDescription:
      "Saç ekimi operasyonu günü nasıl geçer: anestezi, greft alımı, kanal açma, yerleştirme ve aynı gün taburculuk.",
    sections: [
      {
        id: "anestezi",
        heading: "Anestezi",
        body: [
          "İşlem lokal anestezi altında yapılır, operasyon boyunca ağrı hissedilmez. Anestezi uygulaması sırasında kısa süreli batma hissi olabilir.",
          "Anestezi, iğne yerine basınçlı jet enjektör ile de uygulanabilir. Bu yöntem anestezi aşamasındaki iğne batma hissini ortadan kaldırır.",
        ],
      },
      {
        id: "ekip",
        heading: "Uygulamayı kim yapar?",
        body: [
          "Saç ekimi bir ekip işidir. Kanal açma aşamasını saç ekimi uygulayıcı sertifikasına sahip hekim yürütür; greft alımı ve yerleştirme, Sağlık Bakanlığı tescilli yardımcı uygulayıcı sertifikasına sahip sağlık personeli tarafından hekim sorumluluğunda yapılır.",
        ],
      },
      {
        id: "gun-akisi",
        heading: "Gün akışı",
        body: ["[Saatlik akış — klinik uygulamasına göre doldurulacak.]"],
      },
    ],
    faq: [
      {
        question: "Saç ekimi acı verir mi?",
        answer:
          "İşlem lokal anestezi altında yapılır, operasyon boyunca ağrı hissedilmez. Anestezi uygulaması sırasında kısa süreli batma hissi olabilir. Operasyon sonrası ilk günlerde hafif hassasiyet görülebilir; hekiminizin önerdiği ağrı kesiciler bu dönemde yeterli olur.",
      },
    ],
  },
  {
    slug: "/hasta-rehberi/operasyon-sonrasi",
    name: "Operasyon Sonrası",
    h1: "Saç Ekimi Sonrası Süreç Nasıl İlerler?",
    lead: "Operasyondan 2–4 hafta sonra ekilen saçların büyük bölümü dökülür. Buna şok dökülme denir ve beklenen bir süreçtir; kökler yerinde kalır. Yeni çıkış 3. aydan itibaren başlar, sonuç 12–18 ay içinde netleşir.",
    metaTitle: "Saç Ekimi Sonrası Süreç — Vionte Hair Transplant",
    metaDescription:
      "Saç ekimi sonrası şok dökülme, yeni çıkış ve 12–18 aylık sonuç süreci. İlk günler, kontroller ve dikkat edilmesi gerekenler.",
    sections: [
      {
        id: "ilk-gunler",
        heading: "İlk günler",
        body: [
          "Operasyon sonrası ilk günlerde hafif hassasiyet görülebilir; hekiminizin önerdiği ağrı kesiciler bu dönemde yeterli olur.",
          "[Uyku pozisyonu, ödem ve pansuman ile ilgili yönergeler — klinik uygulamasına göre doldurulacak.]",
        ],
      },
      {
        id: "sok-dokulme",
        heading: "Şok dökülme nedir?",
        body: [
          "Operasyondan 2–4 hafta sonra ekilen saçların büyük bölümü dökülür. Buna şok dökülme denir ve beklenen bir süreçtir; kökler yerinde kalır.",
        ],
      },
      {
        id: "kontroller",
        heading: "Kontroller",
        body: [
          "İlk yıkama klinikte yapılır. 3., 6. ve 12. ay kontrolleriyle süreç izlenir.",
        ],
      },
      {
        id: "ise-donus",
        heading: "Ne zaman işe dönebilirim?",
        body: [
          "[Kliniğin uygulamasına göre doldurulacak — genel çerçeve: masa başı işlerde birkaç gün, fiziksel güç gerektiren işlerde daha uzun süre önerilir.]",
        ],
      },
    ],
    faq: [
      {
        question: "Ekilen saçlar dökülür mü?",
        answer:
          "Operasyondan 2–4 hafta sonra ekilen saçların büyük bölümü dökülür. Buna şok dökülme denir ve beklenen bir süreçtir; kökler yerinde kalır. Yeni çıkış 3. aydan itibaren başlar, sonuç 12–18 ay içinde netleşir.",
      },
      {
        question: "Saç ekimi kalıcı mıdır?",
        answer:
          "Ekilen kökler dökülmeye dirençli bölgeden alınır, bu nedenle genetik dökülmeden etkilenmez. Ancak mevcut saçlarınızın dökülmesi devam edebilir; planlama bu yüzden uzun vadeli yapılır.",
      },
    ],
  },
  {
    slug: "/hasta-rehberi/sac-yikama",
    name: "Saç Yıkama",
    h1: "Saç Ekimi Sonrası Saç Nasıl Yıkanır?",
    lead: "İlk yıkama klinikte yapılır ve size uygulamalı olarak gösterilir. Sonraki yıkamaları evde sürdürürsünüz; amaç kabukların zamanla ve ovalamadan kalkmasıdır.",
    metaTitle: "Saç Ekimi Sonrası Saç Yıkama — Vionte Hair Transplant",
    metaDescription:
      "Saç ekimi sonrası ilk yıkama klinikte yapılır. Evde yıkama adımları, kabuklanma süreci ve dikkat edilmesi gerekenler.",
    sections: [
      {
        id: "ilk-yikama",
        heading: "İlk yıkama",
        body: ["İlk yıkama klinikte yapılır."],
      },
      {
        id: "evde-yikama",
        heading: "Evde yıkama adımları",
        body: ["[Adım adım yönerge — klinik uygulamasına göre doldurulacak.]"],
        list: [
          "[Losyon uygulaması ve bekleme süresi]",
          "[Şampuan uygulaması]",
          "[Durulama biçimi ve su sıcaklığı]",
          "[Kurulama biçimi]",
        ],
      },
      {
        id: "dikkat",
        heading: "Dikkat edilmesi gerekenler",
        body: ["[Klinik uygulamasına göre doldurulacak.]"],
      },
    ],
    faq: [],
  },
  {
    slug: "/hasta-rehberi/sterilizasyon-ve-hijyen",
    name: "Sterilizasyon ve Hijyen",
    h1: "Saç Ekiminde Sterilizasyon Nasıl Sağlanır?",
    lead: "Saç ekimi küçük cerrahi işlemler grubundadır ve tüm cerrahi işlemler gibi komplikasyon riski taşır. En bilinenleri enfeksiyon ve nekrozdur. Bu risk, işlemin yapıldığı yerin sağlık kuruluşu olup olmamasına ve uygulayan ekibin sertifikasyon ve deneyimine göre değişir.",
    metaTitle: "Sterilizasyon ve Hijyen — Vionte Hair Transplant",
    metaDescription:
      "Saç ekiminde sterilizasyon süreci, tek kullanımlık malzeme kullanımı ve enfeksiyon riskini belirleyen etkenler.",
    sections: [
      {
        id: "neden-onemli",
        heading: "Neden önemli?",
        body: [
          "Saç ekimi küçük cerrahi işlemler grubundadır ve tüm cerrahi işlemler gibi komplikasyon riski taşır. En bilinenleri enfeksiyon ve nekrozdur.",
          "Bu risk, işlemin yapıldığı yerin sağlık kuruluşu olup olmamasına ve uygulayan ekibin sertifikasyon ve deneyimine göre değişir.",
        ],
      },
      {
        id: "klinikte",
        heading: "Klinikte uygulanan süreç",
        body: ["[Sterilizasyon süreci — klinik uygulamasına göre doldurulacak.]"],
        list: [
          "[Alet sterilizasyon yöntemi ve döngüsü]",
          "[Tek kullanımlık malzemeler]",
          "[Operasyon salonu hazırlığı]",
          "[Atık yönetimi]",
        ],
      },
    ],
    faq: [],
  },
  {
    slug: "/hasta-rehberi/fiyatlandirma-nasil-belirlenir",
    name: "Fiyatlandırma Nasıl Belirlenir",
    h1: "Saç Ekimi Fiyatı Nasıl Belirlenir?",
    lead: "Fiyat, greft sayısı ve uygulanacak tekniğe göre belirlenir. Muayene sonrası verilen teklif, operasyon ve kontrol süreçlerinin tamamını kapsar. Teklifte yer almayan ek bir ücret talep edilmez.",
    metaTitle: "Saç Ekimi Fiyatı Nasıl Belirlenir? — Vionte Hair Transplant",
    metaDescription:
      "Saç ekimi fiyatı greft sayısı ve uygulanacak tekniğe göre belirlenir. Fiyatı etkileyen faktörler ve teklifin kapsamı.",
    sections: [
      {
        id: "belirleyen-faktorler",
        heading: "Fiyatı belirleyen faktörler",
        body: [
          "Fiyat, greft sayısı ve uygulanacak tekniğe göre belirlenir. Greft sayısı ise dökülme seviyeniz, ekim yapılacak alanın genişliği ve donör alanınızın yoğunluğu ölçülerek bulunur.",
        ],
        list: [
          "Greft sayısı",
          "Uygulanacak teknik",
          "Ekim yapılacak alanın genişliği",
          "Donör alan yoğunluğu",
        ],
      },
      {
        id: "teklifin-kapsami",
        heading: "Teklif neyi kapsar?",
        body: [
          "Muayene sonrası verilen teklif, operasyon ve kontrol süreçlerinin tamamını kapsar. Teklifte yer almayan ek bir ücret talep edilmez.",
        ],
      },
      {
        id: "neden-rakam-yok",
        heading: "Neden sitede rakam yazmıyor?",
        body: [
          "Greft sayısı ölçülmeden verilen bir rakam gerçekçi olmaz. Ölçüm klinik muayenede yapılır; fotoğraf üzerinden verilen sayılar yalnızca yaklaşık bir aralık gösterir. Bu nedenle fiyat, muayene sonrasında kişiye özel olarak paylaşılır.",
        ],
      },
    ],
    faq: [
      {
        question: "Kaç greft gerekir?",
        answer:
          "Greft sayısı dökülme seviyeniz, ekim yapılacak alanın genişliği ve donör alanınızın yoğunluğu ölçülerek belirlenir. Bu ölçüm klinik muayenede yapılır; fotoğraf üzerinden verilen sayılar yalnızca yaklaşık bir aralık gösterir.",
      },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
