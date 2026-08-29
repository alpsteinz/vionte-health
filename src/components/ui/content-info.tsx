import { FileText } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Sayfa altı künyesi.
 *
 * "Tıbbi inceleme: Dr. X" satırı KALDIRILDI — Vionte bir sağlık kuruluşu
 * değil, danışmanlık şirketidir; bünyesinde hekim bulundurmaz ve böyle bir
 * izlenim vermemelidir.
 *
 * Yerine mevzuatın gerçekten zorunlu tuttuğu iki bilgi kalır: içeriğin son
 * güncelleme tarihi ve içerik sorumlusuna ulaşılabilecek iletişim. Ayrıca
 * Vionte'nin aracılık rolü her sayfanın altında açıkça belirtilir.
 */
export function ContentInfo() {
  return (
    <div className="mt-16 border-t border-line pt-6 text-sm text-muted">
      <p className="flex flex-wrap items-start gap-2">
        <FileText className="mt-0.5 size-4 shrink-0 text-blue" strokeWidth={1.5} aria-hidden />
        <span>
          <strong className="font-medium text-ink">İçerik sorumlusu:</strong>{" "}
          {site.editorial.contentOwner} · Son güncelleme:{" "}
          {site.editorial.lastUpdated}
        </span>
      </p>
      <p className="measure mt-3">{site.disclaimers.rol}</p>
      <p className="measure mt-2">{site.disclaimers.medical}</p>
    </div>
  );
}
