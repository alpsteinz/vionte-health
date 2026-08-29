import { Check, X } from "lucide-react";
import { DraftNotice } from "@/components/ui/draft-notice";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHead } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { FaqList } from "@/components/ui/accordion";
import { ContentInfo } from "@/components/ui/content-info";
import { AiSummary } from "@/components/ui/ai-summary";
import { JsonLd } from "@/components/ui/json-ld";
import { Copy } from "@/components/ui/copy";
import { LeadForm } from "./lead-form";
import { breadcrumbSchema, faqSchema, procedureSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import type { Service } from "@/content/services";

/** AGENTS.md — hizmet sayfası şablonu (8 adım) */
export function ServicePage({ service }: { service: Service }) {
  const trail = [
    { name: "Ana sayfa", href: "/" },
    ...(service.parent ? [service.parent] : []),
    { name: service.name, href: service.slug },
  ];

  return (
    <>
      {service.draftMedicalCopy ? <DraftNotice /> : null}
      <Breadcrumbs trail={trail} />

      {/* 1 — Teknik nedir: doğrudan cevap */}
      <PageHero
        eyebrow={service.eyebrow}
        title={service.h1}
        lead={service.lead}
        aside={
          <dl className="divide-y divide-line border border-line bg-white text-[0.875rem]">
            {service.facts.map((fact) => (
              <div key={fact.label} className="flex flex-wrap justify-between gap-x-4 gap-y-1 px-5 py-3.5">
                <dt className="text-muted">{fact.label}</dt>
                <dd className="text-right text-ink">
                  <Copy text={fact.value} />
                </dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* 2 — Kimlere uygun / kimlere uygun değil */}
      <Section tone="paper">
        <SectionHead
          eyebrow="Uygunluk"
          title="Kimlere uygun, kimlere uygun değil"
          intro="Kendi hizmetimizin sınırını söylemek, uygunluk kararının muayeneye ait olduğunu belirtmek kadar önemlidir."
        />
        <div className="rule-grid reveal mt-12 md:grid-cols-2">
          <div className="bg-white p-7 md:p-8">
            <h3 className="h3">Uygun olabilir</h3>
            <ul className="mt-6 space-y-3.5">
              {service.suitableFor.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-muted">
                  <Check className="mt-1 size-4 shrink-0 text-blue" strokeWidth={2} aria-hidden />
                  <span>
                    <Copy text={item} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-7 md:p-8">
            <h3 className="h3">Uygun olmayabilir</h3>
            <ul className="mt-6 space-y-3.5">
              {service.notSuitableFor.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-muted">
                  <X className="mt-1 size-4 shrink-0 text-[#b3261e]" strokeWidth={2} aria-hidden />
                  <span>
                    <Copy text={item} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 3 — Ne zaman ne olur (uygulama adımları değil, danışan takvimi) */}
      <Section tone="navy">
        <SectionHead eyebrow="Takvim" title="Ne zaman ne olur" tone="dark" />
        <dl className="reveal mt-12 divide-y divide-line-dark border-y border-line-dark">
          {service.timeline.map((row) => (
            <div key={row.when} className="grid gap-2 py-5 sm:grid-cols-[200px_1fr] sm:gap-8">
              <dt className="text-[0.8125rem] uppercase tracking-[0.12em] text-blue-light">
                <Copy text={row.when} />
              </dt>
              <dd className="text-[0.9375rem] leading-relaxed text-blue-light">
                <Copy text={row.what} />
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* 4 — Diğer tekniklerden farkı */}
      {service.comparison ? (
        <Section tone="paper">
          <SectionHead
            eyebrow="Karşılaştırma"
            title={service.comparison.title}
            intro={service.comparison.note}
          />
          <div className="reveal mt-12 overflow-x-auto border border-line bg-white">
            <table className="w-full min-w-[560px] border-collapse text-left text-[0.9375rem]">
              <caption className="sr-only">{service.comparison.title}</caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="w-[26%] px-5 py-4 text-[0.75rem] uppercase tracking-[0.14em] text-muted">
                    Ölçüt
                  </th>
                  <th scope="col" className="px-5 py-4 font-serif text-[1.1rem] font-normal text-navy">
                    {service.comparison.columns[0]}
                  </th>
                  <th scope="col" className="px-5 py-4 font-serif text-[1.1rem] font-normal text-navy">
                    {service.comparison.columns[1]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {service.comparison.rows.map((row) => (
                  <tr key={row.label} className="border-b border-line last:border-0">
                    <th scope="row" className="px-5 py-4 font-normal text-muted">
                      {row.label}
                    </th>
                    <td className="px-5 py-4 text-ink">{row.a}</td>
                    <td className="px-5 py-4 text-ink">{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      ) : null}

      {/* 5 — Tekniğe özel SSS */}
      {service.faq.length > 0 ? (
        <Section tone={service.comparison ? "paper" : "white"}>
          <div className="grid gap-12 lg:grid-cols-[380px_1fr] lg:gap-16">
            <SectionHead eyebrow="Sıkça sorulanlar" title={`${service.name} hakkında`} />
            <FaqList items={service.faq} className="reveal" />
          </div>
        </Section>
      ) : null}

      {/* 6 — Form */}
      <Section tone="navy">
        <div className="grid gap-12 lg:grid-cols-[1fr_460px] lg:gap-16">
          <div className="reveal flex flex-col justify-center">
            <p className="eyebrow eyebrow-light">Ön değerlendirme</p>
            <h2 className="h2 mt-4 text-white">Size uygun mu, ölçelim</h2>
            <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-blue-light">
              Ücretsiz saç analiziyle donör kapasitenizi ölçer, size uygun
              tekniği ve anlaşmalı merkezi birlikte belirleriz.{" "}
              {site.disclaimers.form}
            </p>
          </div>
          <div className="reveal">
            <LeadForm />
          </div>
        </div>
      </Section>

      {/* 7 — Sayfa künyesi */}
      <Container className="pb-20">
        <AiSummary path={service.slug} title={service.h1} />
        <ContentInfo />
      </Container>

      <JsonLd
        data={[
          procedureSchema({
            name: service.name,
            description: service.lead,
            path: service.slug,
          }),
          breadcrumbSchema(trail),
          ...(service.faq.length ? [faqSchema(service.faq)] : []),
        ]}
      />
    </>
  );
}
