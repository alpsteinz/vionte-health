"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Check, MessageCircle, Loader2 } from "lucide-react";
import { NorwoodFigure } from "@/components/ui/norwood-figure";
import { Button } from "@/components/ui/button";
import { form as formCopy, norwoodLevels } from "@/content/home";
import { site } from "@/lib/site";
import { ContactLink } from "@/components/ui/contact-link";
import { cn } from "@/lib/utils";

type Status = "bos" | "gonderiliyor" | "tamam" | "hata";

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const uid = useId();
  const [level, setLevel] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("bos");

  const selected = norwoodLevels.find((l) => l.id === level);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus("gonderiliyor");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ad: data.get("ad"),
          telefon: data.get("telefon"),
          norwood: level,
          kvkk: data.get("kvkk") === "on",
        }),
      });
      setStatus(res.ok ? "tamam" : "hata");
    } catch {
      setStatus("hata");
    }
  }

  if (status === "tamam") {
    return (
      <div className="border border-line bg-white p-8">
        <div className="flex size-10 items-center justify-center bg-navy text-white">
          <Check className="size-5" strokeWidth={1.5} aria-hidden />
        </div>
        <h3 className="h3 mt-6">Talebiniz alındı</h3>
        <p className="measure mt-3 text-muted">
          Uzmanımız sizi en kısa sürede arayacak. Daha hızlı yanıt için
          WhatsApp&apos;tan da yazabilirsiniz.
        </p>
        <ContactLink
          href={site.contact.whatsappHref}
          external
          className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.1em] text-blue"
        >
          <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden />
          {site.cta.whatsapp}
        </ContactLink>
      </div>
    );
  }

  return (
    <div className={cn("border border-line bg-white", compact ? "p-5" : "p-5 md:p-8")}>
      <h2 className="h3 text-navy">
        {formCopy.title}
      </h2>
      <p className="mt-2 text-[0.9375rem] text-muted">{formCopy.subtitle}</p>

      {/* Reklam trafiği sabırsızdır — WhatsApp hızlı yolu formun üstünde */}
      <ContactLink
        href={site.contact.whatsappHref}
        external
        className="mt-5 flex items-center justify-center gap-2 border border-[#1f7a4d] px-5 py-3.5 text-[0.8125rem] uppercase tracking-[0.1em] text-[#1f7a4d] transition-colors duration-200 hover:bg-[#1f7a4d] hover:text-white"
      >
        <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden />
        {site.cta.whatsapp}
      </ContactLink>

      <div className="my-5 flex items-center gap-4 text-[0.75rem] uppercase tracking-[0.18em] text-muted">
        <span className="h-px flex-1 bg-line" />
        veya
        <span className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={onSubmit} noValidate={false}>
        <fieldset>
          <legend className="eyebrow">{formCopy.norwoodLabel}</legend>
          <div
            role="radiogroup"
            aria-label={formCopy.norwoodLabel}
            className="mt-4 grid grid-cols-3 gap-px border border-line bg-line"
          >
            {norwoodLevels.map((lvl) => {
              const active = level === lvl.id;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setLevel(lvl.id)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 px-1.5 py-2.5 transition-colors duration-200 sm:gap-2 sm:px-2 sm:py-3",
                    active
                      ? "bg-navy text-blue-light"
                      : "bg-white text-navy hover:bg-paper",
                  )}
                >
                  <NorwoodFigure level={lvl} />
                  <span
                    className={cn(
                      "text-[0.7rem] uppercase tracking-[0.14em]",
                      active ? "text-white" : "text-muted",
                    )}
                  >
                    Tip {lvl.roman}
                  </span>
                </button>
              );
            })}
          </div>
          <p
            className="mt-3 min-h-[2.5rem] text-[0.875rem] text-muted"
            aria-live="polite"
          >
            {selected ? selected.description : formCopy.norwoodEmpty}
          </p>
          <input type="hidden" name="norwood" value={level ?? ""} />
        </fieldset>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-4">
          <div>
            <label htmlFor={`${uid}-ad`} className="block text-[0.8125rem] text-muted">
              Ad Soyad
            </label>
            <input
              id={`${uid}-ad`}
              name="ad"
              type="text"
              required
              autoComplete="name"
              className="mt-1.5 w-full border border-line bg-white px-3.5 py-3 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-blue focus:outline-2 focus:outline-blue"
              placeholder="Adınız ve soyadınız"
            />
          </div>
          <div>
            <label htmlFor={`${uid}-tel`} className="block text-[0.8125rem] text-muted">
              Telefon
            </label>
            <input
              id={`${uid}-tel`}
              name="telefon"
              type="tel"
              required
              inputMode="tel"
              autoComplete="tel"
              className="mt-1.5 w-full border border-line bg-white px-3.5 py-3 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-blue focus:outline-2 focus:outline-blue"
              placeholder="05__ ___ __ __"
            />
          </div>
        </div>

        {/* Zorunlu: formda açık KVKK onay kutusu */}
        <label className="mt-4 flex cursor-pointer items-start gap-3 text-[0.8125rem] leading-relaxed text-muted">
          <input
            type="checkbox"
            name="kvkk"
            required
            className="mt-0.5 size-[1.15rem] shrink-0 accent-[#2e6da8]"
          />
          <span>
            <Link
              href="/kvkk-aydinlatma-metni"
              className="text-blue underline underline-offset-4"
            >
              KVKK Aydınlatma Metni
            </Link>
            &apos;ni okudum; iletişim bilgilerimin randevu talebim için işlenmesine
            onay veriyorum.
          </span>
        </label>

        <Button
          type="submit"
          className="mt-5 w-full"
          disabled={status === "gonderiliyor"}
        >
          {status === "gonderiliyor" ? (
            <>
              <Loader2 className="size-4 animate-spin" strokeWidth={1.5} aria-hidden />
              Gönderiliyor
            </>
          ) : (
            site.cta.form
          )}
        </Button>

        {status === "hata" ? (
          <p role="alert" className="mt-3 text-[0.8125rem] text-[#b3261e]">
            Form gönderilemedi. Lütfen telefonla veya WhatsApp üzerinden ulaşın.
          </p>
        ) : null}

        <p className="mt-4 text-[0.8125rem] text-muted">{site.disclaimers.form}</p>
      </form>
    </div>
  );
}
