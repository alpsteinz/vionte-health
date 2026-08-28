"use client";

import { useState } from "react";
import { Sparkles, Check } from "lucide-react";
import { site } from "@/lib/site";

/**
 * "Bu sayfayı AI ile özetle" — AI arama görünürlüğüne katkı (AGENTS.md).
 * Sayfanın URL'i ile birlikte hazır bir istem, seçilen araca aktarılır.
 */
const tools = [
  { name: "ChatGPT", url: (q: string) => `https://chatgpt.com/?q=${q}` },
  { name: "Claude", url: (q: string) => `https://claude.ai/new?q=${q}` },
  { name: "Perplexity", url: (q: string) => `https://www.perplexity.ai/search?q=${q}` },
];

export function AiSummary({ path, title }: { path: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const prompt = `${site.url}${path} sayfasını oku ve "${title}" konusunu maddeler halinde özetle.`;
  const encoded = encodeURIComponent(prompt);

  return (
    <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-3 border border-line bg-white px-5 py-4">
      <span className="flex items-center gap-2 text-[0.8125rem] text-muted">
        <Sparkles className="size-4 text-blue" strokeWidth={1.5} aria-hidden />
        Bu sayfayı özetlet:
      </span>
      <div className="flex flex-wrap gap-2">
        {tools.map((tool) => (
          <a
            key={tool.name}
            href={tool.url(encoded)}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-line px-3 py-1.5 text-[0.75rem] uppercase tracking-[0.1em] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
          >
            {tool.name}
          </a>
        ))}
        <button
          type="button"
          onClick={() => {
            void navigator.clipboard?.writeText(prompt).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            });
          }}
          className="flex items-center gap-1.5 border border-line px-3 py-1.5 text-[0.75rem] uppercase tracking-[0.1em] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
        >
          {copied ? <Check className="size-3.5" strokeWidth={1.5} aria-hidden /> : null}
          {copied ? "Kopyalandı" : "İstemi kopyala"}
        </button>
      </div>
    </div>
  );
}
