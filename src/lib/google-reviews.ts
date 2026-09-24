import { site } from "./site";
import { elleGoogleOzet, elleGoogleYorumlari } from "@/content/google-yorumlari";

/**
 * GOOGLE BUSINESS PROFILE YORUMLARI
 *
 * Yorumlar Google Places API (New) üzerinden sunucuda çekilir ve sayfaya
 * gömülür. İstemci tarafında istek yapılmaz — API anahtarı tarayıcıya
 * sızmaz ve LCP etkilenmez. Sonuç 24 saat önbelleklenir (ISR).
 *
 * KURULUM — tek zorunlu ortam değişkeni:
 *
 *   GOOGLE_PLACES_API_KEY   Google Cloud Console'da "Places API (New)"
 *                           etkinleştirilip oluşturulan anahtar.
 *
 * İsteğe bağlı:
 *
 *   GOOGLE_PLACE_ID         İşletmenin Place ID'si (ChIJ... ile başlar).
 *                           Verilirse doğrudan bu kayıt kullanılır.
 *   GOOGLE_PLACE_QUERY      Place ID yoksa işletme bu metinle aranır.
 *                           Varsayılan: VARSAYILAN_SORGU.
 *
 * Vercel → Project Settings → Environment Variables altına eklenir.
 * Anahtar tanımlı değilse (veya istek başarısızsa) `content/google-yorumlari.ts`
 * içindeki elle girilmiş liste kullanılır; o da boşsa Google Haritalar'a
 * yönlendiren kutu gösterilir. Uydurma yorum veya puan gösterilmez.
 *
 * SINIR: Places API en fazla 5 yorum döndürür ve hangilerinin geleceğini
 * Google seçer. Yorumlar filtrelenmez (yalnızca metinsiz, sadece yıldız
 * verilmiş değerlendirmeler atlanır).
 */

export type GoogleYorum = {
  id: string;
  ad: string;
  puan: number;
  metin: string;
  tarih: string;
  profilFoto?: string;
  profilUrl?: string;
};

export type GoogleOzet = {
  puan: number | null;
  adet: number | null;
  /** İşletmenin Google Haritalar sayfası — veri yoksa arama bağlantısı */
  url: string;
  yorumlar: GoogleYorum[];
  /**
   * hazir: API'den canlı veri · elle: content/google-yorumlari.ts'ten
   * yapilandirilmadi / bulunamadi / hata: veri yok, Google'a yönlendirilir
   */
  durum: "hazir" | "elle" | "yapilandirilmadi" | "bulunamadi" | "hata";
};

const VARSAYILAN_SORGU = `${site.name} ${site.contact.district} ${site.contact.city}`;

/** Anahtar yokken de çalışan, işletmeyi Google Haritalar'da arayan bağlantı */
const ARAMA_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.name} ${site.contact.addressLine}`,
)}`;

const bos = (durum: GoogleOzet["durum"]): GoogleOzet => ({
  puan: null,
  adet: null,
  url: ARAMA_URL,
  yorumlar: [],
  durum,
});

/** API kullanılamadığında elle girilmiş liste; o da boşsa `bos` */
function yedek(durum: GoogleOzet["durum"]): GoogleOzet {
  if (elleGoogleYorumlari.length === 0 && elleGoogleOzet.puan === null) return bos(durum);
  return {
    puan: elleGoogleOzet.puan,
    adet: elleGoogleOzet.adet,
    url: elleGoogleOzet.url || ARAMA_URL,
    durum: "elle",
    yorumlar: elleGoogleYorumlari.map((y, i) => ({
      id: `elle-${i}`,
      ad: y.ad,
      puan: y.puan,
      metin: y.metin,
      tarih: y.tarih ?? "",
      profilUrl: y.profilUrl,
    })),
  };
}

type PlacesYer = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: {
    name?: string;
    rating?: number;
    text?: { text?: string };
    originalText?: { text?: string };
    relativePublishTimeDescription?: string;
    authorAttribution?: { displayName?: string; photoUri?: string; uri?: string };
  }[];
};

const ALANLAR = ["rating", "userRatingCount", "googleMapsUri", "reviews"];

async function yerGetir(key: string): Promise<PlacesYer | null> {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const ortak = {
    "X-Goog-Api-Key": key,
    "Accept-Language": "tr",
  };

  if (placeId) {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=tr`,
      {
        headers: { ...ortak, "X-Goog-FieldMask": ALANLAR.join(",") },
        next: { revalidate: 86400 },
      },
    );
    if (!res.ok) throw new Error(`Places ${res.status}`);
    return (await res.json()) as PlacesYer;
  }

  // Place ID verilmediyse işletme adı + adresle aranır; ilk sonuç alınır.
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      ...ortak,
      "Content-Type": "application/json",
      "X-Goog-FieldMask": ALANLAR.map((a) => `places.${a}`).join(","),
    },
    body: JSON.stringify({
      textQuery: process.env.GOOGLE_PLACE_QUERY || VARSAYILAN_SORGU,
      languageCode: "tr",
      regionCode: "TR",
      pageSize: 1,
    }),
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error(`Places ${res.status}`);
  const data = (await res.json()) as { places?: PlacesYer[] };
  return data.places?.[0] ?? null;
}

export async function getirGoogleYorumlari(): Promise<GoogleOzet> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return yedek("yapilandirilmadi");

  try {
    const yer = await yerGetir(key);
    if (!yer) return yedek("bulunamadi");

    return {
      puan: yer.rating ?? null,
      adet: yer.userRatingCount ?? null,
      url: yer.googleMapsUri ?? ARAMA_URL,
      durum: "hazir",
      yorumlar: (yer.reviews ?? [])
        .map((r, i) => ({
          id: r.name ?? `google-yorum-${i}`,
          ad: r.authorAttribution?.displayName ?? "Google kullanıcısı",
          puan: r.rating ?? 0,
          metin: (r.originalText?.text ?? r.text?.text ?? "").trim(),
          tarih: r.relativePublishTimeDescription ?? "",
          profilFoto: r.authorAttribution?.photoUri,
          profilUrl: r.authorAttribution?.uri,
        }))
        .filter((y) => y.metin.length > 0),
    };
  } catch (e) {
    console.warn("[google-yorumlari] Places API isteği başarısız:", e);
    return yedek("hata");
  }
}

/**
 * Yorum verisi Google'dan geldiği için schema.org'a AggregateRating olarak
 * eklenebilir. Veri yoksa şema üretilmez — uydurma puan yayınlanmaz.
 */
export function aggregateRatingSchema(ozet: GoogleOzet) {
  // Yalnızca API'den gelen canlı veri — elle girilen puan eskiyebilir.
  if (ozet.durum !== "hazir" || !ozet.puan || !ozet.adet) return null;
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    itemReviewed: { "@id": `${site.url}/#kurum` },
    ratingValue: ozet.puan,
    reviewCount: ozet.adet,
    bestRating: 5,
    worstRating: 1,
  };
}
