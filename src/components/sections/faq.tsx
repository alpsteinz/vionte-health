import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/section";
import { FaqList } from "@/components/ui/accordion";
import { homeFaq } from "@/content/faq";

export function Faq() {
  return (
    <Section id="sss" tone="white">
      <div className="grid gap-12 lg:grid-cols-[380px_1fr] lg:gap-16">
        <div>
          <SectionHead eyebrow="Sıkça sorulanlar" title="Önce sorular" />
          <Link
            href="/sss"
            className="reveal mt-8 inline-flex items-center gap-2 text-[0.8125rem] uppercase tracking-[0.1em] text-blue transition-colors hover:text-navy"
          >
            Tüm sorular
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
          </Link>
        </div>
        <FaqList items={homeFaq} className="reveal" />
      </div>
    </Section>
  );
}
