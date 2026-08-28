/**
 * Blog altyapısı.
 *
 * KURAL (AGENTS.md): sağlık içeriği YMYL kategorisindedir. Toplu üretilmiş,
 * editörden geçmemiş AI içeriği domaini yakar. Bu yüzden burada hazır makale
 * metni üretilmez — yalnızca konu kümeleri ve yayın planı tutulur. Yazılar
 * yazıldıkça `posts` dizisine eklenir ve her biri tıbbi incelemeden geçer.
 */

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  cluster: string;
  published: string;
  sections: { id: string; heading: string; body: string[] }[];
};

/** Onaylanmış makale yayınlandıkça buraya eklenir. */
export const posts: Post[] = [];

export const clusters = [
  {
    title: "Saç dökülmesi",
    href: "/sac-tedavileri/sac-analizi",
    topics: [
      "Saç dökülmesinin nedenleri",
      "Dökülme tipleri",
      "Kadınlarda saç dökülmesi",
      "Genç yaşta saç dökülmesi",
    ],
  },
  {
    title: "Operasyon öncesi",
    href: "/hasta-rehberi/operasyon-oncesi",
    topics: ["Operasyona hazırlık", "Kimler uygun, kimler değil", "Greft hesabı nasıl yapılır"],
  },
  {
    title: "Operasyon sonrası",
    href: "/hasta-rehberi/operasyon-sonrasi",
    topics: ["Saç yıkama", "Şok dökülme", "Uyku pozisyonu", "Spor", "Güneş"],
  },
  {
    title: "Teknik karşılaştırmaları",
    href: "/sac-ekimi",
    topics: ["FUE ve DHI farkı", "Safir uçun farkı", "Tıraşsız ekimin sınırları"],
  },
  {
    title: "Alternatif tedaviler",
    href: "/sac-tedavileri",
    topics: ["PRP", "Mezoterapi", "İlaç tedavileri"],
  },
  {
    title: "Doğru bilinen yanlışlar",
    href: "/dogru-bilinen-yanlislar",
    topics: [
      "Yaz aylarında saç ekimi",
      "Safir mi DHI mi",
      "Komplikasyon riski",
      "Greft sayısı yanılgısı",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
