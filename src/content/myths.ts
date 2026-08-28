export type Myth = { claim: string; slug: string; answer: string };

/** CONTENT.md — Doğru bilinen yanlışlar */
export const myths: Myth[] = [
  {
    claim: "Yaz aylarında saç ekimi yaptırılmaz",
    slug: "yaz-aylarinda-sac-ekimi",
    answer:
      "Saç ekimi yılın her mevsimi yapılabilir. Yaz aylarında terleme ve güneşten korunma konusunda daha dikkatli olunması gerekir, ancak bu bir engel değildir.",
  },
  {
    claim: "Safir yöntemi DHI'dan daha iyidir",
    slug: "safir-mi-dhi-mi",
    answer:
      "İki yöntemin birbirine üstünlüğü yoktur; vakaya göre değişir. Seyrelmenin çok olduğu, aralara sıklaştırma gereken durumlarda DHI mevcut saçlara zarar vermemek açısından öne çıkar. Boşluğun belirgin ve ekim sayısının yüksek olduğu durumlarda safir uçlar avantajlıdır. Bazı vakalarda iki yöntem birlikte kullanılır.",
  },
  {
    claim: "Saç ekiminde komplikasyon riski yoktur",
    slug: "komplikasyon-riski",
    answer:
      "Saç ekimi küçük cerrahi işlemler grubundadır ve tüm cerrahi işlemler gibi komplikasyon riski taşır. En bilinenleri enfeksiyon ve nekrozdur. Bu risk, işlemin yapıldığı yerin sağlık kuruluşu olup olmamasına ve uygulayan ekibin sertifikasyon ve deneyimine göre değişir.",
  },
  {
    claim: "Tıraşsız saç ekimi herkese uygundur",
    slug: "tirassiz-ekim-herkese-uygun-mu",
    answer:
      "Tıraşsız ekim sosyal hayata erken dönüş sağladığı için çok tercih edilir, ancak her hastaya uygulanamaz. En önemli sınırı, tek seansta ekilebilecek greft sayısının kısıtlı olmasıdır.",
  },
  {
    claim: "Greft sayısı ne kadar çoksa sonuç o kadar iyi olur",
    slug: "greft-sayisi",
    answer:
      "Greft sayısı tek başına belirleyici değildir. Sonucun doğallığını asıl belirleyen, greftlerin hangi açıyla, hangi yönde ve hangi yoğunlukta yerleştirildiğidir.",
  },
];
