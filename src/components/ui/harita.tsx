"use client";

import { useState, useSyncExternalStore } from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { cerezOnayiAbone, cerezKabulEdildi } from "@/components/layout/cookie-consent";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Google Haritalar — gömülü harita.
 *
 * Google Haritalar yüklendiğinde üçüncü taraf çerezleri bırakır ve veri yurt
 * dışına gider. Bu yüzden harita yalnızca çerez bandında "Kabul et"
 * denmişse kendiliğinden yüklenir; aksi halde ziyaretçi "Haritayı göster"
 * düğmesiyle tek tıkla açar. Bu tercih kaydedilmez (localStorage yasak).
 * Sunucuda ve ilk boyamada hep düğmeli hal gösterilir — uyumsuzluk olmaz.
 */
export function Harita({
  oran = "4/3",
  ton = "koyu",
  className,
}: {
  oran?: "4/3" | "16/9";
  ton?: "koyu" | "acik";
  className?: string;
}) {
  const kabul = useSyncExternalStore(cerezOnayiAbone, cerezKabulEdildi, () => false);
  const [acildi, setAcildi] = useState(false);
  const goster = kabul || acildi;
  const koyu = ton === "koyu";

  return (
    <div
      className={cn(
        // Dar ekranda oran kutusu düğmeler için fazla basık kalıyor — alt sınır
        "relative min-h-72 w-full overflow-hidden",
        oran === "4/3" ? "aspect-[4/3]" : "aspect-video",
        koyu ? "bg-navy-700" : "bg-paper",
        className,
      )}
    >
      {goster ? (
        <iframe
          src={site.contact.mapEmbed}
          title={`${site.name} konumu — Google Haritalar`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <MapPin className={cn("size-6", koyu ? "text-blue-light" : "text-blue")} strokeWidth={1.5} aria-hidden />
          <p className={cn("max-w-xs text-[0.875rem] leading-relaxed", koyu ? "text-white" : "text-ink")}>
            {site.contact.addressLine}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setAcildi(true)}
              className={cn(
                "px-4 py-2.5 text-[0.75rem] uppercase tracking-[0.1em] transition-colors",
                koyu ? "bg-white text-navy hover:bg-blue-light" : "bg-navy text-white hover:bg-blue",
              )}
            >
              Haritayı göster
            </button>
            <a
              href={site.contact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-1 border px-4 py-2.5 text-[0.75rem] uppercase tracking-[0.1em] transition-colors",
                koyu
                  ? "border-line-dark text-white hover:border-blue-light"
                  : "border-line text-navy hover:border-navy",
              )}
            >
              Google Haritalar&apos;da aç
              <ArrowUpRight className="size-3.5" strokeWidth={1.5} aria-hidden />
            </a>
          </div>
          <p className={cn("max-w-xs text-[0.6875rem] leading-relaxed", koyu ? "text-blue-light/70" : "text-muted")}>
            Harita Google tarafından yüklenir ve Google çerezleri kullanır.
          </p>
        </div>
      )}
    </div>
  );
}
