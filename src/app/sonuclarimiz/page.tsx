import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { MedicalReview } from "@/components/ui/medical-review";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const title = "Sonuçlarımız";
const description =
  "İzni alınmış kişilere ait uygulama kayıtları; her kartta greft sayısı, yaş, teknik ve kaçıncı ay bilgisi yer alır. Sonuçlar kişiye göre değişir.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sonuclarimiz" },
  openGraph: { title, description, url: "/sonuclarimiz" },
};

const trail = [
  { name: "Ana sayfa", href: "/" },
  { name: "Sonuçlarımız", href: "/sonuclarimiz" },
];

/**
 * Öncesi–sonrası görselleri yalnızca imzalı hasta onam formu varsa yayınlanır.
 * (AGENTS.md — zorunlu unsurlar). Onam formları gelene kadar kartlar boş kalır.
 */
const cases = Array.from({ length: 6 }, (_, i) => ({ id: `vaka-${i + 1}` }));

export default function Page() {
  return (
    <>
      <Breadcrumbs trail={trail} />
      <PageHero
        eyebrow="Sonuçlar"
        title="Öncesi ve Sonrası"
        lead="Her kartta greft sayısı, yaş, uygulanan teknik, kaçıncı ay olduğu ve şehir bilgisi yer alır. Bu veriler olmadan bir öncesi–sonrası görseli tek başına bir şey anlatmaz."
      />

      <Section tone="paper">
        <div className="rule-grid sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((item) => (
            <figure key={item.id} className="bg-white">
              <div className="grid grid-cols-2 gap-px bg-line">
                <div className="relative bg-white">
                  <PhotoPlaceholder label="Görsel bekleniyor" ratio="1/1" />
                  <span className="absolute bottom-0 left-0 bg-navy px-2.5 py-1 text-[0.6875rem] uppercase tracking-[0.14em] text-white">
                    Öncesi
                  </span>
                </div>
                <div className="relative bg-white">
                  <PhotoPlaceholder label="Görsel bekleniyor" ratio="1/1" />
                  <span className="absolute bottom-0 left-0 bg-blue px-2.5 py-1 text-[0.6875rem] uppercase tracking-[0.14em] text-white">
                    Sonrası
                  </span>
                </div>
              </div>
              <figcaption className="border-t border-line p-5 text-[0.8125rem] text-muted">
                [0.000] greft · [00] yaş · [Safir FUE/DHI] · [00]. ay · [Şehir]
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="measure mt-8 text-[0.875rem] leading-relaxed text-muted">
          {site.disclaimers.results}
        </p>
      </Section>

      <Container className="pb-20">
        <MedicalReview />
      </Container>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
