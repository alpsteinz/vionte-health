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
    `> İstanbul'da saç ekimi kliniği. Safir FUE ve DHI teknikleriyle saç ekimi, sakal ve kaş ekimi, PRP ve mezoterapi uygulamaları. Site yalnızca Türkçedir.`,
    "",
    "## Klinik künyesi",
    "",
    `- Ticari ünvan: ${site.legalName}`,
    `- Adres: ${site.contact.addressLine}`,
    `- Telefon: ${site.contact.phoneLabel}`,
    `- E-posta: ${site.contact.email}`,
    `- Tecrübe: ${site.stats.experienceYears} yıl · ${site.stats.applications} uygulama`,
    `- İçerik sorumlusu: ${site.editorial.contentOwner}`,
    `- Son güncelleme: ${site.editorial.lastUpdated}`,
    "",
    "## Operasyon yapısı",
    "",
    "Kanal açma aşamasını saç ekimi uygulayıcı sertifikasına sahip hekim yürütür. Greft alımı ve yerleştirme, Sağlık Bakanlığı tescilli yardımcı uygulayıcı sertifikasına sahip sağlık personeli tarafından hekim sorumluluğunda yapılır.",
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
    site.disclaimers.medical,
    site.disclaimers.resultsShort,
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
