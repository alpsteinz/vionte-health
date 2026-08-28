import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Klinik fotoğrafları gelene kadar kullanılan yer tutucu.
 * Stok fotoğraf kullanılmaz (DESIGN.md) — boş alan, sahte görselden dürüsttür.
 */
const ratios = {
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-video",
} as const;

export function PhotoPlaceholder({
  label,
  ratio = "4/3",
  tone = "light",
  className,
}: {
  label: string;
  ratio?: keyof typeof ratios;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        ratios[ratio],
        "flex flex-col items-center justify-center gap-2 px-4 text-center",
        tone === "dark"
          ? "bg-navy-700 text-blue-light"
          : "bg-paper text-muted",
        className,
      )}
    >
      <ImageIcon className="size-5 opacity-60" strokeWidth={1.5} aria-hidden />
      <span className="text-[0.75rem] uppercase tracking-[0.14em]">{label}</span>
    </div>
  );
}
