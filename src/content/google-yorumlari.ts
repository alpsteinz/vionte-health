/**
 * GOOGLE YORUMLARI — ELLE GİRİLEN YEDEK LİSTE
 *
 * `GOOGLE_PLACES_API_KEY` tanımlı değilken ana sayfa ve /yorumlar bu
 * listeyi gösterir. Anahtar tanımlandığında API verisi öncelik alır ve bu
 * liste kullanılmaz.
 *
 * KURAL — yalnızca Google Business Profile'da gerçekten yayında olan
 * yorumlar eklenir:
 *   - Metin BİREBİR kopyalanır; kısaltılmaz, düzeltilmez, birleştirilmez.
 *   - Ad, Google'da göründüğü gibi yazılır (kişi baş harf kullandıysa o).
 *   - `profilUrl`: yorumcunun Google profil bağlantısı (Haritalar'da ada
 *     tıklayınca açılan adres). Boş bırakılabilir.
 *   - `tarih`: Google'daki haliyle ("2 ay önce") ya da ay/yıl ("Eylül 2026").
 *   - Seçici davranılmaz: yalnızca 5 yıldızlılar değil, en güncel yorumlar
 *     sırasıyla eklenir. Puanı düşük diye yorum çıkarılmaz.
 *   - Yalnızca şu durumlarda yorum siteye alınmaz (Google'da durmaya devam
 *     eder) ve aşağıdaki HARİÇ listesine gerekçesiyle yazılır:
 *       a) Vionte'nin sunmadığı bir hizmeti anlatıyorsa (ör. diş implantı)
 *       b) Uygulamayı Vionte'nin yaptığını / Vionte'nin klinik olduğunu
 *          söylüyorsa — AGENTS.md konumlandırma kuralı 1
 *       c) Yorumcu ile işletme arasında görünür bir yakınlık varsa
 *          (ör. aynı soyadı) — tarafsız danışan yorumu sayılmaz
 *       d) Sitenin kendi metninde yasak olan bir iddia içeriyorsa
 *          (ağrısızlık, üstünlük vb. — AGENTS.md "Yasaklar / İçerik");
 *          yorumu yayınlamak iddiayı sitenin ağzından söylemek olur
 *   - Google önizlemesinde "Daha fazla" ile kesilmiş bir metin eklenecekse
 *     kesildiği yerde bırakılır ve `kesik: true` yazılır; kart "…" ve
 *     "Devamını Google'da okuyun" bağlantısıyla gösterilir. Metnin devamı
 *     tahminle tamamlanmaz.
 *
 * `puan` ve `adet` Google'daki işletme kartından okunur; bilinmiyorsa
 * null bırakılır ve puan kutusu gösterilmez. Uydurma değer girilmez.
 */

export type ElleGoogleYorum = {
  ad: string;
  puan: 1 | 2 | 3 | 4 | 5;
  metin: string;
  tarih?: string;
  profilUrl?: string;
  kesik?: boolean;
};

export const elleGoogleOzet: {
  puan: number | null;
  adet: number | null;
  /** İşletmenin Google Haritalar bağlantısı (Paylaş → Bağlantıyı kopyala) */
  url: string;
} = {
  // Google işletme kartı, 24.09.2026
  puan: 5.0,
  adet: 37,
  // share.google/keO9tItW583dusBjy → işletmenin Google kaydı (kgmid)
  url: "https://www.google.com/search?kgmid=/g/11nvh8l1h8&q=Vionte+%7C+Sa%C3%A7+Ekimi+-+Di%C5%9F+Esteti%C4%9Fi+-+Medikal+Estetik+Dan%C4%B1%C5%9Fmanl%C4%B1%C4%9F%C4%B1",
};

/** Google'daki en yeni yorumlar, yeniden eskiye. Tarihler 24.09.2026'ya göre. */
export const elleGoogleYorumlari: ElleGoogleYorum[] = [
  {
    ad: "Hamza Cetinkaya",
    puan: 5,
    metin:
      "Hizmet ve yaklaşımları en üst düzeyde Kesinlikle tavsiye ediyorum çok memnun kaldım . Murat Beye özellikle Çok teşekkür ederim işlem yaptırmaya çok çekiniyordum sağolsun kendisi Beni ikna etti , çok kolay ve çok güzel bir işlem oldu kendisine Tekrar çok teşekkür ederim",
    tarih: "Eylül 2026",
  },
  {
    ad: "Neşe S.",
    puan: 5,
    metin:
      "Murat bey ve Mehtap hanım a öncelikle çoook teşekkür ederim, Sizinle bu süreci yönetmek hem keyifli hem de çok güvenliydi. Tecrübeleriniz ve samimiyetiniz için minnettarım. Tanıdığım herkese tavsiye ediyorum ve gidenler de en az benim kadar mutlu ayrılıyor 🙏🙏 iyi ki siz",
    tarih: "Eylül 2026",
  },
  {
    ad: "Kadir Demir",
    puan: 5,
    metin:
      "Bir sağlık çalışanı olarak büyük firmaların sürekli ucuzuna kaçan değişen ekibine değil, işinin eğli insanlara kendinizi emanet ederseniz sonuç ortada .\nErkeğin kozmetiği saçıdır bence çok fazla düşünmeylede yol alınmıyor ,kararlı olmak gerekiyor .Murat Bey ve Mehtap hanım süreç boyunca rahat nefes aldırmıyor zaten. Emeklerin karşılığını almak istiyorlar mesele sadece para değil tedavilerine kulak vermek gerekiyor dediğim gibi sonuç ortada\nTeşekkür ediyorum ekibinize .",
    tarih: "Eylül 2026",
  },
  {
    ad: "İsmail Hüşan",
    puan: 5,
    metin:
      "Çok uzun süredir saç ekimi operasyonu için araştırma yapıyodum kendileriyle referans sonucu ulaştım çalışan arkadaşlarda çok ilgiliydi elinize sağlık",
    tarih: "Eylül 2026",
    kesik: true,
  },
  {
    ad: "Nuri Güzel - Güzel Yapı",
    puan: 5,
    metin:
      "Öncelikle merhaba 6 ay önce ön hat tepe saç ekimi operasyonum gerçekleşti ve şuan çok iyi sonuç aldım ekimim çok doğal yönleri harika",
    tarih: "Eylül 2026",
    kesik: true,
  },
  {
    ad: "Cengiz Gökçe",
    puan: 5,
    metin: "Mehtap hocam ve Murat hocama çok teşekkür ederim gerçekten mükemmel bir sonuç",
    tarih: "Eylül 2026",
  },
  {
    ad: "ipek öztürk",
    puan: 5,
    metin:
      "İşinin ehli, profesyonel ve titiz bir ekip. İlgi ve alakaları, güler yüzleri ve işlerine verdikleri önem gerçekten takdire değer. Gönül rahatlığıyla tavsiye ediyorum",
    tarih: "Eylül 2026",
  },
  {
    ad: "MERT Can",
    puan: 5,
    metin:
      "Saç ekimi konusunda aklınıza takılan her şeyi kendilerine danışabilirsiniz gerçekten çok iyiler şimdiden teşekkür ediyorum",
    tarih: "Eylül 2026",
  },
  {
    ad: "Erdogan Binici",
    puan: 5,
    metin: "Mehtap hanım ve ekibine çok teşekkür ederim her şey için. Gayet memnun kaldım herkese tavsiye ederim.",
    tarih: "Eylül 2026",
  },
  {
    ad: "Gökhan Çaylı",
    puan: 5,
    metin:
      "Arkadaşım tavsiyesiyle gittim yapılan ekim işleminden ve süreçten çok memnunum 6 ay sonra resimlerimi yükleyeceğim mehtap hanım ve ekibine çok teşekkür ederim ve herkese tavsiye ederim mutlaka bu ekiple tanışın.",
    tarih: "Eylül 2026",
  },
  {
    ad: "Hamza Karaç",
    puan: 5,
    metin:
      "3 ay önce prp tedavime başladık ve saç dökülmem çok azaldı iyi ki yaptırmışım diyorum mehtap hanıma teşekkür ederim",
    tarih: "Eylül 2026",
  },
  {
    ad: "cengiz aydemir",
    puan: 5,
    metin: "Samimi bir karşılama, detaylı bilgilendirme, profesyonel danışmanlık.Çok teşekkür ederim",
    tarih: "Ağustos 2026",
  },
];

/**
 * HARİÇ — Google'da yayında olan ama siteye alınmayan yorumlar (yukarıdaki
 * kurala göre). Yalnızca kayıt amaçlı; hiçbir yerde gösterilmez.
 *
 *   Ulaş (5★, Eylül 2026)          a) diş implantı — sitede diş hizmeti yok
 *   Yasin ARSLAN (5★, Eylül 2026)  b) "Vionte Saç Ekimi Kliniği'nde saç ekimi
 *                                     yaptırdım" — uygulamayı Vionte'ye atfediyor
 *   Damla Su Dizge (5★, Eylül 2026) c) içerik sorumlusuyla aynı soyadı; ayrıca
 *                                     "Klinik çalışanları" ifadesi (b)
 *   Merve Dizge (5★, Ağustos 2026)  c) içerik sorumlusuyla aynı soyadı
 *   Sardunya Yilmaz (5★, Eylül 2026) b) Vionte'yi "klinik" olarak anıyor;
 *                                     d) üstünlük iddiası içeriyor
 *   Şeydanur (5★, Eylül 2026)       d) ağrısızlık iddiası ve "Türkiye'deki tek
 *                                     adres" ifadesi
 */
