import { NextResponse } from "next/server";

/**
 * Lead uç noktası.
 *
 * AÇIK KONU (AGENTS.md #9): lead'lerin nereye düşeceği ve kim tarafından ne
 * kadar sürede yanıtlanacağı klinik sahibiyle netleştirilecek. Karar verilene
 * kadar burada yalnızca doğrulama yapılır; kişisel veri kalıcı olarak
 * saklanmaz ve dışarı gönderilmez.
 *
 * KVKK — iki ayrı onay:
 *   kvkkIletisim      Zorunlu. İletişim bilgilerinin işlenmesi.
 *   saglikVerisiRizasi İsteğe bağlı açık rıza. Verilmediyse dökülme seviyesi
 *                     ve fotoğraf bilgisi HİÇ kabul edilmez — istemci
 *                     göndermese de sunucu tarafında da düşürülür.
 *
 * Fotoğraf dosyaları bu uç noktada kabul edilmez; sağlık verisi niteliğindeki
 * görseller için güvenli aktarım ve saklama kanalı belirlenmeden dosya
 * alınmaz.
 */

type LeadPayload = {
  ad?: unknown;
  telefon?: unknown;
  norwood?: unknown;
  kvkkIletisim?: unknown;
  saglikVerisiRizasi?: unknown;
  fotografSayisi?: unknown;
};

const NORWOOD_IDS = ["tip-1", "tip-2", "tip-3", "tip-4", "tip-5", "tip-6"];

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ hata: "Geçersiz istek." }, { status: 400 });
  }

  const ad = typeof body.ad === "string" ? body.ad.trim() : "";
  const telefon = typeof body.telefon === "string" ? body.telefon.trim() : "";

  if (ad.length < 2 || ad.length > 80) {
    return NextResponse.json({ hata: "Ad Soyad geçersiz." }, { status: 422 });
  }

  const rakamlar = telefon.replace(/\D/g, "");
  if (rakamlar.length < 10 || rakamlar.length > 15) {
    return NextResponse.json({ hata: "Telefon numarası geçersiz." }, { status: 422 });
  }

  if (body.kvkkIletisim !== true) {
    return NextResponse.json(
      { hata: "İletişim bilgilerinin işlenmesi için onay gerekiyor." },
      { status: 422 },
    );
  }

  // Açık rıza yoksa sağlık verisi hiç işlenmez.
  const saglikRizasi = body.saglikVerisiRizasi === true;
  let norwood: string | null = null;

  if (saglikRizasi) {
    const gelen = typeof body.norwood === "string" ? body.norwood : "";
    if (gelen && !NORWOOD_IDS.includes(gelen)) {
      return NextResponse.json({ hata: "Geçersiz seçim." }, { status: 422 });
    }
    norwood = gelen || null;
  }

  void norwood;

  // TODO(klinik): lead buradan hedef sisteme aktarılacak.
  // Sağlık verisi (norwood) yalnızca saglikRizasi true ise aktarılabilir ve
  // aktarım yapılacak yer KVKK aydınlatma metninde belirtilmelidir.

  return NextResponse.json({ durum: "alindi" });
}
