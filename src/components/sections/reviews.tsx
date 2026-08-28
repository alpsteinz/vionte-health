import Link from "next/link";
import { Star, PlayCircle, ArrowRight } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/section";
import { reviews } from "@/content/home";

export function Reviews() {
  return (
    <Section id="yorumlar" tone="white">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHead eyebrow={reviews.eyebrow} title={reviews.title} />

        {/* Google puanı doğrulanabilir olduğu için öne çıkarılır */}
        <div className="reveal border border-line px-6 py-5">
          <div className="flex items-center gap-2">
            <Star className="size-4 fill-blue text-blue" strokeWidth={1.5} aria-hidden />
            <span className="font-serif text-[1.6rem] leading-none text-navy">
              {reviews.google.rating}
            </span>
            <span className="text-[0.875rem] text-muted">/ 5</span>
          </div>
          <p className="mt-2 text-[0.8125rem] text-muted">
            Google&apos;da {reviews.google.count} değerlendirme
          </p>
        </div>
      </div>

      <div className="rule-grid reveal mt-12 md:grid-cols-3">
        {reviews.items.map((item) => (
          <figure key={item.id} className="flex flex-col bg-white">
            <div className="flex aspect-video items-center justify-center gap-2 border-b border-line bg-paper text-muted">
              <PlayCircle className="size-6" strokeWidth={1.5} aria-hidden />
              <span className="text-[0.75rem] uppercase tracking-[0.14em]">
                Video yorum
              </span>
            </div>
            <blockquote className="flex-1 p-6">
              <p className="text-[0.9375rem] leading-relaxed text-ink">
                “{item.quote}”
              </p>
            </blockquote>
            <figcaption className="border-t border-line px-6 py-4 text-[0.8125rem] text-muted">
              <span className="text-ink">{item.name}</span> · {item.meta}
            </figcaption>
          </figure>
        ))}
      </div>

      <Link
        href="/yorumlar"
        className="reveal mt-8 inline-flex items-center gap-2 text-[0.8125rem] uppercase tracking-[0.1em] text-blue transition-colors hover:text-navy"
      >
        Tüm yorumlar
        <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
      </Link>
    </Section>
  );
}
