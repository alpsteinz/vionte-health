import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ContentInfo } from "@/components/ui/content-info";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import {
  GoogleKaynakNotu,
  GooglePuanKutusu,
  GoogleYorumKarti,
  GoogleYorumYok,
} from "@/components/yorumlar/google-yorumlar";
import { getirGoogleYorumlari, aggregateRatingSchema } from "@/lib/google-reviews";
import { reviews } from "@/content/home";

const title = "Hasta Yorumları";
const description =
  "Vionte Health danışanlarının yorumları ve Google değerlendirmeleri.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/yorumlar" },
  openGraph: { title, description, url: "/yorumlar" },
};

const trail = [
  { name: "Ana sayfa", href: "/" },
  { name: "Yorumlar", href: "/yorumlar" },
];

export default async function Page() {
  const ozet = await getirGoogleYorumlari();
  const rating = aggregateRatingSchema(ozet);
  return (
    <>
      <Breadcrumbs trail={trail} />
      <PageHero
        eyebrow={reviews.eyebrow}
        title="Danışanlar Ne Anlatıyor?"
        lead="Buradaki yorumlar Google Business Profile üzerinden gelir; biz yazmayız, düzenlemeyiz. Doğrulanabilir olduğu için tek gösterdiğimiz kaynak bu."
      />

      <Section tone="paper">
        <GooglePuanKutusu ozet={ozet} className="mb-12 inline-block" />

        {ozet.yorumlar.length > 0 ? (
          <>
            <div className="rule-grid sm:grid-cols-2 lg:grid-cols-3">
              {ozet.yorumlar.map((y) => (
                <GoogleYorumKarti key={y.id} yorum={y} />
              ))}
            </div>
            <GoogleKaynakNotu className="mt-6" />
          </>
        ) : (
          <GoogleYorumYok ozet={ozet} />
        )}
      </Section>

      <Container className="pb-20">
        <ContentInfo />
      </Container>
      <JsonLd data={rating ? [breadcrumbSchema(trail), rating] : breadcrumbSchema(trail)} />
    </>
  );
}
