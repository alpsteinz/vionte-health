# Görselleri nasıl yüklerim?

Bu dosya, siteye görsel eklemek için gereken her şeyi anlatır. Kod bilgisi
gerektirmez; dosyaları doğru klasöre koyup bir metin dosyasına yol yazmak
yeterlidir.

---

## Genel kurallar

| | |
|---|---|
| **Biçim** | WebP (tercih) veya JPG. Şeffaflık gerekiyorsa PNG/WebP |
| **Boyut** | Tek dosya 300 KB'ı geçmesin — sayfa hızını doğrudan etkiler |
| **Ad** | Türkçe karakter ve boşluk yok: `vaka-1-oncesi.webp` ✅, `Vaka 1 Öncesi.webp` ❌ |

**Mutlak kural:** Hiçbir görsel, Vionte Health'in kendi kliniği veya kendi
sonucu izlenimi vermez. Sonuç görsellerinde uygulamayı yapan merkezin adı
zorunludur; kaynağı belirtilmeyen sonuç görseli yayınlanmaz.

---

## 1. Öncesi–sonrası sonuç görselleri

**Nereye:** `public/sonuclar/`

**Ölçü:** Kare (1:1), en az 800×800px. Öncesi ve sonrası **aynı açıdan,
aynı ışıkta** çekilmiş olmalı — farklı açı karşılaştırmayı anlamsız kılar.

**Adlandırma:**

```
public/sonuclar/vaka-1-oncesi.webp
public/sonuclar/vaka-1-sonrasi.webp
public/sonuclar/vaka-2-oncesi.webp
public/sonuclar/vaka-2-sonrasi.webp
```

**Sonra:** `src/content/results.ts` dosyasını açın, `anlasmaliMerkezSonuclari`
dizisine kayıt ekleyin:

```ts
export const anlasmaliMerkezSonuclari: AnlasmaliMerkezSonucu[] = [
  {
    tip: "anlasmali-merkez",
    id: "vaka-1",
    kaynak: "Özel ... Hastanesi",        // ZORUNLU — boşsa kart görünmez
    oncesiGorsel: "/sonuclar/vaka-1-oncesi.webp",
    sonrasiGorsel: "/sonuclar/vaka-1-sonrasi.webp",
    gorselAlt: "38 yaşında erkek, Safir FUE",
    yas: "38",
    norwood: "Tip IV",
    greft: "4.200",
    teknik: "Safir FUE",
    sonucAyi: "12",
  },
];
```

`kaynak` boş bırakılırsa kart **hiç görünmez** ve build sırasında uyarı
verir. Bu bilinçli bir güvenlik önlemidir.

İki görseli de olan kayıtlar `/sonuclarimiz` sayfasında **sürüklemeli
karşılaştırma slider'ında** otomatik görünür.

> ⚠️ Öncesi–sonrası görseli yayınlamak için **imzalı hasta onam formu**
> şarttır. Onam yoksa görsel yüklenmez.

---

## 2. Danışan hikayesi görselleri

**Nereye:** `public/sonuclar/`

`src/content/results.ts` → `danisanHikayeleri` dizisi:

```ts
{
  tip: "danisan-hikayesi",
  id: "hikaye-1",
  yaziliIzin: true,                     // ZORUNLU — false ise görünmez
  baslik: "...",
  baslangicDurumu: "...",
  yonlendirmeGerekcesi: "...",
  surec: "...",
  sonuc: "...",
  gorsel: "/sonuclar/hikaye-1.webp",
  kaynak: "Özel ... Hastanesi",         // görsel varsa ZORUNLU
}
```

`yaziliIzin: false` ise hikaye hiçbir koşulda görünmez.

---

## 3. Norwood görselleri

**Nereye:** `public/norwood/`

**Ölçü:** Kare, en az 240×240px. Yan profil + tepe görünümü tek görselde.

```
public/norwood/tip-1.webp … tip-6.webp
```

**Sonra:** `src/content/home.ts` → `norwoodLevels` içinde ilgili seviyeye
tek satır:

```ts
{ id: "tip-3", roman: "III", ..., gorsel: "/norwood/tip-3.webp", ... }
```

Yolu yazılmayan seviye şematik çizimle görünmeye devam eder — seti parça
parça da yükleyebilirsiniz.

---

## 4. Ekip fotoğrafları

**Nereye:** `public/ekip/`
**Ölçü:** Dikey 3:4, en az 600×800px.

---

## 5. Stok (temsili) görsel kullanacaksanız

Stok görsel **yalnızca** `StokGorsel` bileşeniyle yerleştirilir ve
üzerinde **"Temsili görsel"** ibaresi zorunludur:

```tsx
<StokGorsel
  src="/gorseller/ornek.webp"
  alt="..."
  ibare="Temsili görsel"   // ZORUNLU — yazılmazsa kod derlenmez
/>
```

Gerçek klinik fotoğrafı için bu bileşen **kullanılmaz**; o görseller
temsili değildir ve öyle etiketlenmemelidir.

---

## Dosyaları depoya nasıl koyarım?

**En kolay yol — GitHub üzerinden:**

1. github.com/alpsteinz/vionte-health adresini açın
2. `public` → ilgili klasöre girin (`sonuclar`, `norwood`, `ekip`)
3. Sağ üstte **Add file → Upload files**
4. Dosyaları sürükleyip bırakın
5. Altta **Commit changes** deyin

Vercel değişikliği görüp siteyi otomatik yeniden yayınlar (1–2 dakika).

Ardından ilgili `.ts` dosyasına yolu yazma adımı kalır — bunu bana
söylerseniz ben yaparım, dosyaları yüklemeniz yeterli.

---

## Yükledikten sonra kontrol

```bash
npm run icerik-denetim
```

Sonuç kapılarını raporlar: kaç kayıt var, hangisi kaynaksız olduğu için
görünmüyor, hangisi yazılı izin beklediği için gizli.
