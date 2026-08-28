import { NextResponse } from "next/server";

/**
 * Lead uç noktası.
 *
 * AÇIK KONU (AGENTS.md #9): lead'lerin nereye düşeceği ve kim tarafından ne
 * kadar sürede yanıtlanacağı klinik sahibiyle netleştirilecek. Karar verilene
 * kadar burada yalnızca doğrulama yapılır; kişisel veri kalıcı olarak
 * saklanmaz ve dışarı gönderilmez.
 *
 * Entegrasyon noktası aşağıda işaretli. Seçenekler: CRM webhook, e-posta
 * (SMTP/Resend) veya WhatsApp Business API. KVKK gereği aktarım yapılacak
 * yerin aydınlatma metninde belirtilmesi gerekir.
 */

type LeadPayload = {
  ad?: unknown;
  telefon?: unknown;
  norwood?: unknown;
  kvkk?: unknown;
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
  const norwood = typeof body.norwood === "string" ? body.norwood : "";

  if (ad.length < 2 || ad.length > 80) {
    return NextResponse.json({ hata: "Ad Soyad geçersiz." }, { status: 422 });
  }

  const rakamlar = telefon.replace(/\D/g, "");
  if (rakamlar.length < 10 || rakamlar.length > 15) {
    return NextResponse.json({ hata: "Telefon numarası geçersiz." }, { status: 422 });
  }

  if (body.kvkk !== true) {
    return NextResponse.json(
      { hata: "KVKK onayı olmadan form işlenemez." },
      { status: 422 },
    );
  }

  if (norwood && !NORWOOD_IDS.includes(norwood)) {
    return NextResponse.json({ hata: "Geçersiz seçim." }, { status: 422 });
  }

  // TODO(klinik): lead buradan hedef sisteme aktarılacak.
  // Hedef belirlenene kadar veri hiçbir yere yazılmıyor.

  return NextResponse.json({ durum: "alindi" });
}
