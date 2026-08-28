/**
 * SONUÇ İÇERİĞİ — üç ayrı tip, üç ayrı bileşen.
 *
 * Her tipin kendi yayın kapısı vardır. Kapı sağlanmazsa kart render EDİLMEZ;
 * eksik onam veya eksik kaynak bilgisiyle görsel yayına çıkamaz.
 *
 *   Tip 1  Anlaşmalı merkez sonucu  → `kaynak` zorunlu, boşsa render yok
 *   Tip 2  Danışan hikayesi         → `yaziliIzin` zorunlu, false ise render yok
 *   Tip 3  Fotoğrafsız vaka         → görsel yok, onam gerekmez, yayına hazır
 *
 * Şu an sitede yayına girebilecek tek tip Tip 3'tür.
 */

/* ------------------------------------------------------------------ */
/* Tip 1 — Anlaşmalı merkez sonucu                                     */
/* ------------------------------------------------------------------ */

export type AnlasmaliMerkezSonucu = {
  tip: "anlasmali-merkez";
  id: string;
  /**
   * ZORUNLU. Uygulamayı yapan merkezin adı. Kartın üzerinde
   * "Uygulama: [merkez adı]" etiketi olarak görünür.
   * Boş bırakılırsa kart render edilmez ve build sırasında uyarı verilir.
   */
  kaynak: string;
  yas?: string;
  norwood?: string;
  greft?: string;
  teknik?: string;
  sonucAyi?: string;
  oncesiGorsel?: string;
  sonrasiGorsel?: string;
  gorselAlt?: string;
};

/* ------------------------------------------------------------------ */
/* Tip 2 — Danışan hikayesi                                            */
/* ------------------------------------------------------------------ */

export type DanisanHikayesi = {
  tip: "danisan-hikayesi";
  id: string;
  /**
   * ZORUNLU. Danışandan alınmış yazılı izin var mı?
   * false ise hikaye hiçbir koşulda render edilmez.
   */
  yaziliIzin: boolean;
  baslik: string;
  /** Anlatı: danışanın başlangıç durumu */
  baslangicDurumu: string;
  /** Anlatı: neden o tekniğe ve o merkeze yönlendirildi */
  yonlendirmeGerekcesi: string;
  /** Anlatı: süreç */
  surec: string;
  /** Anlatı: sonuç */
  sonuc: string;
  /** Görsel varsa kaynak (uygulamayı yapan merkez) zorunlu olur */
  gorsel?: string;
  gorselAlt?: string;
  kaynak?: string;
  yas?: string;
  teknik?: string;
};

/* ------------------------------------------------------------------ */
/* Tip 3 — Fotoğrafsız vaka                                            */
/* ------------------------------------------------------------------ */

export type FotografsizVaka = {
  tip: "fotografsiz-vaka";
  id: string;
  yas: string;
  norwood: string;
  donorDurumu: string;
  greft: string;
  teknik: string;
  sonucAyi: string;
  /** Neden bu teknik, neden bu merkez */
  yonlendirmeGerekcesi: string;
};

export type SonucKaydi = AnlasmaliMerkezSonucu | DanisanHikayesi | FotografsizVaka;

/* ------------------------------------------------------------------ */
/* Yayın kapıları                                                      */
/* ------------------------------------------------------------------ */

const dolu = (v?: string) => typeof v === "string" && v.trim().length > 0;

/** Tip 1: kaynak zorunlu */
export function anlasmaliYayinlanabilir(k: AnlasmaliMerkezSonucu): boolean {
  return dolu(k.kaynak);
}

/** Tip 2: yazılı izin zorunlu; görsel varsa kaynak da zorunlu */
export function hikayeYayinlanabilir(k: DanisanHikayesi): boolean {
  if (k.yaziliIzin !== true) return false;
  if (dolu(k.gorsel) && !dolu(k.kaynak)) return false;
  return true;
}

/* ------------------------------------------------------------------ */
/* Veri                                                                */
/* ------------------------------------------------------------------ */

/**
 * Tip 1 — anlaşmalı merkez sonuçları.
 * Merkez adları ve onamlı görseller gelene kadar boş.
 */
export const anlasmaliMerkezSonuclari: AnlasmaliMerkezSonucu[] = [];

/**
 * Tip 2 — danışan hikayeleri.
 * Yazılı izin alınmadan buraya kayıt eklenmez.
 */
export const danisanHikayeleri: DanisanHikayesi[] = [];

/**
 * Tip 3 — fotoğrafsız vakalar. Görsel ve onam gerektirmediği için
 * sitenin şu an yayınlayabileceği tek sonuç tipi.
 *
 * Alan değerleri klinikten gelecek; [köşeli parantez] içindekiler yer tutucudur.
 */
export const fotografsizVakalar: FotografsizVaka[] = [
  {
    tip: "fotografsiz-vaka",
    id: "vaka-1",
    yas: "[00]",
    norwood: "[Tip III]",
    donorDurumu: "[Donör alan yoğunluğu ölçümü]",
    greft: "[0.000]",
    teknik: "[Safir FUE]",
    sonucAyi: "[00]",
    yonlendirmeGerekcesi:
      "[Neden bu teknik ve neden bu merkez — tıbbi inceleyen onayı sonrası]",
  },
  {
    tip: "fotografsiz-vaka",
    id: "vaka-2",
    yas: "[00]",
    norwood: "[Tip IV]",
    donorDurumu: "[Donör alan yoğunluğu ölçümü]",
    greft: "[0.000]",
    teknik: "[DHI]",
    sonucAyi: "[00]",
    yonlendirmeGerekcesi:
      "[Neden bu teknik ve neden bu merkez — tıbbi inceleyen onayı sonrası]",
  },
  {
    tip: "fotografsiz-vaka",
    id: "vaka-3",
    yas: "[00]",
    norwood: "[Tip V]",
    donorDurumu: "[Donör alan yoğunluğu ölçümü]",
    greft: "[0.000]",
    teknik: "[Safir FUE]",
    sonucAyi: "[00]",
    yonlendirmeGerekcesi:
      "[Neden bu teknik ve neden bu merkez — tıbbi inceleyen onayı sonrası]",
  },
];

/* ------------------------------------------------------------------ */
/* Build zamanı doğrulama                                              */
/* ------------------------------------------------------------------ */

/**
 * Modül yüklendiğinde çalışır; build çıktısında uyarı olarak görünür.
 * Eksik kayıt build'i durdurmaz ama sessizce de geçmez.
 */
function dogrula() {
  for (const k of anlasmaliMerkezSonuclari) {
    if (!anlasmaliYayinlanabilir(k)) {
      console.warn(
        `[sonuclar] Tip 1 "${k.id}": kaynak (uygulamayı yapan merkez) boş — kart render EDİLMEYECEK.`,
      );
    }
  }
  for (const k of danisanHikayeleri) {
    if (k.yaziliIzin !== true) {
      console.warn(
        `[sonuclar] Tip 2 "${k.id}": yazılı izin yok — hikaye render EDİLMEYECEK.`,
      );
    } else if (dolu(k.gorsel) && !dolu(k.kaynak)) {
      console.warn(
        `[sonuclar] Tip 2 "${k.id}": görsel var ama kaynak boş — hikaye render EDİLMEYECEK.`,
      );
    }
  }
}

dogrula();
