import Link from "next/link";
import { MessageCircle, Phone, CalendarCheck } from "lucide-react";
import { ContactLink } from "@/components/ui/contact-link";
import { site } from "@/lib/site";

/** Sabit WhatsApp butonu (masaüstü) + mobilde alt bar */
export function StickyActions() {
  return (
    <>
      <ContactLink
        href={site.contact.whatsappHref}
        external
        className="fixed bottom-6 right-6 z-30 hidden items-center gap-2.5 bg-[#1f7a4d] px-5 py-3.5 text-[0.8125rem] uppercase tracking-[0.1em] text-white shadow-[0_10px_30px_-12px_rgba(13,33,56,0.6)] transition-colors duration-200 hover:bg-[#186139] md:inline-flex"
      >
        <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden />
        WhatsApp
      </ContactLink>

      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-line-dark bg-navy md:hidden">
        <ContactLink
          href={site.contact.phoneHref}
          className="flex flex-col items-center gap-1 py-3 text-[0.6875rem] uppercase tracking-[0.12em] text-white"
        >
          <Phone className="size-4" strokeWidth={1.5} aria-hidden />
          Ara
        </ContactLink>
        <ContactLink
          href={site.contact.whatsappHref}
          external
          className="flex flex-col items-center gap-1 border-x border-line-dark bg-[#1f7a4d] py-3 text-[0.6875rem] uppercase tracking-[0.12em] text-white"
        >
          <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden />
          WhatsApp
        </ContactLink>
        <Link
          href="/#form"
          className="flex flex-col items-center gap-1 py-3 text-[0.6875rem] uppercase tracking-[0.12em] text-white"
        >
          <CalendarCheck className="size-4" strokeWidth={1.5} aria-hidden />
          Form
        </Link>
      </div>
    </>
  );
}
