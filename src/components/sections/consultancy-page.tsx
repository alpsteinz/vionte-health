import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ContentInfo } from "@/components/ui/content-info";
import { AiSummary } from "@/components/ui/ai-summary";
import { JsonLd } from "@/components/ui/json-ld";
import { Copy } from "@/components/ui/copy";
import { LeadForm } from "./lead-form";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import type { DanismanlikSayfasi } from "@/content/consultancy";

/** Danışmanlık sayfası şablonu — içindekiler + gövde + form */
export function ConsultancyPage({ sayfa }: { sayfa: DanismanlikSayfasi }) {
  const trail = [
    { name: "Ana sayfa", href: "/" },
    { name: sayfa.name, href: sayfa.slug },
  ];

  return (
    <>
      <Breadcrumbs trail={trail} />
      <PageHero
        eyebrow={sayfa.eyebrow}
        title={sayfa.h1}
        lead={sayfa.lead}
        aside={
          sayfa.gorsel ? (
            <figure className="border border-line bg-white p-3">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={sayfa.gorsel.src}
                  alt={sayfa.gorsel.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 340px"
                  className="object-cover"
                  priority
                />
              </div>
              {sayfa.gorsel.kunye ? (
                <figcaption className="px-2 pb-1 pt-3.5 text-[0.8125rem] text-muted">
                  {sayfa.gorsel.kunye}
                </figcaption>
              ) : null}
            </figure>
          ) : undefined
        }
      />

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[236px_minmax(0,68ch)] lg:justify-center lg:gap-20">
          <nav aria-label="İçindekiler" className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow border-t border-line pt-5">İçindekiler</p>
            <ol className="mt-5 space-y-2.5 border-l border-line">
              {sayfa.sections.map((b) => (
                <li key={b.id}>
                  <a
                    href={`#${b.id}`}
                    className="-ml-px block border-l border-transparent pl-4 text-[0.9375rem] text-muted transition-colors hover:border-blue hover:text-blue"
                  >
                    {b.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article>
            {sayfa.sections.map((b) => (
              <section
                key={b.id}
                id={b.id}
                className="scroll-mt-28 border-b border-line pb-10 last:border-0 [&+&]:pt-10"
              >
                <h2 className="font-serif text-[clamp(1.5rem,2.6vw,2rem)] text-navy">
                  {b.heading}
                </h2>
                {b.body.map((p) => (
                  <p key={p} className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
                    <Copy text={p} />
                  </p>
                ))}
                {b.list ? (
                  <ul className="mt-6 space-y-2.5 border-l-2 border-line pl-6">
                    {b.list.map((item) => (
                      <li key={item} className="text-[0.9375rem] leading-relaxed text-muted">
                        <Copy text={item} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </article>
        </div>
      </Section>

      <Section tone="navy">
        <div className="grid gap-12 lg:grid-cols-[1fr_460px] lg:gap-20 xl:gap-28">
          <div className="reveal flex flex-col justify-center">
            <p className="eyebrow eyebrow-light">Ücretsiz saç analizi</p>
            <h2 className="h2 mt-4 text-white">Ölçelim, sonra konuşalım</h2>
            <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-blue-light">
              Dökülme tipinizi ve donör kapasitenizi ölçer, size uygun tekniği
              ve anlaşmalı merkezi birlikte belirleriz. {site.disclaimers.form}
            </p>
          </div>
          <div className="reveal">
            <LeadForm />
          </div>
        </div>
      </Section>

      <Container className="pb-20">
        <AiSummary path={sayfa.slug} title={sayfa.h1} />
        <ContentInfo />
      </Container>

      <JsonLd
        data={[
          articleSchema({
            title: sayfa.h1,
            description: sayfa.metaDescription,
            path: sayfa.slug,
          }),
          breadcrumbSchema(trail),
        ]}
      />
    </>
  );
}
