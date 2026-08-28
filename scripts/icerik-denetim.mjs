#!/usr/bin/env node
/**
 * İçerik denetimi — yayın öncesi kontrol.
 *
 *   node scripts/icerik-denetim.mjs
 *
 * Üç şeyi kontrol eder:
 *   1. AGENTS.md'deki yasak ifadelerin içeriğe sızıp sızmadığı
 *   2. Doldurulmamış [yer tutucu] sayısı ve nerede oldukları
 *   3. Onaylanmamış taslak tıbbi anlatım taşıyan sayfalar
 *
 * Yayına almadan önce üçünün de sıfırlanması gerekir.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const KOK = new URL("..", import.meta.url).pathname;

/** AGENTS.md — Yasaklar / İçerik */
const yasakli = [
  ["Üstünlük iddiası", [/\ben iyi\b/i, /türkiye'?nin tek/i, /türkiye'?nin lider/i, /avrupa'?nın en/i, /\blider klinik/i, /dünyanın en/i]],
  ["Sonuç/deneyim garantisi", [/garanti/i, /%\s*100 kalıcı/i, /sonsuza dek/i, /tamamen ağrısız/i, /ömür boyu/i, /ağrısız saç ekimi/i]],
  ["Talep oluşturucu reklam", [/hayatınızı değiştir/i, /hayallerinizdeki/i, /yeniden doğ/i]],
  ["Fiyat vurgulu çağrı", [/indirim/i, /kampanya/i, /en uygun fiyat/i, /gizli ücret/i, /taksit/i]],
  ["Dayanaksız istatistik", [/%\s*9\d/, /başarı oran/i, /greft yaşam oran/i]],
  ["Aciliyet baskısı", [/hemen randevu/i, /son \d+ gün/i, /sınırlı kontenjan/i]],
];

function dosyalar(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...dosyalar(p));
    else if (/\.tsx?$/.test(e.name)) out.push(p);
  }
  return out;
}

const kaynaklar = [
  ...dosyalar(join(KOK, "src/content")),
  join(KOK, "src/lib/site.ts"),
];

let hata = 0;

console.log("\n1) YASAK İFADE TARAMASI");
let bulundu = 0;
for (const [kategori, patterns] of yasakli) {
  for (const f of kaynaklar) {
    const metin = readFileSync(f, "utf8");
    for (const satirNo of metin.split("\n").keys()) {
      const satir = metin.split("\n")[satirNo];
      if (satir.trimStart().startsWith("*") || satir.trimStart().startsWith("//")) continue;
      for (const pat of patterns) {
        if (pat.test(satir)) {
          console.log(`   ! ${kategori}: ${f.replace(KOK, "")}:${satirNo + 1}`);
          console.log(`     ${satir.trim().slice(0, 100)}`);
          bulundu++;
        }
      }
    }
  }
}
if (bulundu === 0) console.log("   ✓ temiz");
else hata++;

console.log("\n2) DOLDURULMAMIŞ YER TUTUCULAR");
let yt = 0;
for (const f of kaynaklar) {
  const metin = readFileSync(f, "utf8");
  const n = (metin.match(/\[[^\]\n]{3,}\]/g) || []).filter((m) => !/^\[\]$/.test(m)).length;
  if (n > 0) {
    console.log(`   ${String(n).padStart(3)}  ${f.replace(KOK, "")}`);
    yt += n;
  }
}
console.log(yt === 0 ? "   ✓ tümü dolduruldu" : `   toplam ${yt} yer tutucu`);
if (yt > 0) hata++;

console.log("\n3) ONAYSIZ TASLAK TIBBİ ANLATIM");
let taslak = 0;
for (const f of [join(KOK, "src/content/services.ts"), join(KOK, "src/content/guides.ts")]) {
  const metin = readFileSync(f, "utf8");
  const satirlar = metin.split("\n");
  satirlar.forEach((satir, i) => {
    if (!satir.includes("draftMedicalCopy: true")) return;
    const slug = satirlar[i - 1]?.match(/slug: "([^"]+)"/)?.[1];
    if (slug) {
      console.log(`   ! ${slug}`);
      taslak++;
    }
  });
}
console.log(taslak === 0 ? "   ✓ tüm sayfalar onaylı" : `   toplam ${taslak} sayfa tıbbi inceleme bekliyor`);
if (taslak > 0) hata++;

console.log("\n4) SONUÇ İÇERİĞİ YAYIN KAPILARI");
{
  const src = readFileSync(join(KOK, "src/content/results.ts"), "utf8");
  const say = (re) => (src.match(re) || []).length;
  const tip1 = say(/tip: "anlasmali-merkez",/g);
  const tip2 = say(/tip: "danisan-hikayesi",/g);
  const tip3 = say(/tip: "fotografsiz-vaka",/g);
  const izinsiz = say(/yaziliIzin: false/g);
  const kaynaksiz = say(/kaynak: ""/g);
  console.log(`   Tip 1 (anlaşmalı merkez): ${tip1} kayıt${kaynaksiz ? ` — ${kaynaksiz} tanesi kaynaksız, render edilmeyecek` : ""}`);
  console.log(`   Tip 2 (danışan hikayesi): ${tip2} kayıt${izinsiz ? ` — ${izinsiz} tanesi yazılı izinsiz, render edilmeyecek` : ""}`);
  console.log(`   Tip 3 (fotoğrafsız vaka): ${tip3} kayıt — yayına hazır tip`);
  if (kaynaksiz || izinsiz) hata++;
}

console.log(
  hata === 0
    ? "\nSONUÇ: yayına hazır.\n"
    : `\nSONUÇ: ${hata} başlıkta iş var — yayına alınmamalı.\n`,
);
process.exit(0);
