import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Marka kilidi.
 *
 * Kaynak logo dikey bir kilit (V işareti üstte, VIONTE altta) ve oranı
 * 1.17'ye yakın. Header'da 32–40px yüksekliğe sığdırıldığında kelime
 * markası okunamayacak kadar küçülüyordu; bu yüzden aynı dosyadan yatay
 * kilit türetildi: işaret solda, VIONTE sağda.
 *
 * Türetilmiş dosyalar WebP: kaynak SVG 322 KB (31 gömülü raster içeriyor)
 * ve header ilk ekranda olduğu için LCP'yi bozardı. Yatay kilit 11 KB.
 * SVG'ler `public/logo/` altında baskı ve diğer kullanımlar için duruyor.
 */
export function Logo({
  tone = "dark",
  className,
  priority,
}: {
  tone?: "dark" | "light";
  className?: string;
  priority?: boolean;
}) {
  const beyaz = tone === "light";
  return (
    <Link
      href="/"
      aria-label={`${site.name} — ana sayfa`}
      className={cn("group flex shrink-0 items-center", className)}
    >
      <Image
        src={beyaz ? "/logo/vionte-logo-yatay-beyaz.webp" : "/logo/vionte-logo-yatay.webp"}
        alt={site.name}
        width={491}
        height={120}
        priority={priority}
        className="h-9 w-auto transition-opacity duration-200 group-hover:opacity-85"
      />
    </Link>
  );
}
