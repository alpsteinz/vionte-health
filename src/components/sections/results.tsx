import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/section";
import { FotografsizVakaKarti } from "@/components/sonuclar/fotografsiz-vaka-karti";
import { fotografsizVakalar } from "@/content/results";
import { site } from "@/lib/site";

/**
 * Ana sayfa sonuç bölümü — Tip 3 (fotoğrafsız vaka).
 *
 * Görselli tipler (anlaşmalı merkez sonucu ve danışan hikayesi) onam ve
 * kaynak bilgisi gelene kadar yayınlanmıyor; ana sayfa ölçüm verisiyle
 * anlatan fotoğrafsız vakalarla başlıyor.
 */
export function Results() {
  const vakalar = fotografsizVakalar.slice(0, 3);
  if (vakalar.length === 0) return null;

  return (
    <Section id="sonuclar" tone="paper">
      <SectionHead
        eyebrow="Vakalar"
        title="Ölçümle anlatılan vakalar"
        intro="Aşağıdaki kayıtlar fotoğraf içermez. Her vakada donör durumu, greft sayısı, uygulanan teknik ve o tekniğe neden yönlendirildiği yazılıdır."
      />

      <div className="rule-grid reveal mt-12 md:grid-cols-3">
        {vakalar.map((kayit) => (
          <FotografsizVakaKarti key={kayit.id} kayit={kayit} />
        ))}
      </div>

      <p className="measure reveal mt-6 text-[0.8125rem] leading-relaxed text-muted">
        {site.disclaimers.resultsShort} Greft sayısı tek başına belirleyici
        değildir; sonucu asıl belirleyen greftlerin hangi açıyla, hangi yönde ve
        hangi yoğunlukta yerleştirildiğidir.
      </p>

      <Link
        href="/vakalar"
        className="reveal mt-8 inline-flex items-center gap-2 text-[0.8125rem] uppercase tracking-[0.1em] text-blue transition-colors hover:text-navy"
      >
        Tüm vakalar
        <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
      </Link>
    </Section>
  );
}
