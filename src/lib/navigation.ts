export type NavChild = { title: string; href: string; note?: string };
export type NavItem = { title: string; href: string; children?: NavChild[] };

/**
 * Menü, danışmanlık konumlandırmasına göre kurulur.
 * "Klinik" başlığı yoktur — Vionte'nin kendi kliniği yoktur.
 */
export const navigation: NavItem[] = [
  {
    title: "Saç Ekimi",
    href: "/sac-ekimi",
    children: [
      { title: "Safir FUE", href: "/sac-ekimi/safir-fue" },
      { title: "DHI", href: "/sac-ekimi/dhi" },
      { title: "Tıraşsız Saç Ekimi", href: "/sac-ekimi/tirassiz-sac-ekimi" },
      { title: "Kadınlarda Saç Ekimi", href: "/sac-ekimi/kadin-sac-ekimi" },
      { title: "Vücut Kılından Saç Ekimi", href: "/sac-ekimi/vucut-kilindan-sac-ekimi" },
      { title: "İğnesiz Anestezi", href: "/sac-ekimi/ignesiz-anestezi" },
    ],
  },
  { title: "Sakal ve Bıyık Ekimi", href: "/sakal-ekimi" },
  { title: "Kaş Ekimi", href: "/kas-ekimi" },
  {
    title: "Saç Tedavileri",
    href: "/sac-tedavileri",
    children: [
      { title: "PRP", href: "/sac-tedavileri/prp" },
      { title: "Mezoterapi", href: "/sac-tedavileri/mezoterapi" },
      { title: "Kök Hücre", href: "/sac-tedavileri/kok-hucre" },
      { title: "Büyüme Faktörü", href: "/sac-tedavileri/buyume-faktoru" },
      { title: "Saç Analizi", href: "/sac-tedavileri/sac-analizi" },
    ],
  },
  {
    title: "Danışmanlık",
    href: "/neden-danisman",
    children: [
      { title: "Neden Danışman?", href: "/neden-danisman" },
      { title: "Ücretsiz Saç Analizi", href: "/ucretsiz-sac-analizi" },
      {
        title: "Klinik Seçerken Nelere Dikkat Edilmeli",
        href: "/klinik-secerken-nelere-dikkat-edilmeli",
      },
      {
        title: "Saç Ekimi Öncesi Sorulacak Sorular",
        href: "/sac-ekimi-oncesi-sorulacak-sorular",
      },
      { title: "Ekibimiz", href: "/ekibimiz" },
    ],
  },
  {
    title: "Rehber",
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
      { title: "Doğru Bilinen Yanlışlar", href: "/dogru-bilinen-yanlislar" },
      { title: "Vakalar", href: "/vakalar" },
      { title: "Yorumlar", href: "/yorumlar" },
      { title: "S.S.S.", href: "/sss" },
      { title: "Blog", href: "/blog" },
    ],
  },
  { title: "İletişim", href: "/iletisim" },
];

export const legalNavigation: NavChild[] = [
  { title: "KVKK Aydınlatma Metni", href: "/kvkk-aydinlatma-metni" },
  { title: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
  { title: "Çerez Politikası", href: "/cerez-politikasi" },
];
