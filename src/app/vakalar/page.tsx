import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { MedicalReview } from "@/components/ui/medical-review";
import { AiSummary } from "@/components/ui/ai-summary";
import { JsonLd } from "@/components/ui/json-ld";
import { FotografsizVakaKarti } from "@/components/sonuclar/fotografsiz-vaka-karti";
import { breadcrumbSchema } from "@/lib/schema";
import { fotografsizVakalar } from "@/content/results";
import { site } from "@/lib/site";

const title = "Vakalar";
const description =
  "Fotoğrafsız vaka kayıtları: yaş, Norwood seviyesi, donör durumu, greft sayısı, uygulanan teknik ve yönlendirme gerekçesi.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/vakalar" },
  openGraph: { title, description, url: "/vakalar" },
};

const trail = [
  { name: "Ana sayfa", href: "/" },
  { name: "Vakalar", href: "/vakalar" },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs trail={trail} />
      <PageHero
        eyebrow="Vakalar"
        title="Fotoğrafsız Vaka Kayıtları"
        lead="Bu sayfadaki kayıtlar fotoğraf içermez. Her vakada ölçülen donör durumu, planlanan greft sayısı, uygulanan teknik ve o tekniğe neden yönlendirildiği yazılıdır. Bir öncesi–sonrası görseli bu veriler olmadan tek başına bir şey anlatmaz."
      />

      <Section tone="paper">
        <div className="rule-grid md:grid-cols-2 lg:grid-cols-3">
          {fotografsizVakalar.map((kayit) => (
            <FotografsizVakaKarti key={kayit.id} kayit={kayit} />
          ))}
        </div>

        <p className="measure mt-8 text-[0.875rem] leading-relaxed text-muted">
          {site.disclaimers.resultsShort} Görselli sonuçlar ve danışan
          hikayeleri, imzalı yazılı izin ve uygulamayı yapan merkezin bilgisi
          tamamlandığında{" "}
          <Link href="/sonuclarimiz" className="text-blue underline underline-offset-4">
            Sonuçlarımız
          </Link>{" "}
          sayfasında yayınlanır.
        </p>
      </Section>

      <Container className="pb-20">
        <AiSummary path="/vakalar" title={title} />
        <MedicalReview />
      </Container>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
