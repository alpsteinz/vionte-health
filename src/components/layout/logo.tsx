import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Yer tutucu logo — vektörel logo klinikten gelince bu bileşen değiştirilir.
 * (AGENTS.md, açık kalan konular #6)
 */
export function Logo({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Vionte Health — ana sayfa"
      className={cn("group flex min-w-0 items-baseline gap-2.5 whitespace-nowrap", className)}
    >
      <span
        className={cn(
          "font-serif text-[1.65rem] leading-none tracking-tight transition-colors",
          tone === "light" ? "text-white" : "text-navy",
        )}
      >
        Vionte Health
      </span>
      <span
        className={cn(
          // Dar ekranda gizlenir: marka adı uzun olduğu için header'da
          // hamburger düğmesini ekran dışına itiyordu.
          "hidden text-[0.62rem] uppercase tracking-[0.26em] transition-colors sm:inline",
          tone === "light" ? "text-blue-light" : "text-muted",
        )}
      >
        Saç Ekimi Danışmanlığı
      </span>
    </Link>
  );
}
