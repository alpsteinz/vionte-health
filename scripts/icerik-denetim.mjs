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
  ["Sonuç/deneyim garantisi", [
    /garanti(li|liyiz|si var|\s+ediyoruz|\s+veriyoruz|\s+altında|\s+kapsamında)/i,
    /\d+\s*yıl garanti/i,
    /%\s*100 kalıcı/i, /sonsuza dek/i, /tamamen ağrısız/i, /ömür boyu/i, /ağrısız saç ekimi/i,
  ]],
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
    const tumSatirlar = metin.split("\n");
    for (const satirNo of tumSatirlar.keys()) {
      // Yalnızca çift tırnak içindeki kullanıcıya görünen metni incele;
      // değişken/anahtar adları ("garanti:", faqGaranti) taranmaz.
      const ham = tumSatirlar[satirNo];
      const satir = (ham.match(/"([^"\\]|\\.)*"/g) || []).join(" ");
      if (!satir) continue;
      const hamTrim = ham.trimStart();
      if (hamTrim.startsWith("*") || hamTrim.startsWith("//") || hamTrim.startsWith("/*")) continue;
      // Yasağı ANLATAN cümle ihlal değil: "yazılı garanti belgesi verilmez",
      // "garanti edilemez", "tamamen ağrısız denmez" gibi.
      const olumsuzlama =
        /(verilmez|verilmiyor|edilemez|yapılmaz|yapılmıyor|kullanılmaz|denmez|değildir|\bdeğil\b|\byok\b|Hayır|olmamalı|OLMAMASINI|DEĞİL|yasak)/i.test(satir);
      for (const pat of patterns) {
        if (pat.test(satir) && !olumsuzlama) {
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
    let slug = null;
    for (let j = i; j >= 0 && j > i - 40; j--) {
      const m = satirlar[j].match(/slug: "([^"]+)"/);
      if (m) { slug = m[1]; break; }
    }
    console.log(`   ! ${slug ?? f.replace(KOK, "") + ":" + (i + 1)}`);
    taslak++;
  });
}
console.log(taslak === 0 ? "   ✓ tüm sayfalar onaylı" : `   toplam ${taslak} sayfa tıbbi inceleme bekliyor`);
if (taslak > 0) hata++;

console.log("\n4) KONUMLANDIRMA DİLİ");
{
  // Vionte uygulama yapmaz; bu ifadeler uygulamayı Vionte'nin yaptığı
  // izlenimi verir ve kullanılmamalıdır.
  const yasakDil = [
    [/kliniğimiz/i, "kliniğimiz"],
    [/uyguluyoruz/i, "uyguluyoruz"],
    [/operasyonumuz/i, "operasyonumuz"],
    [/hekimimiz|doktorumuz/i, "hekimimiz/doktorumuz"],
    [/tıbbi inceleme/i, "Tıbbi inceleme satırı"],
  ];
  let n = 0;
  for (const f of kaynaklar) {
    const metin = readFileSync(f, "utf8");
    metin.split("\n").forEach((satir, i) => {
      if (satir.trimStart().startsWith("*") || satir.trimStart().startsWith("//")) return;
      for (const [pat, ad] of yasakDil) {
        // Olumsuz kullanım ihlal değil: "kendi kliniğimiz olmadığı için..."
        const olumsuz = /\b(değil|yok|olmadığı|bulunmaz|yapmaz)\b/i.test(satir);
        if (pat.test(satir) && !olumsuz) {
          console.log(`   ! ${ad}: ${f.replace(KOK, "")}:${i + 1}`);
          console.log(`     ${satir.trim().slice(0, 90)}`);
          n++;
        }
      }
    });
  }
  console.log(n === 0 ? "   ✓ temiz — uygulamayı Vionte'nin yaptığı izlenimi yok" : `   ${n} ihlal`);
  if (n > 0) hata++;
}

console.log(
  hata === 0
    ? "\nSONUÇ: yayına hazır.\n"
    : `\nSONUÇ: ${hata} başlıkta iş var — yayına alınmamalı.\n`,
);
process.exit(0);
