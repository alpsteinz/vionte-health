import { Copy } from "@/components/ui/copy";
import type { FotografsizVaka } from "@/content/results";

/**
 * TİP 3 — Fotoğrafsız vaka.
 *
 * Görsel içermez, bu nedenle hasta onamı gerektirmez. Tüm alanlar
 * opsiyoneldir; yalnızca dolu olanlar gösterilir.
 *
 * Ölçüm verisi öne çıkar: yaş, Norwood seviyesi, donör durumu, greft,
 * teknik, sonuç ayı, şehir — ve neden bu tekniğe/merkeze yönlendirildiği.
 */
const alanlar = [
  { alan: "yas", baslik: "Yaş" },
  { alan: "norwood", baslik: "Norwood" },
  { alan: "donorDurumu", baslik: "Donör durumu" },
  { alan: "greft", baslik: "Greft" },
  { alan: "teknik", baslik: "Teknik" },
  { alan: "sonucAyi", baslik: "Sonuç ayı" },
  { alan: "sehir", baslik: "Şehir" },
] as const;

export function FotografsizVakaKarti({ kayit }: { kayit: FotografsizVaka }) {
  const doluAlanlar = alanlar.filter((f) => kayit[f.alan]);

  return (
    <article className="flex flex-col bg-white p-7 md:p-8">
      {doluAlanlar.length > 0 ? (
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-b border-line pb-6">
          {doluAlanlar.map((f) => (
            <div key={f.alan}>
              <dt className="text-[0.7rem] uppercase tracking-[0.14em] text-muted">
                {f.baslik}
              </dt>
              <dd className="mt-1.5 font-serif text-[1.15rem] leading-snug text-navy">
                <Copy text={kayit[f.alan]!} />
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      {kayit.yonlendirmeGerekcesi ? (
        <div className="mt-6">
          <p className="text-[0.7rem] uppercase tracking-[0.14em] text-blue">
            Yönlendirme gerekçesi
          </p>
          <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-muted">
            <Copy text={kayit.yonlendirmeGerekcesi} />
          </p>
        </div>
      ) : null}
    </article>
  );
}
