import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/section";
import {
  GoogleKaynakNotu,
  GooglePuanKutusu,
  GoogleYorumKarti,
  GoogleYorumYok,
} from "@/components/yorumlar/google-yorumlar";
import { getirGoogleYorumlari } from "@/lib/google-reviews";
import { reviews } from "@/content/home";

/**
 * Danışan yorumları — Google Business Profile'dan.
 *
 * Veri sunucuda çekilir (API anahtarı tarayıcıya gitmez). Veri yoksa
 * uydurma yorum veya puan yerine Google'daki kayda yönlendiren bir kutu
 * gösterilir.
 */
export async function Reviews() {
  const ozet = await getirGoogleYorumlari();
  const yorumlar = ozet.yorumlar.slice(0, 3);

  return (
    <Section id="yorumlar" tone="white">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHead eyebrow={reviews.eyebrow} title={reviews.title} />
        <GooglePuanKutusu ozet={ozet} className="reveal" />
      </div>

      <div className="reveal mt-12">
        {yorumlar.length > 0 ? (
          <div className="rule-grid md:grid-cols-3">
            {yorumlar.map((y) => (
              <GoogleYorumKarti key={y.id} yorum={y} kisalt />
            ))}
          </div>
        ) : (
          <GoogleYorumYok ozet={ozet} />
        )}
      </div>

      <div className="reveal mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
        <Link
          href="/yorumlar"
          className="inline-flex items-center gap-2 text-[0.8125rem] uppercase tracking-[0.1em] text-blue transition-colors hover:text-navy"
        >
          Tüm yorumlar
          <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
        </Link>
        {yorumlar.length > 0 ? <GoogleKaynakNotu ozet={ozet} /> : null}
      </div>
    </Section>
  );
}
