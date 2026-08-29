import { site } from "./site";

/**
 * GOOGLE BUSINESS PROFILE YORUMLARI
 *
 * Yorumlar Google Places API (New) üzerinden çekilir ve build sırasında
 * sayfaya gömülür. İstemci tarafında istek yapılmaz — API anahtarı
 * tarayıcıya sızmaz ve LCP etkilenmez.
 *
 * KURULUM (iki ortam değişkeni):
 *
 *   GOOGLE_PLACES_API_KEY   Google Cloud Console'da "Places API (New)"
 *                           etkinleştirilip oluşturulan sunucu anahtarı.
 *   GOOGLE_PLACE_ID         İşletmenin Place ID'si.
 *                           https://developers.google.com/maps/documentation/places/web-service/place-id
 *
 * Vercel → Project Settings → Environment Variables altına eklenir.
 * Değişkenler tanımlı değilse site yorumsuz çalışır; sayfa bozulmaz.
 *
 * SINIR: Places API en fazla 5 yorum döndürür ve hangilerinin geleceğini
 * Google seçer. Daha fazlası için Business Profile API'sinin OAuth akışı
 * gerekir; o kurulum yapılırsa `getirGoogleYorumlari` bu dosyada
 * değiştirilir, çağıran bileşenler aynı kalır.
 */

export type GoogleYorum = {
  id: string;
  ad: string;
  puan: number;
  metin: string;
  tarih: string;
  profilFoto?: string;
  yorumUrl?: string;
};

export type GoogleOzet = {
  puan: number | null;
  adet: number | null;
  url: string | null;
  yorumlar: GoogleYorum[];
  /** Yapılandırma eksikse neden — geliştirici için */
  durum: "hazir" | "yapilandirilmadi" | "hata";
};

const BOS: GoogleOzet = {
  puan: null,
  adet: null,
  url: null,
  yorumlar: [],
  durum: "yapilandirilmadi",
};

type PlacesYanit = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: {
    name?: string;
    rating?: number;
    text?: { text?: string };
    originalText?: { text?: string };
    relativePublishTimeDescription?: string;
    publishTime?: string;
    authorAttribution?: { displayName?: string; photoUri?: string; uri?: string };
  }[];
};

/**
 * Build sırasında çağrılır. Sonuç Next.js tarafından 24 saat önbelleklenir;
 * yorumlar günde bir tazelenir.
 */
export async function getirGoogleYorumlari(): Promise<GoogleOzet> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return BOS;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=tr`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask":
            "rating,userRatingCount,googleMapsUri,reviews",
        },
        next: { revalidate: 86400 },
      },
    );
    if (!res.ok) return { ...BOS, durum: "hata" };

    const data = (await res.json()) as PlacesYanit;

    return {
      puan: data.rating ?? null,
      adet: data.userRatingCount ?? null,
      url: data.googleMapsUri ?? null,
      durum: "hazir",
      yorumlar: (data.reviews ?? []).map((r, i) => ({
        id: r.name ?? `google-yorum-${i}`,
        ad: r.authorAttribution?.displayName ?? "Google kullanıcısı",
        puan: r.rating ?? 0,
        metin: r.originalText?.text ?? r.text?.text ?? "",
        tarih: r.relativePublishTimeDescription ?? r.publishTime ?? "",
        profilFoto: r.authorAttribution?.photoUri,
        yorumUrl: r.authorAttribution?.uri,
      })),
    };
  } catch {
    return { ...BOS, durum: "hata" };
  }
}

/**
 * Yorum verisi Google'dan geldiği için schema.org'a AggregateRating olarak
 * eklenebilir. Veri yoksa şema üretilmez — uydurma puan yayınlanmaz.
 */
export function aggregateRatingSchema(ozet: GoogleOzet) {
  if (!ozet.puan || !ozet.adet) return null;
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
