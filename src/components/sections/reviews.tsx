import Link from "next/link";
import { Star, ArrowRight, MessageSquareQuote } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/section";
import { Copy } from "@/components/ui/copy";
import { getirGoogleYorumlari } from "@/lib/google-reviews";
import { reviews } from "@/content/home";

/**
 * Danışan yorumları — Google Business Profile'dan.
 *
 * Veri build sırasında sunucuda çekilir (API anahtarı tarayıcıya gitmez).
 * Yapılandırma yoksa bölüm, yorumların Google'dan geleceğini belirten
 * yer tutucuyla render edilir; uydurma yorum veya puan yayınlanmaz.
 */
export async function Reviews() {
  const ozet = await getirGoogleYorumlari();
  const hazir = ozet.durum === "hazir" && ozet.yorumlar.length > 0;

  return (
    <Section id="yorumlar" tone="white">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHead eyebrow={reviews.eyebrow} title={reviews.title} />

        <div className="reveal border border-line px-6 py-5">
          <div className="flex items-center gap-2">
            <Star className="size-4 fill-blue text-blue" strokeWidth={1.5} aria-hidden />
            <span className="font-serif text-[1.6rem] leading-none text-navy">
              {ozet.puan !== null ? ozet.puan.toFixed(1).replace(".", ",") : <Copy text="[0,0]" />}
            </span>
            <span className="text-[0.875rem] text-muted">/ 5</span>
          </div>
          <p className="mt-2 text-[0.8125rem] text-muted">
            Google&apos;da{" "}
            {ozet.adet !== null ? ozet.adet : <Copy text="[000]" />} değerlendirme
          </p>
        </div>
      </div>

      <div className="rule-grid reveal mt-12 md:grid-cols-3">
        {hazir
          ? ozet.yorumlar.slice(0, 3).map((y) => (
              <figure key={y.id} className="flex flex-col bg-white p-7">
                <div className="flex items-center gap-1" aria-label={`${y.puan} / 5`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={
                        i < y.puan ? "size-3.5 fill-blue text-blue" : "size-3.5 text-line"
                      }
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1">
                  <p className="text-[0.9375rem] leading-relaxed text-ink">
                    &ldquo;{y.metin}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-4 text-[0.8125rem] text-muted">
                  <span className="text-ink">{y.ad}</span>
                  {y.tarih ? ` · ${y.tarih}` : null}
                </figcaption>
              </figure>
            ))
          : reviews.items.map((item) => (
              <figure key={item.id} className="flex flex-col bg-white p-7">
                <MessageSquareQuote className="size-5 text-muted" strokeWidth={1.5} aria-hidden />
                <blockquote className="mt-5 flex-1">
                  <p className="text-[0.9375rem] leading-relaxed text-ink">
                    &ldquo;<Copy text={item.quote} />&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-4 text-[0.8125rem] text-muted">
                  <Copy text={`${item.name} · ${item.meta}`} />
                </figcaption>
              </figure>
            ))}
      </div>

      <div className="reveal mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
        <Link
          href="/yorumlar"
          className="inline-flex items-center gap-2 text-[0.8125rem] uppercase tracking-[0.1em] text-blue transition-colors hover:text-navy"
        >
          Tüm yorumlar
          <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
        </Link>
        {ozet.url ? (
          <a
            href={ozet.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[0.8125rem] uppercase tracking-[0.1em] text-muted transition-colors hover:text-blue"
          >
            Google&apos;da görün
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
          </a>
        ) : null}
      </div>
    </Section>
  );
}
