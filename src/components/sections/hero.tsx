import Link from "next/link";
import { ArrowRight, MessageCircle, CalendarCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { LeadForm } from "./lead-form";
import { hero } from "@/content/home";
import { site } from "@/lib/site";
import { ContactLink } from "@/components/ui/contact-link";
import { cn } from "@/lib/utils";

const oneCikanlar = [
  { title: "Tıraşsız saç ekimi", href: "/sac-ekimi/tirassiz-sac-ekimi" },
  { title: "Kadınlarda saç ekimi", href: "/sac-ekimi/kadin-sac-ekimi" },
  { title: "Fiyat nasıl belirlenir", href: "/hasta-rehberi/fiyatlandirma-nasil-belirlenir" },
];

export function Hero() {
  return (
    <section className="border-b border-line bg-white">
      <Container>
        {/*
         * Izgara iki sütun: sol (metin + veri, TEK grid hücresi), sağ (form).
         *
         * ÖNEMLİ: sol içerik iki AYRI grid hücresi (metin, veri) olarak
         * `order` ile sıralanmaya çalışıldığında CSS Grid'in "sparse"
         * auto-placement algoritması formu metnin YANINA değil ALTINA
         * yerleştiriyordu — üstteki satır formun tam yüksekliğine göre
         * büyüyor ama boş kalıyordu (metin altında, form boyunca süren
         * bir boşluk). Bu, `order` + explicit `col-start` kombinasyonunun
         * placement cursor'unu ileri taşıyıp geri sarmamasından kaynaklanır.
         *
         * Çözüm: sol içerik masaüstünde TEK bir grid hücresi (kendi içinde
         * flex-col ile metin→veri dizili). Böylece grid'de yalnızca 2 hücre
         * var, satır belirsizliği yok. Mobilde bu sarmalayıcı `contents`
         * olur (kendi kutusu kaybolur), içindeki metin/veri kök flex'in
         * doğrudan çocuğu gibi davranır ve `order` ile form'un önüne/
         * arkasına serbestçe taşınabilir — mobil sıra: metin → form → veri.
         */}
        <div className="flex flex-col gap-10 py-10 md:py-16 lg:grid lg:grid-cols-[1fr_460px] lg:items-start lg:gap-x-16 lg:gap-y-0 lg:py-24 2xl:grid-cols-[1fr_520px] 2xl:gap-x-24 2xl:py-32">
          <div className="contents lg:flex lg:flex-col lg:order-1">
            <div className="order-1">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 className="h1 mt-5 md:mt-6">
              {hero.titleLead}{" "}
              <em className="font-normal not-italic text-blue">{hero.titleEmphasis}</em>{" "}
              {hero.titleTail}
            </h1>

            {/*
             * Mobilde ilk ekranda eylem: başlığın hemen altında hızlı yol.
             * AGENTS.md — "Üstte WhatsApp'tan yaz hızlı yolu; reklam trafiği
             * sabırsızdır." Masaüstünde bu yol formun içinde zaten görünür.
             */}
            <div className="mt-6 flex gap-3 lg:hidden">
              <ContactLink
                href={site.contact.whatsappHref}
                external
                className="flex flex-1 items-center justify-center gap-2 bg-[#1f7a4d] px-4 py-3.5 text-[0.75rem] uppercase tracking-[0.1em] text-white"
              >
                <MessageCircle className="size-4 shrink-0" strokeWidth={1.5} aria-hidden />
                WhatsApp
              </ContactLink>
              <a
                href="#form"
                className="flex flex-1 items-center justify-center gap-2 bg-navy px-4 py-3.5 text-[0.75rem] uppercase tracking-[0.1em] text-white"
              >
                <CalendarCheck className="size-4 shrink-0" strokeWidth={1.5} aria-hidden />
                Ön değerlendirme
              </a>
            </div>

            <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-muted md:mt-7 md:text-[1.125rem]">
              {hero.body}
            </p>
          </div>

          {/* Veri bloğu: metnin hemen altında, sabit boşlukla — forma bağlı değil */}
          <div className="order-3 mt-2 lg:mt-14">
            <dl className="grid max-w-lg grid-cols-3 gap-px border border-line bg-line">
              {hero.counters.map((counter) => (
                <div key={counter.label} className="flex flex-col bg-white px-4 py-5">
                  <dt className="sr-only">{counter.label}</dt>
                  <dd className="flex flex-1 flex-col">
                    <span
                      className={cn(
                        "block font-serif text-navy",
                        // Rakam değil metin olan değer ("Safir FUE / DHI") daha küçük
                        // punto ile dizilir; üç kartın etiketi aynı hizada kalır.
                        counter.value.length > 8
                          ? "text-[1.1rem] leading-snug"
                          : "text-[1.5rem] leading-none",
                      )}
                    >
                      {counter.value}
                    </span>
                    <span className="mt-auto block pt-3 text-[0.75rem] uppercase tracking-[0.14em] text-muted">
                      {counter.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            {/* Yüksek değerli sayfalara doğrudan giriş — hem iç link hem hero dengesi */}
            <nav aria-label="Öne çıkan sayfalar" className="mt-8">
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {oneCikanlar.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 border-b border-line pb-1 text-[0.875rem] text-navy transition-colors hover:border-blue hover:text-blue"
                    >
                      {item.title}
                      <ArrowRight className="size-3.5" strokeWidth={1.5} aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            </div>
          </div>

          <div id="form" className="order-2 scroll-mt-24 lg:order-2">
            <LeadForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
