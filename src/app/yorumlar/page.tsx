import type { Metadata } from "next";
import { Star, MessageSquareQuote } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ContentInfo } from "@/components/ui/content-info";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { Copy } from "@/components/ui/copy";
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
  const hazir = ozet.durum === "hazir" && ozet.yorumlar.length > 0;
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
        <div className="mb-12 flex flex-wrap items-center gap-6 border border-line bg-white px-7 py-6">
          <div className="flex items-center gap-2">
            <Star className="size-4 fill-blue text-blue" strokeWidth={1.5} aria-hidden />
            <span className="font-serif text-[1.8rem] leading-none text-navy">
              {ozet.puan !== null ? ozet.puan.toFixed(1).replace(".", ",") : <Copy text="[0,0]" />}
            </span>
            <span className="text-[0.875rem] text-muted">/ 5</span>
          </div>
          <p className="text-[0.9375rem] text-muted">
            Google&apos;da{" "}
            {ozet.adet !== null ? ozet.adet : <Copy text="[000]" />} değerlendirme
            {ozet.url ? (
              <>
                {" · "}
                <a href={ozet.url} target="_blank" rel="noopener noreferrer" className="text-blue underline underline-offset-4">
                  Google&apos;da görün
                </a>
              </>
            ) : null}
          </p>
        </div>

        <div className="rule-grid sm:grid-cols-2 lg:grid-cols-3">
          {hazir
            ? ozet.yorumlar.map((y) => (
                <figure key={y.id} className="flex flex-col bg-white p-7">
                  <div className="flex items-center gap-1" aria-label={`${y.puan} / 5`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={i < y.puan ? "size-3.5 fill-blue text-blue" : "size-3.5 text-line"}
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    ))}
                  </div>
                  <blockquote className="mt-5 flex-1">
                    <p className="text-[0.9375rem] leading-relaxed text-ink">&ldquo;{y.metin}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-6 border-t border-line pt-4 text-[0.8125rem] text-muted">
                    <span className="text-ink">{y.ad}</span>
                    {y.tarih ? ` · ${y.tarih}` : null}
                  </figcaption>
                </figure>
              ))
            : reviews.items.map((item) => (
                <figure key={item.id} className="flex flex-col bg-white p-7">
                  <MessageSquareQuote className="size-5 text-muted" strokeWidth={1.5} aria-hidden />
                  <blockquote className="mt-5 flex-1">
                    <p className="text-[0.9375rem] leading-relaxed text-ink">
                      &ldquo;<Copy text={item.quote} />&rdquo;
                    </p>
                  </blockquote>
                  <figcaption className="mt-6 border-t border-line pt-4 text-[0.8125rem] text-muted">
                    <Copy text={`${item.name} · ${item.meta}`} />
                  </figcaption>
                </figure>
              ))}
        </div>
      </Section>

      <Container className="pb-20">
        <ContentInfo />
      </Container>
      <JsonLd data={rating ? [breadcrumbSchema(trail), rating] : breadcrumbSchema(trail)} />
    </>
  );
}
