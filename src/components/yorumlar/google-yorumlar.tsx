import Image from "next/image";
import { Star, ArrowUpRight } from "lucide-react";
import type { GoogleOzet, GoogleYorum } from "@/lib/google-reviews";
import { cn } from "@/lib/utils";

/**
 * Google yorum bileşenleri — ana sayfa ve /yorumlar aynı parçaları kullanır.
 *
 * Google Places kullanım koşulları gereği her yorumda yazarın adı (ve
 * varsa fotoğrafı) yazarın Google profiline bağlanır; verinin Google'dan
 * geldiği açıkça belirtilir. Yorum metinleri düzenlenmez.
 */

function Yildizlar({ puan, className }: { puan: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} role="img" aria-label={`5 üzerinden ${puan}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={i < Math.round(puan) ? "size-3.5 fill-blue text-blue" : "size-3.5 text-line"}
          strokeWidth={1.5}
          aria-hidden
        />
      ))}
    </div>
  );
}

const puanYaz = (p: number) => p.toFixed(1).replace(".", ",");

/** Toplam puan + değerlendirme sayısı kutusu. Veri yoksa hiç render edilmez. */
export function GooglePuanKutusu({ ozet, className }: { ozet: GoogleOzet; className?: string }) {
  if (ozet.puan === null) return null;
  return (
    <a
      href={ozet.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group block border border-line bg-white px-6 py-5 transition-colors hover:border-blue",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span className="font-serif text-[1.8rem] leading-none text-navy">{puanYaz(ozet.puan)}</span>
        <div>
          <Yildizlar puan={ozet.puan} />
          <p className="mt-1 text-[0.8125rem] text-muted">
            Google&apos;da {ozet.adet ?? 0} değerlendirme
          </p>
        </div>
      </div>
      <p className="mt-3 inline-flex items-center gap-1 text-[0.75rem] uppercase tracking-[0.1em] text-blue group-hover:text-navy">
        Tümünü Google&apos;da görün
        <ArrowUpRight className="size-3.5" strokeWidth={1.5} aria-hidden />
      </p>
    </a>
  );
}

export function GoogleYorumKarti({
  yorum,
  googleUrl,
  kisalt,
}: {
  yorum: GoogleYorum;
  /** Kesik yorumlarda "devamı" bağlantısının gideceği işletme sayfası */
  googleUrl: string;
  kisalt?: boolean;
}) {
  const yazar = (
    <>
      {yorum.profilFoto ? (
        <Image
          src={yorum.profilFoto}
          alt=""
          width={32}
          height={32}
          className="size-8 shrink-0 rounded-full"
        />
      ) : (
        <span
          aria-hidden
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-paper font-serif text-navy"
        >
          {yorum.ad.charAt(0)}
        </span>
      )}
      <span className="min-w-0">
        <span className="block truncate text-[0.875rem] text-ink">{yorum.ad}</span>
        {yorum.tarih ? <span className="block text-[0.75rem] text-muted">{yorum.tarih}</span> : null}
      </span>
    </>
  );

  return (
    <figure className="flex flex-col bg-white p-7">
      <Yildizlar puan={yorum.puan} />
      <blockquote className="mt-5 flex-1">
        <p className={cn("whitespace-pre-line text-[0.9375rem] leading-relaxed text-ink", kisalt && "line-clamp-6")}>
          {yorum.metin}
          {yorum.kesik ? "…" : null}
        </p>
        {yorum.kesik ? (
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-[0.8125rem] text-blue underline-offset-4 hover:underline"
          >
            Devamını Google&apos;da okuyun
            <ArrowUpRight className="size-3.5" strokeWidth={1.5} aria-hidden />
          </a>
        ) : null}
      </blockquote>
      <figcaption className="mt-6 border-t border-line pt-4">
        {yorum.profilUrl ? (
          <a
            href={yorum.profilUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            {yazar}
          </a>
        ) : (
          <span className="flex items-center gap-3">{yazar}</span>
        )}
      </figcaption>
    </figure>
  );
}

/** Veri yokken (anahtar tanımlı değil / hata): uydurma yorum yerine Google'a yönlendirme */
export function GoogleYorumYok({ ozet }: { ozet: GoogleOzet }) {
  return (
    <div className="flex flex-col items-start gap-5 border border-line bg-white p-7 md:flex-row md:items-center md:justify-between md:p-8">
      <p className="measure text-[0.9375rem] leading-relaxed text-muted">
        Danışan değerlendirmelerimiz Google Business Profile üzerinde yayında.
        Yorumları biz yazmıyor, düzenlemiyoruz — doğrudan Google&apos;da okuyabilirsiniz.
      </p>
      <a
        href={ozet.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center gap-2 border border-navy px-5 py-3 text-[0.8125rem] uppercase tracking-[0.1em] text-navy transition-colors hover:bg-navy hover:text-white"
      >
        Google yorumlarını okuyun
        <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden />
      </a>
    </div>
  );
}

/** Kaynak notu — verinin Google'dan geldiğini belirtir */
export function GoogleKaynakNotu({ ozet, className }: { ozet: GoogleOzet; className?: string }) {
  return (
    <p className={cn("text-[0.75rem] text-muted", className)}>
      {ozet.durum === "hazir"
        ? "Yorumlar ve puan Google Business Profile'dan otomatik alınır, günde bir güncellenir."
        : "Yorumlar Google Business Profile'dan birebir aktarılmıştır; düzenlenmemiştir."}
    </p>
  );
}
