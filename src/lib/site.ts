/**
 * Klinik künyesi ve iletişim bilgileri.
 * [köşeli parantez] içindeki değerler klinik sahibinden gelecek — uydurulmaz.
 * Bilgiler geldiğinde yalnızca bu dosya güncellenir.
 */

export const site = {
  name: "Vionte Hair Transplant",
  shortName: "Vionte",
  /** Ruhsattaki tam ticari ünvanla uyumlu olmalı */
  legalName: "[Ruhsatta yer alan tam ticari ünvan]",
  url: "https://viontehealth.com",
  locale: "tr_TR",

  contact: {
    addressLine: "[Klinik adresi, İlçe/İstanbul]",
    street: "[Cadde/Sokak No]",
    district: "[İlçe]",
    city: "İstanbul",
    postalCode: "[34000]",
    country: "TR",
    phoneLabel: "[0212 000 00 00]",
    phoneHref: "[tel:+902120000000]",
    whatsappLabel: "[0500 000 00 00]",
    whatsappHref: "[https://wa.me/905000000000]",
    email: "[info@viontehealth.com]",
    hours: "[Pzt–Cmt · 00:00–00:00]",
    mapEmbed: "",
  },

  social: {
    instagram: "https://www.instagram.com/viontehealth/",
    instagramHandle: "@viontehealth",
  },

  /** AGENTS.md: 12 mi 15 mi — sahiple netleştirilecek, tek rakamda karar kılınacak */
  stats: {
    experienceYears: "15+",
    applications: "1000+",
  },

  editorial: {
    /** Zorunlu: içeriğin son güncelleme tarihi */
    lastUpdated: "[GG.AA.YYYY]",
    /** Zorunlu: içerik sorumlusuna ulaşılabilecek iletişim */
    contentOwner: "[Ad Soyad · e-posta]",
    /** Zorunlu: her hizmet ve blog sayfasında tıbbi inceleme satırı */
    medicalReviewer: "[Dr. Ad Soyad]",
    medicalReviewDate: "[GG.AA.YYYY]",
  },

  disclaimers: {
    medical:
      "Bu sitedeki içerikler yalnızca bilgilendirme amaçlıdır, tanı ve tedavi yerine geçmez. Sağlık durumunuza ilişkin kararlar için hekiminize başvurun.",
    results:
      "Görseller, izni alınmış kişilere ait uygulama kayıtlarıdır. Saç ekimi sonuçları kişinin donör alan kapasitesine, saç yapısına ve iyileşme sürecine göre değişir; hiçbir görsel bireysel sonuç taahhüdü içermez.",
    resultsShort: "Sonuçlar kişiye göre değişir.",
    form: "Formunuz yalnızca ön bilgilendirme içindir, tanı yerine geçmez.",
    kvkk:
      "KVKK Aydınlatma Metni'ni okudum; iletişim bilgilerimin randevu talebim için işlenmesine onay veriyorum.",
  },

  cta: {
    primary: "Greft Planınızı Öğrenin",
    secondary: "Saç Analizinizi Alın",
    form: "Beni arayın",
    whatsapp: "WhatsApp'tan yazın",
  },
} as const;

/** [placeholder] biçimindeki değerler için — yayın öncesi kontrol kolaylığı */
export function isPlaceholder(value: string): boolean {
  return value.trim().startsWith("[") && value.trim().endsWith("]");
}
