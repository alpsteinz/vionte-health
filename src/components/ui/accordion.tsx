import { Plus } from "lucide-react";
import type { FaqItem } from "@/content/faq";
import { cn } from "@/lib/utils";

/**
 * SSS listesi — <details> ile, JavaScript gerektirmez.
 * Her başlık bir soru, ilk cümle doğrudan cevap (AGENTS.md).
 */
export function FaqList({
  items,
  tone = "light",
  className,
}: {
  items: FaqItem[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "divide-y border-y",
        dark ? "divide-line-dark border-line-dark" : "divide-line border-line",
        className,
      )}
    >
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary
            className={cn(
              "flex cursor-pointer list-none items-start justify-between gap-6 py-6 transition-colors [&::-webkit-details-marker]:hidden",
              dark ? "text-white hover:text-blue-light" : "text-navy hover:text-blue",
            )}
          >
            <h3 className={cn("h4", dark && "text-white")}>
              {item.question}
            </h3>
            <Plus
              className={cn(
                "mt-1 size-5 shrink-0 transition-transform duration-200 group-open:rotate-45",
                dark ? "text-blue-light" : "text-blue",
              )}
              strokeWidth={1.5}
              aria-hidden
            />
          </summary>
          <p
            className={cn(
              "measure pb-6 text-[0.9375rem] leading-relaxed",
              dark ? "text-blue-light" : "text-muted",
            )}
          >
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
