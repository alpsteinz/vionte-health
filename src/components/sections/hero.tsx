import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ContactLink } from "@/components/ui/contact-link";
import { hero, heroBackground } from "@/content/home";
import { site } from "@/lib/site";
import { whatsappCta } from "@/lib/whatsapp";

/**
 * Tek sütun, ortalanmış hero. Form ve Norwood seçici burada yer almaz —
 * ikisi de koddan silinmedi (LeadForm ve NorwoodFigure başka sayfalarda /
 * gelecekte hero'da yeniden kullanılabilir), yalnızca bu bölümden çıkarıldı.
 * Tek eylem yolu: WhatsApp'a giden birincil buton.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      {heroBackground.gorsel ? (
        <>
          <Image
            src={heroBackground.gorsel}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Görsel üstü koyulaştırma — metin okunabilirliği için */}
          <div aria-hidden className="absolute inset-0 bg-navy/70" />
        </>
      ) : (
        <div aria-hidden className="hero-texture absolute inset-0" />
      )}

      <Container className="relative py-20 md:py-28 2xl:py-32">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="eyebrow eyebrow-light">{hero.eyebrow}</p>

          <h1 className="h1 mt-5 text-white">
            {hero.titleLead}{" "}
            <em className="font-normal not-italic text-blue-light">{hero.titleEmphasis}</em>{" "}
            {hero.titleTail}
          </h1>

          <p className="mt-4 text-[1.1875rem] font-light text-blue-light md:text-[1.3rem]">
            {hero.subtitle}
          </p>

          <p className="measure mt-5 text-[1.0625rem] leading-relaxed text-white/85">
            {hero.body}
          </p>

          <ContactLink
            href={whatsappCta.hero}
            external
            className="mt-9 inline-flex items-center gap-2.5 bg-[#1f7a4d] px-8 py-4 text-[0.8125rem] uppercase tracking-[0.1em] text-white transition-colors duration-200 hover:bg-[#186139]"
          >
            <MessageCircle className="size-4 shrink-0" strokeWidth={1.5} aria-hidden />
            Ücretsiz Ön Görüşme İçin Tıklayın
          </ContactLink>

          <p className="mt-4 text-[0.875rem] text-blue-light">
            veya{" "}
            <ContactLink
              href={site.contact.phoneHref}
              className="underline decoration-blue-light/50 underline-offset-4 transition-colors hover:text-white"
            >
              arayın: {site.contact.phoneLabel}
            </ContactLink>
          </p>

          <p className="mt-10 border-t border-white/15 pt-6 text-[0.8125rem] uppercase tracking-[0.06em] text-blue-light/80">
            {hero.trustStrip}
          </p>
        </div>
      </Container>
    </section>
  );
}
