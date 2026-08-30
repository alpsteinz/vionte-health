"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { Check, MessageCircle, Loader2 } from "lucide-react";
import { NorwoodFigure } from "@/components/ui/norwood-figure";
import { Button } from "@/components/ui/button";
import { form as formCopy, norwoodLevels } from "@/content/home";
import { safeHref, site } from "@/lib/site";
import { ContactLink } from "@/components/ui/contact-link";
import { cn } from "@/lib/utils";

type Status = "bos" | "gonderiliyor" | "tamam" | "hata";

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const uid = useId();
  const [level, setLevel] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("bos");
  /**
   * KVKK: iki ayrı onay.
   *  1) İletişim bilgilerinin işlenmesi — formun gönderilebilmesi için zorunlu.
   *  2) Sağlık verisi (dökülme seviyesi, fotoğraf) için ayrı AÇIK RIZA — zorunlu
   *     değil. Rıza özgür iradeyle verilmelidir; bu yüzden gönderimin şartı
   *     yapılmaz. İşaretlenmezse yalnızca Norwood seçici ve fotoğraf alanı
   *     devre dışı kalır, form yine gönderilebilir.
   */
  const [saglikRizasi, setSaglikRizasi] = useState(false);
  /** Rıza verilmeden seviye seçildiğinde kutuya dikkat çekmek için */
  const [rizaUyarisi, setRizaUyarisi] = useState(false);
  const rizaKutusu = useRef<HTMLInputElement>(null);

  const selected = norwoodLevels.find((l) => l.id === level);

  /**
   * Form WhatsApp'a düşer. Talepler sertifikalı saç ekim uzmanları
   * tarafından anında yanıtlanır.
   *
   * KVKK açısından bu yapı, veriyi bir sunucuda toplamaktan daha korumalıdır:
   * bilgiler kullanıcının cihazından doğrudan WhatsApp'a gider, arada
   * saklanmaz. Açık rıza verilmediyse sağlık verisi (dökülme seviyesi)
   * mesaja hiç eklenmez.
   */
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const hedef = safeHref(site.contact.whatsappHref);
    if (!hedef) {
      setStatus("hata");
      return;
    }

    setStatus("gonderiliyor");

    const satirlar = [
      "Merhaba, ücretsiz saç analizi talep ediyorum.",
      `Ad Soyad: ${data.get("ad")}`,
      `Telefon: ${data.get("telefon")}`,
    ];
    if (saglikRizasi && selected) {
      satirlar.push(`Dökülme seviyesi: Tip ${selected.roman}`);
    }

    window.open(
      `${hedef}?text=${encodeURIComponent(satirlar.join("\n"))}`,
      "_blank",
      "noopener,noreferrer",
    );
    setStatus("tamam");
  }

  if (status === "tamam") {
    return (
      <div className="border border-line bg-white p-8">
        <div className="flex size-10 items-center justify-center bg-navy text-white">
          <Check className="size-5" strokeWidth={1.5} aria-hidden />
        </div>
        <h3 className="h3 mt-6">WhatsApp&apos;a yönlendirildiniz</h3>
        <p className="measure mt-3 text-muted">
          Mesajınız hazır; WhatsApp penceresinden göndermeniz yeterli.
          Talepler sertifikalı saç ekim uzmanlarımız tarafından anında
          yanıtlanır. Pencere açılmadıysa aşağıdaki bağlantıyı kullanın.
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
        {/*
         * Norwood seçici her zaman tam görünür. Şemaları göstermek bir
         * veri işleme değildir; işlenen şey kullanıcının SEÇİMİdir.
         * Bu yüzden seçim serbest, ama seçim ancak açık rıza verilirse
         * mesaja eklenir — rıza verilmeden seçim yapıldığında kullanıcı
         * uyarılır ve rıza kutusuna odaklanılır.
         */}
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
                  onClick={() => {
                    setLevel(lvl.id);
                    if (!saglikRizasi) {
                      setRizaUyarisi(true);
                      rizaKutusu.current?.focus();
                    }
                  }}
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
            className={cn(
              "mt-3 min-h-[2.5rem] text-[0.875rem]",
              rizaUyarisi && !saglikRizasi ? "text-[#8a6a13]" : "text-muted",
            )}
            aria-live="polite"
          >
            {level && !saglikRizasi
              ? "Seçiminiz sağlık verisidir. İletebilmemiz için aşağıdaki açık rıza kutusunu işaretleyin."
              : selected
                ? selected.description
                : formCopy.norwoodEmpty}
          </p>
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

        {/* 1) Zorunlu: iletişim bilgilerinin işlenmesi */}
        <label className="mt-5 flex cursor-pointer items-start gap-3 text-[0.8125rem] leading-relaxed text-muted">
          <input
            type="checkbox"
            name="kvkkIletisim"
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
            &apos;ni okudum; iletişim bilgilerimin randevu talebim için
            işlenmesine onay veriyorum.
          </span>
        </label>

        {/* 2) İsteğe bağlı: sağlık verisi için ayrı açık rıza.
            Gönderimin şartı değildir — rıza özgür iradeyle verilir. */}
        <label
          className={cn(
            "mt-3.5 flex cursor-pointer items-start gap-3 border p-3.5 text-[0.8125rem] leading-relaxed text-muted transition-colors",
            rizaUyarisi && !saglikRizasi
              ? "border-[#c9a227] bg-[#fdf8ec]"
              : "border-line bg-paper",
          )}
        >
          <input
            ref={rizaKutusu}
            type="checkbox"
            name="saglikVerisi"
            checked={saglikRizasi}
            onChange={(e) => {
              setSaglikRizasi(e.target.checked);
              if (e.target.checked) setRizaUyarisi(false);
            }}
            className="mt-0.5 size-[1.15rem] shrink-0 accent-[#2e6da8]"
          />
          <span>
            Dökülme seviyem{" "}
            <strong className="font-medium text-ink">sağlık verisidir</strong>.
            Bu verinin ön değerlendirme amacıyla işlenmesine açık rıza
            veriyorum.{" "}
            <span className="text-muted/80">
              İsteğe bağlıdır; işaretlemeseniz de formu gönderebilirsiniz.
            </span>
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

        <p className="mt-4 text-[0.8125rem] leading-relaxed text-muted">
          {site.disclaimers.form} Fotoğraflarınızı WhatsApp sohbetinde
          paylaşabilirsiniz.
        </p>
      </form>
    </div>
  );
}
