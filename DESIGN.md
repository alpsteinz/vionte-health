# DESIGN.md — Vionte Hair Transplant

Tasarım sistemi. AGENTS.md ile birlikte okunur.

## Yön

**Klinik-premium.** Sakin, ölçülü, güven veren. Sağlık kurumu ciddiyeti ile
markanın modern duruşu arasında bir yerde.

Kaçınılacaklar: hastane sterilliği (soğuk, kurumsal, ruhsuz), estetik salonu
parlaklığı (altın rozet, ışıltı efekti, abartılı gradient), generic SaaS
görünümü (mor blob, ortalanmış hero + 3 ikon kartı).

## Renk

Logodan türetildi — mavi-lacivert degrade "V".

```css
--navy:       #0D2138;   /* ana koyu — başlık, footer, koyu bölümler */
--blue:       #2E6DA8;   /* marka mavisi — vurgu, link, ikon */
--blue-light: #6FA0C8;   /* açık mavi — koyu zeminde vurgu */
--paper:      #F6F7F9;   /* sayfa zemini */
--white:      #FFFFFF;   /* kart zemini */
--ink:        #16202B;   /* gövde metni */
--muted:      #67788A;   /* ikincil metin */
--line:       #DFE4EA;   /* çizgi, kenarlık */
```

Kural: koyu ve açık bölümler dönüşümlü. Sayfa boyunca sürekli beyaz veya sürekli
lacivert olmaz. Lacivert bölümler ritim yaratır (süreç, iletişim).

Vurgu rengi az kullanılır — her yeri maviye boyamak vurguyu öldürür.

## Tipografi

```
Başlık:  Cormorant Garamond (300/400/500/600) — yüksek kontrastlı serif
Gövde:   Jost (300/400/500) — geometrik sans
```

- Başlıklar serif, gövde sans. Bu kontrast markanın logo tipografisini yansıtır.
- Gövde ağırlığı 300 — hafif, ferah.
- `.eyebrow`: 0.72rem, letter-spacing 0.22em, uppercase, mavi. Bölüm üstü etiket.
- Başlık boyutu `clamp()` ile akışkan: `clamp(2.6rem, 6vw, 4.4rem)` (h1),
  `clamp(2rem, 4vw, 3rem)` (h2)
- Satır yüksekliği: başlık 1.15, gövde 1.65
- Ölçü genişliği maksimum 75ch

## Boşluk

- Bölüm dolgusu: masaüstü 96px, mobil 64px
- İçerik maksimum genişlik: 1180px, yan dolgu 24px
- Cömert boşluk kullan. Sıkışık düzen ucuz görünür; bu sektörde ucuz görünmek
  doğrudan güven kaybı demektir.

## Komponentler

**Kartlar:** 1px kenarlık, gölge yok veya çok hafif. Yuvarlaklık minimal (0-4px).
Keskin köşeler klinik ciddiyeti verir; aşırı yuvarlak köşe estetik salonu hissi.

**Butonlar:** Dolu lacivert, hover'da mavi. Uppercase, letter-spacing 0.1em,
0.9rem. Yuvarlaklık yok.

**Formlar:** Beyaz zemin, 1px kenarlık, focus'ta 2px mavi outline. Etiketler
görünür veya placeholder yeterince açıklayıcı. KVKK onay kutusu her zaman görünür.

**Grid çizgileri:** Kartlar arası 1px boşluk + arka plan rengi ile ızgara etkisi.
Gölge yerine çizgi kullanımı daha klinik durur.

## Hareket

Ölçülü. Sağlık sitesinde abartılı animasyon güven kaybettirir.

- Geçiş süresi 0.18–0.25s
- Scroll ile hafif fade-in, kaydırma mesafesi max 20px
- Hero'da otomatik oynayan video veya parallax yok
- `prefers-reduced-motion: reduce` mutlaka desteklenir

## İkonlar

Lucide. İnce çizgi ağırlığı (1.5px). Dolu/renkli ikon kullanılmaz.

## Görsel kuralları

- Tüm fotoğraflar WebP, anlamlı alt text
- Öncesi–sonrası: 1:1 veya 4:5, yan yana bölünmüş kare
- Galeri: 4:3
- Ekip: 3:4 dikey
- Stok fotoğraf kullanılmaz. Klinik gerçek fotoğraflarıyla anlatılır; stok görsel
  bu sektörde anında fark edilir ve güveni bitirir.
- Rötuş yok. "Fotoğraflar rötuşsuzdur" ibaresi bir güven unsurudur.

## Norwood seçici (imza öğe)

Hero formundaki dökülme seviyesi seçici sayfanın ayırt edici parçası.

- 6 seviye, tıklanabilir kart
- Doğru gösterim: **yan profil + tepe görünümü ikilisi** (Norwood'un standart
  gösterimi). Sadece önden görünüm yetersiz — tepe açıklığı görünmüyor,
  farklı dökülme paternleri ayırt edilemiyor.
- Seçilince kart lacivert zemin + açık mavi saç, altında o seviyenin kısa açıklaması
- Kaynak tercihi: (1) klinik arşivinden onamlı, yüz görünmeyen tepe fotoğrafları
  — en güçlüsü, (2) lisanslı Norwood ikon seti (Freepik/iStock), marka renklerine
  uyarlanır. Sıfırdan SVG çizimi denendi, okunabilirliği yetersiz kaldı.

Neden değerli: kullanıcı bir mikro-eylemle forma giriyor (dönüşüm artar) ve gelen
lead nitelikli oluyor — danışman aramadan önce vakanın seviyesini biliyor.

## Referans karşılaştırması

| Site | Alınacak | Alınmayacak |
|---|---|---|
| Dr. Terziler | Öncesi-sonrası veri katmanı, klinik galerisi, üst iletişim şeridi | "Picasso" dili, sahte rozet, "tek klinik" iddiası |
| Dr. Serkan Aygın | 6 adımlı süreç derinliği, teknik anlatımındaki dürüstlük, 360° tur fikri | "%98 başarı", "en iyi doktor", "hayatınızı değiştirin" |
| Smile Hair Clinic | Menü derinliği, hasta rehberi sayfaları, doktor başına ayrı sayfa, AI özet butonları | Fiyat rakamı odaklı sayfa yapısı |
| Memorial | "Doğru bilinen yanlışlar" bölümü, içindekiler menüsü, komplikasyon şeffaflığı | — |
