import Image from "next/image";
import { Building2 } from "lucide-react";
import { Copy } from "@/components/ui/copy";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import {
  anlasmaliYayinlanabilir,
  type AnlasmaliMerkezSonucu,
} from "@/content/results";

/**
 * TİP 1 — Anlaşmalı merkez sonucu (görselli).
 *
 * Yayın kapısı: `kaynak` (uygulamayı yapan merkezin adı) zorunludur.
 * Boşsa kart hiç render edilmez; uyarı build sırasında content/results.ts
 * içindeki doğrulamadan gelir.
 */
export function AnlasmaliMerkezKarti({ kayit }: { kayit: AnlasmaliMerkezSonucu }) {
  if (!anlasmaliYayinlanabilir(kayit)) return null;

  const veri = [
    kayit.greft && `${kayit.greft} greft`,
    kayit.yas && `${kayit.yas} yaş`,
    kayit.norwood,
    kayit.teknik,
    kayit.sonucAyi && `${kayit.sonucAyi}. ay`,
  ].filter(Boolean) as string[];

  return (
    <figure className="flex flex-col bg-white">
      <div className="grid grid-cols-2 gap-px bg-line">
        <div className="relative aspect-square bg-white">
          {kayit.oncesiGorsel ? (
            <Image
              src={kayit.oncesiGorsel}
              alt={kayit.gorselAlt ? `${kayit.gorselAlt} — öncesi` : "Uygulama öncesi"}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 50vw, 200px"
              className="object-cover"
            />
          ) : (
            <PhotoPlaceholder label="Görsel bekleniyor" ratio="1/1" />
          )}
          <span className="absolute bottom-0 left-0 bg-navy px-2.5 py-1 text-[0.6875rem] uppercase tracking-[0.14em] text-white">
            Öncesi
          </span>
        </div>
        <div className="relative aspect-square bg-white">
          {kayit.sonrasiGorsel ? (
            <Image
              src={kayit.sonrasiGorsel}
              alt={kayit.gorselAlt ? `${kayit.gorselAlt} — sonrası` : "Uygulama sonrası"}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 50vw, 200px"
              className="object-cover"
            />
          ) : (
            <PhotoPlaceholder label="Görsel bekleniyor" ratio="1/1" />
          )}
          <span className="absolute bottom-0 left-0 bg-blue px-2.5 py-1 text-[0.6875rem] uppercase tracking-[0.14em] text-white">
            Sonrası
          </span>
        </div>
      </div>

      {/* Kaynak etiketi — kart üzerinde görünür olmak zorunda */}
      <p className="flex items-center gap-2 border-t border-line bg-paper px-5 py-3 text-[0.8125rem] text-ink">
        <Building2 className="size-4 shrink-0 text-blue" strokeWidth={1.5} aria-hidden />
        <span>
          <span className="text-muted">Uygulama:</span>{" "}
          <Copy text={kayit.kaynak} />
        </span>
      </p>

      {veri.length > 0 ? (
        <figcaption className="border-t border-line px-5 py-4 text-[0.8125rem] text-muted">
          <Copy text={veri.join(" · ")} />
        </figcaption>
      ) : null}
    </figure>
  );
}
