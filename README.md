# Vionte — web sitesi

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Lucide Icons

**Vionte bir klinik değil, saç ekimi danışmanlık ve yönlendirme şirketidir.**
Kendi kliniği yoktur; operasyonlar anlaşmalı merkezde sertifikalı saç ekim
uzmanları tarafından yapılır. Sitede hiçbir yerde uygulamayı Vionte'nin
yaptığı izlenimi verilmez.

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

Yayına almadan önce:

```bash
npm run icerik-denetim
```

Üç şeyi kontrol eder — AGENTS.md'deki yasak ifadeler, doldurulmamış yer
tutucular ve tıbbi inceleme bekleyen taslak sayfalar. Üçü de sıfırlanmadan
site yayına alınmamalı.

## Sonuç içeriği

Üç tip, üç bileşen, üç ayrı yayın kapısı — ayrıntısı `AGENTS.md`'de.

| Tip | Dosya | Kapı |
|---|---|---|
| 1 · Anlaşmalı merkez sonucu | `anlasmaliMerkezSonuclari` | `kaynak` dolu olmalı |
| 2 · Danışan hikayesi | `danisanHikayeleri` | `yaziliIzin: true`; görsel varsa `kaynak` da |
| 3 · Fotoğrafsız vaka | `fotografsizVakalar` | yok — yayına hazır tek tip |

Kapı sağlanmayan kayıt render **edilmez** ve build sırasında uyarı verir.
Bileşenler: `src/components/sonuclar/`.

Stok görsel yalnızca `StokGorsel` ile yerleştirilir; `ibare` zorunlu prop
olduğu için "Temsili görsel" ibaresiz stok görsel derlenmez.

## Taslak tıbbi anlatım

Tıbbi inceleyenin onayından geçmemiş anlatım taşıyan sayfalar
`draftMedicalCopy: true` ile işaretlenir ve sayfanın üstünde görünür bir
"Taslak içerik" uyarısı gösterir.

Mevcut sayfaların tıbbi incelemesi tamamlandı, bayraklar kaldırıldı.
**Bundan sonra yazılan her yeni tıbbi anlatım, onaydan geçene kadar bu
bayrakla eklenir.**

Sayfalardaki "Tıbbi inceleme: … — …" satırı artık gerçek bir onayı
gösteriyor; inceleyen hekimin adı ve inceleme tarihi `src/lib/site.ts`
içindeki `editorial.medicalReviewer` ve `editorial.medicalReviewDate`
alanlarına girilmelidir. Bu iki alan zorunludur (AGENTS.md).

## Klinikten beklenen bilgiler

Yer tutucular tek noktadan yönetilir:

| Ne | Nerede |
|---|---|
| Adres, telefon, WhatsApp, e-posta, çalışma saatleri | `src/lib/site.ts` |
| Ticari ünvan, içerik sorumlusu, son güncelleme, tıbbi inceleyen | `src/lib/site.ts` |
| Teknik süreleri, tıraş ve işe dönüş verileri | `src/content/home.ts`, `src/content/services.ts` |
| Sonuç içeriği — üç tip ve yayın kapıları | `src/content/results.ts` |
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
- [ ] Anlaşmalı merkez adları girildi (Tip 1 kartları kaynak olmadan yayınlanmaz)
- [ ] `npm run icerik-denetim` üç başlıkta da temiz
- [x] Sayfalar tıbbi incelemeden geçti (`draftMedicalCopy` bayrakları kaldırıldı)
- [x] İletişim bilgileri girildi (adres, telefon, WhatsApp, e-posta, saatler)
- [ ] `editorial.lastUpdated` son güncelleme tarihi girildi
- [ ] Yasal metinler hukuk danışmanı onayından geçti (`taslak` bayrakları kaldırıldı)
- [ ] Deneyim yılı (12 mi 15 mi) tek rakamda netleştirildi
- [ ] Google Business Profile, Search Console ve Analytics bağlandı
