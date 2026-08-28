import { ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Zorunlu: her hizmet ve blog sayfasında "Tıbbi inceleme: Dr. X — tarih".
 */
export function MedicalReview({ reviewer, date }: { reviewer?: string; date?: string }) {
  return (
    <div className="mt-16 border-t border-line pt-6 text-sm text-muted">
      <p className="flex flex-wrap items-center gap-2">
        <ShieldCheck className="size-4 shrink-0 text-blue" strokeWidth={1.5} aria-hidden />
        <span>
          <strong className="font-medium text-ink">Tıbbi inceleme:</strong>{" "}
          {reviewer ?? site.editorial.medicalReviewer} —{" "}
          {date ?? site.editorial.medicalReviewDate}
        </span>
      </p>
      <p className="mt-2">
        Son güncelleme: {site.editorial.lastUpdated} · İçerik sorumlusu:{" "}
        {site.editorial.contentOwner}
      </p>
      <p className="measure mt-3">{site.disclaimers.medical}</p>
    </div>
  );
}
