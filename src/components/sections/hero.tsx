import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { LeadForm } from "./lead-form";
import { hero } from "@/content/home";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="border-b border-line bg-white">
      <Container>
        <div className="grid gap-12 py-14 md:py-20 lg:grid-cols-[1fr_460px] lg:gap-16 lg:py-24">
          <div className="flex flex-col">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 className="h1 mt-6">
              {hero.titleLead}{" "}
              <em className="font-normal not-italic text-blue">{hero.titleEmphasis}</em>{" "}
              {hero.titleTail}
            </h1>
            <p className="measure mt-7 text-[1.0625rem] leading-relaxed text-muted md:text-[1.125rem]">
              {hero.body}
            </p>

            <div className="mt-12 lg:mt-auto lg:pt-16">
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
                    <span className="mt-auto pt-3 block text-[0.75rem] uppercase tracking-[0.14em] text-muted">
                      {counter.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            {/* Yüksek değerli sayfalara doğrudan giriş — hem iç link hem hero dengesi */}
            <nav aria-label="Öne çıkan sayfalar" className="mt-8">
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {[
                  { title: "Tıraşsız saç ekimi", href: "/sac-ekimi/tirassiz-sac-ekimi" },
                  { title: "Kadınlarda saç ekimi", href: "/sac-ekimi/kadin-sac-ekimi" },
                  { title: "Fiyat nasıl belirlenir", href: "/hasta-rehberi/fiyatlandirma-nasil-belirlenir" },
                ].map((item) => (
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

          <div id="form" className="scroll-mt-28">
            <LeadForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
