# Vionte Hair Transplant — web sitesi

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Lucide Icons

Proje kuralları `AGENTS.md` / `CLAUDE.md`, tasarım sistemi `DESIGN.md`,
onaylanmış metinler `CONTENT.md` dosyalarındadır. Kod yazmadan önce okunur.

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
npm run lint
```

## Dizin yapısı

```
src/
├── app/                    Sayfalar (App Router)
│   ├── api/lead/           Form uç noktası
│   ├── llms.txt/           AI aramalar için site özeti
│   ├── sitemap.ts robots.ts icon.svg
│   └── …                   Hizmet, rehber, kurumsal ve yasal sayfalar
├── components/
│   ├── layout/             Üst şerit, header, footer, sabit CTA, çerez onayı
│   ├── sections/           Ana sayfa bölümleri + sayfa şablonları
│   └── ui/                 Ortak parçalar (buton, bölüm, SSS, Norwood, şema)
├── content/                Metin verisi — CONTENT.md'nin tipli karşılığı
└── lib/                    site.ts (künye), navigation, schema.org, routes
```

## Metin kuralı

Kod içinde metin **üretilmez**. Tüm gövde metni `src/content/` altındaki veri
dosyalarından gelir ve `CONTENT.md`'de onaylanmış hâliyle kullanılır.
Henüz onaylanmamış alanlar `[köşeli parantez]` içinde yer tutucudur.

Yayına almadan önce yer tutucuları bulmak için:

```bash
grep -rn "\[" src/content src/lib/site.ts | grep -v "\[\]"
```

## Klinikten beklenen bilgiler

Yer tutucular tek noktadan yönetilir:

| Ne | Nerede |
|---|---|
| Adres, telefon, WhatsApp, e-posta, çalışma saatleri | `src/lib/site.ts` |
| Ticari ünvan, içerik sorumlusu, son güncelleme, tıbbi inceleyen | `src/lib/site.ts` |
| Teknik süreleri, tıraş ve işe dönüş verileri | `src/content/home.ts`, `src/content/services.ts` |
| Öncesi–sonrası vaka verileri (onam formu şart) | `src/content/home.ts` |
| Google puanı ve yorumlar | `src/content/home.ts` |
| Rehber sayfalarındaki klinik yönergeleri | `src/content/guides.ts` |
| KVKK aktarım ve saklama bilgileri | `src/content/legal.ts` |

Görsel bekleyen alanlar `PhotoPlaceholder` ile işaretlidir; stok fotoğraf
kullanılmaz (DESIGN.md).

## Yayın öncesi kontrol listesi

- [ ] `src/lib/site.ts` içindeki tüm yer tutucular dolduruldu
- [ ] Öncesi–sonrası görselleri için **imzalı hasta onam formları** alındı
- [ ] Tıbbi inceleyen hekim adı ve inceleme tarihi girildi
- [ ] Yasal metinler (`src/content/legal.ts`) hukukçu tarafından onaylandı
- [ ] Norwood görselleri lisanslı set veya onamlı klinik fotoğraflarıyla değiştirildi
      (`src/components/ui/norwood-figure.tsx` — şu an şematik yer tutucu)
- [ ] Vektörel logo ve `src/app/icon.svg` değiştirildi
- [ ] Lead'lerin gideceği sistem `src/app/api/lead/route.ts` içinde bağlandı
- [ ] Deneyim yılı (12 mi 15 mi) tek rakamda netleştirildi
- [ ] Google Business Profile, Search Console ve Analytics bağlandı
