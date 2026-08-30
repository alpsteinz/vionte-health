# Norwood görselleri

Bu klasöre 6 kafa görseli konur — her Norwood seviyesi için bir tane.

## Teknik özellikler

| | |
|---|---|
| **Format** | WebP (tercih). PNG de olur |
| **Oran** | Kare (1:1) |
| **Boyut** | En az 480×480px (kart küçük gösterilir ama ekranlar retina olabilir) |
| **Zemin** | Şeffaf (WebP/PNG alpha kanalı) — kart seçiliyken lacivert zemine oturur |
| **Dosya boyutu** | Tek dosya 150 KB'ı geçmesin |

## Dosya adları

```
public/norwood/tip-1.webp
public/norwood/tip-2.webp
public/norwood/tip-3.webp
public/norwood/tip-4.webp
public/norwood/tip-5.webp
public/norwood/tip-6.webp
```

## İçerik

DESIGN.md'nin imza öğe kuralı: **yan profil + tepe (vertex) görünümü
ikilisi**, Norwood'un standart gösterim biçimi. Sadece önden görünüm
yetersiz kalır — tepe açıklığı görünmez, dökülme paternleri ayırt edilemez.

İki görünüm **tek karede yan yana** birleştirilmiş olarak gönderilir (kod
tek bir görsel dosyası bekliyor, sayfa hâlihazırda bunları yan yana
gösteren bir şema kullanıyor — aynı düzeni koruyun).

**Kart çok küçük gösterilir** (form içinde ~100–110px genişlik), bu yüzden
ince çizgi detayları kaybolur. Yüksek kontrast ve sade siluet tercih edin;
ince gölgelendirme veya doku bu boyutta seçilmez.

**Kaynak tercihi** (DESIGN.md):
1. Klinik arşivinden onamlı, yüz görünmeyen tepe fotoğrafları — en güçlüsü
2. Lisanslı Norwood ikon seti (Freepik/iStock), marka renklerine uyarlanmış

## Nasıl bağlanır

Dosyaları bu klasöre koyduktan sonra `src/content/home.ts` içindeki
`norwoodLevels` dizisinde ilgili seviyeye tek satır eklenir:

```ts
{ id: "tip-3", roman: "III", ..., gorsel: "/norwood/tip-3.webp" }
```

Yolu yazılmayan seviye şematik çizimle görünmeye devam eder — seti parça
parça da gönderebilirsiniz, ben yolu her seferinde eklerim.

**GitHub üzerinden yükleme:** `public/norwood/` klasörüne, sağ üstte
**Add file → Upload files** ile sürükleyip **Commit changes** demeniz
yeterli. Yükledikten sonra bana söyleyin, `home.ts`'e yolları ben eklerim.
