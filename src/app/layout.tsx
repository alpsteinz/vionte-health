import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
    default: "Vionte Health — Saç Ekimi Danışmanlığı, İstanbul",
    template: "%s | Vionte Health",
  },
  description:
    "Vionte Health saç ekimi danışmanlık ve yönlendirme şirketidir. Dökülme tipinizi ve donör kapasitenizi ölçer, size uygun tekniğe ve anlaşmalı merkeze yönlendiririz. Saç analizi ücretsizdir.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: "Vionte Health — Saç Ekimi Danışmanlığı, İstanbul",
    description:
      "Saç ekimi danışmanlık ve yönlendirme. Ölçüme göre size uygun tekniğe ve anlaşmalı merkeze yönlendiririz. Saç analizi ücretsizdir.",
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
        {/*
         * Speed Insights betiği /_vercel/speed-insights/script.js adresinden
         * yüklenir; bu uç nokta yalnızca Vercel altyapısında vardır. Lokal
         * ve diğer ortamlarda 404 verip konsolu kirletmemesi için yalnızca
         * Vercel'de render ediliyor.
         */}
        {process.env.VERCEL ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}
