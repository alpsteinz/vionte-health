import type { Metadata } from "next";
import { HubPage } from "@/components/sections/hub-page";
import { Myths } from "@/components/sections/myths";
import { services } from "@/content/services";

const title = "Saç Ekimi Teknikleri";
const description =
  "Safir FUE, DHI, tıraşsız saç ekimi ve kadınlarda saç ekimi. Teknik seçimi donör alan yoğunluğuna ve ekim yapılacak bölgeye göre belirlenir.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sac-ekimi" },
  openGraph: { title, description, url: "/sac-ekimi" },
};

export default function Page() {
  const items = services
    .filter((s) => s.slug.startsWith("/sac-ekimi/"))
    .map((s) => ({ title: s.name, href: s.slug, body: s.lead }));

  return (
    <HubPage
      trail={[
        { name: "Ana sayfa", href: "/" },
        { name: "Saç Ekimi", href: "/sac-ekimi" },
      ]}
      eyebrow="Teknikler"
      title="Saç Ekimi Teknikleri Nelerdir?"
      lead="Saç ekiminde teknik seçimi tercih meselesi değildir; donör alanınızın yoğunluğuna, ekim yapılacak bölgenin genişliğine ve mevcut saçlarınızın durumuna göre belirlenir. Aşağıdaki sayfalarda her tekniğin kimlere uygun olduğu ve kimlere uygun olmadığı ayrı ayrı anlatılır."
      items={items}
    >
      <Myths limit={3} />
    </HubPage>
  );
}
