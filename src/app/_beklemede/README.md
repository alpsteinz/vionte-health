# Beklemedeki sayfalar

Alt çizgiyle başlayan klasörler Next.js'te "private folder"dır — içindeki
`page.tsx` dosyaları derlenir (tip kontrolü yapılır) ama **yayına çıkmaz**,
URL üretmez.

| Sayfa | Neden beklemede | Geri almak için |
|---|---|---|
| `vakalar/` | Vaka kayıtları için Norwood seviyesi, greft sayısı, yaş vb. gerçek veri henüz yok | Klasörü `src/app/vakalar` olarak taşı; `routes.ts` ve `navigation.ts`'e "Vakalar" satırını geri ekle |
| `sonuclarimiz/` | Görselli sonuç (onamlı öncesi–sonrası) henüz yok | Klasörü `src/app/sonuclarimiz` olarak taşı |

Ana sayfadaki vaka bölümü de aynı gerekçeyle kaldırıldı: bileşen
(`src/components/sections/results.tsx`) ve veri (`src/content/results.ts`)
duruyor; geri almak için `src/app/page.tsx` içine `<Results />` ve ardından
`<WhatsappSectionCta href={whatsappCta.vakalar} label="Sizin İçin Ne Mümkün? Öğrenin" tone="light" />`
eklenir.
