import { MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

/** Ana sayfa bölüm sırası 1 — üst şerit: adres + telefon */
export function TopBar() {
  return (
    <div className="hidden border-b border-line-dark bg-navy text-white md:block">
      <Container>
        <div className="flex items-center justify-between gap-6 py-2.5 text-[0.8125rem] font-light">
          <p className="flex items-center gap-2 text-blue-light">
            <MapPin className="size-3.5 shrink-0" strokeWidth={1.5} aria-hidden />
            <span>{site.contact.addressLine}</span>
          </p>
          <div className="flex items-center gap-6">
            <a
              href={site.contact.phoneHref}
              className="flex items-center gap-2 transition-colors hover:text-blue-light"
            >
              <Phone className="size-3.5 shrink-0" strokeWidth={1.5} aria-hidden />
              <span>{site.contact.phoneLabel}</span>
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-blue-light"
            >
              <InstagramIcon className="size-3.5 shrink-0" />
              <span>{site.social.instagramHandle}</span>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
