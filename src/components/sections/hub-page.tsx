import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs, type Crumb } from "@/components/ui/breadcrumbs";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ContentInfo } from "@/components/ui/content-info";
import { AiSummary } from "@/components/ui/ai-summary";
import { JsonLd } from "@/components/ui/json-ld";
import { LeadForm } from "./lead-form";
import { breadcrumbSchema } from "@/lib/schema";

export type HubItem = { title: string; href: string; body: string };

export function HubPage({
  trail,
  eyebrow,
  title,
  lead,
  items,
  children,
}: {
  trail: Crumb[];
  eyebrow: string;
  title: string;
  lead: string;
  items: HubItem[];
  children?: React.ReactNode;
}) {
  const path = trail[trail.length - 1].href;
  return (
    <>
      <Breadcrumbs trail={trail} />
      <PageHero eyebrow={eyebrow} title={title} lead={lead} />

      <Section tone="paper">
        <div className="rule-grid md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col bg-white p-7 transition-colors hover:bg-paper md:p-8"
            >
              <h2 className="h3">{item.title}</h2>
              <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                {item.body}
              </p>
              <span className="mt-7 inline-flex items-center gap-2 text-[0.8125rem] uppercase tracking-[0.1em] text-blue transition-colors group-hover:text-navy">
                Ayrıntılar
                <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {children}

      <Section tone="navy">
        <div className="grid gap-12 lg:grid-cols-[1fr_460px] lg:gap-20 xl:gap-28">
          <div className="reveal flex flex-col justify-center">
            <p className="eyebrow eyebrow-light">Ön değerlendirme</p>
            <h2 className="h2 mt-4 text-white">Hangisi size uygun, ölçelim</h2>
            <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-blue-light">
              Hangi tekniğin uygun olduğunu ölçüm belirler: donör alanınızın
              yoğunluğu, ekim yapılacak bölgenin genişliği ve mevcut
              saçlarınızın durumu. Analiz ücretsizdir.
            </p>
          </div>
          <div className="reveal">
            <LeadForm />
          </div>
        </div>
      </Section>

      <Container className="pb-20">
        <AiSummary path={path} title={title} />
        <ContentInfo />
      </Container>

      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
