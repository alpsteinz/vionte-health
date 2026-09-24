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
};

export const elleGoogleOzet: {
  puan: number | null;
  adet: number | null;
  /** İşletmenin Google Haritalar bağlantısı (Paylaş → Bağlantıyı kopyala) */
  url: string;
} = {
  puan: null,
  adet: null,
  url: "",
};

export const elleGoogleYorumlari: ElleGoogleYorum[] = [];
