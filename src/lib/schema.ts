import { site } from "./site";
import type { FaqItem } from "@/content/faq";

const clean = (v: string) => (v.trim().startsWith("[") ? undefined : v);

/** Ana sayfa: MedicalClinic + LocalBusiness */
export function clinicSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": `${site.url}/#klinik`,
    name: site.name,
    legalName: clean(site.legalName),
    url: site.url,
    telephone: clean(site.contact.phoneLabel),
    email: clean(site.contact.email),
    inLanguage: "tr-TR",
    medicalSpecialty: "Dermatology",
    address: {
      "@type": "PostalAddress",
      streetAddress: clean(site.contact.street),
      addressLocality: clean(site.contact.district),
      addressRegion: site.contact.city,
      postalCode: clean(site.contact.postalCode),
      addressCountry: site.contact.country,
    },
    sameAs: [site.social.instagram],
    availableService: [
      { "@type": "MedicalProcedure", name: "Safir FUE saç ekimi" },
      { "@type": "MedicalProcedure", name: "DHI saç ekimi" },
      { "@type": "MedicalProcedure", name: "Tıraşsız saç ekimi" },
      { "@type": "MedicalProcedure", name: "Kadınlarda saç ekimi" },
      { "@type": "MedicalProcedure", name: "Sakal ekimi" },
      { "@type": "MedicalProcedure", name: "Kaş ekimi" },
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
    provider: { "@id": `${site.url}/#klinik` },
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
    publisher: { "@id": `${site.url}/#klinik` },
    reviewedBy: clean(site.editorial.medicalReviewer)
      ? { "@type": "Person", name: site.editorial.medicalReviewer }
      : undefined,
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

export function physicianSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: clean(site.editorial.medicalReviewer) ?? site.name,
    worksFor: { "@id": `${site.url}/#klinik` },
    medicalSpecialty: "Dermatology",
    url: `${site.url}/ekibimiz`,
  };
}
