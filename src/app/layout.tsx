import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/layout/top-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StickyActions } from "@/components/layout/sticky-actions";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { JsonLd } from "@/components/ui/json-ld";
import { RevealScript } from "@/components/ui/reveal-script";
import { clinicSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Vionte Hair Transplant — Saç Ekimi Kliniği, İstanbul",
    template: "%s | Vionte Hair Transplant",
  },
  description:
    "Vionte Hair Transplant, İstanbul'da Safir FUE ve DHI teknikleriyle saç ekimi uygulamaları sunar. Ücretsiz ön değerlendirme için form doldurun.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: "Vionte Hair Transplant — Saç Ekimi Kliniği, İstanbul",
    description:
      "İstanbul'da Safir FUE ve DHI teknikleriyle saç ekimi. Greft planı ölçüm sonuçları üzerine kurulur.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0d2138",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="pb-[60px] md:pb-0">
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          İçeriğe geç
        </a>
        <TopBar />
        <Header />
        <main id="icerik">{children}</main>
        <Footer />
        <StickyActions />
        <CookieConsent />
        <JsonLd data={clinicSchema()} />
        <RevealScript />
      </body>
    </html>
  );
}
