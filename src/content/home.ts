/**
 * Ana sayfa metinleri.
 *
 * DİL KURALI: Vionte Health uygulama yapmaz, yönlendirir. "Kliniğimiz",
 * "uyguluyoruz", "operasyonumuz" gibi ifadeler kullanılmaz; yerine
 * "anlaşmalı merkez", "yönlendiriyoruz", "danışmanlık" geçer.
 */

export const hero = {
  eyebrow: "İstanbul · Saç Ekimi Danışmanlığı",
  titleLead: "Saç ekimi",
  titleEmphasis: "doğru yönlendirmeyle",
  titleTail: "başlar.",
  body: "Vionte Health bir klinik değil, saç ekimi danışmanlık ve yönlendirme şirketidir. Dökülme tipinizi ve donör kapasitenizi ölçer, size uygun tekniği ve anlaşmalı merkezi birlikte belirleriz. Operasyonu anlaşmalı merkezde sertifikalı saç ekim uzmanları yapar.",
  counters: [
    { value: "12", label: "Yıl deneyim" },
    { value: "200+", label: "Yıllık danışan" },
    { value: "2000+", label: "Toplam danışan" },
  ],
};

export const form = {
  title: "Ücretsiz saç analizi",
  subtitle: "Dökülme seviyenizi işaretleyin, uzmanımız sizi WhatsApp'tan arasın.",
  norwoodLabel: "Dökülme seviyeniz",
  norwoodEmpty: "Size en yakın görseli seçin.",
};

export type NorwoodLevel = {
  id: string;
  roman: string;
  title: string;
  description: string;
  /**
   * Klinik görseli. Dosya `public/norwood/` altına konur ve yolu buraya
   * yazılır (örn. "/norwood/tip-3.webp"). Değer verildiği anda o seviye
   * şematik çizim yerine gerçek görseli gösterir; kod değişikliği gerekmez.
   * Boş bırakılan seviyeler şematik çizimle görünmeye devam eder.
   */
  gorsel?: string;
  /** Şematik çizim parametreleri — görsel geldiğinde kullanılmaz */
  vertex: number;
  hairline: number;
};

/**
 * Norwood seviyeleri.
 * Şematik çizimler yer tutucudur; klinik kendi görsel setini yükleyecek
 * ve `NorwoodFigure` bileşeni o dosyalarla değiştirilecek.
 */
export const norwoodLevels: NorwoodLevel[] = [
  { id: "tip-1", roman: "I", title: "Tip I", description: "Belirgin dökülme yok. Koruyucu takip yeterli olabilir.", vertex: 0, hairline: 0.04 },
  { id: "tip-2", roman: "II", title: "Tip II", description: "Şakaklarda hafif geri çekilme.", vertex: 0, hairline: 0.18 },
  { id: "tip-3", roman: "III", title: "Tip III", description: "Saç çizgisinde belirginleşen açılma.", vertex: 0.16, hairline: 0.34 },
  { id: "tip-4", roman: "IV", title: "Tip IV", description: "Ön bölge ve tepe ayrışmaya başlamış.", vertex: 0.36, hairline: 0.46 },
  { id: "tip-5", roman: "V", title: "Tip V", description: "Ön bölge ile tepe arasındaki bant incelmiş.", vertex: 0.54, hairline: 0.58 },
  { id: "tip-6", roman: "VI", title: "Tip VI", description: "Ön bölge ve tepe birleşmiş. Donör kapasitesi belirleyici.", vertex: 0.78, hairline: 0.72 },
];

export const techniques = {
  eyebrow: "Teknikler",
  title: "Teknik seçimi tercih değil, ölçüm meselesi",
  intro:
    "Hangi tekniğin uygun olduğu donör alanınızın yoğunluğuna, ekim yapılacak bölgenin genişliğine ve mevcut saçlarınızın durumuna göre belirlenir. Aşağıdaki sayfalarda her tekniğin ne olduğu, kime uygun olduğu ve kime uygun olmadığı anlatılır.",
  items: [
    {
      name: "Safir FUE",
      href: "/sac-ekimi/safir-fue",
      body: "Grefler donör alandan tek tek alınır, safir uçlu kalemlerle açılan kanallara yerleştirilir. Geniş alan ekimlerinde tercih edilir.",
      specs: [
        { label: "Operasyon süresi", value: "6–8 saat" },
        { label: "Normal hayata dönüş", value: "3 gün" },
        { label: "Sonuç", value: "12. ayda tamamlanır" },
      ],
    },
    {
      name: "DHI",
      href: "/sac-ekimi/dhi",
      body: "Kanal açma ve yerleştirme tek adımda, implanter kalemle yapılır. Mevcut saçların arasına sıklaştırma gerektiğinde öne çıkar.",
      specs: [
        { label: "Operasyon süresi", value: "6–8 saat" },
        { label: "Normal hayata dönüş", value: "3 gün" },
        { label: "Sonuç", value: "12. ayda tamamlanır" },
      ],
    },
    {
      name: "Destekleyici tedaviler",
      href: "/sac-tedavileri",
      body: "PRP, mezoterapi, kök hücre ve büyüme faktörü uygulamaları; ekim sonrası iyileşme sürecinde ya da dökülmenin erken evrelerinde ayrı bir tedavi planı olarak değerlendirilir.",
      specs: [
        { label: "Seans süresi", value: "[00 dakika]" },
        { label: "Normal hayata dönüş", value: "Aynı gün" },
        { label: "Yer", value: "Anlaşmalı merkez" },
      ],
    },
  ],
};

export const process = {
  eyebrow: "Süreç",
  title: "İlk görüşmeden post-op takibe",
  steps: [
    {
      title: "İlk görüşme",
      body: "Fotoğraf ve görüşme üzerinden dökülme tipiniz değerlendirilir, uygunluk ön görüşü verilir. Ücretsizdir.",
    },
    {
      title: "Planlama",
      body: "Donör kapasiteniz ölçülür; size uygun teknik ve anlaşmalı merkez birlikte belirlenir.",
    },
    {
      title: "Operasyon yönlendirmesi",
      body: "Operasyon anlaşmalı merkezde, sertifikalı saç ekim uzmanları tarafından yapılır. Ortalama 6–8 saat sürer; 3 gün sonra normal hayatınıza dönersiniz.",
    },
    {
      title: "Post-op takip",
      body: "Süreç boyunca yanınızdayız. İlk saçlar 3. ayda çıkar, sonuç 12. ayda tamamlanır.",
    },
  ],
};

/** Ana farklılaşma noktası — öne çıkarılır */
export const referans = {
  eyebrow: "Neden Vionte Health",
  title: "Danışanlarımızın yarısından çoğu bize referansla geliyor",
  body: "Reklamla değil, daha önce yönlendirdiğimiz kişilerin tavsiyesiyle. Bu, bizim için tek anlamlı ölçü: süreci yaşayan biri, aynı yolu bir yakınına önerecek kadar memnun kaldı mı?",
  note: "Vionte Health uygulama yapmaz. Bağımsız bir danışman olarak sizi doğru merkeze ve doğru tekniğe yönlendirir, süreç boyunca yanınızda kalır.",
};

export const team = {
  eyebrow: "Ekip",
  title: "Sertifikalı saç ekim uzmanları",
  body: "Vionte Health'nin kendi kliniği yoktur; operasyonlar anlaşmalı merkezlerde yapılır. Yönlendirme ve süreç takibi, 12 yıllık deneyime sahip sertifikalı saç ekim uzmanlarından oluşan ekip tarafından yürütülür.",
  quote:
    "Greft sayısı tek başına bir başarı ölçüsü değil. Belirleyici olan, o greftlerin hangi açıyla ve hangi yoğunlukta yerleştirildiği.",
  roles: [
    { label: "Sorumlu teknisyen", value: "Mehtap Dizge — sertifikalı saç ekim uzmanı" },
    { label: "Ekip", value: "12 yıllık deneyime sahip sertifikalı saç ekim uzmanları" },
    { label: "Sertifikasyon", value: "Sağlık Bakanlığı saç ekim sertifikası; ekipteki herkeste Bakanlık tescilli yardımcı uygulayıcı sertifikası" },
  ],
};

export const reviews = {
  eyebrow: "Danışan yorumları",
  title: "Anlatanlar danışanlar",
  google: {
    rating: "[0,0]",
    count: "[000]",
    href: "[Google Business Profile bağlantısı]",
  },
  items: [
    { id: "yorum-1", name: "[Ad S.]", meta: "[Safir FUE · 00. ay]", quote: "[Danışan yorumu — Google Business Profile entegrasyonu ile gelecek]" },
    { id: "yorum-2", name: "[Ad S.]", meta: "[DHI · 00. ay]", quote: "[Danışan yorumu — Google Business Profile entegrasyonu ile gelecek]" },
    { id: "yorum-3", name: "[Ad S.]", meta: "[Safir FUE · 00. ay]", quote: "[Danışan yorumu — Google Business Profile entegrasyonu ile gelecek]" },
  ],
};
