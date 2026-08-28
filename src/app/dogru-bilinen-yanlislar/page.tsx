import type { Metadata } from "next";
import { X, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { MedicalReview } from "@/components/ui/medical-review";
import { AiSummary } from "@/components/ui/ai-summary";
import { JsonLd } from "@/components/ui/json-ld";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { myths } from "@/content/myths";

const title = "Saç Ekiminde Doğru Bilinen Yanlışlar";
const description =
  "Yaz aylarında saç ekimi yapılmaz mı, safir DHI'dan iyi midir, komplikasyon riski var mıdır? Sektörde tekrarlanan iddiaların karşılığı.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/dogru-bilinen-yanlislar" },
  openGraph: { title, description, url: "/dogru-bilinen-yanlislar" },
};

const trail = [
  { name: "Ana sayfa", href: "/" },
  { name: "Doğru Bilinen Yanlışlar", href: "/dogru-bilinen-yanlislar" },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs trail={trail} />
      <PageHero
        eyebrow="Doğru bilinen yanlışlar"
        title="Saç Ekiminde Doğru Bilinen Yanlışlar"
        lead="Sektörde sık tekrarlanan bazı cümleler doğru değil. Aşağıda beş iddia ve her birinin karşılığı yer alıyor."
      />

      <Section tone="paper">
        <div className="mx-auto max-w-[75ch] divide-y divide-line border-y border-line">
          {myths.map((myth) => (
            <article key={myth.slug} id={myth.slug} className="scroll-mt-28 py-10">
              <h2 className="flex items-start gap-3 font-serif text-[clamp(1.35rem,2.4vw,1.8rem)] leading-snug text-navy">
                <X className="mt-1.5 size-5 shrink-0 text-[#b3261e]" strokeWidth={2} aria-hidden />
                <span>“{myth.claim}”</span>
              </h2>
              <p className="mt-5 flex items-start gap-3 text-[1.0625rem] leading-relaxed text-muted">
                <Check className="mt-1.5 size-5 shrink-0 text-blue" strokeWidth={2} aria-hidden />
                <span>{myth.answer}</span>
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Container className="pb-20">
        <AiSummary path="/dogru-bilinen-yanlislar" title={title} />
        <MedicalReview />
      </Container>

      <JsonLd
        data={[
          articleSchema({ title, description, path: "/dogru-bilinen-yanlislar" }),
          faqSchema(myths.map((m) => ({ question: `"${m.claim}" doğru mu?`, answer: m.answer }))),
          breadcrumbSchema(trail),
        ]}
      />
    </>
  );
}
