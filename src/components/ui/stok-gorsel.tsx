import Image from "next/image";
import { cn } from "@/lib/utils";

const oranlar = {
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-video",
} as const;

/**
 * TEMSİLİ (STOK) GÖRSEL.
 *
 * Stok görsel yalnızca bu bileşenle yerleştirilebilir. `ibare` zorunlu bir
 * prop olduğu için işaretsiz stok görsel kullanmak mümkün değildir —
 * ibare verilmeden bileşen derlenmez.
 *
 * İbare 13px, koyu zemin üzerinde beyaz; küçük punto ile de okunur kalması
 * için zemin opak, kenar boşluğu geniş.
 *
 * Not: gerçek klinik fotoğrafı için bu bileşen KULLANILMAZ — o görseller
 * temsili değildir ve böyle etiketlenmemelidir.
 */
export function StokGorsel({
  src,
  alt,
  ibare,
  ratio = "4/3",
  className,
  priority,
}: {
  src: string;
  alt: string;
  /** ZORUNLU. Örn. "Temsili görsel". İşaretsiz stok görsel yayınlanamaz. */
  ibare: string;
  ratio?: keyof typeof oranlar;
  className?: string;
  priority?: boolean;
}) {
  if (!ibare || ibare.trim().length === 0) {
    throw new Error(
      "StokGorsel: `ibare` boş olamaz. Stok görsel 'Temsili görsel' ibaresi olmadan yayınlanamaz.",
    );
  }

  return (
    <figure className={cn("relative overflow-hidden", oranlar[ratio], className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        priority={priority}
        className="object-cover"
      />
      <figcaption className="absolute bottom-0 left-0 bg-navy/90 px-2.5 py-1 text-[0.8125rem] leading-none text-white">
        {ibare}
      </figcaption>
    </figure>
  );
}
