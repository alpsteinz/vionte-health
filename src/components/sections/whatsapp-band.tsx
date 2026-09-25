import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { ContactLink } from "@/components/ui/contact-link";
import { whatsappCta } from "@/lib/whatsapp";

/**
 * Bölüm arası geniş bant — sayfanın ortasında, tam genişlikte. İkinci en
 * baskın CTA katmanı (hero'dan sonra, bölüm sonu butonlarından önce).
 * Solda Mehtap Dizge fotoğrafı köşeden köşeye taşar; sağda kısa metin ve
 * dolu yeşil WhatsApp butonu.
 */
export function WhatsappBand() {
  return (
    <section className="bg-navy">
      {/*
       * Fotoğraf dikey 3:4; yüz görselin üst ~%20–45'inde. Kırpma penceresi
       * yüzü ve omuzları gösterecek şekilde %25'e konumlandı. Bant masaüstünde
       * en az 260px yüksek — daha kısa olursa fotoğraf ince bir şeride düşüyor.
       */}
      <div className="flex flex-col md:min-h-[260px] md:flex-row md:items-stretch">
        <div className="relative h-80 w-full shrink-0 sm:h-96 md:h-auto md:w-60 lg:w-72">
          <Image
            src="/ekip/mehtap-dizge.webp"
            alt="Mehtap Dizge"
            fill
            sizes="(min-width: 1024px) 288px, (min-width: 768px) 240px, 100vw"
            className="object-cover object-[center_25%]"
          />
        </div>

        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center gap-6 px-6 py-10 text-center md:flex-row md:items-center md:justify-between md:px-10 md:py-10 md:text-left lg:px-14">
          <p className="text-[1.0625rem] leading-relaxed text-white md:max-w-sm md:text-[1.1875rem]">
            Size uygun teknik ve merkez, tek bir görüşmeyle netleşir.
          </p>

          <ContactLink
            href={whatsappCta.band}
            external
            className="inline-flex shrink-0 items-center gap-2.5 bg-[#1f7a4d] px-6 py-3.5 text-[0.8125rem] uppercase tracking-[0.1em] text-white transition-colors duration-200 hover:bg-[#186139]"
          >
            <MessageCircle className="size-4 shrink-0" strokeWidth={1.5} aria-hidden />
            WhatsApp&apos;tan Yazın
          </ContactLink>
        </div>
      </div>
    </section>
  );
}
