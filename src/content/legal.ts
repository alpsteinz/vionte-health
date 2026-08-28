import { site } from "@/lib/site";

/**
 * Yasal metinler.
 *
 * UYARI: Aşağıdaki metinler yapı ve kapsam iskeletidir. Yayına almadan önce
 * KVKK ve sağlık mevzuatı konusunda çalışan bir hukukçu tarafından
 * gözden geçirilmelidir. [Köşeli parantez] içindeki alanlar veri sorumlusu
 * bilgileri gelmeden doldurulamaz.
 */

export type LegalSection = { id: string; heading: string; body: string[]; list?: string[] };

export type LegalDoc = {
  slug: string;
  name: string;
  h1: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
  sections: LegalSection[];
};

const veriSorumlusu = `Veri sorumlusu: ${site.legalName}, ${site.contact.addressLine}. İletişim: ${site.contact.email} · ${site.contact.phoneLabel}.`;

export const legalDocs: LegalDoc[] = [
  {
    slug: "/kvkk-aydinlatma-metni",
    name: "KVKK Aydınlatma Metni",
    h1: "KVKK Aydınlatma Metni",
    lead: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, bu sitede toplanan kişisel verilerin hangi amaçla işlendiği, kimlere aktarıldığı ve haklarınızın neler olduğu aşağıda açıklanmaktadır.",
    metaTitle: "KVKK Aydınlatma Metni",
    metaDescription:
      "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni: işlenen veriler, işleme amaçları, aktarım ve haklarınız.",
    sections: [
      {
        id: "veri-sorumlusu",
        heading: "Veri sorumlusu",
        body: [veriSorumlusu],
      },
      {
        id: "islenen-veriler",
        heading: "İşlenen kişisel veriler",
        body: [
          "Bu site üzerinden yalnızca ön değerlendirme talebi oluşturmak için gerekli veriler toplanır.",
        ],
        list: [
          "Ad ve soyad",
          "Telefon numarası",
          "Formda işaretlediğiniz dökülme seviyesi bilgisi",
          "Çerez kullanımına ilişkin tercih kaydınız",
        ],
      },
      {
        id: "amac",
        heading: "İşleme amacı ve hukuki sebep",
        body: [
          "Verileriniz, randevu ve ön değerlendirme talebinizin karşılanması amacıyla, açık rızanıza dayanılarak işlenir. Form gönderiminde KVKK onay kutusunu işaretlemeniz bu rızanın alınma biçimidir.",
          "Formda işaretlediğiniz dökülme seviyesi sağlık verisi niteliğindedir ve yalnızca ön değerlendirme amacıyla, açık rızanız kapsamında işlenir.",
        ],
      },
      {
        id: "aktarim",
        heading: "Aktarım",
        body: [
          "[Verilerin aktarılacağı taraflar burada tek tek belirtilir: kullanılan CRM/e-posta altyapısı, çağrı merkezi hizmeti ve varsa yurt dışı sunucu kullanımı. Aktarım yapılacak yer belirlenmeden bu bölüm doldurulamaz.]",
        ],
      },
      {
        id: "saklama",
        heading: "Saklama süresi",
        body: [
          "[Saklama süresi ve imha politikası — klinik tarafından belirlenecek.]",
        ],
      },
      {
        id: "haklar",
        heading: "KVKK madde 11 kapsamındaki haklarınız",
        body: [
          "Kanunun 11. maddesi uyarınca veri sorumlusuna başvurarak aşağıdaki haklarınızı kullanabilirsiniz.",
        ],
        list: [
          "Kişisel verinizin işlenip işlenmediğini öğrenme",
          "İşlenmişse buna ilişkin bilgi talep etme",
          "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme",
          "Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme",
          "Eksik veya yanlış işlenmişse düzeltilmesini isteme",
          "Kanundaki şartlar çerçevesinde silinmesini veya yok edilmesini isteme",
          "Düzeltme, silme ve yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme",
          "İşlenen verilerin münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonuç ortaya çıkmasına itiraz etme",
          "Kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme",
        ],
      },
      {
        id: "basvuru",
        heading: "Başvuru",
        body: [
          `Haklarınıza ilişkin taleplerinizi ${site.contact.email} adresine iletebilirsiniz. Başvurular en geç otuz gün içinde sonuçlandırılır.`,
        ],
      },
    ],
  },
  {
    slug: "/gizlilik-politikasi",
    name: "Gizlilik Politikası",
    h1: "Gizlilik Politikası",
    lead: "Bu politika, viontehealth.com üzerinden toplanan bilgilerin nasıl kullanıldığını ve korunduğunu açıklar.",
    metaTitle: "Gizlilik Politikası",
    metaDescription:
      "viontehealth.com üzerinden toplanan bilgilerin nasıl kullanıldığı, saklandığı ve korunduğu.",
    sections: [
      {
        id: "kapsam",
        heading: "Kapsam",
        body: [
          "Bu politika yalnızca viontehealth.com alan adı üzerinden toplanan bilgiler için geçerlidir. Site üzerinden bağlantı verilen üçüncü taraf siteler kendi gizlilik politikalarına tabidir.",
        ],
      },
      {
        id: "toplanan-bilgiler",
        heading: "Toplanan bilgiler",
        body: [
          "Site üzerinden yalnızca ön değerlendirme formunda paylaştığınız bilgiler ve çerezler aracılığıyla toplanan kullanım verileri işlenir. Tarayıcınızın yerel depolama alanına (localStorage/sessionStorage) veri yazılmaz.",
        ],
      },
      {
        id: "guvenlik",
        heading: "Güvenlik",
        body: [
          "[Kullanılan teknik ve idari tedbirler — altyapı belirlendikten sonra doldurulacak.]",
        ],
      },
      {
        id: "ucuncu-taraf",
        heading: "Üçüncü taraf hizmetler",
        body: [
          "[Analitik, reklam ve iletişim altyapısı olarak kullanılan hizmetler burada listelenir.]",
        ],
      },
      {
        id: "iletisim",
        heading: "İletişim",
        body: [
          `Bu politikayla ilgili sorularınızı ${site.contact.email} adresine iletebilirsiniz.`,
        ],
      },
    ],
  },
  {
    slug: "/cerez-politikasi",
    name: "Çerez Politikası",
    h1: "Çerez Politikası",
    lead: "Bu sitede zorunlu çerezler ve tercihinize bağlı ölçümleme çerezleri kullanılır. Çerez tercihinizi site üzerindeki bandan yönetebilirsiniz.",
    metaTitle: "Çerez Politikası",
    metaDescription:
      "viontehealth.com üzerinde kullanılan çerez türleri, amaçları ve çerez tercihinin nasıl yönetileceği.",
    sections: [
      {
        id: "cerez-nedir",
        heading: "Çerez nedir?",
        body: [
          "Çerez, ziyaret ettiğiniz sitenin tarayıcınıza kaydettiği küçük bir metin dosyasıdır. Sitenin çalışması ve kullanımın ölçülmesi için kullanılır.",
        ],
      },
      {
        id: "kullanilan-cerezler",
        heading: "Bu sitede kullanılan çerezler",
        body: [
          "Zorunlu çerezler sitenin çalışması için gereklidir ve onay gerektirmez. Çerez tercihiniz `vionte_cerez_onayi` adlı çerezde bir yıl süreyle saklanır.",
        ],
        list: [
          "Zorunlu: çerez tercihinizin kaydı",
          "[Ölçümleme: kullanılacak analitik araç belirlendiğinde eklenecek]",
          "[Pazarlama: kullanılacak reklam aracı belirlendiğinde eklenecek]",
        ],
      },
      {
        id: "yonetim",
        heading: "Tercihinizi nasıl değiştirirsiniz?",
        body: [
          "Tarayıcınızın ayarlarından site verilerini temizleyerek çerez tercihinizi sıfırlayabilirsiniz. Tercih çerezi silindiğinde onay bandı yeniden görüntülenir.",
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: string) {
  return legalDocs.find((d) => d.slug === slug);
}
