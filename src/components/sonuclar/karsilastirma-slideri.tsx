"use client";

import { useCallback, useId, useRef, useState } from "react";
import Image from "next/image";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ÖNCESİ–SONRASI KARŞILAŞTIRMA SLIDER'I
 *
 * Sürüklemeli karşılaştırma çizgisi. Dış katmanda çoklu vaka geçişi
 * `KarsilastirmaGalerisi` tarafından yönetilir.
 *
 * Kritik davranışlar:
 *
 * 1. LCP korunur. Görseller `loading="lazy"` ile yüklenir ve yalnızca
 *    görünür alana girdiğinde istenir. Slider ana sayfanın ilk ekranında
 *    yer almaz; ilk kart bile öncelikli yüklenmez.
 *
 * 2. Mobilde kaydırma jesti karşılaştırma çizgisini sürükler, galeriyi
 *    değil. `touch-action: none` yalnızca sürükleme başladığında uygulanır;
 *    böylece kullanıcı slider'ın üzerinden dikey kaydırma yapabilir ama
 *    yatay hareket çizgiyi hareket ettirir.
 *
 * 3. Klavye erişilebilir: ok tuşları çizgiyi 2'şer, Home/End uçlara taşır.
 */
export function KarsilastirmaSlideri({
  oncesi,
  sonrasi,
  oncesiAlt,
  sonrasiAlt,
  kaynak,
  className,
}: {
  oncesi: string;
  sonrasi: string;
  oncesiAlt: string;
  sonrasiAlt: string;
  /** Uygulamayı yapan merkez — doluysa kartta etiket olarak gösterilir */
  kaynak?: string;
  className?: string;
}) {
  const uid = useId();
  const kapsayici = useRef<HTMLDivElement>(null);
  /*
   * Sürükleme durumu ref'te tutulur, state'te değil: state güncellemesi
   * asenkron olduğu için ilk pointermove olayları kaçabiliyordu.
   * Pointer capture sayesinde parmak/imleç kapsayıcının dışına çıksa da
   * olaylar bu öğeye gelmeye devam eder.
   */
  const suruklemeRef = useRef(false);
  const [oran, setOran] = useState(50);
  const [suruklenıyor, setSurukleniyor] = useState(false);

  const konumdanOran = useCallback((clientX: number) => {
    const el = kapsayici.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.width === 0) return;
    const yeni = ((clientX - r.left) / r.width) * 100;
    setOran(Math.min(100, Math.max(0, yeni)));
  }, []);

  const baslat = (e: React.PointerEvent<HTMLDivElement>) => {
    // Konum önce güncellenir: setPointerCapture bazı durumlarda
    // (etkin olmayan pointerId) hata fırlatıyor ve React'in topladığı
    // durum güncellemelerini iptal ediyor. Yakalama en sona alındı ve
    // korumaya konuldu — başarısız olsa da slider çalışmaya devam eder.
    konumdanOran(e.clientX);
    suruklemeRef.current = true;
    setSurukleniyor(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Pointer yakalanamadı; sürükleme yine de kapsayıcı içinde çalışır.
    }
  };

  const surukle = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!suruklemeRef.current) return;
    konumdanOran(e.clientX);
  };

  const bitir = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!suruklemeRef.current) return;
    suruklemeRef.current = false;
    setSurukleniyor(false);
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // yakalama zaten serbest
    }
  };

  return (
    <figure className={cn("bg-white", className)}>
      <div
        ref={kapsayici}
        className={cn(
          "relative aspect-square w-full select-none overflow-hidden bg-paper",
          // Sürükleme sırasında sayfa kaydırmasını kilitle; boştayken
          // kullanıcı slider'ın üzerinden dikey kaydırabilsin.
          suruklenıyor ? "touch-none" : "touch-pan-y",
        )}
        onPointerDown={baslat}
        onPointerMove={surukle}
        onPointerUp={bitir}
        onPointerCancel={bitir}
      >
        {/* Sonrası — alt katman */}
        <Image
          src={sonrasi}
          alt={sonrasiAlt}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 480px"
          className="object-cover"
          draggable={false}
        />

        {/* Öncesi — üstte, çizgiye kadar kırpılır */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - oran}% 0 0)` }}
        >
          <Image
            src={oncesi}
            alt={oncesiAlt}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-cover"
            draggable={false}
          />
        </div>

        <span className="pointer-events-none absolute bottom-0 left-0 bg-navy px-2.5 py-1 text-[0.6875rem] uppercase tracking-[0.14em] text-white">
          Öncesi
        </span>
        <span className="pointer-events-none absolute bottom-0 right-0 bg-blue px-2.5 py-1 text-[0.6875rem] uppercase tracking-[0.14em] text-white">
          Sonrası
        </span>

        {/* Karşılaştırma çizgisi */}
        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-white/90"
          style={{ left: `${oran}%` }}
        />

        <button
          type="button"
          role="slider"
          aria-label="Öncesi ve sonrası karşılaştırma çizgisi"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(oran)}
          aria-controls={kaynak ? uid : undefined}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setOran((o) => Math.max(0, o - 2));
            else if (e.key === "ArrowRight") setOran((o) => Math.min(100, o + 2));
            else if (e.key === "Home") setOran(0);
            else if (e.key === "End") setOran(100);
            else return;
            e.preventDefault();
          }}
          className="absolute top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center bg-white text-navy shadow-[0_2px_10px_-2px_rgba(13,33,56,0.5)]"
          style={{ left: `${oran}%` }}
        >
          <GripVertical className="size-4" strokeWidth={1.5} aria-hidden />
        </button>
      </div>

      {kaynak ? (
        <figcaption id={uid} className="border-t border-line bg-paper px-5 py-3 text-[0.8125rem] text-ink">
          <span className="text-muted">Uygulama:</span> {kaynak}
        </figcaption>
      ) : null}
    </figure>
  );
}
