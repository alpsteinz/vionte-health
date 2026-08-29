import type { Metadata } from "next";
import { MapPin, Phone, MessageCircle, Mail, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { LeadForm } from "@/components/sections/lead-form";
import { ContentInfo } from "@/components/ui/content-info";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { ContactLink } from "@/components/ui/contact-link";
import { site } from "@/lib/site";

const title = "İletişim";
const description =
  "Vionte Health iletişim bilgileri: adres, telefon, WhatsApp, e-posta ve çalışma saatleri. Pendik/İstanbul.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/iletisim" },
  openGraph: { title, description, url: "/iletisim" },
};

const trail = [
  { name: "Ana sayfa", href: "/" },
  { name: "İletişim", href: "/iletisim" },
];

const rows = [
  { icon: MapPin, label: "Adres", value: site.contact.addressLine, href: undefined },
  { icon: Phone, label: "Telefon", value: site.contact.phoneLabel, href: site.contact.phoneHref },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: site.contact.whatsappLabel,
    href: site.contact.whatsappHref,
  },
  { icon: Mail, label: "E-posta", value: site.contact.email, href: `mailto:${site.contact.email}` },
  { icon: Clock, label: "Çalışma saatleri", value: site.contact.hours, href: undefined },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs trail={trail} />
      <PageHero
        eyebrow="İletişim"
        title="Bize Ulaşın"
        lead="Ücretsiz saç analizi için formu doldurabilir, WhatsApp'tan yazabilir veya doğrudan arayabilirsiniz. Talepler sertifikalı saç ekim uzmanlarımız tarafından anında yanıtlanır."
      />

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_460px] lg:gap-16">
          <div>
            <dl className="divide-y divide-line border-y border-line">
              {rows.map((row) => (
                <div key={row.label} className="flex items-start gap-4 py-4">
                  <row.icon className="mt-1 size-4 shrink-0 text-blue" strokeWidth={1.5} aria-hidden />
                  <div className="flex flex-1 flex-wrap justify-between gap-x-6 gap-y-1">
                    <dt className="text-[0.8125rem] uppercase tracking-[0.12em] text-muted">
                      {row.label}
                    </dt>
                    <dd className="text-[0.9375rem] text-ink">
                      {row.href ? (
                        <ContactLink
                          href={row.href}
                          external={row.href.includes("wa.me")}
                          className="transition-colors hover:text-blue"
                        >
                          {row.value}
                        </ContactLink>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-10 border border-line">
              <PhotoPlaceholder label="Harita — Varyap Plaza, Pendik" ratio="16/9" />
            </div>

            <div className="mt-10 border border-line bg-white p-6 text-[0.875rem] leading-relaxed text-muted">
              <p>
                <strong className="font-medium text-ink">İçerik sorumlusu:</strong>{" "}
                {site.editorial.contentOwner}
              </p>
              <p className="mt-2">
                <strong className="font-medium text-ink">Ticari ünvan:</strong>{" "}
                {site.legalName} ({site.legalForm})
              </p>
              <p className="mt-2">
                <strong className="font-medium text-ink">Faaliyet:</strong>{" "}
                {site.faaliyet}
              </p>
            </div>
          </div>

          <div id="form" className="scroll-mt-28">
            <LeadForm />
          </div>
        </div>
      </Section>

      <Container className="pb-20">
        <ContentInfo />
      </Container>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
