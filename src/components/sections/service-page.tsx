import { Check, X } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHead } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { FaqList } from "@/components/ui/accordion";
import { MedicalReview } from "@/components/ui/medical-review";
import { AiSummary } from "@/components/ui/ai-summary";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { JsonLd } from "@/components/ui/json-ld";
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
                <dd className="text-right text-ink">{fact.value}</dd>
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
                  <span>{item}</span>
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
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 3 — İşlem adımları */}
      <Section tone="navy">
        <SectionHead eyebrow="Adımlar" title="İşlem nasıl ilerler" tone="dark" />
        <ol className="rule-grid rule-grid-dark reveal mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {service.steps.map((step, i) => (
            <li key={step.title} className="bg-navy p-7">
              <span className="font-serif text-[2.2rem] leading-none text-blue-light/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-serif text-[1.25rem] text-white">{step.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-blue-light">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 4 — Süre ve iyileşme takvimi */}
      <Section tone="white">
        <SectionHead eyebrow="Takvim" title="Süre ve iyileşme" />
        <dl className="reveal mt-12 divide-y divide-line border-y border-line">
          {service.timeline.map((row) => (
            <div key={row.when} className="grid gap-2 py-5 sm:grid-cols-[160px_1fr] sm:gap-8">
              <dt className="text-[0.8125rem] uppercase tracking-[0.12em] text-blue">{row.when}</dt>
              <dd className="text-[0.9375rem] leading-relaxed text-muted">{row.what}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* 5 — Diğer tekniklerden farkı */}
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

      {/* 6 — Bu teknikle yapılmış sonuçlar */}
      <Section tone={service.comparison ? "white" : "paper"}>
        <SectionHead eyebrow="Sonuçlar" title={`${service.name} ile yapılmış uygulamalar`} />
        <div className="rule-grid reveal mt-12 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <figure key={n} className="bg-white">
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
                [0.000] greft · [00] yaş · {service.name} · [00]. ay · [Şehir]
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="measure reveal mt-6 text-[0.8125rem] leading-relaxed text-muted">
          {site.disclaimers.results}
        </p>
      </Section>

      {/* 7 — Tekniğe özel SSS */}
      {service.faq.length > 0 ? (
        <Section tone="paper">
          <div className="grid gap-12 lg:grid-cols-[380px_1fr] lg:gap-16">
            <SectionHead eyebrow="Sıkça sorulanlar" title={`${service.name} hakkında`} />
            <FaqList items={service.faq} className="reveal" />
          </div>
        </Section>
      ) : null}

      {/* 8 — Form */}
      <Section tone="navy">
        <div className="grid gap-12 lg:grid-cols-[1fr_460px] lg:gap-16">
          <div className="reveal flex flex-col justify-center">
            <p className="eyebrow eyebrow-light">Ön değerlendirme</p>
            <h2 className="h2 mt-4 text-white">Size uygun mu, ölçelim</h2>
            <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-blue-light">
              {site.disclaimers.form} Uygunluk kararı muayene ve tahliller
              sonrasında hekim tarafından verilir.
            </p>
          </div>
          <div className="reveal">
            <LeadForm />
          </div>
        </div>
      </Section>

      {/* 9 — Tıbbi inceleme satırı */}
      <Container className="pb-20">
        <AiSummary path={service.slug} title={service.h1} />
        <MedicalReview />
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
