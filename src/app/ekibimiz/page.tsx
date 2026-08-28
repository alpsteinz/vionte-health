import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHead } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { MedicalReview } from "@/components/ui/medical-review";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema, physicianSchema } from "@/lib/schema";
import { team } from "@/content/home";

const title = "Ekibimiz";
const description =
  "Kanal açma aşamasını saç ekimi uygulayıcı sertifikasına sahip hekim yürütür; greft alımı ve yerleştirme sertifikalı sağlık personeli tarafından hekim sorumluluğunda yapılır.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ekibimiz" },
  openGraph: { title, description, url: "/ekibimiz" },
};

const trail = [
  { name: "Ana sayfa", href: "/" },
  { name: "Ekibimiz", href: "/ekibimiz" },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs trail={trail} />
      <PageHero eyebrow={team.eyebrow} title="Uygulamayı Kim Yapar?" lead={team.body} />

      <Section tone="paper">
        <SectionHead
          eyebrow="Yapı"
          title={team.title}
          intro="Bu yapı mevzuata uygundur ve olduğu gibi anlatılır. Kimlerin hangi aşamada görev aldığı ve hangi belgeye sahip olduğu aşağıda açıkça yazılıdır."
        />

        <dl className="reveal mt-12 divide-y divide-line border-y border-line">
          {team.roles.map((role) => (
            <div key={role.label} className="grid gap-2 py-5 sm:grid-cols-[220px_1fr] sm:gap-8">
              <dt className="text-[0.8125rem] uppercase tracking-[0.12em] text-blue">
                {role.label}
              </dt>
              <dd className="text-[0.9375rem] leading-relaxed text-ink">{role.value}</dd>
            </div>
          ))}
        </dl>

        <blockquote className="reveal mt-12 border-l-2 border-blue pl-6">
          <p className="measure font-serif text-[1.25rem] leading-snug text-navy md:text-[1.5rem]">
            “{team.quote}”
          </p>
        </blockquote>
      </Section>

      <Section tone="white">
        <SectionHead eyebrow="Ekip" title="Uygulama ekibi" />
        <div className="rule-grid reveal mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <figure key={n} className="bg-white">
              <PhotoPlaceholder label="Fotoğraf bekleniyor" ratio="3/4" />
              <figcaption className="border-t border-line p-6">
                <p className="font-serif text-[1.2rem] text-navy">[Ad Soyad]</p>
                <p className="mt-1.5 text-[0.875rem] text-muted">[Unvan / görev]</p>
                <p className="mt-3 text-[0.8125rem] text-muted">
                  [Bakanlık tescilli sertifika bilgisi]
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Container className="pb-20">
        <MedicalReview />
      </Container>

      <JsonLd data={[physicianSchema(), breadcrumbSchema(trail)]} />
    </>
  );
}
