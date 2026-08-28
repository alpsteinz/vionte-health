import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/section";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { gallery } from "@/content/home";

export function Gallery() {
  return (
    <Section id="galeri" tone="paper">
      <SectionHead
        eyebrow={gallery.eyebrow}
        title={gallery.title}
        intro={gallery.subtitle}
      />

      <div className="rule-grid reveal mt-12 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.items.map((item) => (
          <figure key={item.id} className="bg-white">
            <PhotoPlaceholder label="Fotoğraf bekleniyor" ratio="4/3" />
            <figcaption className="border-t border-line px-5 py-3.5 text-[0.8125rem] text-muted">
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <Link
        href="/galeri"
        className="reveal mt-8 inline-flex items-center gap-2 text-[0.8125rem] uppercase tracking-[0.1em] text-blue transition-colors hover:text-navy"
      >
        Klinik galerisi
        <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
      </Link>
    </Section>
  );
}
