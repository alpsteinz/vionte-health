import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { Section } from "@/components/ui/section";
import { referans } from "@/content/home";
import { site } from "@/lib/site";

/**
 * Ana farklılaşma noktası: danışanların yarısından çoğu eski danışan
 * referansıyla geliyor. Reklamla gelen trafiğin doğrulama aradığı yerde
 * en güçlü sinyal budur, bu yüzden ana sayfada öne çıkar.
 */
export function Referral() {
  return (
    <Section tone="navy">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20 xl:gap-28">
        <div className="reveal">
          <p className="eyebrow eyebrow-light">{referans.eyebrow}</p>
          <h2 className="h2 mt-4 text-white">{referans.title}</h2>
          <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-blue-light">
            {referans.body}
          </p>
          <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-blue-light/80">
            {referans.note}
          </p>
          <Link
            href="/neden-danisman"
            className="mt-8 inline-flex items-center gap-2 text-[0.8125rem] uppercase tracking-[0.1em] text-blue-light transition-colors hover:text-white"
          >
            Neden danışman?
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
          </Link>
        </div>

        <dl className="rule-grid rule-grid-dark reveal self-start sm:grid-cols-2">
          <div className="bg-navy p-7">
            <Users className="size-5 text-blue-light" strokeWidth={1.5} aria-hidden />
            <dt className="mt-5 text-[0.75rem] uppercase tracking-[0.14em] text-blue-light/70">
              Yıllık danışan
            </dt>
            <dd className="mt-2 font-serif text-[2rem] leading-none text-white">
              {site.stats.clientsPerYear}
            </dd>
          </div>
          <div className="bg-navy p-7">
            <span className="block font-serif text-[2rem] leading-none text-blue-light/50">
              {site.stats.experienceYears}
            </span>
            <dt className="mt-5 text-[0.75rem] uppercase tracking-[0.14em] text-blue-light/70">
              Yıl deneyim
            </dt>
            <dd className="mt-2 text-[0.9375rem] leading-relaxed text-blue-light">
              Toplam {site.stats.totalClients} danışan yönlendirildi
            </dd>
          </div>
        </dl>
      </div>
    </Section>
  );
}
