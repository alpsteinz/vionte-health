import { services } from "@/content/services";
import { guides } from "@/content/guides";
import { legalDocs } from "@/content/legal";
import { posts } from "@/content/blog";

/** Sitemap ve llms.txt için tek kaynak */
export const staticRoutes = [
  { path: "/", priority: 1, title: "Ana sayfa" },
  { path: "/sac-ekimi", priority: 0.9, title: "Saç Ekimi Teknikleri" },
  { path: "/neden-danisman", priority: 0.9, title: "Neden Danışman?" },
  { path: "/ucretsiz-sac-analizi", priority: 0.9, title: "Ücretsiz Saç Analizi" },
  { path: "/klinik-secerken-nelere-dikkat-edilmeli", priority: 0.9, title: "Klinik Seçerken Nelere Dikkat Edilmeli" },
  { path: "/sac-ekimi-oncesi-sorulacak-sorular", priority: 0.8, title: "Saç Ekimi Öncesi Sorulacak Sorular" },
  { path: "/sakal-ekimi", priority: 0.8, title: "Sakal Ekimi" },
  { path: "/kas-ekimi", priority: 0.8, title: "Kaş Ekimi" },
  { path: "/sac-tedavileri", priority: 0.8, title: "Saç Tedavileri" },
  { path: "/hasta-rehberi", priority: 0.8, title: "Hasta Rehberi" },
  { path: "/dogru-bilinen-yanlislar", priority: 0.8, title: "Doğru Bilinen Yanlışlar" },
  { path: "/ekibimiz", priority: 0.7, title: "Ekibimiz" },
  { path: "/vakalar", priority: 0.8, title: "Vakalar" },
  { path: "/yorumlar", priority: 0.7, title: "Hasta Yorumları" },
  { path: "/sss", priority: 0.7, title: "Sıkça Sorulan Sorular" },
  { path: "/iletisim", priority: 0.7, title: "İletişim" },
  { path: "/blog", priority: 0.6, title: "Blog" },
];

export function allRoutes() {
  return [
    ...staticRoutes,
    ...services
      .filter((s) => !staticRoutes.some((r) => r.path === s.slug))
      .map((s) => ({ path: s.slug, priority: 0.9, title: s.name })),
    ...guides.map((g) => ({ path: g.slug, priority: 0.7, title: g.name })),
    ...posts.map((p) => ({ path: `/blog/${p.slug}`, priority: 0.6, title: p.title })),
    ...legalDocs.map((d) => ({ path: d.slug, priority: 0.3, title: d.name })),
  ];
}
