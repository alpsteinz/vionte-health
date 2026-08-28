import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { MedicalReview } from "@/components/ui/medical-review";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { gallery } from "@/content/home";

const title = "Klinik Galerisi";
const description =
  "Danışma odasından operasyon salonuna, kliniğin tamamı. Fotoğraflar rötuşsuzdur.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/galeri" },
  openGraph: { title, description, url: "/galeri" },
};

const trail = [
  { name: "Ana sayfa", href: "/" },
  { name: "Galeri", href: "/galeri" },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs trail={trail} />
      <PageHero
        eyebrow={gallery.eyebrow}
        title="Kliniği Önceden Görün"
        lead={gallery.subtitle}
      />

      <Section tone="paper">
        <div className="rule-grid sm:grid-cols-2 lg:grid-cols-3">
          {gallery.items.map((item) => (
            <figure key={item.id} className="bg-white">
              <PhotoPlaceholder label="Fotoğraf bekleniyor" ratio="4/3" />
              <figcaption className="border-t border-line px-5 py-3.5 text-[0.8125rem] text-muted">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Container className="pb-20">
        <MedicalReview />
      </Container>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
