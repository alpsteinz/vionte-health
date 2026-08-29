import Link from "next/link";
import { DraftNotice } from "@/components/ui/draft-notice";
import { Breadcrumbs, type Crumb } from "@/components/ui/breadcrumbs";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Section, SectionHead } from "@/components/ui/section";
import { FaqList } from "@/components/ui/accordion";
import { MedicalReview } from "@/components/ui/medical-review";
import { AiSummary } from "@/components/ui/ai-summary";
import { JsonLd } from "@/components/ui/json-ld";
import { Copy } from "@/components/ui/copy";
import { ButtonLink } from "@/components/ui/button";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import type { Guide } from "@/content/guides";

/**
 * Rehber/makale şablonu.
 * İçindekiler menüsü Memorial referansından alındı (DESIGN.md).
 */
export function ArticlePage({ guide, trail }: { guide: Guide; trail: Crumb[] }) {
  return (
    <>
      {guide.draftMedicalCopy ? <DraftNotice /> : null}
      <Breadcrumbs trail={trail} />
      <PageHero title={guide.h1} lead={guide.lead} eyebrow="Hasta rehberi" />

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[236px_minmax(0,68ch)] lg:justify-center lg:gap-20">
          {/* İçindekiler */}
          <nav aria-label="İçindekiler" className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow border-t border-line pt-5">İçindekiler</p>
            <ol className="mt-5 space-y-2.5 border-l border-line">
              {guide.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="-ml-px block border-l border-transparent pl-4 text-[0.9375rem] text-muted transition-colors hover:border-blue hover:text-blue"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article>
            {guide.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28 border-b border-line pb-10 last:border-0 [&+&]:pt-10">
                <h2 className="font-serif text-[clamp(1.5rem,2.6vw,2rem)] text-navy">
                  {section.heading}
                </h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
                    <Copy text={paragraph} />
                  </p>
                ))}
                {section.list ? (
                  <ul className="mt-6 space-y-2.5 border-l-2 border-line pl-6">
                    {section.list.map((item) => (
                      <li key={item} className="text-[0.9375rem] leading-relaxed text-muted">
                        <Copy text={item} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <div className="mt-12 border border-line bg-white p-7">
              <p className="eyebrow">Ön değerlendirme</p>
              <h2 className="h3 mt-4">Size uygun mu, ölçelim</h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                {site.disclaimers.form}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/#form">{site.cta.primary}</ButtonLink>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center px-6 py-3.5 text-[0.8125rem] uppercase tracking-[0.1em] text-navy underline underline-offset-4 transition-colors hover:text-blue"
                >
                  İletişim
                </Link>
              </div>
            </div>
          </article>
        </div>
      </Section>

      {guide.faq.length > 0 ? (
        <Section tone="white">
          <div className="grid gap-12 lg:grid-cols-[300px_1fr] lg:gap-16">
            <SectionHead eyebrow="Sıkça sorulanlar" title="Bu konuda sorulanlar" />
            <FaqList items={guide.faq} className="reveal" />
          </div>
        </Section>
      ) : null}

      <Container className="pb-20">
        <AiSummary path={guide.slug} title={guide.h1} />
        <MedicalReview />
      </Container>

      <JsonLd
        data={[
          articleSchema({
            title: guide.h1,
            description: guide.metaDescription,
            path: guide.slug,
          }),
          breadcrumbSchema(trail),
          ...(guide.faq.length ? [faqSchema(guide.faq)] : []),
        ]}
      />
    </>
  );
}
