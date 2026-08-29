import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHead } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ContentInfo } from "@/components/ui/content-info";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
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
      <PageHero eyebrow={team.eyebrow} title="Kimlerle Çalışıyoruz?" lead={team.body} />

      <Section tone="paper">
        <SectionHead
          eyebrow="Yapı"
          title={team.title}
          intro="Kimin hangi aşamada görev aldığı ve hangi belgeye sahip olduğu aşağıda açıkça yazılıdır. Uygulamayı Vionte yapmaz; anlaşmalı merkezdeki sertifikalı ekip yapar."
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

      <Container className="pb-20">
        <ContentInfo />
      </Container>

      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
