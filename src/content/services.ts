import type { FaqItem } from "./faq";

/**
 * Hizmet sayfaları.
 *
 * KONUMLANDIRMA: Vionte uygulama yapmaz. Sayfalar "biz nasıl yapıyoruz"
 * anlatmaz; tekniğin ne olduğunu, kime uygun olduğunu ve kime uygun
 * olmadığını anlatır. "Uygulama nasıl yapılır" adımları bilinçli olarak
 * yoktur — uygulamayı anlaşmalı merkezdeki sertifikalı ekip yapar.
 */

export type ComparisonRow = { label: string; a: string; b: string };

export type Service = {
  slug: string;
  name: string;
  h1: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  parent?: { name: string; href: string };
  facts: { label: string; value: string }[];
  suitableFor: string[];
  notSuitableFor: string[];
  /** Danışanın ne zaman ne bekleyeceği — uygulama adımları değil */
  timeline: { when: string; what: string }[];
  comparison?: {
    title: string;
    columns: [string, string];
    rows: ComparisonRow[];
    note?: string;
  };
  faq: FaqItem[];
  /** Tıbbi inceleyenin onayından geçmemiş taslak anlatım içeriyor mu */
  draftMedicalCopy?: boolean;
};

/** Sabit süreç verileri — tüm sayfalarda aynı */
const ORTAK_TAKVIM = [
  { when: "Operasyon günü", what: "Anlaşmalı merkezde, sertifikalı saç ekim uzmanları tarafından yapılır. Ortalama 6–8 saat sürer." },
  { when: "3. gün", what: "Normal hayatınıza dönersiniz." },
  { when: "2–4. hafta", what: "Şok dökülme başlar; kökler yerinde kalır." },
  { when: "3. ay", what: "İlk saçlar çıkmaya başlar." },
  { when: "12. ay", what: "Sonuç tamamlanır." },
];

const ORTAK_FACTS = [
  { label: "Operasyon süresi", value: "6–8 saat" },
  { label: "Anestezi", value: "Lokal anestezi" },
  { label: "Normal hayata dönüş", value: "3 gün" },
  { label: "Uygulayan", value: "Anlaşmalı merkez, sertifikalı ekip" },
];

const faqPain: FaqItem = {
  question: "Saç ekimi acı verir mi?",
  answer:
    "İşlem lokal anestezi altında yapılır, operasyon boyunca ağrı hissedilmez. Anestezi uygulaması sırasında kısa süreli batma hissi olabilir; iğnesiz anestezi bu aşamadaki batma hissini ortadan kaldırır. Operasyon sonrası ilk günlerde hafif hassasiyet görülebilir.",
};

const faqShedding: FaqItem = {
  question: "Ekilen saçlar dökülür mü?",
  answer:
    "Operasyondan 2–4 hafta sonra ekilen saçların büyük bölümü dökülür. Buna şok dökülme denir ve beklenen bir süreçtir; kökler yerinde kalır. İlk saçlar 3. ayda çıkar, sonuç 12. ayda tamamlanır.",
};

const faqGrafts: FaqItem = {
  question: "Kaç greft gerekir?",
  answer:
    "Greft sayısı dökülme seviyeniz, ekim yapılacak alanın genişliği ve donör alanınızın yoğunluğu ölçülerek belirlenir. Fotoğraf üzerinden verilen sayılar yalnızca yaklaşık bir aralık gösterir.",
};

const faqEveryone: FaqItem = {
  question: "Herkese saç ekimi yapılabilir mi?",
  answer:
    "Hayır. Donör alan yoğunluğu yetersiz olanlar, dökülmesi aktif olarak devam eden ve henüz stabilize olmamış kişiler ile bazı sistemik hastalığı bulunanlar için uygulama uygun olmayabilir. Uygunluk kararı, yönlendirildiğiniz merkezde muayene ve tahliller sonrasında verilir.",
};

const faqPermanent: FaqItem = {
  question: "Saç ekimi kalıcı mıdır?",
  answer:
    "Ekilen kökler dökülmeye dirençli bölgeden alınır, bu nedenle genetik dökülmeden etkilenmez. Ancak mevcut saçlarınızın dökülmesi devam edebilir; planlama bu yüzden uzun vadeli yapılır.",
};

const faqGaranti: FaqItem = {
  question: "Yazılı garanti belgesi veriliyor mu?",
  answer:
    "Hayır. Saç ekimi sonucu kişinin donör kapasitesine ve iyileşme sürecine bağlıdır; garanti edilemez. Yazılı garanti vaadi gördüğünüz yerlerde bu vaadin neyi kapsadığını mutlaka sorun.",
};

const genelUygunOlmayan = [
  "Donör alan yoğunluğu yetersiz olan kişiler",
  "Dökülmesi aktif olarak devam eden ve henüz stabilize olmamış kişiler",
  "Bazı sistemik hastalığı bulunan kişiler",
  "Uygunluk kararı, yönlendirildiğiniz merkezde muayene ve tahliller sonrasında verilir",
];

const sacEkimi = { name: "Saç Ekimi", href: "/sac-ekimi" };
const sacTedavileri = { name: "Saç Tedavileri", href: "/sac-tedavileri" };

const safirDhiComparison = {
  title: "Safir FUE ile DHI arasındaki fark",
  columns: ["Safir FUE", "DHI"] as [string, string],
  rows: [
    { label: "Kanal açma", a: "Safir uçlu kalemle ayrı adımda açılır", b: "Kanal açma ve yerleştirme tek adımda yapılır" },
    { label: "Öne çıktığı durum", a: "Geniş alan ekimleri", b: "Mevcut saçların arasına sıklaştırma" },
    { label: "Operasyon süresi", a: "6–8 saat", b: "6–8 saat" },
    { label: "Normal hayata dönüş", a: "3 gün", b: "3 gün" },
  ],
  note: "İki yöntemin birbirine üstünlüğü yoktur; vakaya göre değişir. Bazı vakalarda iki yöntem birlikte kullanılır. Hangisinin uygun olduğunu ölçüm belirler.",
};

export const services: Service[] = [
  {
    slug: "/sac-ekimi/safir-fue",
    name: "Safir FUE",
    h1: "Safir FUE Saç Ekimi Nedir?",
    lead: "Safir FUE'de grefler donör alandan tek tek alınır, safir uçlu kalemlerle açılan kanallara yerleştirilir. Geniş alan ekimlerinde tercih edilir. Uygulama anlaşmalı merkezde, sertifikalı saç ekim uzmanları tarafından yapılır.",
    metaTitle: "Safir FUE Saç Ekimi Nedir? Kimlere Uygun?",
    metaDescription:
      "Safir FUE tekniğinde grefler tek tek alınır, safir uçlu kalemlerle açılan kanallara yerleştirilir. Kimlere uygun, kimlere uygun değil ve süreç takvimi.",
    eyebrow: "Teknik",
    parent: sacEkimi,
    facts: ORTAK_FACTS,
    suitableFor: [
      "Ekim yapılacak alanın geniş olduğu vakalar",
      "Donör alan yoğunluğu yeterli ölçülen kişiler",
      "Dökülmesi stabilize olmuş kişiler",
    ],
    notSuitableFor: genelUygunOlmayan,
    timeline: ORTAK_TAKVIM,
    comparison: safirDhiComparison,
    faq: [faqPain, faqGrafts, faqShedding, faqEveryone],
  },
  {
    slug: "/sac-ekimi/dhi",
    name: "DHI",
    h1: "DHI Saç Ekimi Nedir?",
    lead: "DHI'da kanal açma ve yerleştirme tek adımda, implanter kalemle yapılır. Mevcut saçların arasına sıklaştırma gerektiğinde öne çıkar. Uygulama anlaşmalı merkezde, sertifikalı saç ekim uzmanları tarafından yapılır.",
    metaTitle: "DHI Saç Ekimi Nedir? Kimlere Uygun?",
    metaDescription:
      "DHI tekniğinde kanal açma ve yerleştirme tek adımda, implanter kalemle yapılır. Kimlere uygun, kimlere uygun değil ve süreç takvimi.",
    eyebrow: "Teknik",
    parent: sacEkimi,
    facts: ORTAK_FACTS,
    suitableFor: [
      "Mevcut saçların arasına sıklaştırma gereken vakalar",
      "Seyrelmenin belirgin olduğu, mevcut saçlara zarar verilmemesi gereken durumlar",
    ],
    notSuitableFor: genelUygunOlmayan,
    timeline: ORTAK_TAKVIM,
    comparison: safirDhiComparison,
    faq: [faqPain, faqGrafts, faqShedding, faqEveryone],
  },
  {
    slug: "/sac-ekimi/tirassiz-sac-ekimi",
    name: "Tıraşsız Saç Ekimi",
    h1: "Tıraşsız Saç Ekimi Nedir, Kimlere Uygundur?",
    lead: "Tıraşsız ekim, saçların kısaltılmadan uygulandığı ekim biçimidir. Sosyal hayata erken dönüş sağladığı için çok tercih edilir, ancak her hastaya uygulanamaz. En önemli sınırı, tek seansta ekilebilecek greft sayısının kısıtlı olmasıdır.",
    metaTitle: "Tıraşsız Saç Ekimi Kimlere Uygun?",
    metaDescription:
      "Tıraşsız saç ekimi sosyal hayata erken dönüş sağlar, ancak herkese uygulanamaz. Tek seansta ekilebilecek greft sayısı kısıtlıdır.",
    eyebrow: "Teknik",
    parent: sacEkimi,
    facts: [
      { label: "Operasyon süresi", value: "6–8 saat" },
      { label: "Anestezi", value: "Lokal anestezi" },
      { label: "Tıraş", value: "Gerekmez" },
      { label: "Tek seans greft sınırı", value: "[0.000 greft]" },
    ],
    suitableFor: [
      "Sosyal hayatına ara veremeyen, tıraş olmak istemeyen kişiler",
      "Ekilecek alanın sınırlı olduğu vakalar",
    ],
    notSuitableFor: ["Tek seansta yüksek greft sayısı gereken geniş alan vakaları", ...genelUygunOlmayan],
    timeline: ORTAK_TAKVIM,
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
    h1: "Kadınlarda Saç Ekimi Nasıl Planlanır?",
    lead: "Kadınlarda saç dökülmesi çoğunlukla saç çizgisinin geri çekilmesiyle değil, tepe bölgesinde yaygın seyrelmeyle ilerler. Bu nedenle planlama, donör alan yoğunluğunun ölçülmesi ve dökülmenin nedeninin belirlenmesiyle başlar; her seyrelme ekim gerektirmez.",
    metaTitle: "Kadınlarda Saç Ekimi — Uygunluk ve Planlama",
    metaDescription:
      "Kadınlarda saç dökülmesi tepe bölgesinde yaygın seyrelmeyle ilerler. Uygunluk, planlama ve tedavi seçenekleri; her seyrelme ekim gerektirmez.",
    eyebrow: "Teknik",
    parent: sacEkimi,
    facts: [
      { label: "Operasyon süresi", value: "6–8 saat" },
      { label: "Anestezi", value: "Lokal anestezi" },
      { label: "Ön değerlendirme", value: "Dökülme nedeninin araştırılması" },
      { label: "Uygulayan", value: "Anlaşmalı merkez, sertifikalı ekip" },
    ],
    suitableFor: [
      "Dökülmenin nedeni araştırılmış ve stabilize olduğu belirlenmiş kişiler",
      "Donör alan yoğunluğu yeterli ölçülen kişiler",
    ],
    notSuitableFor: ["Dökülmenin altında yatan neden henüz araştırılmamış kişiler", ...genelUygunOlmayan],
    timeline: ORTAK_TAKVIM,
    faq: [faqEveryone, faqGrafts, faqShedding, faqPermanent],
  },
  {
    slug: "/sac-ekimi/vucut-kilindan-sac-ekimi",
    name: "Vücut Kılından Saç Ekimi",
    h1: "Vücut Kılından Saç Ekimi Nedir?",
    lead: "Saçlı derideki donör kapasitesi yetersiz kaldığında, göğüs veya sakal bölgesindeki kıl kökleri donör olarak değerlendirilebilir. Tek başına değil, saçlı deri donörünü desteklemek için kullanılır. Uygunluk yalnızca ölçümle belirlenir.",
    metaTitle: "Vücut Kılından Saç Ekimi Nedir? Kimlere Uygun?",
    metaDescription:
      "Saçlı deri donörü yetersiz kaldığında vücut kılı donör olarak değerlendirilebilir. Kimlere uygun, sınırları neler ve nasıl planlanır.",
    eyebrow: "Teknik",
    parent: sacEkimi,
    facts: [
      { label: "Operasyon süresi", value: "6–8 saat" },
      { label: "Anestezi", value: "Lokal anestezi" },
      { label: "Donör bölge", value: "[Göğüs / sakal — vakaya göre]" },
      { label: "Uygulayan", value: "Anlaşmalı merkez, sertifikalı ekip" },
    ],
    suitableFor: [
      "Saçlı deri donör kapasitesi yetersiz ölçülen kişiler",
      "Daha önce ekim yaptırmış, donörü sınırlı kalmış kişiler",
    ],
    notSuitableFor: [
      "Saçlı deri donörü yeterli olan kişiler — öncelik saçlı deridedir",
      "Vücut kılı yapısı ve çıkış döngüsü saç telinden farklıdır; her vakada beklenen sonucu vermez",
      ...genelUygunOlmayan,
    ],
    timeline: ORTAK_TAKVIM,
    faq: [faqGrafts, faqEveryone, faqShedding],
    draftMedicalCopy: true,
  },
  {
    slug: "/sac-ekimi/ignesiz-anestezi",
    name: "İğnesiz Anestezi",
    /*
     * NOT: Sayfa adı klinik sahibinin talebiyle "İğnesiz Anestezi ve Ağrısız
     * Saç Ekimi" olarak belirlendi. AGENTS.md'deki yasak listesinde
     * "tamamen ağrısız" ifadesi yer alıyor ve CONTENT.md daha önce sayfa
     * adının "Ağrısız Saç Ekimi" OLMAMASINI kural olarak yazmıştı.
     * Bu bilinçli bir sapmadır; gövde metninde ağrısızlık taahhüdü
     * verilmiyor, yalnızca anestezi aşamasındaki batma hissinin ortadan
     * kalktığı anlatılıyor. Mevzuat açısından yeniden değerlendirilmeli.
     */
    h1: "İğnesiz Anestezi ve Ağrısız Saç Ekimi",
    lead: "Anestezi, iğne yerine Dermojet basınçlı jet sistemiyle uygulanır. Bu yöntem anestezi aşamasındaki iğne batma hissini ortadan kaldırır. Operasyon zaten lokal anestezi altında yapıldığı için işlem boyunca ağrı hissedilmez.",
    metaTitle: "İğnesiz Anestezi ve Ağrısız Saç Ekimi",
    metaDescription:
      "Saç ekiminde anestezi, iğne yerine Dermojet basınçlı jet sistemiyle uygulanabilir. Yöntemin ne olduğu, kimlere uygulandığı ve sınırları.",
    eyebrow: "Uygulama",
    parent: sacEkimi,
    facts: [
      { label: "Sistem", value: "Dermojet basınçlı jet" },
      { label: "Kapsam", value: "Yalnızca anestezi aşaması" },
      { label: "Karar", value: "Anlaşmalı merkezdeki ekip değerlendirir" },
    ],
    suitableFor: ["Anestezi aşamasındaki iğne batma hissinden çekinen kişiler"],
    notSuitableFor: [
      "Uygulama kararı anlaşmalı merkezdeki ekibin değerlendirmesiyle verilir; her vakada tercih edilmeyebilir",
    ],
    timeline: ORTAK_TAKVIM,
    faq: [faqPain],
  },
  {
    slug: "/sakal-ekimi",
    name: "Sakal ve Bıyık Ekimi",
    h1: "Sakal ve Bıyık Ekimi Nedir?",
    lead: "Sakal ve bıyık bölgesindeki seyreklik veya boşluklar için, saçlı deriden alınan grefler yüz bölgesine yerleştirilir. Planlamada yön ve açı, saç ekimine göre daha belirleyicidir; kıl çıkış açısı yüzde daha yatıktır.",
    metaTitle: "Sakal ve Bıyık Ekimi Nedir? Kimlere Uygun?",
    metaDescription:
      "Sakal ve bıyık ekiminde grefler saçlı deriden alınır, yüz bölgesine yerleştirilir. Uygunluk ve süreç takvimi.",
    eyebrow: "Uygulama",
    facts: ORTAK_FACTS,
    suitableFor: [
      "Sakal veya bıyık bölgesinde seyreklik ya da boşluk bulunan kişiler",
      "Saçlı deride donör kapasitesi yeterli ölçülen kişiler",
    ],
    notSuitableFor: genelUygunOlmayan,
    timeline: ORTAK_TAKVIM,
    faq: [faqPain, faqShedding, faqEveryone],
  },
  {
    slug: "/kas-ekimi",
    name: "Kaş Ekimi",
    h1: "Kaş Ekimi Nedir?",
    lead: "Kaş bölgesindeki seyreklik için ense bölgesinden alınan grefler tek tek yerleştirilir. Kaşta kıl çıkış açısı çok yatık olduğundan planlama, greft sayısından çok yön ve açı üzerine kurulur.",
    metaTitle: "Kaş Ekimi Nedir? Kimlere Uygun?",
    metaDescription:
      "Kaş ekiminde grefler ense bölgesinden alınır ve tek tek yerleştirilir. Planlama yön ve açı üzerine kurulur.",
    eyebrow: "Uygulama",
    facts: ORTAK_FACTS,
    suitableFor: ["Kaş bölgesinde seyreklik veya boşluk bulunan kişiler"],
    notSuitableFor: genelUygunOlmayan,
    timeline: ORTAK_TAKVIM,
    faq: [faqPain, faqShedding, faqEveryone],
  },
  {
    slug: "/sac-tedavileri/prp",
    name: "PRP",
    h1: "PRP Saç Tedavisi Nedir?",
    lead: "PRP, kişinin kendi kanından ayrıştırılan trombositten zengin plazmanın saçlı deriye uygulanmasıdır. Ekim sonrası iyileşme sürecinde ya da dökülmenin erken evrelerinde ayrı bir tedavi planı olarak değerlendirilir.",
    metaTitle: "PRP Saç Tedavisi Nedir? Kimlere Uygun?",
    metaDescription:
      "PRP, kişinin kendi kanından ayrıştırılan plazmanın saçlı deriye uygulanmasıdır. Kimlere uygulanır ve sınırları nelerdir.",
    eyebrow: "Tedavi",
    parent: sacTedavileri,
    facts: [
      { label: "Seans süresi", value: "[00 dakika]" },
      { label: "Seans sayısı", value: "[0 seans]" },
      { label: "Normal hayata dönüş", value: "Aynı gün" },
      { label: "Uygulayan", value: "Anlaşmalı merkez" },
    ],
    suitableFor: ["Dökülmenin erken evresindeki kişiler", "Ekim sonrası iyileşme sürecini desteklemek isteyenler"],
    notSuitableFor: ["PRP bir saç ekimi alternatifi değildir; ileri dökülmede tek başına yeterli olmaz"],
    timeline: ORTAK_TAKVIM,
    faq: [
      {
        question: "PRP saç ekiminin yerine geçer mi?",
        answer:
          "Hayır. PRP, ekim sonrası iyileşme sürecinde ya da dökülmenin erken evrelerinde ayrı bir tedavi planı olarak değerlendirilir; ileri dökülmede saç ekiminin yerini almaz.",
      },
    ],
  },
  {
    slug: "/sac-tedavileri/mezoterapi",
    name: "Mezoterapi",
    h1: "Saç Mezoterapisi Nedir?",
    lead: "Mezoterapide, saçlı deriye vitamin ve mineral içerikli karışımlar mikro enjeksiyonlarla uygulanır. PRP gibi, ekim sonrası iyileşme sürecinde ya da dökülmenin erken evrelerinde ayrı bir tedavi planı olarak değerlendirilir.",
    metaTitle: "Saç Mezoterapisi Nedir? Kimlere Uygun?",
    metaDescription:
      "Saç mezoterapisinde saçlı deriye mikro enjeksiyonlarla karışımlar uygulanır. Kimlere uygulanır ve sınırları nelerdir.",
    eyebrow: "Tedavi",
    parent: sacTedavileri,
    facts: [
      { label: "Seans süresi", value: "[00 dakika]" },
      { label: "Seans sayısı", value: "[0 seans]" },
      { label: "Normal hayata dönüş", value: "Aynı gün" },
      { label: "Uygulayan", value: "Anlaşmalı merkez" },
    ],
    suitableFor: ["Dökülmenin erken evresindeki kişiler"],
    notSuitableFor: ["Mezoterapi bir saç ekimi alternatifi değildir; ileri dökülmede tek başına yeterli olmaz"],
    timeline: ORTAK_TAKVIM,
    faq: [],
  },
  {
    slug: "/sac-tedavileri/kok-hucre",
    name: "Kök Hücre",
    h1: "Kök Hücre Uygulaması Nedir?",
    lead: "[Kök hücre uygulamasının tanımı — anlaşmalı merkezin uygulama biçimine göre yazılacak.]",
    metaTitle: "Kök Hücre Saç Uygulaması",
    metaDescription: "Kök hücre uygulaması hakkında bilgi: uygunluk, süreç ve sınırlar.",
    eyebrow: "Tedavi",
    parent: sacTedavileri,
    facts: [
      { label: "Seans süresi", value: "[00 dakika]" },
      { label: "Seans sayısı", value: "[0 seans]" },
      { label: "İzin/belge", value: "[Anlaşmalı merkezin izin belgesi]" },
      { label: "Uygulayan", value: "Anlaşmalı merkez" },
    ],
    suitableFor: ["[Anlaşmalı merkezin uygulama kriterlerine göre doldurulacak]"],
    notSuitableFor: ["[Anlaşmalı merkezin uygulama kriterlerine göre doldurulacak]"],
    timeline: ORTAK_TAKVIM,
    faq: [],
  },
  {
    slug: "/sac-tedavileri/buyume-faktoru",
    name: "Büyüme Faktörü",
    h1: "Büyüme Faktörü Uygulaması Nedir?",
    lead: "[Büyüme faktörü uygulamasının tanımı — anlaşmalı merkezin uygulama biçimine göre yazılacak.]",
    metaTitle: "Büyüme Faktörü Saç Uygulaması",
    metaDescription: "Büyüme faktörü uygulaması hakkında bilgi: uygunluk, süreç ve sınırlar.",
    eyebrow: "Tedavi",
    parent: sacTedavileri,
    facts: [
      { label: "Seans süresi", value: "[00 dakika]" },
      { label: "Seans sayısı", value: "[0 seans]" },
      { label: "İzin/belge", value: "[Anlaşmalı merkezin izin belgesi]" },
      { label: "Uygulayan", value: "Anlaşmalı merkez" },
    ],
    suitableFor: ["[Anlaşmalı merkezin uygulama kriterlerine göre doldurulacak]"],
    notSuitableFor: ["[Anlaşmalı merkezin uygulama kriterlerine göre doldurulacak]"],
    timeline: ORTAK_TAKVIM,
    faq: [],
  },
  {
    slug: "/sac-tedavileri/sac-analizi",
    name: "Saç Analizi",
    h1: "Saç Analizi Nasıl Yapılır?",
    lead: "Saç analizinde donör alan yoğunluğunuz, dökülme tipiniz ve saç telinizin kalınlığı ölçülür. Yönlendirme planı bu ölçümler üzerine kurulur; ölçüm yapılmadan verilen greft sayıları yalnızca yaklaşık bir aralık gösterir. Vionte'de saç analizi ücretsizdir.",
    metaTitle: "Saç Analizi Nasıl Yapılır?",
    metaDescription:
      "Saç analizinde donör alan yoğunluğu, dökülme tipi ve saç teli kalınlığı ölçülür. Yönlendirme planı bu ölçümler üzerine kurulur.",
    eyebrow: "Tedavi",
    parent: sacTedavileri,
    facts: [
      { label: "Ücret", value: "Ücretsiz" },
      { label: "Ölçülenler", value: "Donör yoğunluğu, dökülme tipi, tel kalınlığı" },
      { label: "Sonrasında", value: "Yönlendirme planı ve uygunluk görüşü" },
    ],
    suitableFor: ["Saç ekimi düşünen herkes", "Dökülmesinin nedenini ve seviyesini öğrenmek isteyenler"],
    notSuitableFor: ["Analiz bir tanı işlemi değildir; tanı hekim muayenesiyle konur"],
    timeline: ORTAK_TAKVIM,
    faq: [faqGrafts, faqEveryone, faqGaranti],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
