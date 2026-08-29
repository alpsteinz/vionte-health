import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Section } from "@/components/ui/section";
import { team } from "@/content/home";

/**
 * Ekip bölümü. Vionte'nin kendi kliniği olmadığı için klinik fotoğrafı
 * kullanılmaz; anlatım sertifikasyon ve sorumluluk üzerine kurulur.
 */
export function Team() {
  return (
    <Section id="ekip" tone="white">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20 xl:gap-28">
        <div className="reveal">
          <p className="eyebrow">{team.eyebrow}</p>
          <h2 className="h2 mt-4">{team.title}</h2>
          <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-muted">
            {team.body}
          </p>

          <blockquote className="mt-8 border-l-2 border-blue pl-6">
            <p className="measure font-serif text-[1.25rem] leading-snug text-navy md:text-[1.4rem]">
              &ldquo;{team.quote}&rdquo;
            </p>
          </blockquote>

          <Link
            href="/ekibimiz"
            className="mt-8 inline-flex items-center gap-2 text-[0.8125rem] uppercase tracking-[0.1em] text-blue transition-colors hover:text-navy"
          >
            Ekibimiz
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
          </Link>
        </div>

        <dl className="rule-grid reveal self-start">
          {team.roles.map((role) => (
            <div key={role.label} className="bg-white p-7">
              <dt className="flex items-center gap-2.5 text-[0.75rem] uppercase tracking-[0.14em] text-blue">
                <BadgeCheck className="size-4 shrink-0" strokeWidth={1.5} aria-hidden />
                {role.label}
              </dt>
              <dd className="mt-3 text-[1.0625rem] leading-relaxed text-ink">
                {role.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
