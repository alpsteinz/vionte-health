import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { FaqList } from "@/components/ui/accordion";
import { MedicalReview } from "@/components/ui/medical-review";
import { AiSummary } from "@/components/ui/ai-summary";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { homeFaq } from "@/content/faq";
import { services } from "@/content/services";

const title = "Sıkça Sorulan Sorular";
const description =
  "Saç ekimi acı verir mi, ekilen saçlar dökülür mü, kaç greft gerekir, herkese saç ekimi yapılabilir mi? Sık sorulan soruların doğrudan cevapları.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sss" },
  openGraph: { title, description, url: "/sss" },
};

const trail = [
  { name: "Ana sayfa", href: "/" },
  { name: "S.S.S.", href: "/sss" },
];

export default function Page() {
  // Hizmet sayfalarındaki sorulardan ana sayfada olmayanları da topla
  const seen = new Set(homeFaq.map((f) => f.question));
  const extra = services
    .flatMap((s) => s.faq)
    .filter((f) => {
      if (seen.has(f.question)) return false;
      seen.add(f.question);
      return true;
    });

  const all = [...homeFaq, ...extra];

  return (
    <>
      <Breadcrumbs trail={trail} />
      <PageHero
        eyebrow="Sıkça sorulanlar"
        title="Saç Ekimi Hakkında Sık Sorulan Sorular"
        lead="Her başlık bir soru, ilk cümle doğrudan cevaptır. Bir sorunun cevabı burada yoksa iletişim sayfasından iletebilirsiniz."
      />

      <Section tone="paper">
        <FaqList items={all} />
      </Section>

      <Container className="pb-20">
        <AiSummary path="/sss" title={title} />
        <MedicalReview />
      </Container>
      <JsonLd data={[faqSchema(all), breadcrumbSchema(trail)]} />
    </>
  );
}
