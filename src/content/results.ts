/**
 * SONUÇ İÇERİĞİ — üç ayrı tip, üç ayrı bileşen.
 *
 * Teknik (build-time) zorunluluk yok: hiçbir alan render'ı engellemez,
 * eksik alan bırakılabilir ve kart yine yayınlanır. Dolu olan alanlar
 * kartta gösterilir, boş olanlar hiç render edilmez (boş satır/yer
 * tutucu bırakılmaz).
 *
 * EDİTÖRYEL KURAL (kod tarafından denetlenmez, yayın öncesi elle
 * kontrol edilir): kaynağı belirtilmeyen sonuç görseli yayınlanmaz.
 * Kaynak ister kartın "Uygulama: [merkez adı]" etiketinde, ister
 * görselin kendi içinde (görsele gömülü yazı/filigran olarak)
 * belirtilsin — ikisi de kabul edilir; `kaynak` alanı bu durumda boş
 * bırakılabilir.
 */

/* ------------------------------------------------------------------ */
/* Tip 1 — Anlaşmalı merkez sonucu                                     */
/* ------------------------------------------------------------------ */

export type AnlasmaliMerkezSonucu = {
  tip: "anlasmali-merkez";
  id: string;
  /** Uygulamayı yapan merkezin adı. Doluysa kartta "Uygulama: [merkez adı]" etiketi görünür. */
  kaynak?: string;
  yas?: string;
  norwood?: string;
  greft?: string;
  teknik?: string;
  sonucAyi?: string;
  sehir?: string;
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
  /** Danışandan alınmış yazılı izin var mı? */
  yaziliIzin?: boolean;
  baslik: string;
  /** Anlatı: danışanın başlangıç durumu */
  baslangicDurumu: string;
  /** Anlatı: neden o tekniğe ve o merkeze yönlendirildi */
  yonlendirmeGerekcesi: string;
  /** Anlatı: süreç */
  surec: string;
  /** Anlatı: sonuç */
  sonuc: string;
  gorsel?: string;
  gorselAlt?: string;
  kaynak?: string;
  yas?: string;
  teknik?: string;
  sehir?: string;
};

/* ------------------------------------------------------------------ */
/* Tip 3 — Fotoğrafsız vaka                                            */
/* ------------------------------------------------------------------ */

export type FotografsizVaka = {
  tip: "fotografsiz-vaka";
  id: string;
  yas?: string;
  norwood?: string;
  donorDurumu?: string;
  greft?: string;
  teknik?: string;
  sonucAyi?: string;
  sehir?: string;
  /** Neden bu teknik, neden bu merkez */
  yonlendirmeGerekcesi?: string;
};

export type SonucKaydi = AnlasmaliMerkezSonucu | DanisanHikayesi | FotografsizVaka;

/* ------------------------------------------------------------------ */
/* Veri                                                                */
/* ------------------------------------------------------------------ */

/**
 * Tip 1 — anlaşmalı merkez sonuçları.
 * Onamlı görseller gelene kadar boş.
 */
export const anlasmaliMerkezSonuclari: AnlasmaliMerkezSonucu[] = [];

/**
 * Tip 2 — danışan hikayeleri.
 */
export const danisanHikayeleri: DanisanHikayesi[] = [];

/**
 * Tip 3 — fotoğrafsız vakalar. Görsel gerektirmediği için sitenin şu an
 * yayınlayabileceği tek sonuç tipi.
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
