import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/section";
import { techniques } from "@/content/home";

export function Techniques() {
  return (
    <Section id="teknikler" tone="paper">
      <SectionHead
        eyebrow={techniques.eyebrow}
        title={techniques.title}
        intro={techniques.intro}
      />

      <div className="rule-grid reveal mt-12 md:grid-cols-3">
        {techniques.items.map((item) => (
          <article key={item.name} className="flex flex-col bg-white p-7 md:p-8">
            <h3 className="h3">{item.name}</h3>
            <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-muted">
              {item.body}
            </p>

            <dl className="mt-7 space-y-2.5 border-t border-line pt-5 text-[0.875rem]">
              {item.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-4">
                  <dt className="text-muted">{spec.label}</dt>
                  <dd className="text-right text-ink">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <Link
              href={item.href}
              className="mt-7 inline-flex items-center gap-2 text-[0.8125rem] uppercase tracking-[0.1em] text-blue transition-colors hover:text-navy"
            >
              Ayrıntılar
              <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}
