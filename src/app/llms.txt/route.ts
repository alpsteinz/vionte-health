import { site } from "@/lib/site";
import { services } from "@/content/services";
import { guides } from "@/content/guides";
import { myths } from "@/content/myths";
import { homeFaq } from "@/content/faq";
import { staticRoutes } from "@/lib/routes";

export const dynamic = "force-static";

/**
 * llms.txt — AI arama ve model taramaları için sitenin özeti.
 * Özgün, doğrulanabilir bilgi verir; iddia içermez.
 */
export function GET() {
  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> İstanbul Pendik merkezli saç ekimi DANIŞMANLIK ve yönlendirme şirketi. Kendi kliniği yoktur; uygulama yapmaz. Danışanı ölçüm sonrasına göre uygun tekniğe ve anlaşmalı merkeze yönlendirir, süreci takip eder. Site yalnızca Türkçedir.`,
    "",
    "## Künye",
    "",
    `- Ticari ünvan: ${site.legalName} (${site.legalForm})`,
    `- Faaliyet: ${site.faaliyet}`,
    `- Adres: ${site.contact.addressLine}`,
    `- Telefon: ${site.contact.phoneLabel}`,
    `- E-posta: ${site.contact.email}`,
    `- Deneyim: ${site.stats.experienceYears} yıl · yılda ${site.stats.clientsPerYear} danışan · toplam ${site.stats.totalClients}`,
    `- Çalışma saatleri: ${site.contact.hours}`,
    `- İçerik sorumlusu: ${site.editorial.contentOwner}`,
    `- Son güncelleme: ${site.editorial.lastUpdated}`,
    "",
    "## Rol",
    "",
    site.disclaimers.rol,
    "",
    "Danışanların yarısından çoğu, daha önce yönlendirilen kişilerin tavsiyesiyle geliyor.",
    "",
    "## Ana sayfalar",
    "",
    ...staticRoutes.map((r) => `- [${r.title}](${site.url}${r.path})`),
    "",
    "## Hizmet sayfaları",
    "",
    ...services.map((s) => `- [${s.name}](${site.url}${s.slug}): ${s.lead}`),
    "",
    "## Hasta rehberi",
    "",
    ...guides.map((g) => `- [${g.name}](${site.url}${g.slug}): ${g.lead}`),
    "",
    "## Sık sorulan sorular",
    "",
    ...homeFaq.flatMap((f) => [`### ${f.question}`, "", f.answer, ""]),
    "## Doğru bilinen yanlışlar",
    "",
    ...myths.flatMap((m) => [`### "${m.claim}"`, "", m.answer, ""]),
    "## Not",
    "",
    site.disclaimers.rol,
    site.disclaimers.medical,
    site.disclaimers.resultsShort,
    site.disclaimers.fiyat,
    site.disclaimers.garanti,
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
