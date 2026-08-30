import type { Metadata } from "next";
import Image from "next/image";
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
        <div className="grid gap-12 lg:grid-cols-[380px_1fr] lg:gap-20 xl:gap-24">
          <figure className="reveal self-start border border-line bg-white p-3">
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src="/ekip/mehtap-dizge.webp"
                alt="Mehtap Dizge — sertifikalı saç ekim uzmanı, sorumlu teknisyen"
                fill
                sizes="(max-width: 1024px) 100vw, 380px"
                className="object-cover"
                priority
              />
            </div>
            <figcaption className="px-2 py-4">
              <p className="font-serif text-[1.25rem] text-navy">Mehtap Dizge</p>
              <p className="mt-1.5 text-[0.875rem] text-muted">
                Sertifikalı saç ekim uzmanı · Sorumlu teknisyen
              </p>
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">
                Sağlık Bakanlığı saç ekim sertifikası. Aynı zamanda sitenin
                içerik sorumlusu.
              </p>
            </figcaption>
          </figure>

          <div className="reveal">
            <SectionHead
              eyebrow="Yapı"
              title={team.title}
              intro="Kimin hangi aşamada görev aldığı ve hangi belgeye sahip olduğu aşağıda açıkça yazılıdır. Uygulamayı Vionte Health yapmaz; anlaşmalı merkezdeki sertifikalı ekip yapar."
            />

            <dl className="mt-12 divide-y divide-line border-y border-line">
              {team.roles.map((role) => (
                <div key={role.label} className="grid gap-2 py-5 sm:grid-cols-[200px_1fr] sm:gap-8">
                  <dt className="text-[0.8125rem] uppercase tracking-[0.12em] text-blue">
                    {role.label}
                  </dt>
                  <dd className="text-[0.9375rem] leading-relaxed text-ink">{role.value}</dd>
                </div>
              ))}
            </dl>

            <blockquote className="mt-12 border-l-2 border-blue pl-6">
              <p className="measure font-serif text-[1.25rem] leading-snug text-navy md:text-[1.5rem]">
                “{team.quote}”
              </p>
            </blockquote>
          </div>
        </div>
      </Section>

      <Container className="pb-20">
        <ContentInfo />
      </Container>

      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
