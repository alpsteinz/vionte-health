import type { Metadata } from "next";
import { HubPage } from "@/components/sections/hub-page";
import { services } from "@/content/services";

const title = "Saç Tedavileri";
const description =
  "PRP, mezoterapi, eksozom, kök hücre ve saç analizi. Bu uygulamalar ekim sonrası iyileşme sürecinde ya da dökülmenin erken evrelerinde değerlendirilir.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sac-tedavileri" },
  openGraph: { title, description, url: "/sac-tedavileri" },
};

export default function Page() {
  const items = services
    .filter((s) => s.slug.startsWith("/sac-tedavileri/"))
    .map((s) => ({ title: s.name, href: s.slug, body: s.lead }));

  return (
    <HubPage
      trail={[
        { name: "Ana sayfa", href: "/" },
        { name: "Saç Tedavileri", href: "/sac-tedavileri" },
      ]}
      eyebrow="Tedaviler"
      title="Saç Tedavileri Nelerdir?"
      lead="PRP ve mezoterapi, ekim sonrası iyileşme sürecinde ya da dökülmenin erken evrelerinde ayrı bir tedavi planı olarak değerlendirilir. Bu uygulamalar ileri dökülmede saç ekiminin yerini almaz; hangisinin uygun olduğu saç analizi ve hekim muayenesiyle belirlenir."
      items={items}
    />
  );
}
