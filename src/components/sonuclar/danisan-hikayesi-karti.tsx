import { Building2 } from "lucide-react";
import { Copy } from "@/components/ui/copy";
import { hikayeYayinlanabilir, type DanisanHikayesi } from "@/content/results";

/**
 * TİP 2 — Danışan hikayesi (görselli veya görselsiz).
 *
 * Yayın kapıları:
 *   - `yaziliIzin` true olmalı; değilse hikaye hiç render edilmez.
 *   - Görsel varsa `kaynak` (uygulamayı yapan merkez) zorunludur.
 *
 * Anlatı sırası: başlangıç durumu → yönlendirme gerekçesi → süreç → sonuç.
 */
const bolumler = [
  { alan: "baslangicDurumu", baslik: "Başlangıç durumu" },
  { alan: "yonlendirmeGerekcesi", baslik: "Neden bu teknik ve bu merkez" },
  { alan: "surec", baslik: "Süreç" },
  { alan: "sonuc", baslik: "Sonuç" },
] as const;

export function DanisanHikayesiKarti({ kayit }: { kayit: DanisanHikayesi }) {
  if (!hikayeYayinlanabilir(kayit)) return null;

  const kunye = [kayit.yas && `${kayit.yas} yaş`, kayit.teknik].filter(Boolean) as string[];

  return (
    <article className="bg-white p-7 md:p-8">
      <h3 className="h3">
        <Copy text={kayit.baslik} />
      </h3>

      {kunye.length > 0 ? (
        <p className="mt-2 text-[0.8125rem] text-muted">
          <Copy text={kunye.join(" · ")} />
        </p>
      ) : null}

      {/* Görsel varsa kaynak etiketi zorunlu — kapı hikayeYayinlanabilir'de */}
      {kayit.gorsel && kayit.kaynak ? (
        <p className="mt-5 flex items-center gap-2 border border-line bg-paper px-4 py-2.5 text-[0.8125rem] text-ink">
          <Building2 className="size-4 shrink-0 text-blue" strokeWidth={1.5} aria-hidden />
          <span>
            <span className="text-muted">Uygulama:</span> <Copy text={kayit.kaynak} />
          </span>
        </p>
      ) : null}

      <dl className="mt-6 space-y-5">
        {bolumler.map((bolum) => (
          <div key={bolum.alan}>
            <dt className="text-[0.75rem] uppercase tracking-[0.14em] text-blue">
              {bolum.baslik}
            </dt>
            <dd className="measure mt-2 text-[0.9375rem] leading-relaxed text-muted">
              <Copy text={kayit[bolum.alan]} />
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
