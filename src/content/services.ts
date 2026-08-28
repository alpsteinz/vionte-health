import type { FaqItem } from "./faq";

/**
 * Hizmet sayfaları — AGENTS.md'deki 8 adımlı şablon.
 *
 * KURAL: metin uydurulmaz. Aşağıdaki alanlar ya CONTENT.md'de onaylanmış
 * metindir ya da [köşeli parantez] içinde yer tutucudur. Yer tutucular
 * klinik sahibi ve tıbbi inceleyen tarafından doldurulur.
 */

export type ComparisonRow = { label: string; a: string; b: string };

export type Service = {
  slug: string;
  /**
   * Sayfa, tıbbi inceleyenin onayından geçmemiş taslak anlatım içeriyorsa true.
   * Sayfanın üstünde görünür "Taslak içerik" uyarısı gösterilir.
   *
   * Yeni yazılan her tıbbi anlatım, onaydan geçene kadar bu bayrakla eklenir
   * (AGENTS.md — "AI taslak için kullanılır, yayın için değil").
   */
  draftMedicalCopy?: boolean;
  /** Menü/breadcrumb adı */
  name: string;
  /** H1 — arama sorusu biçiminde */
  h1: string;
  /** İlk paragraf: doğrudan cevap (2-3 cümle) */
  lead: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  parent?: { name: string; href: string };
  /** Hızlı bilgi kartı */
  facts: { label: string; value: string }[];
  suitableFor: string[];
  notSuitableFor: string[];
  steps: { title: string; body: string }[];
  timeline: { when: string; what: string }[];
  comparison?: {
    title: string;
    columns: [string, string];
    rows: ComparisonRow[];
    note?: string;
  };
  faq: FaqItem[];
};

/** Onaylanmış metin bekleyen alanlar için ortak yer tutucular */
const TODO = {
  steps: [
    { title: "[Adım 1 başlığı]", body: "[Adım açıklaması — tıbbi inceleyen onayı sonrası]" },
    { title: "[Adım 2 başlığı]", body: "[Adım açıklaması — tıbbi inceleyen onayı sonrası]" },
    { title: "[Adım 3 başlığı]", body: "[Adım açıklaması — tıbbi inceleyen onayı sonrası]" },
    { title: "[Adım 4 başlığı]", body: "[Adım açıklaması — tıbbi inceleyen onayı sonrası]" },
  ],
  timeline: [
    { when: "[0. gün]", what: "[Operasyon günü — klinik uygulamasına göre]" },
    { when: "[1–3. gün]", what: "[İlk yıkama ve pansuman]" },
    { when: "[2–4. hafta]", what: "Şok dökülme başlar; kökler yerinde kalır." },
    { when: "[3. ay]", what: "Yeni çıkış başlar." },
    { when: "[6. ay]", what: "[Kontrol]" },
    { when: "12–18. ay", what: "Sonuç netleşir." },
  ],
};

/** Onaylanmış SSS metinleri (CONTENT.md) — birden çok sayfada kullanılır */
const faqPain: FaqItem = {
  question: "Saç ekimi acı verir mi?",
  answer:
    "İşlem lokal anestezi altında yapılır, operasyon boyunca ağrı hissedilmez. Anestezi uygulaması sırasında kısa süreli batma hissi olabilir. Operasyon sonrası ilk günlerde hafif hassasiyet görülebilir; hekiminizin önerdiği ağrı kesiciler bu dönemde yeterli olur.",
};

const faqShedding: FaqItem = {
  question: "Ekilen saçlar dökülür mü?",
  answer:
    "Operasyondan 2–4 hafta sonra ekilen saçların büyük bölümü dökülür. Buna şok dökülme denir ve beklenen bir süreçtir; kökler yerinde kalır. Yeni çıkış 3. aydan itibaren başlar, sonuç 12–18 ay içinde netleşir.",
};

const faqGrafts: FaqItem = {
  question: "Kaç greft gerekir?",
  answer:
    "Greft sayısı dökülme seviyeniz, ekim yapılacak alanın genişliği ve donör alanınızın yoğunluğu ölçülerek belirlenir. Bu ölçüm klinik muayenede yapılır; fotoğraf üzerinden verilen sayılar yalnızca yaklaşık bir aralık gösterir.",
};

const faqEveryone: FaqItem = {
  question: "Herkese saç ekimi yapılabilir mi?",
  answer:
    "Hayır. Donör alan yoğunluğu yetersiz olanlar, dökülmesi aktif olarak devam eden ve henüz stabilize olmamış kişiler ile bazı sistemik hastalığı bulunanlar için uygulama uygun olmayabilir. Uygunluk kararı muayene ve tahliller sonrasında hekim tarafından verilir.",
};

const faqPermanent: FaqItem = {
  question: "Saç ekimi kalıcı mıdır?",
  answer:
    "Ekilen kökler dökülmeye dirençli bölgeden alınır, bu nedenle genetik dökülmeden etkilenmez. Ancak mevcut saçlarınızın dökülmesi devam edebilir; planlama bu yüzden uzun vadeli yapılır.",
};

/** Ortak "kimlere uygun değil" maddeleri — CONTENT.md'deki onaylanmış cevaptan türetildi */
const genelUygunOlmayan = [
  "Donör alan yoğunluğu yetersiz olan kişiler",
  "Dökülmesi aktif olarak devam eden ve henüz stabilize olmamış kişiler",
  "Bazı sistemik hastalığı bulunan kişiler",
  "Uygunluk kararı muayene ve tahliller sonrasında hekim tarafından verilir",
];

const sacEkimi = { name: "Saç Ekimi", href: "/sac-ekimi" };
const sacTedavileri = { name: "Saç Tedavileri", href: "/sac-tedavileri" };

const safirDhiComparison = {
  title: "Safir FUE ile DHI arasındaki fark",
  columns: ["Safir FUE", "DHI"] as [string, string],
  rows: [
    {
      label: "Kanal açma",
      a: "Safir uçlu kalemle ayrı adımda açılır",
      b: "Kanal açma ve yerleştirme tek adımda yapılır",
    },
    {
      label: "Yerleştirme",
      a: "Açılan kanallara tek tek yerleştirilir",
      b: "İmplanter kalemle doğrudan yerleştirilir",
    },
    {
      label: "Öne çıktığı durum",
      a: "Geniş alan ekimleri",
      b: "Mevcut saçların arasına sıklaştırma",
    },
    { label: "Operasyon süresi", a: "[0–0 saat]", b: "[0–0 saat]" },
    { label: "Tıraş", a: "[Donör alan / tam tıraş]", b: "[Bölgesel / tıraşsız]" },
    { label: "İşe dönüş", a: "[0–0 gün]", b: "[0–0 gün]" },
  ],
  note: "İki yöntemin birbirine üstünlüğü yoktur; vakaya göre değişir. Bazı vakalarda iki yöntem birlikte kullanılır.",
};

export const services: Service[] = [
  {
    slug: "/sac-ekimi/safir-fue",
    name: "Safir FUE",
    h1: "Safir FUE Saç Ekimi Nedir?",
    lead: "Grefler donör alandan tek tek alınır, safir uçlu kalemlerle açılan kanallara yerleştirilir. Geniş alan ekimlerinde tercih edilir.",
    metaTitle: "Safir FUE Saç Ekimi — Vionte Hair Transplant",
    metaDescription:
      "Safir FUE tekniğinde grefler tek tek alınır, safir uçlu kalemlerle açılan kanallara yerleştirilir. Kimlere uygun, kimlere uygun değil, süreç ve iyileşme takvimi.",
    eyebrow: "Teknik",
    parent: sacEkimi,
    facts: [
      { label: "Operasyon süresi", value: "[0–0 saat]" },
      { label: "Anestezi", value: "Lokal anestezi" },
      { label: "Tıraş", value: "[Donör alan / tam tıraş]" },
      { label: "İşe dönüş", value: "[0–0 gün]" },
    ],
    suitableFor: [
      "Ekim yapılacak alanın geniş olduğu vakalar",
      "Donör alan yoğunluğu yeterli ölçülen kişiler",
      "Dökülmesi stabilize olmuş kişiler",
      "[Klinik uygulamasına göre eklenecek maddeler]",
    ],
    notSuitableFor: genelUygunOlmayan,
    steps: TODO.steps,
    timeline: TODO.timeline,
    comparison: safirDhiComparison,
    faq: [faqPain, faqGrafts, faqShedding, faqEveryone],
  },
  {
    slug: "/sac-ekimi/dhi",
    name: "DHI",
    h1: "DHI Saç Ekimi Nedir?",
    lead: "Kanal açma ve yerleştirme tek adımda, implanter kalemle yapılır. Mevcut saçların arasına sıklaştırma gerektiğinde öne çıkar.",
    metaTitle: "DHI Saç Ekimi — Vionte Hair Transplant",
    metaDescription:
      "DHI tekniğinde kanal açma ve yerleştirme tek adımda, implanter kalemle yapılır. Kimlere uygun, kimlere uygun değil, süreç ve iyileşme takvimi.",
    eyebrow: "Teknik",
    parent: sacEkimi,
    facts: [
      { label: "Operasyon süresi", value: "[0–0 saat]" },
      { label: "Anestezi", value: "Lokal anestezi" },
      { label: "Tıraş", value: "[Bölgesel / tıraşsız]" },
      { label: "İşe dönüş", value: "[0–0 gün]" },
    ],
    suitableFor: [
      "Mevcut saçların arasına sıklaştırma gereken vakalar",
      "Seyrelmenin belirgin olduğu, mevcut saçlara zarar verilmemesi gereken durumlar",
      "[Klinik uygulamasına göre eklenecek maddeler]",
    ],
    notSuitableFor: genelUygunOlmayan,
    steps: TODO.steps,
    timeline: TODO.timeline,
    comparison: safirDhiComparison,
    faq: [faqPain, faqGrafts, faqShedding, faqEveryone],
  },
  {
    slug: "/sac-ekimi/tirassiz-sac-ekimi",
    name: "Tıraşsız Saç Ekimi",
    h1: "Tıraşsız Saç Ekimi Nedir, Kimlere Uygundur?",
    lead: "Tıraşsız ekim, saçların kısaltılmadan uygulandığı ekim biçimidir. Sosyal hayata erken dönüş sağladığı için çok tercih edilir, ancak her hastaya uygulanamaz. En önemli sınırı, tek seansta ekilebilecek greft sayısının kısıtlı olmasıdır.",
    metaTitle: "Tıraşsız Saç Ekimi — Kimlere Uygun? | Vionte Hair Transplant",
    metaDescription:
      "Tıraşsız saç ekimi sosyal hayata erken dönüş sağlar, ancak herkese uygulanamaz. Tek seansta ekilebilecek greft sayısı kısıtlıdır. Uygunluk kriterleri ve süreç.",
    eyebrow: "Teknik",
    parent: sacEkimi,
    facts: [
      { label: "Operasyon süresi", value: "[0–0 saat]" },
      { label: "Anestezi", value: "Lokal anestezi" },
      { label: "Tıraş", value: "Gerekmez" },
      { label: "Tek seans greft sınırı", value: "[0.000 greft]" },
    ],
    suitableFor: [
      "Sosyal hayatına ara veremeyen, tıraş olmak istemeyen kişiler",
      "Ekilecek alanın sınırlı olduğu vakalar",
      "[Klinik uygulamasına göre eklenecek maddeler]",
    ],
    notSuitableFor: [
      "Tek seansta yüksek greft sayısı gereken geniş alan vakaları",
      ...genelUygunOlmayan,
    ],
    steps: TODO.steps,
    timeline: TODO.timeline,
    faq: [
      {
        question: "Tıraşsız saç ekimi herkese uygun mudur?",
        answer:
          "Hayır. Tıraşsız ekim sosyal hayata erken dönüş sağladığı için çok tercih edilir, ancak her hastaya uygulanamaz. En önemli sınırı, tek seansta ekilebilecek greft sayısının kısıtlı olmasıdır.",
      },
      faqGrafts,
      faqPain,
      faqShedding,
    ],
  },
  {
    slug: "/sac-ekimi/kadin-sac-ekimi",
    name: "Kadınlarda Saç Ekimi",
    h1: "Kadınlarda Saç Ekimi Nasıl Yapılır?",
    lead: "Kadınlarda saç dökülmesi çoğunlukla saç çizgisinin geri çekilmesiyle değil, tepe bölgesinde yaygın seyrelmeyle ilerler. Bu nedenle planlama, donör alan yoğunluğunun ölçülmesi ve dökülmenin nedeninin belirlenmesiyle başlar; her seyrelme ekim gerektirmez.",
    metaTitle: "Kadınlarda Saç Ekimi — Vionte Hair Transplant",
    metaDescription:
      "Kadınlarda saç dökülmesi tepe bölgesinde yaygın seyrelmeyle ilerler. Uygunluk, planlama ve tedavi seçenekleri; her seyrelme ekim gerektirmez.",
    eyebrow: "Teknik",
    parent: sacEkimi,
    facts: [
      { label: "Operasyon süresi", value: "[0–0 saat]" },
      { label: "Anestezi", value: "Lokal anestezi" },
      { label: "Tıraş", value: "[Bölgesel / tıraşsız]" },
      { label: "Ön değerlendirme", value: "Kan tahlili ve dökülme nedeni araştırması" },
    ],
    suitableFor: [
      "Dökülmenin nedeni araştırılmış ve stabilize olduğu belirlenmiş kişiler",
      "Donör alan yoğunluğu yeterli ölçülen kişiler",
      "[Klinik uygulamasına göre eklenecek maddeler]",
    ],
    notSuitableFor: [
      "Dökülmenin altında yatan neden henüz araştırılmamış kişiler",
      ...genelUygunOlmayan,
    ],
    steps: TODO.steps,
    timeline: TODO.timeline,
    faq: [faqEveryone, faqGrafts, faqShedding, faqPermanent],
  },
  {
    slug: "/sac-ekimi/ignesiz-anestezi",
    name: "İğnesiz Anestezi",
    h1: "İğnesiz Anestezi Nedir?",
    lead: "Anestezi, iğne yerine basınçlı jet enjektör ile uygulanır. Bu yöntem anestezi aşamasındaki iğne batma hissini ortadan kaldırır.",
    metaTitle: "İğnesiz Anestezi — Vionte Hair Transplant",
    metaDescription:
      "Saç ekiminde anestezi, iğne yerine basınçlı jet enjektör ile uygulanabilir. Yöntemin ne olduğu, kimlere uygulandığı ve sınırları.",
    eyebrow: "Uygulama",
    parent: sacEkimi,
    facts: [
      { label: "Uygulama", value: "Basınçlı jet enjektör" },
      { label: "Kapsam", value: "Yalnızca anestezi aşaması" },
      { label: "Karar", value: "Hekim değerlendirmesiyle" },
    ],
    suitableFor: [
      "Anestezi aşamasındaki iğne batma hissinden çekinen kişiler",
      "[Klinik uygulamasına göre eklenecek maddeler]",
    ],
    notSuitableFor: [
      "Uygulama kararı hekim değerlendirmesiyle verilir; her vakada tercih edilmeyebilir",
      "[Klinik uygulamasına göre eklenecek maddeler]",
    ],
    steps: TODO.steps,
    timeline: TODO.timeline,
    faq: [faqPain],
  },
  {
    slug: "/sakal-ekimi",
    name: "Sakal Ekimi",
    h1: "Sakal ve Bıyık Ekimi Nasıl Yapılır?",
    lead: "Sakal ve bıyık bölgesindeki seyreklik veya boşluklar için, saçlı deriden alınan grefler yüz bölgesine yerleştirilir. Planlamada yön ve açı, saç ekimine göre daha belirleyicidir; kıl çıkış açısı yüzde daha yatıktır.",
    metaTitle: "Sakal Ekimi — Vionte Hair Transplant",
    metaDescription:
      "Sakal ve bıyık ekiminde grefler saçlı deriden alınır, yüz bölgesine yerleştirilir. Uygunluk, süreç ve iyileşme takvimi.",
    eyebrow: "Uygulama",
    facts: [
      { label: "Operasyon süresi", value: "[0–0 saat]" },
      { label: "Anestezi", value: "Lokal anestezi" },
      { label: "Greft aralığı", value: "[0.000–0.000 greft]" },
      { label: "İşe dönüş", value: "[0–0 gün]" },
    ],
    suitableFor: [
      "Sakal veya bıyık bölgesinde seyreklik ya da boşluk bulunan kişiler",
      "Saçlı deride donör kapasitesi yeterli ölçülen kişiler",
      "[Klinik uygulamasına göre eklenecek maddeler]",
    ],
    notSuitableFor: genelUygunOlmayan,
    steps: TODO.steps,
    timeline: TODO.timeline,
    faq: [faqPain, faqShedding, faqEveryone],
  },
  {
    slug: "/kas-ekimi",
    name: "Kaş Ekimi",
    h1: "Kaş Ekimi Nasıl Yapılır?",
    lead: "Kaş bölgesindeki seyreklik için ense bölgesinden alınan grefler tek tek yerleştirilir. Kaşta kıl çıkış açısı çok yatık olduğundan planlama, greft sayısından çok yön ve açı üzerine kurulur.",
    metaTitle: "Kaş Ekimi — Vionte Hair Transplant",
    metaDescription:
      "Kaş ekiminde grefler ense bölgesinden alınır ve tek tek yerleştirilir. Planlama yön ve açı üzerine kurulur. Uygunluk, süreç ve iyileşme takvimi.",
    eyebrow: "Uygulama",
    facts: [
      { label: "Operasyon süresi", value: "[0–0 saat]" },
      { label: "Anestezi", value: "Lokal anestezi" },
      { label: "Greft aralığı", value: "[000–000 greft]" },
      { label: "İşe dönüş", value: "[0–0 gün]" },
    ],
    suitableFor: [
      "Kaş bölgesinde seyreklik veya boşluk bulunan kişiler",
      "[Klinik uygulamasına göre eklenecek maddeler]",
    ],
    notSuitableFor: genelUygunOlmayan,
    steps: TODO.steps,
    timeline: TODO.timeline,
    faq: [faqPain, faqShedding, faqEveryone],
  },
  {
    slug: "/sac-tedavileri/prp",
    name: "PRP",
    h1: "PRP Saç Tedavisi Nedir?",
    lead: "PRP, kişinin kendi kanından ayrıştırılan trombositten zengin plazmanın saçlı deriye uygulanmasıdır. Ekim sonrası iyileşme sürecinde ya da dökülmenin erken evrelerinde ayrı bir tedavi planı olarak değerlendirilir.",
    metaTitle: "PRP Saç Tedavisi — Vionte Hair Transplant",
    metaDescription:
      "PRP, kişinin kendi kanından ayrıştırılan plazmanın saçlı deriye uygulanmasıdır. Kimlere uygulanır, kaç seans gerekir, sınırları nelerdir.",
    eyebrow: "Tedavi",
    parent: sacTedavileri,
    facts: [
      { label: "Seans süresi", value: "[00 dakika]" },
      { label: "Seans sayısı", value: "[0 seans]" },
      { label: "Tıraş", value: "Gerekmez" },
      { label: "İşe dönüş", value: "Aynı gün" },
    ],
    suitableFor: [
      "Dökülmenin erken evresindeki kişiler",
      "Ekim sonrası iyileşme sürecini desteklemek isteyenler",
      "[Klinik uygulamasına göre eklenecek maddeler]",
    ],
    notSuitableFor: [
      "PRP bir saç ekimi alternatifi değildir; ileri dökülmede tek başına yeterli olmaz",
      "[Klinik uygulamasına göre eklenecek maddeler]",
    ],
    steps: TODO.steps,
    timeline: TODO.timeline,
    faq: [
      {
        question: "PRP saç ekiminin yerine geçer mi?",
        answer:
          "Hayır. PRP ve mezoterapi, ekim sonrası iyileşme sürecinde ya da dökülmenin erken evrelerinde ayrı bir tedavi planı olarak değerlendirilir; ileri dökülmede saç ekiminin yerini almaz.",
      },
    ],
  },
  {
    slug: "/sac-tedavileri/mezoterapi",
    name: "Mezoterapi",
    h1: "Saç Mezoterapisi Nedir?",
    lead: "Mezoterapide, saçlı deriye vitamin ve mineral içerikli karışımlar mikro enjeksiyonlarla uygulanır. PRP gibi, ekim sonrası iyileşme sürecinde ya da dökülmenin erken evrelerinde ayrı bir tedavi planı olarak değerlendirilir.",
    metaTitle: "Saç Mezoterapisi — Vionte Hair Transplant",
    metaDescription:
      "Saç mezoterapisinde saçlı deriye mikro enjeksiyonlarla karışımlar uygulanır. Kimlere uygulanır, kaç seans gerekir, sınırları nelerdir.",
    eyebrow: "Tedavi",
    parent: sacTedavileri,
    facts: [
      { label: "Seans süresi", value: "[00 dakika]" },
      { label: "Seans sayısı", value: "[0 seans]" },
      { label: "Tıraş", value: "Gerekmez" },
      { label: "İşe dönüş", value: "Aynı gün" },
    ],
    suitableFor: [
      "Dökülmenin erken evresindeki kişiler",
      "[Klinik uygulamasına göre eklenecek maddeler]",
    ],
    notSuitableFor: [
      "Mezoterapi bir saç ekimi alternatifi değildir; ileri dökülmede tek başına yeterli olmaz",
      "[Klinik uygulamasına göre eklenecek maddeler]",
    ],
    steps: TODO.steps,
    timeline: TODO.timeline,
    faq: [],
  },
  {
    slug: "/sac-tedavileri/eksozom",
    name: "Eksozom",
    h1: "Eksozom Uygulaması Nedir?",
    lead: "[Eksozom uygulamasının tanımı — tıbbi inceleyen onayı sonrası yazılacak.]",
    metaTitle: "Eksozom Uygulaması — Vionte Hair Transplant",
    metaDescription:
      "Eksozom uygulaması hakkında bilgi. Uygunluk, süreç ve klinik değerlendirme.",
    eyebrow: "Tedavi",
    parent: sacTedavileri,
    facts: [
      { label: "Seans süresi", value: "[00 dakika]" },
      { label: "Seans sayısı", value: "[0 seans]" },
      { label: "İzin/belge", value: "[Uygulama için mevcut izin belgesi]" },
    ],
    suitableFor: ["[Tıbbi inceleyen onayı sonrası doldurulacak]"],
    notSuitableFor: ["[Tıbbi inceleyen onayı sonrası doldurulacak]"],
    steps: TODO.steps,
    timeline: TODO.timeline,
    faq: [],
  },
  {
    slug: "/sac-tedavileri/kok-hucre",
    name: "Kök Hücre",
    h1: "Kök Hücre Uygulaması Nedir?",
    lead: "[Kök hücre uygulamasının tanımı — tıbbi inceleyen onayı sonrası yazılacak.]",
    metaTitle: "Kök Hücre Uygulaması — Vionte Hair Transplant",
    metaDescription:
      "Kök hücre uygulaması hakkında bilgi. Uygunluk, süreç ve klinik değerlendirme.",
    eyebrow: "Tedavi",
    parent: sacTedavileri,
    facts: [
      { label: "Seans süresi", value: "[00 dakika]" },
      { label: "Seans sayısı", value: "[0 seans]" },
      { label: "İzin/belge", value: "[Uygulama için mevcut izin belgesi]" },
    ],
    suitableFor: ["[Tıbbi inceleyen onayı sonrası doldurulacak]"],
    notSuitableFor: ["[Tıbbi inceleyen onayı sonrası doldurulacak]"],
    steps: TODO.steps,
    timeline: TODO.timeline,
    faq: [],
  },
  {
    slug: "/sac-tedavileri/sac-analizi",
    name: "Saç Analizi",
    h1: "Saç Analizi Nasıl Yapılır?",
    lead: "Saç analizinde donör alan yoğunluğunuz, dökülme tipiniz ve saç telinizin kalınlığı ölçülür. Greft planı bu ölçümler üzerine kurulur; ölçüm yapılmadan verilen greft sayıları yalnızca yaklaşık bir aralık gösterir.",
    metaTitle: "Saç Analizi — Vionte Hair Transplant",
    metaDescription:
      "Saç analizinde donör alan yoğunluğu, dökülme tipi ve saç teli kalınlığı ölçülür. Greft planı bu ölçümler üzerine kurulur.",
    eyebrow: "Tedavi",
    parent: sacTedavileri,
    facts: [
      { label: "Süre", value: "[00 dakika]" },
      { label: "Ölçülenler", value: "Donör yoğunluğu, dökülme tipi, tel kalınlığı" },
      { label: "Sonrasında", value: "Greft planı ve uygunluk görüşü" },
    ],
    suitableFor: [
      "Saç ekimi düşünen herkes",
      "Dökülmesinin nedenini ve seviyesini öğrenmek isteyenler",
    ],
    notSuitableFor: [
      "Analiz bir tanı işlemi değildir; tanı hekim muayenesiyle konur",
    ],
    steps: TODO.steps,
    timeline: TODO.timeline,
    faq: [faqGrafts, faqEveryone],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
