import type { Metadata } from "next";
import { Star, PlayCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ContentInfo } from "@/components/ui/content-info";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { reviews } from "@/content/home";

const title = "Hasta Yorumları";
const description =
  "Vionte danışanlarının yorumları ve Google değerlendirmeleri.";

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

const items = Array.from({ length: 6 }, (_, i) => ({
  id: `yorum-${i + 1}`,
  name: "[Ad S.]",
  meta: "[Safir FUE/DHI · 00. ay]",
  quote: "[Hasta yorumu — video yorum bağlantısı ile birlikte]",
}));

export default function Page() {
  return (
    <>
      <Breadcrumbs trail={trail} />
      <PageHero
        eyebrow={reviews.eyebrow}
        title="Hastalar Ne Anlatıyor?"
        lead="Aşağıdaki yorumlar hastaların kendi anlatımlarıdır. Google değerlendirmeleri de sayfada yer alır; doğrulanabilir olduğu için yorumların yanında ayrıca gösterilir."
      />

      <Section tone="paper">
        <div className="mb-12 flex flex-wrap items-center gap-6 border border-line bg-white px-7 py-6">
          <div className="flex items-center gap-2">
            <Star className="size-4 fill-blue text-blue" strokeWidth={1.5} aria-hidden />
            <span className="font-serif text-[1.8rem] leading-none text-navy">
              {reviews.google.rating}
            </span>
            <span className="text-[0.875rem] text-muted">/ 5</span>
          </div>
          <p className="text-[0.9375rem] text-muted">
            Google&apos;da {reviews.google.count} değerlendirme ·{" "}
            <span className="text-ink">{reviews.google.href}</span>
          </p>
        </div>

        <div className="rule-grid sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <figure key={item.id} className="flex flex-col bg-white">
              <div className="flex aspect-video items-center justify-center gap-2 border-b border-line bg-paper text-muted">
                <PlayCircle className="size-6" strokeWidth={1.5} aria-hidden />
                <span className="text-[0.75rem] uppercase tracking-[0.14em]">
                  Video yorum
                </span>
              </div>
              <blockquote className="flex-1 p-6">
                <p className="text-[0.9375rem] leading-relaxed text-ink">“{item.quote}”</p>
              </blockquote>
              <figcaption className="border-t border-line px-6 py-4 text-[0.8125rem] text-muted">
                <span className="text-ink">{item.name}</span> · {item.meta}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Container className="pb-20">
        <ContentInfo />
      </Container>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
