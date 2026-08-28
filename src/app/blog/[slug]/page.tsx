import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { MedicalReview } from "@/components/ui/medical-review";
import { AiSummary } from "@/components/ui/ai-summary";
import { JsonLd } from "@/components/ui/json-ld";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { getPost, posts } from "@/content/blog";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, url: `/blog/${post.slug}` },
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const trail = [
    { name: "Ana sayfa", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${post.slug}` },
  ];

  return (
    <>
      <Breadcrumbs trail={trail} />
      <PageHero eyebrow={post.cluster} title={post.title} lead={post.excerpt} />

      <Section tone="paper">
        <article className="mx-auto max-w-[75ch]">
          {post.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28 border-b border-line pb-10 last:border-0 [&+&]:pt-10">
              <h2 className="font-serif text-[clamp(1.5rem,2.6vw,2rem)] leading-snug text-navy">
                {section.heading}
              </h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </article>
      </Section>

      <Container className="pb-20">
        <AiSummary path={`/blog/${post.slug}`} title={post.title} />
        <MedicalReview />
      </Container>

      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            description: post.excerpt,
            path: `/blog/${post.slug}`,
            published: post.published,
          }),
          breadcrumbSchema(trail),
        ]}
      />
    </>
  );
}
