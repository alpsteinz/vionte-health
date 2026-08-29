import { site } from "./site";
import type { FaqItem } from "@/content/faq";

const clean = (v: string) => (v.trim().startsWith("[") ? undefined : v);

/**
 * Ana sayfa şeması.
 *
 * MedicalClinic KULLANILMAZ — Vionte bir sağlık kuruluşu değil, aracılık
 * hizmeti veren bir işletmedir. Yanlış tip, arama motorlarına ve AI
 * sistemlerine klinik olduğu izlenimi verir.
 */
export function clinicSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${site.url}/#kurum`,
    name: site.name,
    legalName: clean(site.legalName),
    description: site.disclaimers.rol,
    url: site.url,
    telephone: clean(site.contact.phoneLabel),
    email: clean(site.contact.email),
    inLanguage: "tr-TR",
    knowsAbout: site.faaliyet,
    openingHours: "Mo-Su 09:00-17:00",
    address: {
      "@type": "PostalAddress",
      streetAddress: clean(site.contact.street),
      addressLocality: clean(site.contact.district),
      addressRegion: site.contact.city,
      postalCode: clean(site.contact.postalCode),
      addressCountry: site.contact.country,
    },
    sameAs: [site.social.instagram],
    // Sunulan hizmet danışmanlık ve yönlendirmedir, uygulama değil
    availableService: [
      { "@type": "Service", name: "Ücretsiz saç analizi" },
      { "@type": "Service", name: "Saç ekimi danışmanlığı ve yönlendirme" },
      { "@type": "Service", name: "Operasyon sonrası süreç takibi" },
    ],
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items
      .filter((i) => !i.answer.trim().startsWith("["))
      .map((i) => ({
        "@type": "Question",
        name: i.question,
        acceptedAnswer: { "@type": "Answer", text: i.answer },
      })),
  };
}

export function procedureSchema({
  name,
  description,
  path,
  bodyLocation,
}: {
  name: string;
  description: string;
  path: string;
  bodyLocation?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name,
    description,
    url: `${site.url}${path}`,
    bodyLocation,
    procedureType: "https://schema.org/PercutaneousProcedure",
    provider: { "@id": `${site.url}/#kurum` },
    inLanguage: "tr-TR",
  };
}

export function articleSchema({
  title,
  description,
  path,
  published,
}: {
  title: string;
  description: string;
  path: string;
  published?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: title,
    description,
    url: `${site.url}${path}`,
    inLanguage: "tr-TR",
    datePublished: clean(published ?? ""),
    dateModified: clean(site.editorial.lastUpdated),
    publisher: { "@id": `${site.url}/#kurum` },
    // reviewedBy kullanılmaz — içerik hekim incelemesinden geçmez;
    // sorumlusu içerik sorumlusudur.
    author: { "@type": "Person", name: site.kvkk.veriSorumlusu },
  };
}

export function breadcrumbSchema(trail: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.href}`,
    })),
  };
}

