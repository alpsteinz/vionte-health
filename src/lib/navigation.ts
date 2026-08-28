export type NavChild = { title: string; href: string; note?: string };
export type NavItem = { title: string; href: string; children?: NavChild[] };

/** AGENTS.md — site mimarisi */
export const navigation: NavItem[] = [
  {
    title: "Saç Ekimi",
    href: "/sac-ekimi",
    children: [
      { title: "Safir FUE", href: "/sac-ekimi/safir-fue" },
      { title: "DHI", href: "/sac-ekimi/dhi" },
      { title: "Tıraşsız Saç Ekimi", href: "/sac-ekimi/tirassiz-sac-ekimi" },
      { title: "Kadınlarda Saç Ekimi", href: "/sac-ekimi/kadin-sac-ekimi" },
      { title: "İğnesiz Anestezi", href: "/sac-ekimi/ignesiz-anestezi" },
    ],
  },
  { title: "Sakal Ekimi", href: "/sakal-ekimi" },
  { title: "Kaş Ekimi", href: "/kas-ekimi" },
  {
    title: "Saç Tedavileri",
    href: "/sac-tedavileri",
    children: [
      { title: "PRP", href: "/sac-tedavileri/prp" },
      { title: "Mezoterapi", href: "/sac-tedavileri/mezoterapi" },
      { title: "Eksozom", href: "/sac-tedavileri/eksozom" },
      { title: "Kök Hücre", href: "/sac-tedavileri/kok-hucre" },
      { title: "Saç Analizi", href: "/sac-tedavileri/sac-analizi" },
    ],
  },
  {
    title: "Hasta Rehberi",
    href: "/hasta-rehberi",
    children: [
      { title: "Operasyon Öncesi", href: "/hasta-rehberi/operasyon-oncesi" },
      { title: "Operasyon Günü", href: "/hasta-rehberi/operasyon-gunu" },
      { title: "Operasyon Sonrası", href: "/hasta-rehberi/operasyon-sonrasi" },
      { title: "Saç Yıkama", href: "/hasta-rehberi/sac-yikama" },
      { title: "Sterilizasyon ve Hijyen", href: "/hasta-rehberi/sterilizasyon-ve-hijyen" },
      {
        title: "Fiyatlandırma Nasıl Belirlenir",
        href: "/hasta-rehberi/fiyatlandirma-nasil-belirlenir",
      },
    ],
  },
  {
    title: "Klinik",
    href: "/ekibimiz",
    children: [
      { title: "Ekibimiz", href: "/ekibimiz" },
      { title: "Galeri", href: "/galeri" },
      { title: "Vakalar", href: "/vakalar" },
      { title: "Sonuçlarımız", href: "/sonuclarimiz" },
      { title: "Yorumlar", href: "/yorumlar" },
      { title: "Doğru Bilinen Yanlışlar", href: "/dogru-bilinen-yanlislar" },
      { title: "Blog", href: "/blog" },
      { title: "S.S.S.", href: "/sss" },
    ],
  },
  { title: "İletişim", href: "/iletisim" },
];

export const legalNavigation: NavChild[] = [
  { title: "KVKK Aydınlatma Metni", href: "/kvkk-aydinlatma-metni" },
  { title: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
  { title: "Çerez Politikası", href: "/cerez-politikasi" },
];
