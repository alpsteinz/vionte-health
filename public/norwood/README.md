# Norwood görselleri

Bu klasöre klinik kendi Norwood görsel setini koyar.

**Dosya adları** (WebP tercih edilir):

```
tip-1.webp  tip-2.webp  tip-3.webp
tip-4.webp  tip-5.webp  tip-6.webp
```

**Ölçü:** kare (1:1), en az 240×240px. Şeffaf arka plan (PNG/WebP) tercih
edilir; kart zemini seçiliyken lacivert olur.

**Gösterim:** DESIGN.md yan profil + tepe görünümü ikilisini ister. İkisi
tek görselde yan yana olacak şekilde hazırlanır.

Dosyalar konulduktan sonra `src/content/home.ts` içindeki ilgili seviyeye
`gorsel: "/norwood/tip-3.webp"` satırı eklenir. Yolu yazılmayan seviye
şematik çizimle görünmeye devam eder.
