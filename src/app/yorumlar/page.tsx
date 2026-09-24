import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
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
import { cn } from "@/lib/utils";

const title = "Hasta Yorumları";
const description =
  "Vionte Health danışanlarının yorumları ve Google değerlendirmeleri.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/yorumlar" },
  openGraph: { title, description, url: "/yorumlar" },
};

/** Tamamlayıcı kartın kaç sütun kaplayacağı: kalan hücre sayısı kadar */
const SM_SPAN = ["sm:col-span-2", "sm:col-span-1"];
const LG_SPAN = ["lg:col-span-3", "lg:col-span-2", "lg:col-span-1"];

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
                <GoogleYorumKarti key={y.id} yorum={y} googleUrl={ozet.url} />
              ))}
              {/* Son satırı tamamlayan kart — ızgarada boş (gri) hücre kalmaz */}
              <a
                href={ozet.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex flex-col justify-center bg-white p-7 transition-colors hover:bg-paper",
                  SM_SPAN[ozet.yorumlar.length % 2],
                  LG_SPAN[ozet.yorumlar.length % 3],
                )}
              >
                <p className="font-serif text-[1.25rem] leading-snug text-navy">
                  {ozet.adet ? `${ozet.adet} değerlendirmenin tamamı Google'da` : "Tüm değerlendirmeler Google'da"}
                </p>
                <p className="mt-3 inline-flex items-center gap-1 text-[0.75rem] uppercase tracking-[0.1em] text-blue group-hover:text-navy">
                  Google&apos;da okuyun
                  <ArrowUpRight className="size-3.5" strokeWidth={1.5} aria-hidden />
                </p>
              </a>
            </div>
            <GoogleKaynakNotu ozet={ozet} className="mt-6" />
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
