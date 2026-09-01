import { site } from "./site";

/**
 * Bölüm bazlı WhatsApp CTA bağlantıları. Tümü aynı numaraya
 * (0532 015 79 85) gider; hazır mesaj bölüme göre değişir. WhatsApp
 * deep-link'i özel bir izleme parametresi (UTM) taşımaz — kaynak ayrımı,
 * gelen mesajın metninden okunur. Yeni bir CTA eklenecekse buraya bir
 * satır eklemek yeterlidir; numara veya link biçimi tek yerden yönetilir.
 */
function waHref(message: string): string {
  return `${site.contact.whatsappHref}?text=${encodeURIComponent(message)}`;
}

export const whatsappCta = {
  hero: waHref("Merhaba, ücretsiz ön görüşme almak istiyorum."),
  band: waHref("Merhaba, saç ekimi için danışmanlık almak istiyorum."),
  teknikler: waHref(
    "Merhaba, hangi saç ekimi tekniğinin bana uygun olduğunu öğrenmek istiyorum.",
  ),
  surec: waHref("Merhaba, saç ekimi sürecimi birlikte planlamak istiyorum."),
  vakalar: waHref(
    "Merhaba, benim için hangi sonuçların mümkün olduğunu öğrenmek istiyorum.",
  ),
  sss: waHref("Merhaba, aklımdaki soruyu sormak istiyorum."),
  footer: waHref("Merhaba, saç ekimi danışmanlığı hakkında bilgi almak istiyorum."),
  /**
   * Ana sayfadaki hero formu kaldırıldığı için sitedeki eski `/#form`
   * bağlantıları (üst menü, mobil menü, mobil alt bar, makale CTA'sı) da
   * WhatsApp'a yönlendirilir — hizmet sayfalarındaki LeadForm'lar bundan
   * etkilenmez, kendi sayfalarında yerinde durmaya devam eder.
   */
  header: waHref("Merhaba, ücretsiz saç analizi almak istiyorum."),
  mobileBar: waHref("Merhaba, saç analizi formu hakkında bilgi almak istiyorum."),
  article: waHref("Merhaba, ön değerlendirme için bilgi almak istiyorum."),
} as const;
