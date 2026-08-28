import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import type { LegalDoc } from "@/content/legal";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  const trail = [
    { name: "Ana sayfa", href: "/" },
    { name: doc.name, href: doc.slug },
  ];

  return (
    <>
      <Breadcrumbs trail={trail} />
      <PageHero eyebrow="Yasal" title={doc.h1} lead={doc.lead} />

      <Section tone="paper">
        <article className="mx-auto max-w-[75ch]">
          {doc.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28 border-b border-line pb-10 last:border-0 [&+&]:pt-10"
            >
              <h2 className="font-serif text-[clamp(1.35rem,2.4vw,1.8rem)] text-navy">
                {section.heading}
              </h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
              {section.list ? (
                <ul className="mt-6 list-disc space-y-2 pl-6 marker:text-blue">
                  {section.list.map((item) => (
                    <li key={item} className="text-[0.9375rem] leading-relaxed text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <p className="mt-10 border-t border-line pt-6 text-[0.875rem] text-muted">
            Son güncelleme: {site.editorial.lastUpdated} · İçerik sorumlusu:{" "}
            {site.editorial.contentOwner}
          </p>
        </article>
      </Section>

      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
