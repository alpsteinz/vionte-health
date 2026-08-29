import { AlertTriangle } from "lucide-react";
import { Container } from "./container";

/**
 * Bu sayfadaki tıbbi anlatımın bir bölümü CONTENT.md'de onaylanmamış taslaktır.
 *
 * AGENTS.md: sağlık içeriği YMYL kategorisindedir, "AI taslak için kullanılır,
 * yayın için değil". Uyarı, onaysız metnin sessizce yayına gitmesini engeller
 * ve doldurulacak sayfaların listesini gözle görülür kılar.
 *
 * İçerik onaylandığında ilgili sayfanın `draftMedicalCopy` bayrağı kaldırılır
 * ve uyarı kaybolur.
 */
export function DraftNotice() {
  return (
    <div className="border-b border-[#e6d5a8] bg-[#fdf8ec]">
      <Container>
        <p className="measure flex items-start gap-3 py-3 text-[0.8125rem] leading-relaxed text-[#6b5518]">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} aria-hidden />
          <span>
            <strong className="font-medium">Taslak içerik.</strong> Bu sayfadaki
            tıbbi anlatımın bir bölümü henüz onaylanmadı; yayından önce tıbbi
            inceleyenin onayından geçmesi gerekiyor.
          </span>
        </p>
      </Container>
    </div>
  );
}
