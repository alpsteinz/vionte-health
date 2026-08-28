/**
 * CONTENT.md'deki onaylanmış metinler. Burada yeni metin üretilmez.
 * Değişiklik gerekiyorsa önce CONTENT.md güncellenir.
 */

export const hero = {
  eyebrow: "İstanbul · Saç Ekimi Kliniği",
  titleLead: "Saç ekimi",
  titleEmphasis: "bir planla",
  titleTail: "başlar.",
  body: "Her saç yapısı farklıdır. Ekim öncesi donör alan yoğunluğunuz, dökülme tipiniz ve saç telinizin kalınlığı ölçülür; greft planı bu ölçümler üzerine kurulur.",
  counters: [
    { value: "15+", label: "Yıl tecrübe" },
    { value: "1000+", label: "Uygulama" },
    { value: "Safir FUE / DHI", label: "Teknikler" },
  ],
};

export const form = {
  title: "Ücretsiz ön değerlendirme",
  subtitle: "Dökülme seviyenizi işaretleyin, uzmanımız sizi arasın.",
  norwoodLabel: "Dökülme seviyeniz",
  norwoodEmpty: "Size en yakın görseli seçin.",
};

export type NorwoodLevel = {
  id: string;
  roman: string;
  title: string;
  description: string;
  /** Tepe (vertex) görünümünde açık alan oranı — şematik gösterim için */
  vertex: number;
  /** Ön saç çizgisinin geri çekilme oranı — şematik gösterim için */
  hairline: number;
};

/** CONTENT.md — Norwood açıklamaları */
export const norwoodLevels: NorwoodLevel[] = [
  {
    id: "tip-1",
    roman: "I",
    title: "Tip I",
    description: "Belirgin dökülme yok. Koruyucu takip yeterli olabilir.",
    vertex: 0,
    hairline: 0.04,
  },
  {
    id: "tip-2",
    roman: "II",
    title: "Tip II",
    description: "Şakaklarda hafif geri çekilme.",
    vertex: 0,
    hairline: 0.18,
  },
  {
    id: "tip-3",
    roman: "III",
    title: "Tip III",
    description: "Saç çizgisinde belirginleşen açılma.",
    vertex: 0.16,
    hairline: 0.34,
  },
  {
    id: "tip-4",
    roman: "IV",
    title: "Tip IV",
    description: "Ön bölge ve tepe ayrışmaya başlamış.",
    vertex: 0.36,
    hairline: 0.46,
  },
  {
    id: "tip-5",
    roman: "V",
    title: "Tip V",
    description: "Ön bölge ile tepe arasındaki bant incelmiş.",
    vertex: 0.54,
    hairline: 0.58,
  },
  {
    id: "tip-6",
    roman: "VI",
    title: "Tip VI",
    description: "Ön bölge ve tepe birleşmiş. Donör kapasitesi belirleyici.",
    vertex: 0.78,
    hairline: 0.72,
  },
];

export const techniques = {
  eyebrow: "Teknikler",
  title: "İki yöntem, iki farklı saç yapısı",
  intro:
    "Teknik seçimi tercih meselesi değildir; donör alanınızın yoğunluğuna, ekim yapılacak bölgenin genişliğine ve mevcut saçlarınızın durumuna göre belirlenir.",
  items: [
    {
      name: "Safir FUE",
      href: "/sac-ekimi/safir-fue",
      body: "Grefler donör alandan tek tek alınır, safir uçlu kalemlerle açılan kanallara yerleştirilir. Geniş alan ekimlerinde tercih edilir.",
      specs: [
        { label: "Operasyon süresi", value: "[0–0 saat]" },
        { label: "Tıraş", value: "[Donör alan / tam tıraş]" },
        { label: "İşe dönüş", value: "[0–0 gün]" },
      ],
    },
    {
      name: "DHI",
      href: "/sac-ekimi/dhi",
      body: "Kanal açma ve yerleştirme tek adımda, implanter kalemle yapılır. Mevcut saçların arasına sıklaştırma gerektiğinde öne çıkar.",
      specs: [
        { label: "Operasyon süresi", value: "[0–0 saat]" },
        { label: "Tıraş", value: "[Bölgesel / tıraşsız]" },
        { label: "İşe dönüş", value: "[0–0 gün]" },
      ],
    },
    {
      name: "Destekleyici uygulamalar",
      href: "/sac-tedavileri",
      body: "PRP ve mezoterapi, ekim sonrası iyileşme sürecinde ya da dökülmenin erken evrelerinde ayrı bir tedavi planı olarak değerlendirilir.",
      specs: [
        { label: "Seans süresi", value: "[00 dakika]" },
        { label: "Tıraş", value: "Gerekmez" },
        { label: "İşe dönüş", value: "Aynı gün" },
      ],
    },
  ],
};

export const process = {
  eyebrow: "Süreç",
  title: "İlk görüşmeden bir yıllık kontrole",
  steps: [
    {
      title: "Ön değerlendirme",
      body: "Fotoğraf ve görüşme üzerinden dökülme tipiniz değerlendirilir, uygunluk ön görüşü verilir.",
    },
    {
      title: "Klinik muayene",
      body: "Donör alan yoğunluğu ölçülür, kan tahlilleri yapılır, greft sayısı ve saç çizgisi birlikte planlanır.",
    },
    {
      title: "Operasyon günü",
      body: "Lokal anestezi altında greftler alınır ve yerleştirilir. Aynı gün taburcu olursunuz.",
    },
    {
      title: "Takip",
      body: "İlk yıkama klinikte yapılır. 3., 6. ve 12. ay kontrolleriyle süreç izlenir.",
    },
  ],
};

export const team = {
  eyebrow: "Uygulama ekibi",
  title: "Sertifikalı ekip, hekim sorumluluğunda",
  body: "Saç ekimi bir ekip işidir. Kanal açma aşamasını saç ekimi uygulayıcı sertifikasına sahip hekim yürütür; greft alımı ve yerleştirme, Sağlık Bakanlığı tescilli yardımcı uygulayıcı sertifikasına sahip sağlık personeli tarafından hekim sorumluluğunda yapılır.",
  quote:
    "Greft sayısı tek başına bir başarı ölçüsü değil. Belirleyici olan, o greftlerin hangi açıyla ve hangi yoğunlukta yerleştirildiği.",
  roles: [
    { label: "Sorumlu hekim", value: "[Ad Soyad, unvan]" },
    { label: "Uygulama ekibi", value: "[Kişi sayısı, meslek grupları]" },
    { label: "Sertifikasyon", value: "[Bakanlık tescilli uygulayıcı / yardımcı uygulayıcı]" },
  ],
};

export type ResultCase = {
  id: string;
  grafts: string;
  age: string;
  technique: string;
  month: string;
  city: string;
  /** Onamlı görsel gelene kadar boş bırakılır */
  beforeSrc?: string;
  afterSrc?: string;
};

/**
 * Öncesi–sonrası görselleri yalnızca imzalı hasta onam formu varsa yayınlanır.
 * Onam formları gelene kadar kartlar yer tutucu olarak kalır.
 */
export const results = {
  eyebrow: "Sonuçlar",
  title: "Öncesi ve sonrası",
  cases: [
    { id: "vaka-1", grafts: "[0.000]", age: "[00]", technique: "[Safir FUE]", month: "[00]", city: "[Şehir]" },
    { id: "vaka-2", grafts: "[0.000]", age: "[00]", technique: "[DHI]", month: "[00]", city: "[Şehir]" },
    { id: "vaka-3", grafts: "[0.000]", age: "[00]", technique: "[Safir FUE]", month: "[00]", city: "[Şehir]" },
  ] satisfies ResultCase[],
};

export const gallery = {
  eyebrow: "Klinikten",
  title: "Geleceğiniz yeri önceden görün",
  subtitle:
    "Danışma odasından operasyon salonuna, kliniğin tamamı. Fotoğraflar rötuşsuzdur.",
  items: [
    { id: "dis-cephe", caption: "Klinik dış cephe" },
    { id: "bekleme", caption: "Bekleme alanı" },
    { id: "danisma", caption: "Danışma odası" },
    { id: "operasyon", caption: "Operasyon salonu" },
    { id: "sterilizasyon", caption: "Sterilizasyon ünitesi" },
    { id: "kontrol", caption: "Kontrol odası" },
  ],
};

export const reviews = {
  eyebrow: "Hasta yorumları",
  title: "Anlatanlar hastalar",
  /** Google puanı doğrulanabilir olduğu için önemli — gerçek veri gelince doldurulur */
  google: {
    rating: "[0,0]",
    count: "[000]",
    href: "[Google Business Profile bağlantısı]",
  },
  items: [
    { id: "yorum-1", name: "[Ad S.]", meta: "[Safir FUE · 00. ay]", quote: "[Hasta yorumu — video yorum bağlantısı ile birlikte]" },
    { id: "yorum-2", name: "[Ad S.]", meta: "[DHI · 00. ay]", quote: "[Hasta yorumu — video yorum bağlantısı ile birlikte]" },
    { id: "yorum-3", name: "[Ad S.]", meta: "[Safir FUE · 00. ay]", quote: "[Hasta yorumu — video yorum bağlantısı ile birlikte]" },
  ],
};
