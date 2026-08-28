import { MapPin, Phone, MessageCircle, Mail, Clock } from "lucide-react";
import { Section } from "@/components/ui/section";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { site } from "@/lib/site";

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

export function Contact() {
  return (
    <Section id="iletisim" tone="navy">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="reveal">
          <p className="eyebrow eyebrow-light">Klinik</p>
          <h2 className="h2 mt-4 text-white">Bize ulaşın</h2>

          <dl className="mt-10 divide-y divide-line-dark border-y border-line-dark">
            {rows.map((row) => (
              <div key={row.label} className="flex items-start gap-4 py-4">
                <row.icon
                  className="mt-1 size-4 shrink-0 text-blue-light"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <div className="flex flex-1 flex-wrap justify-between gap-x-6 gap-y-1">
                  <dt className="text-[0.8125rem] uppercase tracking-[0.12em] text-blue-light/70">
                    {row.label}
                  </dt>
                  <dd className="text-[0.9375rem] text-white">
                    {row.href ? (
                      <a
                        href={row.href}
                        target={row.href.startsWith("http") ? "_blank" : undefined}
                        rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="transition-colors hover:text-blue-light"
                      >
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="reveal border border-line-dark">
          <PhotoPlaceholder label="Harita — adres onaylandığında eklenecek" ratio="4/3" tone="dark" />
        </div>
      </div>
    </Section>
  );
}
