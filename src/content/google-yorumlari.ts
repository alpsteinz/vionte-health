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
 *     sırasıyla eklenir.
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

/** Google'daki en yeni yorumlar, yeniden eskiye */
export const elleGoogleYorumlari: ElleGoogleYorum[] = [
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
];
