import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHead } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ContentInfo } from "@/components/ui/content-info";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { posts, clusters } from "@/content/blog";

const title = "Blog";
const description =
  "Saç dökülmesi, operasyon öncesi ve sonrası, teknik karşılaştırmaları ve doğru bilinen yanlışlar üzerine yazılar.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: { title, description, url: "/blog" },
};

const trail = [
  { name: "Ana sayfa", href: "/" },
  { name: "Blog", href: "/blog" },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs trail={trail} />
      <PageHero
        eyebrow="Blog"
        title="Saç Ekimi ve Saç Dökülmesi Üzerine"
        lead="Yazılar konu kümeleri halinde ilerler; her küme ilgili hizmet sayfasına bağlanır. Sağlık içeriği olduğu için her yazı yayından önce tıbbi incelemeden geçer."
      />

      {posts.length > 0 ? (
        <Section tone="paper">
          <div className="rule-grid md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white p-7"
              >
                <p className="eyebrow">{post.cluster}</p>
                <h2 className="h3 mt-4">{post.title}</h2>
                <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                <span className="mt-7 inline-flex items-center gap-2 text-[0.8125rem] uppercase tracking-[0.1em] text-blue group-hover:text-navy">
                  Okuyun
                  <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      <Section tone={posts.length > 0 ? "white" : "paper"}>
        <SectionHead
          eyebrow="Yayın planı"
          title="Konu kümeleri"
          intro="Ayda 4–8 iyi makale, 100 vasat makaleden değerlidir. Aşağıdaki kümeler yayın sırasını belirler; her küme ilgili hizmet sayfasına iç link verir."
        />
        <div className="rule-grid reveal mt-12 md:grid-cols-2 lg:grid-cols-3">
          {clusters.map((cluster) => (
            <article key={cluster.title} className="bg-white p-7">
              <h3 className="h3">{cluster.title}</h3>
              <ul className="mt-5 space-y-2.5">
                {cluster.topics.map((topic) => (
                  <li key={topic} className="text-[0.9375rem] leading-relaxed text-muted">
                    {topic}
                  </li>
                ))}
              </ul>
              <Link
                href={cluster.href}
                className="mt-6 inline-flex items-center gap-2 text-[0.8125rem] uppercase tracking-[0.1em] text-blue transition-colors hover:text-navy"
              >
                İlgili sayfa
                <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
              </Link>
            </article>
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
