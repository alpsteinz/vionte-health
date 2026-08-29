# AGENTS.md — Vionte Hair Transplant Web Sitesi

Bu dosya projenin anayasasıdır. Her oturumda oku ve uygula.
CLAUDE.md aynı içeriği taşır.

## Proje

**Vionte bir saç ekimi kliniği DEĞİLDİR.** Saç ekimi danışmanlık ve
yönlendirme şirketidir.

- Vergi levhasındaki faaliyet: "tıp, dişçilik ve diğer insan sağlığı
  hizmetlerine yönelik aracılık hizmetleri"
- Şahıs şirketi — **Mehtap Dizge**
- Kendi kliniği yok. Operasyonlar anlaşmalı hastanede, sertifikalı saç ekim
  teknisyenleri tarafından yapılır.
- Site bilgilendiren, yönlendiren, danışmanlık veren bir kurum gibi kurgulanır.

Domain: viontehealth.com · Instagram: @viontehealth

**Amaç:** Lead toplamak + Google organik aramada ve AI arama deneyimlerinde
(AI Overviews, AI Mode, ChatGPT, Perplexity) görünürlük.

**Trafik kaynağı:** Danışanların yarısından çoğu eski danışan referansıyla
geliyor. Bu ana farklılaşma noktasıdır ve öne çıkarılır. Site ikna aracı
değil, **doğrulama** aracıdır.

## Mutlak kurallar — konumlandırma

1. Hiçbir yerde uygulamayı Vionte'nin yaptığı izlenimi verilmez.
2. "Kliniğimiz", "uyguluyoruz", "operasyonumuz" yazılmaz. Yerine
   "anlaşmalı merkez", "yönlendiriyoruz", "danışmanlık" kullanılır.
3. Bünyede hekim yoktur. Doktor sayfası, doktor referansı ve
   "Tıbbi inceleme: Dr. X" satırı **bulunmaz**. Sayfa künyesinde içerik
   sorumlusu ve son güncelleme tarihi yer alır (`ContentInfo`).
4. Klinik galerisi yoktur — kendi kliniği yok.
5. Hizmet sayfaları "biz nasıl yapıyoruz" anlatmaz. Anlatılan: bu teknik
   nedir, kime uygun, **kime uygun değil**. Uygulama adımları bölümü yoktur.
6. Schema.org tipi `MedicalClinic` DEĞİL, `ProfessionalService` +
   `LocalBusiness`. `Physician` şeması kullanılmaz.
7. Hiçbir görsel Vionte'nin kendi kliniği veya kendi sonucu izlenimi
   vermez. Kaynağı belirtilmeyen sonuç görseli kullanılmaz.

## Sabit veriler

- **12 yıl** deneyim (15 değil)
- Yılda **200+** danışan, toplam **2000+**
- Danışanların yarısından çoğu eski danışan referansıyla geliyor
- **Yazılı garanti belgesi verilmez**
- **Fiyat gösterilmez.** Gerekçe metni: "Saç ekimi fiyatı kişiseldir. Her
  vakanın ihtiyacı farklıdır; yapılacak yer, ekip ve teknik fiyatı etkiler."
  Greft başına fiyatlandırma yapılmaz.

## Hizmetler

**Saç ekimi teknikleri:** Safir FUE, DHI, tıraşsız saç ekimi, kadın saç
ekimi, sakal & bıyık ekimi, kaş ekimi, vücut kılından saç ekimi.

**Saç tedavileri:** PRP, mezoterapi, kök hücre, büyüme faktörü.
**Eksozom yoktur** — yapılmıyor.

**İğnesiz anestezi:** Dermojet basınçlı sistem. Ayrı sayfa.

## Süreç

İlk görüşme → planlama → operasyon yönlendirmesi → post-op takip

- Ortalama operasyon: 6–8 saat
- 3 gün sonra normal hayata dönüş
- İlk saçlar 3. ayda çıkar
- 12. ayda tamamlanır

## Ekip

**Mehtap Dizge** — sertifikalı saç ekim uzmanı, sorumlu teknisyen, aynı
zamanda içerik sorumlusu. Ekip: 12 yıllık deneyime sahip sertifikalı saç
ekim uzmanları. Sertifika: Sağlık Bakanlığı saç ekim sertifikası. Ekipteki
herkeste Bakanlık tescilli yardımcı uygulayıcı sertifikası mevcut.

## İletişim

- Esenyalı Mah. Yanyol Cad. Varyap Plaza No:61 D:247 Pendik/İstanbul
- Tel/WhatsApp: 0532 015 79 85
- info@viontehealth.com
- Çalışma saatleri: 09:00–17:00
- Instagram: @viontehealth
- **Formlar WhatsApp'a düşer.** Talepler teknisyenler tarafından anında
  yanıtlanır.

## Yasal

- Ticari ünvan: **Mehtap Dizge** (şahıs şirketi)
- İçerik sorumlusu: Mehtap Dizge, info@viontehealth.com
- **VERBİS kayıt numarası alanı bulunmaz** — muafiyet kapsamında
  (10'dan az çalışan, 10 milyon TL altı bilanço)
- Yasal metinler hukuk danışmanı onayına gidecek; onaya kadar `taslak: true`

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
- Her sayfada içerik sorumlusu + son güncelleme + aracılık rolü notu (`ContentInfo`)

**Zorunlu değil:** Vergi no / MERSİS no (online satış yok), ruhsat belgesi görseli.
**Bulunmayacak:** VERBİS kayıt numarası — şirket muafiyet kapsamında.


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
  ├ /safir-fue/  ├ /dhi/  ├ /tirassiz-sac-ekimi/
  ├ /kadin-sac-ekimi/  ├ /vucut-kilindan-sac-ekimi/
  └ /ignesiz-anestezi/
/sakal-ekimi/   /kas-ekimi/
/sac-tedavileri/
  ├ /prp/  ├ /mezoterapi/  ├ /kok-hucre/
  ├ /buyume-faktoru/  └ /sac-analizi/
Danışmanlık (ayrışma stratejisinin merkezi):
  ├ /neden-danisman/
  ├ /ucretsiz-sac-analizi/
  ├ /klinik-secerken-nelere-dikkat-edilmeli/
  ├ /sac-ekimi-oncesi-sorulacak-sorular/
  └ /ekibimiz/
/hasta-rehberi/  (6 alt sayfa)
/vakalar/  /sonuclarimiz/  /yorumlar/  /sss/  /dogru-bilinen-yanlislar/
/blog/[slug]/  /iletisim/
/kvkk-aydinlatma-metni/  /gizlilik-politikasi/  /cerez-politikasi/
```

Bulunmayan sayfalar (bilinçli): doktor sayfası, klinik galerisi, eksozom.


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

Her teknik için aynı iskelet. **"İşlem adımları" bölümü yoktur** — Vionte
uygulama yapmaz, uygulamanın nasıl yapıldığını anlatmaz.

1. Teknik nedir — 2-3 cümlelik doğrudan cevap
2. Kimlere uygun / **kimlere uygun değil**
3. Ne zaman ne olur (danışan takvimi: 6–8 saat, 3 gün, 3. ay, 12. ay)
4. Diğer tekniklerden farkı (karşılaştırma tablosu)
5. Tekniğe özel SSS
6. Form
7. Sayfa künyesi (`ContentInfo`)
