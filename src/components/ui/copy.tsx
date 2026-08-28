import { Fragment } from "react";

/**
 * Onay bekleyen metni işaretler.
 *
 * CONTENT.md kuralı gereği onaylanmamış alanlar [köşeli parantez] içinde
 * bırakılıyor. Sayfada bunlar onaylı metinden ayırt edilemediği için hem
 * editör göremiyor hem de yayına kaçma riski oluşuyordu. Noktalı alt çizgi
 * ölçülü bir işaret — DESIGN.md'nin sakin tonunu bozmadan görünür kılar.
 *
 * Yer tutucular doldurulduğunda işaret kendiliğinden kaybolur.
 */
const PLACEHOLDER = /(\[[^\]]+\])/g;

export function Copy({ text }: { text: string }) {
  if (!text.includes("[")) return <>{text}</>;

  return (
    <>
      {text.split(PLACEHOLDER).map((part, i) =>
        part.startsWith("[") && part.endsWith("]") ? (
          <span
            key={i}
            title="Onay bekleyen metin — yayından önce doldurulacak"
            className="underline decoration-dotted decoration-from-font underline-offset-4 opacity-70"
          >
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
