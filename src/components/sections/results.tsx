import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/section";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { results } from "@/content/home";
import { site } from "@/lib/site";

export function Results() {
  return (
    <Section id="sonuclar" tone="paper">
      <SectionHead eyebrow={results.eyebrow} title={results.title} />

      <div className="rule-grid reveal mt-12 md:grid-cols-3">
        {results.cases.map((item) => (
          <figure key={item.id} className="bg-white">
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

            {/* Veri katmanı: greft · yaş · teknik · ay · şehir */}
            <dl className="flex flex-wrap gap-x-2 gap-y-1 border-t border-line p-5 text-[0.8125rem] text-muted">
              <div className="flex gap-1.5">
                <dt className="sr-only">Greft sayısı</dt>
                <dd className="text-ink">{item.grafts} greft</dd>
              </div>
              <span aria-hidden>·</span>
              <div className="flex gap-1.5">
                <dt className="sr-only">Yaş</dt>
                <dd>{item.age} yaş</dd>
              </div>
              <span aria-hidden>·</span>
              <div className="flex gap-1.5">
                <dt className="sr-only">Teknik</dt>
                <dd>{item.technique}</dd>
              </div>
              <span aria-hidden>·</span>
              <div className="flex gap-1.5">
                <dt className="sr-only">Kaçıncı ay</dt>
                <dd>{item.month}. ay</dd>
              </div>
              <span aria-hidden>·</span>
              <div className="flex gap-1.5">
                <dt className="sr-only">Şehir</dt>
                <dd>{item.city}</dd>
              </div>
            </dl>
          </figure>
        ))}
      </div>

      <p className="measure reveal mt-6 text-[0.8125rem] leading-relaxed text-muted">
        {site.disclaimers.results}
      </p>

      <Link
        href="/sonuclarimiz"
        className="reveal mt-8 inline-flex items-center gap-2 text-[0.8125rem] uppercase tracking-[0.1em] text-blue transition-colors hover:text-navy"
      >
        Tüm sonuçlar
        <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
      </Link>
    </Section>
  );
}
