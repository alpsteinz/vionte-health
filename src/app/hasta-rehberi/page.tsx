import type { Metadata } from "next";
import { HubPage } from "@/components/sections/hub-page";
import { guides } from "@/content/guides";

const title = "Hasta Rehberi";
const description =
  "Operasyon öncesinden bir yıllık kontrole kadar sürecin her adımı: hazırlık, operasyon günü, iyileşme, saç yıkama, sterilizasyon ve fiyatlandırma.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/hasta-rehberi" },
  openGraph: { title, description, url: "/hasta-rehberi" },
};

export default function Page() {
  return (
    <HubPage
      trail={[
        { name: "Ana sayfa", href: "/" },
        { name: "Hasta Rehberi", href: "/hasta-rehberi" },
      ]}
      eyebrow="Rehber"
      title="Saç Ekimi Sürecinde Ne Olur?"
      lead="Ön değerlendirmeden 12. ay kontrolüne kadar sürecin her adımı aşağıda ayrı ayrı anlatılıyor. Amacımız operasyondan önce ne olacağını, sonrasında ne beklemeniz gerektiğini ve hangi durumların normal olduğunu önceden bilmeniz."
      items={guides.map((g) => ({ title: g.name, href: g.slug, body: g.lead }))}
    />
  );
}
