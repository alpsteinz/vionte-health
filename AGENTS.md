# AGENTS.md — Vionte Hair Transplant Web Sitesi

Bu dosya projenin anayasasıdır. Her oturumda oku ve uygula.
CLAUDE.md aynı içeriği taşır.

## Proje

Vionte Hair Transplant (İstanbul) için saç ekimi kliniği web sitesi.
Domain: viontehealth.com — şu an "Çok Yakında" sayfası yayında, içerik yok.
Instagram: @viontehealth

**Amaç:** Lead toplamak + Google organik aramada ve AI arama deneyimlerinde
(AI Overviews, AI Mode, ChatGPT, Perplexity) görünürlük.

**Trafik kaynağı:** Hastaların çoğu sosyal medya reklamı ve referansla geliyor.
Site ikna aracı değil, **doğrulama** aracıdır. Ziyaretçi kliniğin adını zaten
duymuştur; "bu gerçek mi, doğru yer mi" sorusuna cevap arar. Bu yüzden yorumlar,
klinik fotoğrafları ve şeffaflık öne çıkar.

## Stack

- Next.js veya Astro (tek sayfa ağırlıklıysa Astro)
- Tailwind CSS
- shadcn/ui
- Framer Motion (ölçülü — sağlık sitesinde abartılı animasyon güven kaybettirir)
- Lucide Icons

## Dil

**Yalnızca Türkçe.** Çok dilli yapılmayacak.

Sebep hukuki: Türkiye'de sağlık turizmi mevzuatı, yurt içine ve yurt dışına
yönelik tanıtımın aynı platformda yapılmasını yasaklıyor. İleride yurt dışı hasta
hedeflenirse ayrı domain/platform gerekir. Genel web tasarım rehberlerinin
"TR + EN + AR ekleyin" tavsiyesi bu projede geçersizdir.

## Yasaklar

**Kod:**
- Inline stil yazma
- Uydurma komponent kodu — shadcn MCP kullan
- localStorage/sessionStorage
- Mor-mavi gradient klişesi, generic SaaS estetiği
- Stok "AI-slop" görünümü: ortalanmış hero + 3 ikon kartı + gradient blob

**İçerik (mevzuat — ihlali denetim riski):**
- Üstünlük iddiası: "en iyi", "Türkiye'nin tek/lider kliniği", "Avrupa'nın en iyisi"
- Sonuç/deneyim garantisi: "garantili sonuç", "%100 kalıcı", "sonsuza dek",
  "tamamen ağrısız", "20 yıl garanti"
- Talep oluşturucu duygusal reklam: "hayatınızı değiştirin", "hayallerinizdeki saç"
- Fiyat vurgulu çağrı: indirim, kampanya, "en uygun fiyat", "gizli ücret yok"
- Dayanağı gösterilemeyen istatistik: "%98 başarı oranı", "%97 greft yaşam oranı"
- Gerçekten alınmamış akreditasyon rozeti

## Zorunlu unsurlar

- KVKK aydınlatma metni, gizlilik politikası, çerez onayı
- Formda açık KVKK onay kutusu
- İçeriğin son güncelleme tarihi + içerik sorumlusuna ulaşılabilecek iletişim
- Site adı/ünvanı, Bakanlıkça verilmiş ruhsattaki ünvanla uyumlu
- Sonuç içeriği üç tiptedir; her tipin yayın kapısı sağlanmadan render edilmez
- Stok görsel yalnızca "Temsili görsel" ibaresiyle yayınlanır (`StokGorsel`)
- Formda iki ayrı KVKK onayı: iletişim (zorunlu) + sağlık verisi (açık rıza, isteğe bağlı)
- Öncesi–sonrası görselleri yalnızca imzalı hasta onam formu varsa
- Görsellerin yanında "sonuçlar kişiye göre değişir" ibaresi
- Her hizmet ve blog sayfasında "Tıbbi inceleme: Dr. X — tarih"

**Zorunlu değil:** Vergi no / MERSİS no (online satış yok), ruhsat belgesi görseli.
**Bulunmayacak:** VERBİS kayıt numarası — şirket muafiyet kapsamında.

## Klinik gerçekleri

- 15+ yıl tecrübe, 1000+ uygulama
  (Not: Instagram'da "12 yılı aşkın" yazıyor, sitede "15 yılı aşkın". Sahiple
  netleştirilecek, tek rakamda karar kılınacak.)
- Teknikler: Safir FUE, DHI, tıraşsız saç ekimi, kadın saç ekimi, sakal/bıyık, kaş
- Tedaviler: PRP, mezoterapi, eksozom, kök hücre
- İğnesiz anestezi (basınçlı jet enjektör) uygulanıyor

**Operasyon yapısı (doğru anlatım):** Kanal açma aşamasını saç ekimi uygulayıcı
sertifikalı hekim yapar. Greft alımı ve yerleştirme, Sağlık Bakanlığı tescilli
"yardımcı uygulayıcı" sertifikasına sahip sağlık personeli tarafından hekim
sorumluluğunda yapılır. Bu yapı mevzuata uygundur ve olduğu gibi anlatılır —
"her şeyi doktor yapar" gibi abartıya gerek yok.

## Sonuç içeriği — üç tip, üç bileşen

Sonuç gösterimi tek bir kalıpla yapılmaz. Üç ayrı tip vardır, her birinin
kendi yayın kapısı ve kendi bileşeni bulunur. Kapı sağlanmazsa kart **render
edilmez** — eksik onam veya eksik kaynakla görsel yayına çıkamaz.

**Tip 1 — Anlaşmalı merkez sonucu.** Görselli.
- Zorunlu alan: `kaynak` (uygulamayı yapan merkezin adı)
- Kart üzerinde görünür "Uygulama: [merkez adı]" etiketi bulunur
- `kaynak` boşsa kart render edilmez, build sırasında uyarı verilir
- Ek alanlar: yaş, Norwood seviyesi, greft, teknik, sonuç ayı

**Tip 2 — Danışan hikayesi.** Görselli veya görselsiz, anlatı formatında.
- Anlatı sırası: başlangıç durumu → yönlendirme gerekçesi → süreç → sonuç
- Zorunlu alan: `yaziliIzin` (boolean). `false` ise render edilmez
- Görsel varsa `kaynak` etiketi de zorunludur

**Tip 3 — Fotoğrafsız vaka.** Görsel yok, onam gerekmez.
- Alanlar: yaş, Norwood seviyesi, donör durumu, greft sayısı, teknik,
  sonuç ayı, yönlendirme gerekçesi (neden bu teknik, neden bu merkez)
- **Sitenin şu an yayına girebilecek tek sonuç tipi budur.** Ana sayfa ve
  `/vakalar` bu tiple başlar.

Kod karşılıkları: `src/content/results.ts`, `src/components/sonuclar/`.

## Temsili görseller

Stok görsel kullanılan **her yerde** görselin üstünde veya içinde
"Temsili görsel" ibaresi bulunur. 12–13px, yeterli kontrast, okunabilir.

İbare olmadan stok görsel yerleştirilemez: `StokGorsel` bileşeni `ibare`
alanını **zorunlu prop** olarak ister. Stok görsel yalnızca bu bileşenle
yerleştirilir. Gerçek klinik fotoğrafı için bu bileşen kullanılmaz.

## KVKK formu — iki ayrı onay

Formda tek bir onay kutusu yeterli değildir. İki ayrı kutu bulunur:

1. **İletişim bilgilerinin işlenmesi** — zorunlu. Form bu onay olmadan
   gönderilemez.
2. **Sağlık verisi için ayrı açık rıza** (dökülme seviyesi, fotoğraf) —
   zorunlu **değil**.

İkinci kutu işaretlenmezse form yine gönderilebilir; yalnızca Norwood seçici
ve fotoğraf yükleme alanı devre dışı kalır. Açık rıza form gönderiminin şartı
yapılmaz — KVKK'da rıza özgür iradeyle verilmelidir. Sunucu tarafında da rıza
yoksa sağlık verisi kabul edilmez.

## VERBİS

Yasal metinlerde **VERBİS kayıt numarası alanı bulunmaz**; şirket muafiyet
kapsamındadır. Bu alan sonradan da eklenmemelidir.

**Veri sorumlusu: Mehtap Dizge.**

## Ayrışma stratejisi

Rakipler (Dr. Terziler, Dr. Serkan Aygın, Smile Hair Clinic) abartılı iddia
diliyle konuşuyor: "Saçın Picasso'su", "%98 başarı", "tamamen ağrısız".

Vionte **ölçüm ve şeffaflık** diliyle konuşur: greft planı, donör yoğunluğu,
ekim açısı, "herkese uygun değildir". Bu hem mevzuata uygun hem de Google'ın
YMYL içerikte ödüllendirdiği yaklaşım. Kendi hizmetinin sınırını söylemek
güven kazandırır ve sektörde nadirdir.

## Kalite kuralları

- Mobil öncelikli
- LCP < 2.5s, Lighthouse 90+
- Konsol hatası sıfır
- Görseller WebP + anlamlı alt text
- Tek yazı ailesi + 2-3 ağırlık (DESIGN.md'ye bak)
- Erişilebilirlik: form etiketleri, klavye navigasyonu, kontrast oranı
- prefers-reduced-motion desteği

## İterasyon akışı

1. Aynı brief'ten 3 görsel yön öner (klinik-premium / sıcak-samimi /
   minimal-medikal), onay al
2. Seçileni kodla
3. Playwright MCP ile masaüstü + mobil ekran görüntüsü al
4. Kendi çıktını art director gözüyle eleştir, en az 5 somut düzeltme uygula
5. Chrome DevTools MCP ile konsol ve performans kontrolü
6. Hedeflere ulaşana kadar tekrarla

## Site mimarisi

```
/                                    Ana sayfa (lead odaklı)
/sac-ekimi/
  ├ /safir-fue/
  ├ /dhi/
  ├ /tirassiz-sac-ekimi/            ← yüksek değerli sayfa
  ├ /kadin-sac-ekimi/               ← yüksek değerli sayfa
  └ /ignesiz-anestezi/
/sakal-ekimi/
/kas-ekimi/
/sac-tedavileri/
  ├ /prp/  ├ /mezoterapi/  ├ /eksozom/  ├ /kok-hucre/  └ /sac-analizi/
/hasta-rehberi/
  ├ /operasyon-oncesi/
  ├ /operasyon-gunu/
  ├ /operasyon-sonrasi/
  ├ /sac-yikama/
  ├ /sterilizasyon-ve-hijyen/
  └ /fiyatlandirma-nasil-belirlenir/
/ekibimiz/  /galeri/  /sonuclarimiz/  /yorumlar/  /sss/  /iletisim/
/blog/[slug]/
/kvkk-aydinlatma-metni/  /gizlilik-politikasi/  /cerez-politikasi/
```

## Ana sayfa bölüm sırası

1. Üst şerit: adres + telefon
2. Header: logo, açılır menü, "Greft Planınızı Öğrenin" butonu
3. Hero: net vaat + lead formu
   - Form içinde **Norwood dökülme seviyesi seçici** (6 görsel, tıklanabilir)
   - Üstte "WhatsApp'tan yaz" hızlı yolu — reklam trafiği sabırsızdır
   - Sonra: ad + telefon + KVKK onayı
4. Teknikler: 3 kart, her birinde süre/tıraş/işe dönüş verisi
5. Süreç: 4-6 adım
6. Ekip: fotoğraf + hekim/sertifikalı ekip yapısının açıklaması
7. Sonuçlar: öncesi–sonrası kartları — **greft sayısı + yaş + teknik + kaçıncı ay + şehir**
8. Yorumlar: 3-4 video yorum + Google puanı (doğrulanabilir olduğu için önemli)
9. Galeri: klinik dış cephe, bekleme, danışma, operasyon salonu
10. SSS: her başlık bir soru, ilk cümle doğrudan cevap
11. İletişim: adres, telefon, WhatsApp, çalışma saatleri, harita
12. Footer: menü, yasal linkler, ticari ünvan, tıbbi sorumluluk notu,
    içerik sorumlusu, son güncelleme tarihi
13. Sabit: WhatsApp butonu; mobilde alt bar (Ara / WhatsApp)

## Hizmet sayfası şablonu

Her teknik için aynı iskelet:

1. Teknik nedir — 2-3 cümlelik doğrudan cevap
2. Kimlere uygun / **kimlere uygun değil**
3. İşlem adımları
4. Süre ve iyileşme takvimi
5. Diğer tekniklerden farkı (karşılaştırma tablosu)
6. Bu teknikle yapılmış sonuçlar
7. Tekniğe özel SSS
8. Form
9. Tıbbi inceleme satırı

## SEO / AI görünürlük

Google'ın kendi dokümantasyonuna göre AI arama için ayrı teknik yok — AI Overviews
ve AI Mode aynı Search index'inden besleniyor. Ayrı "GEO/AEO" hizmetine gerek yok;
temel SEO + E-E-A-T yeterli.

- Sağlık içeriği YMYL — en sıkı denetlenen kategori. Toplu üretilmiş, editörden
  geçmemiş AI içeriği domaini yakar. AI taslak için kullanılır, yayın için değil.
- Ayda 4-8 iyi makale > 100 vasat makale
- **Query fan-out:** model tek soruyu alt sorgulara böler. Makaleler tek anahtar
  kelimeye değil, konunun tüm alt sorularına cevap verecek şekilde yazılır.
- H1 = arama sorusu, ilk paragraf = doğrudan cevap (2-3 cümle), H2'ler = alt sorular
- Schema: ana sayfa `MedicalClinic` + `LocalBusiness`, hizmet sayfaları
  `MedicalProcedure` + `FAQPage`, ekip `Physician`, blog `MedicalWebPage` + `FAQPage`,
  tüm site `BreadcrumbList`
- Özgün veri (klinik vaka sayıları) AI modellerinin alıntılamasını kolaylaştırır
- sitemap.xml, robots.txt, llms.txt
- Sayfalara "ChatGPT/Claude/Perplexity ile özetle" butonları (Smile Hair Clinic
  uyguluyor, uygulaması kolay, AI görünürlüğüne katkı)

**En değerli iki sayfa:** "kadın saç ekimi" ve "tıraşsız saç ekimi". Arama hacmi
ciddi, rekabet ana terime göre düşük, dönüşüm niyeti yüksek. Kadın saç dökülmesi
alanı neredeyse boş.

**Fiyat trafiği:** "saç ekimi fiyatları" Türkiye'nin en yüksek hacimli saç ekimi
araması ama en riskli alan. Güvenli çözüm: "Saç Ekimi Fiyatı Nasıl Belirlenir?"
sayfası — fiyatı etkileyen faktörleri anlatır, rakam vermez, forma yönlendirir.

**Blog konu kümeleri** (her küme ilgili hizmet sayfasına iç link):
- Saç dökülmesi: nedenleri, tipleri, kadınlarda, genç yaşta
- Operasyon öncesi: hazırlık, kimler uygun, greft hesabı
- Operasyon sonrası: yıkama, şok dökülme, uyku, spor, güneş
- Teknik karşılaştırmaları: FUE vs DHI, safir uç farkı
- Alternatif tedaviler: PRP, mezoterapi, ilaç tedavileri
- **Doğru bilinen yanlışlar** ← ayrıştırıcı küme, aşağıya bak

## "Doğru Bilinen Yanlışlar" bölümü

Memorial'ın sitesinden alınan, ayrışma stratejisine birebir uyan format.
Hem AI aramalarda çok alıntılanır hem mevzuata tamamen uygundur.

Konular:
- "Yaz aylarında saç ekimi yapılmaz" → yanlış
- "Safir DHI'dan iyidir" / "DHI safirden iyidir" → ikisinin birbirine üstünlüğü yok,
  vakaya göre değişir, bazen birlikte kullanılır
- "Saç ekiminde komplikasyon riski yoktur" → yanlış; enfeksiyon ve nekroz riski var
- "Tıraşsız ekim herkese uygundur" → yanlış; tek seansta sınırlı greft ekilebiliyor
- "Greft sayısı ne kadar çoksa o kadar iyi" → yanlış; belirleyici olan açı ve yoğunluk

## Açık kalan konular (klinik sahibinden bekleniyor)

1. Sorumlu hekimin adı ve saç ekimi uygulayıcı sertifikası
2. Ekipteki her kişinin Bakanlık tescilli yardımcı uygulayıcı sertifikası
   (6 Mayıs 2026 zorunluluk tarihi geçti — denetimde ilk bakılan şey)
3. Eksozom ve kök hücre uygulamaları için hangi izin/belge mevcut
4. Ruhsattaki tam ticari ünvan
5. Öncesi–sonrası görselleri + imzalı hasta onam formları
6. Vektörel logo, marka renk kodları
7. Klinik fotoğrafları (dış cephe, bekleme, danışma, operasyon salonu)
8. Adres, telefon, WhatsApp, e-posta, çalışma saatleri
9. Lead'lerin nereye düşeceği, kim tarafından ne kadar sürede yanıtlanacağı
10. Sitede fiyat gösterilip gösterilmeyeceği
11. Norwood seviyeleri için 6 adet tepe fotoğrafı (yüz görünmeyen, onamlı)
    veya lisanslı Norwood ikon seti bütçesi
12. Deneyim yılı tutarsızlığı (12 mi 15 mi)
13. Yazılı garanti belgesi veriliyor mu, koşulları ne
14. Referans veren hastalara yönelik bir teşekkür sistemi var mı
    (nakit indirim kampanya sayılır; kontrol/bakım seansı gibi hizmet olarak sunulabilir)
