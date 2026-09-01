"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { KarsilastirmaSlideri } from "./karsilastirma-slideri";
import { Copy } from "@/components/ui/copy";
import type { AnlasmaliMerkezSonucu } from "@/content/results";
import { cn } from "@/lib/utils";

/**
 * Çoklu vaka geçişi — karşılaştırma slider'ının dış katmanı.
 *
 * Koşul: yalnızca her iki görseli de bulunan kayıtlar gösterilir. Görseller
 * gelene kadar bu bileşen hiçbir şey render etmez (`null` döner) — yapı
 * hazır, ekranda görünmez. `kaynak` artık zorunlu değil; doluysa slider
 * içinde etiket olarak görünür.
 *
 * Vaka geçişi ok düğmeleriyle yapılır; kaydırma jesti bilinçli olarak
 * galeriye bağlanmadı, çünkü aynı jest slider'ın karşılaştırma çizgisini
 * sürüklüyor. İki davranışın çakışması mobilde slider'ı kullanılamaz
 * hale getirirdi.
 */
export function KarsilastirmaGalerisi({
  kayitlar,
}: {
  kayitlar: AnlasmaliMerkezSonucu[];
}) {
  const gosterilebilir = kayitlar.filter((k) => k.oncesiGorsel && k.sonrasiGorsel);
  const [aktif, setAktif] = useState(0);

  if (gosterilebilir.length === 0) return null;

  const kayit = gosterilebilir[Math.min(aktif, gosterilebilir.length - 1)];
  const veri = [
    kayit.greft && `${kayit.greft} greft`,
    kayit.yas && `${kayit.yas} yaş`,
    kayit.norwood,
    kayit.teknik,
    kayit.sonucAyi && `${kayit.sonucAyi}. ay`,
    kayit.sehir,
  ].filter(Boolean) as string[];

  return (
    <div className="mx-auto max-w-[520px]">
      <KarsilastirmaSlideri
        oncesi={kayit.oncesiGorsel!}
        sonrasi={kayit.sonrasiGorsel!}
        oncesiAlt={kayit.gorselAlt ? `${kayit.gorselAlt} — öncesi` : "Uygulama öncesi"}
        sonrasiAlt={kayit.gorselAlt ? `${kayit.gorselAlt} — sonrası` : "Uygulama sonrası"}
        kaynak={kayit.kaynak}
      />

      {veri.length > 0 ? (
        <p className="border-x border-b border-line bg-white px-5 py-4 text-[0.8125rem] text-muted">
          <Copy text={veri.join(" · ")} />
        </p>
      ) : null}

      {gosterilebilir.length > 1 ? (
        <div className="mt-5 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setAktif((i) => (i - 1 + gosterilebilir.length) % gosterilebilir.length)}
            aria-label="Önceki vaka"
            className="flex size-10 items-center justify-center border border-line text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
          >
            <ChevronLeft className="size-4" strokeWidth={1.5} aria-hidden />
          </button>

          <ol className="flex items-center gap-2" aria-label="Vakalar">
            {gosterilebilir.map((k, i) => (
              <li key={k.id}>
                <button
                  type="button"
                  onClick={() => setAktif(i)}
                  aria-label={`${i + 1}. vaka`}
                  aria-current={i === aktif ? "true" : undefined}
                  className={cn(
                    "h-1.5 w-6 transition-colors",
                    i === aktif ? "bg-navy" : "bg-line hover:bg-blue-light",
                  )}
                />
              </li>
            ))}
          </ol>

          <button
            type="button"
            onClick={() => setAktif((i) => (i + 1) % gosterilebilir.length)}
            aria-label="Sonraki vaka"
            className="flex size-10 items-center justify-center border border-line text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
          >
            <ChevronRight className="size-4" strokeWidth={1.5} aria-hidden />
          </button>
        </div>
      ) : null}
    </div>
  );
}
