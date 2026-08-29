import { site } from "@/lib/site";

/**
 * Danışmanlık sayfaları.
 *
 * Vionte Health'nin asıl konumlandırmasını taşıyan sayfalar: uygulama yapmıyoruz,
 * doğru yere yönlendiriyoruz. Bu sayfalar aynı zamanda ayrışma stratejisinin
 * merkezinde — rakipler kendi kliniğini övüyor, Vionte Health klinik nasıl seçilir
 * anlatıyor.
 */

export type Bolum = { id: string; heading: string; body: string[]; list?: string[] };

export type DanismanlikSayfasi = {
  slug: string;
  name: string;
  h1: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  sections: Bolum[];
};

export const danismanlikSayfalari: DanismanlikSayfasi[] = [
  {
    slug: "/neden-danisman",
    name: "Neden Danışman?",
    h1: "Neden Klinik Değil de Danışman?",
    lead: "Vionte Health bir saç ekimi kliniği değildir; saç ekimi danışmanlık ve yönlendirme şirketidir. Kendi kliniğimiz olmadığı için sizi kendi ameliyathanemize yönlendirme gibi bir çıkarımız da yok. İşimiz, ölçüme bakıp size uygun tekniği ve merkezi bulmak.",
    metaTitle: "Neden Klinik Değil de Danışman?",
    metaDescription:
      "Vionte Health saç ekimi danışmanlık ve yönlendirme şirketidir. Kendi kliniği yoktur; operasyonlar anlaşmalı merkezlerde sertifikalı ekipler tarafından yapılır.",
    eyebrow: "Danışmanlık",
    sections: [
      {
        id: "ne-yapariz",
        heading: "Vionte Health ne yapar, ne yapmaz",
        body: [
          "Vionte Health saç analizi yapar, dökülme tipinizi ve donör kapasitenizi ölçer, size uygun tekniği belirler ve anlaşmalı merkeze yönlendirir. Operasyon süresince ve sonrasında süreci takip eder.",
          "Vionte Health uygulama yapmaz. Operasyonlar anlaşmalı merkezlerde, sertifikalı saç ekim uzmanları tarafından gerçekleştirilir. Vionte Health bir sağlık kuruluşu değildir.",
        ],
        list: [
          "Yapar: ücretsiz saç analizi ve ölçüm",
          "Yapar: teknik ve merkez yönlendirmesi",
          "Yapar: operasyon öncesi ve sonrası süreç takibi",
          "Yapmaz: operasyon, tanı, tedavi",
        ],
      },
      {
        id: "cikar-catismasi",
        heading: "Kendi kliniği olanla danışmanın farkı",
        body: [
          "Kendi kliniği olan bir kurum, size hangi tekniği önerirse önersin, sonuçta kendi ameliyathanesine yönlendirir. Vionte Health'nin böyle bir bağı yok; hangi merkezin sizin vakanıza uygun olduğuna ölçüm karar verir.",
          "Bunun bir sonucu da şu: bazı vakalarda cevabımız \"şu an ekim uygun değil\" oluyor. Kendi kliniğini doldurmak zorunda olan bir kurumun bunu söylemesi daha zordur.",
        ],
      },
      {
        id: "referans",
        heading: "Danışanların yarısından çoğu referansla geliyor",
        body: [
          "Danışanlarımızın yarısından fazlası, daha önce yönlendirdiğimiz kişilerin tavsiyesiyle geliyor. Bizim için anlamlı olan tek ölçü bu: süreci yaşayan biri, aynı yolu bir yakınına önerecek kadar memnun kaldı mı?",
          `${site.stats.experienceYears} yıllık deneyim, yılda ${site.stats.clientsPerYear} danışan, toplamda ${site.stats.totalClients} kişi.`,
        ],
      },
      {
        id: "ucret",
        heading: "Danışmanlık ücreti var mı?",
        body: [
          "Saç analizi ve ön değerlendirme ücretsizdir.",
          site.disclaimers.fiyat,
          "Greft başına fiyatlandırma yapmıyoruz. Fiyat, muayene ve planlama sonrasında kişiye özel olarak paylaşılır.",
        ],
      },
    ],
  },
  {
    slug: "/klinik-secerken-nelere-dikkat-edilmeli",
    name: "Klinik Seçerken Nelere Dikkat Edilmeli",
    h1: "Saç Ekimi İçin Klinik Seçerken Nelere Dikkat Edilmeli?",
    lead: "Saç ekiminde en belirleyici karar teknik değil, uygulamanın yapılacağı yer ve ekiptir. Aşağıdaki başlıklar, bir merkezi değerlendirirken bakmanız gereken somut noktalar — hangi kliniği seçerseniz seçin geçerlidir.",
    metaTitle: "Saç Ekimi Kliniği Seçerken Nelere Dikkat Edilmeli?",
    metaDescription:
      "Saç ekimi için merkez seçerken bakılması gereken somut noktalar: ruhsat, ekip sertifikasyonu, sterilizasyon, greft planı ve fiyat şeffaflığı.",
    eyebrow: "Rehber",
    sections: [
      {
        id: "ruhsat",
        heading: "1. Uygulama sağlık kuruluşunda mı yapılıyor?",
        body: [
          "Saç ekimi küçük cerrahi işlemler grubundadır ve yalnızca Sağlık Bakanlığı'ndan ruhsatlı sağlık kuruluşlarında yapılabilir. Otel odası, güzellik salonu veya ruhsatsız merkez teklifi doğrudan bir ret sebebidir.",
          "Uygulamanın yapılacağı kuruluşun adını ve ruhsat durumunu sormaktan çekinmeyin.",
        ],
      },
      {
        id: "ekip",
        heading: "2. Uygulamayı kim yapacak?",
        body: [
          "Kanal açma aşamasını saç ekimi uygulayıcı sertifikasına sahip hekim yürütür; greft alımı ve yerleştirme, Sağlık Bakanlığı tescilli yardımcı uygulayıcı sertifikasına sahip sağlık personeli tarafından hekim sorumluluğunda yapılır.",
          "Size uygulamayı kimin yapacağını ve o kişilerin sertifikalarını sorun. Net cevap alamıyorsanız bu bir uyarı işaretidir.",
        ],
      },
      {
        id: "sterilizasyon",
        heading: "3. Sterilizasyon nasıl sağlanıyor?",
        body: [
          "Saç ekimi tüm cerrahi işlemler gibi komplikasyon riski taşır; en bilinenleri enfeksiyon ve nekrozdur. Bu risk, işlemin yapıldığı yerin sağlık kuruluşu olup olmamasına ve uygulayan ekibin sertifikasyon ve deneyimine göre değişir.",
          "Alet sterilizasyon yöntemini ve tek kullanımlık malzeme politikasını sorun.",
        ],
      },
      {
        id: "greft-plani",
        heading: "4. Greft sayısı nasıl belirlenmiş?",
        body: [
          "Greft sayısı ölçümle belirlenir: dökülme seviyeniz, ekim yapılacak alanın genişliği ve donör alanınızın yoğunluğu. Fotoğrafa bakıp rakam veren bir yer, ölçüm yapmadan söz veriyor demektir.",
          "Greft sayısı tek başına belirleyici değildir. Sonucun doğallığını asıl belirleyen, greftlerin hangi açıyla, hangi yönde ve hangi yoğunlukta yerleştirildiğidir.",
        ],
      },
      {
        id: "sinir",
        heading: "5. Size uygun olmayabileceğini söylüyorlar mı?",
        body: [
          "Herkese saç ekimi yapılamaz. Donör kapasitesi yetersiz olanlar, dökülmesi hâlâ ilerleyenler ve bazı sistemik hastalığı bulunanlar için uygulama uygun olmayabilir.",
          "Her başvurana \"olur\" diyen bir yer, muayeneden önce karar vermiş demektir.",
        ],
      },
      {
        id: "fiyat",
        heading: "6. Fiyat neyi kapsıyor?",
        body: [
          site.disclaimers.fiyat,
          "Greft başına fiyatlandırma, ölçüm yapılmadan rakam vermenin bir başka biçimidir. Verilen teklifin operasyon ve kontrol süreçlerinin tamamını kapsayıp kapsamadığını yazılı olarak sorun.",
        ],
      },
      {
        id: "garanti",
        heading: "7. Garanti vaadi var mı?",
        body: [
          site.disclaimers.garanti,
          "Yazılı garanti belgesi gördüğünüz yerlerde belgenin neyi kapsadığını, hangi koşullarda geçerli olduğunu ve neyi kapsamadığını mutlaka okuyun.",
        ],
      },
    ],
  },
  {
    slug: "/sac-ekimi-oncesi-sorulacak-sorular",
    name: "Saç Ekimi Öncesi Sorulacak Sorular",
    h1: "Saç Ekimi Öncesi Sorulması Gereken Sorular",
    lead: "Aşağıdaki soruları görüştüğünüz her merkeze sorun — bize de sorun. Cevapların netliği, merkezin sizi ne kadar ciddiye aldığını gösterir. Kaçamak cevap aldığınız her soru bir uyarı işaretidir.",
    metaTitle: "Saç Ekimi Öncesi Sorulması Gereken Sorular",
    metaDescription:
      "Saç ekimi öncesi merkeze sorulması gereken sorular: uygulamayı kim yapacak, greft sayısı nasıl belirlendi, teklif neyi kapsıyor, komplikasyonda ne oluyor.",
    eyebrow: "Rehber",
    sections: [
      {
        id: "uygulama",
        heading: "Uygulama hakkında",
        body: ["Bu sorular uygulamanın nerede, kim tarafından ve nasıl yapılacağını netleştirir."],
        list: [
          "Operasyon hangi sağlık kuruluşunda yapılacak? Ruhsatlı mı?",
          "Kanal açmayı hangi hekim yapacak?",
          "Greft alımı ve yerleştirmeyi kim yapacak, sertifikaları ne?",
          "Operasyon ne kadar sürecek?",
          "Anestezi nasıl uygulanacak?",
        ],
      },
      {
        id: "planlama",
        heading: "Planlama hakkında",
        body: ["Bu sorular size verilen sayının ölçüme mi yoksa tahmine mi dayandığını gösterir."],
        list: [
          "Donör alan yoğunluğum ölçüldü mü, sonucu nedir?",
          "Greft sayısı neye göre belirlendi?",
          "Saç çizgisi nasıl planlandı, ben de karar verecek miyim?",
          "Bu teknik neden benim vakama uygun?",
          "Tek seansta bitecek mi, ikinci seans gerekir mi?",
        ],
      },
      {
        id: "sonrasi",
        heading: "Sonrası hakkında",
        body: ["Bu sorular operasyondan sonra yalnız kalıp kalmayacağınızı gösterir."],
        list: [
          "İlk yıkama nerede ve kim tarafından yapılacak?",
          "Kontroller ne zaman, kaç kez?",
          "Komplikasyon gelişirse süreç nasıl işleyecek?",
          "Sonuç beklenenden zayıf olursa ne oluyor?",
          "Kime, hangi saatlerde ulaşabilirim?",
        ],
      },
      {
        id: "ucret",
        heading: "Ücret hakkında",
        body: [site.disclaimers.fiyat],
        list: [
          "Teklif neleri kapsıyor, neleri kapsamıyor?",
          "Kontroller ücrete dahil mi?",
          "Konaklama ve ulaşım dahil mi?",
          "Teklifte olmayan bir ücret çıkabilir mi?",
        ],
      },
    ],
  },
  {
    slug: "/ucretsiz-sac-analizi",
    name: "Ücretsiz Saç Analizi",
    h1: "Ücretsiz Saç Analizi",
    lead: "Saç analizinde dökülme tipiniz, donör alan yoğunluğunuz ve saç telinizin kalınlığı ölçülür. Yönlendirme planı bu ölçümler üzerine kurulur. Analiz ve ön değerlendirme ücretsizdir; sonucunda ekim uygun değilse bunu da söyleriz.",
    metaTitle: "Ücretsiz Saç Analizi",
    metaDescription:
      "Ücretsiz saç analizinde dökülme tipi, donör alan yoğunluğu ve saç teli kalınlığı ölçülür. Yönlendirme planı bu ölçümler üzerine kurulur.",
    eyebrow: "Danışmanlık",
    sections: [
      {
        id: "nasil",
        heading: "Analiz nasıl yapılır?",
        body: [
          "Analiz iki aşamalıdır. İlk aşamada fotoğraf ve görüşme üzerinden dökülme tipiniz değerlendirilir, uygunluk ön görüşü verilir. Bu aşama uzaktan, WhatsApp üzerinden yapılabilir.",
          "İkinci aşamada donör alan yoğunluğu ölçülür ve greft planı çıkarılır. Bu ölçüm yönlendirileceğiniz merkezde, muayene sırasında yapılır.",
        ],
      },
      {
        id: "ne-ogrenirsiniz",
        heading: "Analiz sonunda ne öğrenirsiniz?",
        body: ["Analiz size somut bilgi verir, tahmin değil."],
        list: [
          "Dökülme seviyeniz (Norwood ölçeği)",
          "Donör alanınızın kapasitesi",
          "Size uygun teknik ve neden",
          "Yaklaşık greft aralığı",
          "Ekimin şu an uygun olup olmadığı",
        ],
      },
      {
        id: "uygun-degilse",
        heading: "Ekim uygun değilse ne oluyor?",
        body: [
          "Herkese saç ekimi yapılamaz. Donör kapasitesi yetersiz olanlar, dökülmesi aktif olarak devam eden ve henüz stabilize olmamış kişiler ile bazı sistemik hastalığı bulunanlar için uygulama uygun olmayabilir.",
          "Böyle bir durumda size bunu açıkça söyleriz. Gerekiyorsa destekleyici tedavileri ya da beklemeyi öneririz. Uygun olmayan bir vakayı yönlendirmek kimseye fayda sağlamaz.",
        ],
      },
      {
        id: "nasil-baslarim",
        heading: "Nasıl başlarım?",
        body: [
          `Formu doldurun ya da doğrudan WhatsApp'tan yazın. Talepler sertifikalı saç ekim uzmanlarımız tarafından anında yanıtlanır. Çalışma saatlerimiz: ${site.contact.hours}.`,
        ],
      },
    ],
  },
];

export function getDanismanlikSayfasi(slug: string) {
  return danismanlikSayfalari.find((s) => s.slug === slug);
}
