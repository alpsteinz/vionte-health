import Link from "next/link";
import { ArrowRight, X, Check } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/section";
import { myths } from "@/content/myths";

export function Myths({ limit }: { limit?: number }) {
  const items = limit ? myths.slice(0, limit) : myths;
  return (
    <Section id="dogru-bilinen-yanlislar" tone="white">
      <SectionHead
        eyebrow="Doğru bilinen yanlışlar"
        title="Sık duyulan iddialar"
        intro="Sektörde tekrarlanan bazı cümleler doğru değil. Aşağıda her birinin karşılığı var."
      />

      <div className="rule-grid reveal mt-12 md:grid-cols-2 lg:grid-cols-3">
        {items.map((myth) => (
          <article key={myth.slug} className="bg-white p-7">
            <p className="flex items-start gap-3 font-serif text-[1.15rem] leading-[1.25] text-navy">
              <X className="mt-1 size-4 shrink-0 text-[#b3261e]" strokeWidth={2} aria-hidden />
              <span>“{myth.claim}”</span>
            </p>
            <p className="mt-5 flex items-start gap-3 text-[0.9375rem] leading-relaxed text-muted">
              <Check className="mt-1 size-4 shrink-0 text-blue" strokeWidth={2} aria-hidden />
              <span>{myth.answer}</span>
            </p>
          </article>
        ))}
      </div>

      {limit ? (
        <Link
          href="/dogru-bilinen-yanlislar"
          className="reveal mt-8 inline-flex items-center gap-2 text-[0.8125rem] uppercase tracking-[0.1em] text-blue transition-colors hover:text-navy"
        >
          Tümünü okuyun
          <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
        </Link>
      ) : null}
    </Section>
  );
}
