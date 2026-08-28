import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { getLegalDoc } from "@/content/legal";

const doc = getLegalDoc("/cerez-politikasi")!;

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: doc.slug },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <LegalPage doc={doc} />;
}
