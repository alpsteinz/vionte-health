import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHead } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ContentInfo } from "@/components/ui/content-info";
import { JsonLd } from "@/components/ui/json-ld";
import { AnlasmaliMerkezKarti } from "@/components/sonuclar/anlasmali-merkez-karti";
import { DanisanHikayesiKarti } from "@/components/sonuclar/danisan-hikayesi-karti";
import { breadcrumbSchema } from "@/lib/schema";
import {
  anlasmaliMerkezSonuclari,
  anlasmaliYayinlanabilir,
  danisanHikayeleri,
  hikayeYayinlanabilir,
} from "@/content/results";
import { site } from "@/lib/site";

const title = "Sonuçlarımız";
const description =
  "Görselli sonuçlar ve danışan hikayeleri. Her görselin yanında uygulamayı yapan merkez belirtilir; hikayeler yalnızca yazılı izinle yayınlanır.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sonuclarimiz" },
  openGraph: { title, description, url: "/sonuclarimiz" },
};

const trail = [
  { name: "Ana sayfa", href: "/" },
  { name: "Sonuçlarımız", href: "/sonuclarimiz" },
];

export default function Page() {
  const merkezSonuclari = anlasmaliMerkezSonuclari.filter(anlasmaliYayinlanabilir);
  const hikayeler = danisanHikayeleri.filter(hikayeYayinlanabilir);
  const bosDurum = merkezSonuclari.length === 0 && hikayeler.length === 0;

  return (
    <>
      <Breadcrumbs trail={trail} />
      <PageHero
        eyebrow="Sonuçlar"
        title="Görselli Sonuçlar ve Danışan Hikayeleri"
        lead="Bir uygulama görseli, kimin yaptığı bilinmeden bir şey anlatmaz. Bu sayfadaki her görselin yanında uygulamayı yapan merkezin adı yer alır; danışan hikayeleri ise yalnızca yazılı izin alınmış kayıtlardan oluşur."
      />

      {bosDurum ? (
        <Section tone="paper">
          <div className="max-w-[62ch] border border-line bg-white p-8">
            <ShieldCheck className="size-6 text-blue" strokeWidth={1.5} aria-hidden />
            <h2 className="h3 mt-5">Henüz yayınlanmış görsel yok</h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
              Görselli sonuçlar iki koşul sağlanmadan yayınlanmıyor: uygulamayı
              yapan merkezin adı ve danışandan alınmış imzalı yazılı izin. Bu
              koşullar tamamlanana kadar sayfa boş kalır.
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
              Bu arada vakaları ölçüm verisiyle inceleyebilirsiniz: donör
              durumu, greft sayısı, uygulanan teknik ve yönlendirme gerekçesi.
            </p>
            <Link
              href="/vakalar"
              className="mt-7 inline-flex items-center gap-2 text-[0.8125rem] uppercase tracking-[0.1em] text-blue transition-colors hover:text-navy"
            >
              Fotoğrafsız vakalar
              <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
            </Link>
          </div>
        </Section>
      ) : null}

      {merkezSonuclari.length > 0 ? (
        <Section tone="paper">
          <SectionHead
            eyebrow="Anlaşmalı merkez sonuçları"
            title="Öncesi ve sonrası"
            intro="Her kartta uygulamayı yapan merkezin adı belirtilir."
          />
          <div className="rule-grid reveal mt-12 md:grid-cols-2 lg:grid-cols-3">
            {merkezSonuclari.map((kayit) => (
              <AnlasmaliMerkezKarti key={kayit.id} kayit={kayit} />
            ))}
          </div>
          <p className="measure mt-8 text-[0.875rem] leading-relaxed text-muted">
            {site.disclaimers.results}
          </p>
        </Section>
      ) : null}

      {hikayeler.length > 0 ? (
        <Section tone="white">
          <SectionHead
            eyebrow="Danışan hikayeleri"
            title="Başlangıçtan sonuca"
            intro="Yalnızca yazılı izin alınmış kayıtlar yayınlanır."
          />
          <div className="rule-grid reveal mt-12 md:grid-cols-2">
            {hikayeler.map((kayit) => (
              <DanisanHikayesiKarti key={kayit.id} kayit={kayit} />
            ))}
          </div>
        </Section>
      ) : null}

      <Container className="pb-20">
        <ContentInfo />
      </Container>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
