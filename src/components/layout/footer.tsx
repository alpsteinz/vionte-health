import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { ContactLink } from "@/components/ui/contact-link";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";
import { navigation, legalNavigation } from "@/lib/navigation";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <Container>
        <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Logo tone="light" />
            <p className="measure mt-6 text-[0.9375rem] text-blue-light">
              Saç ekimi danışmanlık ve yönlendirme. Uygulama yapmayız;
              ölçüme göre size uygun tekniğe ve anlaşmalı merkeze
              yönlendirir, süreci takip ederiz.
            </p>

            <ul className="mt-8 space-y-3 text-[0.9375rem] text-blue-light">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 size-4 shrink-0" strokeWidth={1.5} aria-hidden />
                <span>{site.contact.addressLine}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-1 size-4 shrink-0" strokeWidth={1.5} aria-hidden />
                <ContactLink href={site.contact.phoneHref} className="transition-colors hover:text-white">
                  {site.contact.phoneLabel}
                </ContactLink>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-1 size-4 shrink-0" strokeWidth={1.5} aria-hidden />
                <ContactLink href={`mailto:${site.contact.email}`} className="transition-colors hover:text-white">
                  {site.contact.email}
                </ContactLink>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-1 size-4 shrink-0" strokeWidth={1.5} aria-hidden />
                <span>{site.contact.hours}</span>
              </li>
              <li className="flex items-start gap-3">
                <InstagramIcon className="mt-1 size-4 shrink-0" />
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {site.social.instagramHandle}
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Alt menü" className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {navigation
              .filter((item) => item.children)
              .map((item) => (
                <div key={item.href}>
                  <h3 className="eyebrow eyebrow-light font-sans">{item.title}</h3>
                  <ul className="mt-5 space-y-2.5">
                    {item.children?.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="text-[0.9375rem] text-blue-light transition-colors hover:text-white"
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                    {item.href === "/sac-ekimi" ? (
                      <>
                        <li>
                          <Link href="/sakal-ekimi" className="text-[0.9375rem] text-blue-light transition-colors hover:text-white">
                            Sakal Ekimi
                          </Link>
                        </li>
                        <li>
                          <Link href="/kas-ekimi" className="text-[0.9375rem] text-blue-light transition-colors hover:text-white">
                            Kaş Ekimi
                          </Link>
                        </li>
                      </>
                    ) : null}
                  </ul>
                </div>
              ))}
            <div>
              <h3 className="eyebrow eyebrow-light font-sans">Kurumsal</h3>
              <ul className="mt-5 space-y-2.5">
                <li>
                  <Link href="/iletisim" className="text-[0.9375rem] text-blue-light transition-colors hover:text-white">
                    İletişim
                  </Link>
                </li>
                {legalNavigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[0.9375rem] text-blue-light transition-colors hover:text-white"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Zorunlu künye: ticari ünvan, tıbbi sorumluluk notu, içerik sorumlusu, son güncelleme */}
        <div className="border-t border-line-dark py-10 text-[0.8125rem] leading-relaxed text-blue-light">
          <p className="measure">{site.disclaimers.rol}</p>
          <p className="measure mt-3">{site.disclaimers.medical}</p>
          <dl className="mt-6 grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex gap-2">
              <dt className="text-white/60">Ticari ünvan:</dt>
              <dd>{site.legalName} ({site.legalForm})</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-white/60">İçerik sorumlusu:</dt>
              <dd>{site.editorial.contentOwner}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-white/60">Son güncelleme:</dt>
              <dd>{site.editorial.lastUpdated}</dd>
            </div>
          </dl>
          <p className="mt-8 text-white/50">
            © {new Date().getFullYear()} {site.name}. Tüm hakları saklıdır.
          </p>
        </div>
      </Container>
    </footer>
  );
}
