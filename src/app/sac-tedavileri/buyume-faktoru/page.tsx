import type { Metadata } from "next";
import { ServicePage } from "@/components/sections/service-page";
import { getService } from "@/content/services";

const service = getService("/sac-tedavileri/buyume-faktoru")!;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: { canonical: service.slug },
  openGraph: { title: service.metaTitle, description: service.metaDescription, url: service.slug },
};

export default function Page() {
  return <ServicePage service={service} />;
}
