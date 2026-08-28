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
      aria-label="Vionte Hair Transplant — ana sayfa"
      className={cn("group flex items-baseline gap-2.5", className)}
    >
      <span
        className={cn(
          "font-serif text-[1.65rem] leading-none tracking-tight transition-colors",
          tone === "light" ? "text-white" : "text-navy",
        )}
      >
        Vionte
      </span>
      <span
        className={cn(
          "text-[0.62rem] uppercase tracking-[0.26em] transition-colors",
          tone === "light" ? "text-blue-light" : "text-muted",
        )}
      >
        Hair Transplant
      </span>
    </Link>
  );
}
