# Vionte — AI ile Site Geliştirme Kurulumu

Bu dosya sana ait, projeye konmaz. AGENTS.md / CLAUDE.md / DESIGN.md / CONTENT.md
projenin kök dizinine konur, AI aracı her oturumda otomatik okur.

## 1. Dosya yerleşimi

```
vionte/
├── AGENTS.md      ← projenin anayasası (Codex, Cursor okur)
├── CLAUDE.md      ← aynı içerik (Claude Code okur)
├── DESIGN.md      ← tasarım sistemi
├── CONTENT.md     ← onaylanmış metinler
└── src/
```

## 2. Kurulacak skill'ler

```bash
npx skills add anthropics/skills
npx skills add superdesigndev/superdesign-skill
```

| Skill | Ne kazandırır |
|---|---|
| frontend-design | Tipografi hiyerarşisi, boşluk disiplini — "AI-slop" görünümünü engeller |
| web-artifacts-builder | Tek dosyalık hızlı prototip pratikleri |
| webapp-testing | Sayfayı tarayıcıda gerçekten test etme |
| theme-factory | Marka renk/font setini sistematik çıkarma |
| brand-guidelines | Logo, renk, tonu tüm sayfada tutarlı uygulama |
| superdesign | Moodboard'dan varyant üretme, landing page odaklı |

## 3. Bağlanacak MCP araçları

| MCP | Ne yapar | Öncelik |
|---|---|---|
| Playwright MCP | Sayfayı gerçek tarayıcıda açar, ekran görüntüsü alır | Zorunlu |
| Chrome DevTools MCP | Konsol hataları, performans profili | Zorunlu |
| shadcn MCP | Komponentleri doğru kurar, uydurma kod yazmasını engeller | Yüksek |
| Magic UI MCP | Hazır animasyonlu komponentler | Orta |
| Context7 | Güncel kütüphane dokümantasyonu çeker | Orta |
| Figma MCP | Figma tasarımı varsa koda çevirir | Tasarım varsa |

Playwright olmadan iterasyon döngüsü kurulamaz — AI kendi çıktısını göremez.

## 4. Stack

Next.js (veya tek sayfa ağırlıklıysa Astro) + Tailwind + shadcn/ui +
Framer Motion + Lucide Icons.

Animasyonda ölçülü ol: sağlık sitesinde abartılı hareket güven kaybettirir.

## 5. İterasyon döngüsü

1. **Besle** — 4 .md dosyası + referans ekran görüntüleri
2. **Varyant iste** — tek tasarım değil, 3 yön (klinik-premium / sıcak / minimal-medikal)
3. **Bak ve eleştir** — Playwright ile masaüstü + mobil görüntü aldır, sonra:
   *"Bu sayfayı kıdemli bir art director gözüyle eleştir, 5 somut düzeltme yap."*
4. **Doğrula** — konsol hatası sıfır, Lighthouse 90+, gerçek telefonda test

3–5 tur iterasyon, ilk çıktıyla kıyaslanamayacak sonuç verir.

## 6. Referans siteler (ekran görüntüsüyle birlikte ver)

| Site | Alınacak | Alınmayacak |
|---|---|---|
| drterziler.com | Öncesi-sonrası veri katmanı, klinik galerisi, üst iletişim şeridi | "Picasso" dili, rozet duvarı, "tek klinik" iddiası |
| drserkanaygin.com | 6 adımlı süreç derinliği, teknik anlatımındaki dürüstlük | "%98 başarı", "en iyi doktor", "hayatınızı değiştirin" |
| smilehairclinic.com | Menü derinliği, hasta rehberi sayfaları, doktor başına ayrı sayfa | Fiyat rakamı odaklı sayfa yapısı |
| memorial.com.tr | "Doğru bilinen yanlışlar" bölümü, içindekiler menüsü | — |

## 7. Başlangıç prompt'u

```
Projedeki AGENTS.md, DESIGN.md ve CONTENT.md dosyalarını oku ve birebir uygula.
Metin üretme — CONTENT.md'deki onaylanmış metinleri kullan, [köşeli parantez]
içindekileri yer tutucu olarak bırak.

Vionte Hair Transplant için mobil öncelikli ana sayfayı kur:
Next.js + Tailwind + shadcn/ui + Framer Motion.

Bölümler sırayla: üst iletişim şeridi, header (açılır menü), hero + Norwood
seçicili lead formu, teknikler, süreç, ekip, öncesi-sonrası (greft/yaş/teknik/ay
veri katmanıyla), klinik galerisi, hasta yorumları, SSS, iletişim, footer.
Sabit WhatsApp butonu + mobilde alt bar.

Önce 3 farklı görsel yön öner (klinik-premium / sıcak-samimi / minimal-medikal),
onayımı al. Sonra seçileni kodla, Playwright ile masaüstü ve mobil ekran
görüntüsü al, kendi çıktını art director gözüyle eleştirip en az 5 somut
iyileştirme uygula. Konsol hatası sıfır, Lighthouse 90+ olana kadar devam et.

DESIGN.md'deki mevzuat kısıtlarını ihlal eden bir metin üretirsen kendin
işaretle ve alternatifini öner.
```

## 8. Sonraki iş sırası

1. Bilgi talep formunu klinik sahibine gönder (AGENTS.md sonundaki 14 madde)
2. Vektörel logo + onamlı öncesi-sonrası görselleri — en çok gecikme yaratan iki kalem
3. Bu arada: domain/hosting kontrolü, rakip anahtar kelime analizi
4. Bilgiler gelince: 3 varyant → seçim → iterasyon
5. Yayın sonrası: Google Business Profile, Search Console, Analytics, blog takvimi
