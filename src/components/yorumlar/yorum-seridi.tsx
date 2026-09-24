"use client";

import { Children, useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const ARALIK_MS = 6000;

/**
 * Yatay kaydırmalı yorum şeridi.
 *
 * - Parmakla/tekerlekle kaydırılır (scroll-snap), oklarla ve noktalarla gezilir.
 * - Kendiliğinden sırayla ilerler (6 sn); sona gelince başa döner.
 * - Otomatik ilerleme duraklar: fare üzerindeyken, klavye odağı içerideyken,
 *   şerit ekranda değilken, kullanıcı kendisi kaydırdığında/tıkladığında ve
 *   `prefers-reduced-motion` açıksa hiç başlamaz. Duraklat/oynat düğmesi
 *   her zaman görünür (WCAG 2.2.2).
 * - Tüm kartlar aynı anda sığıyorsa kontroller gizlenir.
 */
function hareketAzaltAbone(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function YorumSeridi({ children, etiket }: { children: React.ReactNode; etiket: string }) {
  const slaytlar = Children.toArray(children);
  const serit = useRef<HTMLDivElement>(null);
  const [aktif, setAktif] = useState(0);
  const [tasiyor, setTasiyor] = useState(false);
  /** Aynı anda görünen kart sayısı — durak sayısı = slayt − görünen + 1 */
  const [gorunen, setGorunen] = useState(1);
  const [uzerinde, setUzerinde] = useState(false); // fare üstte veya odak içeride
  const [ekranda, setEkranda] = useState(false);
  /** Kullanıcının açık seçimi; null ise hareket azaltma tercihine göre */
  const [secim, setSecim] = useState<boolean | null>(null);
  const hareketAzalt = useSyncExternalStore(
    hareketAzaltAbone,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
  const oynuyor = secim ?? !hareketAzalt;
  const setOynuyor = setSecim;

  const durak = Math.max(1, slaytlar.length - gorunen + 1);

  const olc = useCallback(() => {
    const el = serit.current;
    if (!el) return;
    setTasiyor(el.scrollWidth > el.clientWidth + 2);
    const ilk = el.children[0] as HTMLElement | undefined;
    if (!ilk) return;
    const adim = ilk.getBoundingClientRect().width;
    setGorunen(Math.max(1, Math.round(el.clientWidth / Math.max(adim, 1))));
    setAktif(Math.min(slaytlar.length - 1, Math.round(el.scrollLeft / Math.max(adim, 1))));
  }, [slaytlar.length]);

  useEffect(() => {
    const el = serit.current;
    if (!el) return;
    // İkisi de gözlem başlar başlamaz bir kez tetiklenir — ilk ölçüm buradan gelir.
    const ro = new ResizeObserver(olc);
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => setEkranda(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, [olc]);

  const git = useCallback((i: number) => {
    const el = serit.current;
    const hedef = el?.children[i] as HTMLElement | undefined;
    if (!el || !hedef) return;
    el.scrollTo({ left: hedef.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }, []);

  const sonrakiIndex = useCallback(() => {
    const el = serit.current;
    if (!el) return 0;
    const sonda = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    return sonda ? 0 : aktif + 1;
  }, [aktif]);

  useEffect(() => {
    if (!oynuyor || uzerinde || !ekranda || !tasiyor) return;
    const t = window.setTimeout(() => git(sonrakiIndex()), ARALIK_MS);
    return () => window.clearTimeout(t);
  }, [oynuyor, uzerinde, ekranda, tasiyor, aktif, git, sonrakiIndex]);

  // Kullanıcı kendisi gezinirse otomatik ilerleme kalıcı olarak durur.
  const elleGit = (i: number) => {
    setOynuyor(false);
    git(i);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={etiket}
      onMouseEnter={() => setUzerinde(true)}
      onMouseLeave={() => setUzerinde(false)}
      onFocus={() => setUzerinde(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setUzerinde(false);
      }}
    >
      <div
        ref={serit}
        onScroll={olc}
        onPointerDown={() => setOynuyor(false)}
        onWheel={(e) => Math.abs(e.deltaX) > Math.abs(e.deltaY) && setOynuyor(false)}
        aria-live={oynuyor && !uzerinde ? "off" : "polite"}
        className="no-scrollbar relative flex snap-x snap-mandatory gap-px overflow-x-auto scroll-smooth border border-line bg-line"
      >
        {slaytlar.map((s, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${slaytlar.length}`}
            className="flex shrink-0 basis-[86%] snap-start sm:basis-[calc(50%-0.5px)] lg:basis-[calc((100%-2px)/3)] [&>*]:w-full"
          >
            {s}
          </div>
        ))}
      </div>

      {tasiyor ? (
        <div className="mt-5 flex items-center justify-between gap-4">
          {/* Dar ekranda 12 nokta + 3 düğme tek satıra sığmıyor — sayaç gösterilir */}
          <p className="text-[0.8125rem] tabular-nums text-muted sm:hidden" aria-hidden>
            {aktif + 1} / {durak}
          </p>
          <div className="hidden items-center gap-1.5 sm:flex" role="tablist" aria-label="Yorum seç">
            {Array.from({ length: durak }, (_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === aktif}
                aria-label={`${i + 1}. yorum`}
                onClick={() => elleGit(i)}
                className="flex h-6 items-center"
              >
                <span
                  className={cn(
                    "block h-1 transition-all duration-200",
                    i === aktif ? "w-6 bg-navy" : "w-3 bg-line hover:bg-blue-light",
                  )}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOynuyor(!oynuyor)}
              aria-label={oynuyor ? "Otomatik geçişi durdur" : "Otomatik geçişi başlat"}
              className="flex size-10 items-center justify-center text-muted transition-colors hover:text-navy"
            >
              {oynuyor ? (
                <Pause className="size-4" strokeWidth={1.5} aria-hidden />
              ) : (
                <Play className="size-4" strokeWidth={1.5} aria-hidden />
              )}
            </button>
            <button
              type="button"
              onClick={() => elleGit(Math.max(0, aktif - 1))}
              aria-label="Önceki yorum"
              className="flex size-10 items-center justify-center border border-line text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              <ChevronLeft className="size-4" strokeWidth={1.5} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => elleGit(sonrakiIndex())}
              aria-label="Sonraki yorum"
              className="flex size-10 items-center justify-center border border-line text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              <ChevronRight className="size-4" strokeWidth={1.5} aria-hidden />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
