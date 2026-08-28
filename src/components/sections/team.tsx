import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { team } from "@/content/home";

export function Team() {
  return (
    <Section id="ekip" tone="white">
      <div className="grid gap-12 lg:grid-cols-[420px_1fr] lg:gap-16">
        <div className="rule-grid reveal self-start">
          <PhotoPlaceholder label="Ekip fotoğrafı" ratio="3/4" />
          <div className="grid grid-cols-2 gap-px bg-line">
            <PhotoPlaceholder label="Danışma odası" ratio="1/1" />
            <PhotoPlaceholder label="Operasyon salonu" ratio="1/1" />
          </div>
        </div>

        <div className="reveal flex flex-col justify-center">
          <p className="eyebrow">{team.eyebrow}</p>
          <h2 className="h2 mt-4">{team.title}</h2>
          <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-muted">
            {team.body}
          </p>

          <blockquote className="mt-8 border-l-2 border-blue pl-6">
            <p className="measure font-serif text-[1.25rem] leading-snug text-navy md:text-[1.4rem]">
              “{team.quote}”
            </p>
          </blockquote>

          <dl className="mt-8 divide-y divide-line border-y border-line text-[0.9375rem]">
            {team.roles.map((role) => (
              <div key={role.label} className="flex flex-wrap justify-between gap-x-6 gap-y-1 py-3.5">
                <dt className="text-muted">{role.label}</dt>
                <dd className="text-ink">{role.value}</dd>
              </div>
            ))}
          </dl>

          <Link
            href="/ekibimiz"
            className="mt-8 inline-flex items-center gap-2 self-start text-[0.8125rem] uppercase tracking-[0.1em] text-blue transition-colors hover:text-navy"
          >
            Ekibimiz
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
          </Link>
        </div>
      </div>
    </Section>
  );
}
