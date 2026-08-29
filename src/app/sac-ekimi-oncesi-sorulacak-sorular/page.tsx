import type { Metadata } from "next";
import { ConsultancyPage } from "@/components/sections/consultancy-page";
import { getDanismanlikSayfasi } from "@/content/consultancy";

const sayfa = getDanismanlikSayfasi("/sac-ekimi-oncesi-sorulacak-sorular")!;

export const metadata: Metadata = {
  title: sayfa.metaTitle,
  description: sayfa.metaDescription,
  alternates: { canonical: sayfa.slug },
  openGraph: { title: sayfa.metaTitle, description: sayfa.metaDescription, url: sayfa.slug },
};

export default function Page() {
  return <ConsultancyPage sayfa={sayfa} />;
}
