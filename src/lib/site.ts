/**
 * Vionte künyesi.
 *
 * KONUMLANDIRMA — Vionte bir saç ekimi kliniği DEĞİLDİR.
 * Saç ekimi danışmanlık ve yönlendirme şirketidir. Vergi levhasındaki
 * faaliyet: "tıp, dişçilik ve diğer insan sağlığı hizmetlerine yönelik
 * aracılık hizmetleri". Şahıs şirketi — Mehtap Dizge.
 *
 * Kendi kliniği yoktur. Operasyonlar anlaşmalı hastanede, sertifikalı saç
 * ekim teknisyenleri tarafından yapılır. Sitede hiçbir yerde uygulamayı
 * Vionte'nin yaptığı izlenimi verilmez.
 */

export const site = {
  name: "Vionte",
  shortName: "Vionte",
  /** Ne yaptığımızı tanımlayan ibare — "klinik" denmez */
  tagline: "Saç Ekimi Danışmanlığı",
  /** Şahıs şirketi */
  legalName: "Mehtap Dizge",
  legalForm: "Şahıs şirketi",
  /** Vergi levhasındaki faaliyet konusu */
  faaliyet:
    "Tıp, dişçilik ve diğer insan sağlığı hizmetlerine yönelik aracılık hizmetleri",
  url: "https://viontehealth.com",
  locale: "tr_TR",

  contact: {
    addressLine:
      "Esenyalı Mah. Yanyol Cad. Varyap Plaza No:61 D:247 Pendik/İstanbul",
    street: "Esenyalı Mah. Yanyol Cad. Varyap Plaza No:61 D:247",
    district: "Pendik",
    city: "İstanbul",
    postalCode: "34903",
    country: "TR",
    phoneLabel: "0532 015 79 85",
    phoneHref: "tel:+905320157985",
    whatsappLabel: "0532 015 79 85",
    whatsappHref: "https://wa.me/905320157985",
    email: "info@viontehealth.com",
    hours: "Her gün · 09:00–17:00",
    mapEmbed: "",
  },

  social: {
    instagram: "https://www.instagram.com/viontehealth/",
    instagramHandle: "@viontehealth",
  },

  stats: {
    /** 12 yıl — 15 değil */
    experienceYears: "12",
    clientsPerYear: "200+",
    totalClients: "2000+",
  },

  editorial: {
    lastUpdated: "[GG.AA.YYYY]",
    /** İçerik sorumlusu — hekim değil, sorumlu teknisyen */
    contentOwner: "Mehtap Dizge · info@viontehealth.com",
  },

  /** KVKK veri sorumlusu */
  kvkk: {
    veriSorumlusu: "Mehtap Dizge",
    /**
     * VERBİS kaydı: şirket muafiyet kapsamındadır (10'dan az çalışan,
     * 10 milyon TL altı yıllık bilanço). Yasal metinlerde VERBİS kayıt
     * numarası alanı BULUNMAZ ve sonradan da eklenmemelidir.
     */
    verbisMuafiyeti: true,
  },

  disclaimers: {
    /** Aracılık konumunu açıkça belirtir */
    rol: "Vionte saç ekimi danışmanlık ve yönlendirme hizmeti verir; sağlık kuruluşu değildir ve uygulama yapmaz. Operasyonlar anlaşmalı merkezlerde, sertifikalı saç ekim uzmanları tarafından gerçekleştirilir.",
    medical:
      "Bu sitedeki içerikler yalnızca bilgilendirme amaçlıdır, tanı ve tedavi yerine geçmez. Sağlık durumunuza ilişkin kararlar için hekiminize başvurun.",
    results:
      "Görseller, izni alınmış kişilere ait uygulama kayıtlarıdır ve uygulamayı yapan merkez kart üzerinde belirtilir. Saç ekimi sonuçları kişinin donör alan kapasitesine, saç yapısına ve iyileşme sürecine göre değişir; hiçbir görsel bireysel sonuç taahhüdü içermez.",
    resultsShort: "Sonuçlar kişiye göre değişir.",
    form: "Formunuz yalnızca ön bilgilendirme içindir, tanı yerine geçmez.",
    /** Yazılı garanti belgesi verilmiyor */
    garanti:
      "Yazılı garanti belgesi verilmez. Saç ekimi sonucu kişinin donör kapasitesine ve iyileşme sürecine bağlıdır; garanti edilemez.",
    /** Fiyat politikası — rakam verilmez, greft başına fiyatlandırma yok */
    fiyat:
      "Saç ekimi fiyatı kişiseldir. Her vakanın ihtiyacı farklıdır; yapılacak yer, ekip ve teknik fiyatı etkiler.",
  },

  cta: {
    primary: "Ücretsiz Saç Analizi",
    secondary: "Danışmanlık Alın",
    form: "WhatsApp'tan gönder",
    whatsapp: "WhatsApp'tan yazın",
  },
} as const;

/** [placeholder] biçimindeki değerler için — yayın öncesi kontrol kolaylığı */
export function isPlaceholder(value: string): boolean {
  return value.trim().startsWith("[") && value.trim().endsWith("]");
}

/**
 * Yer tutucu bir adres için href üretmez, böylece çalışmayan bir "Ara"
 * düğmesi sessizce yayına gitmez.
 */
export function safeHref(value: string): string | undefined {
  return isPlaceholder(value) ? undefined : value;
}
