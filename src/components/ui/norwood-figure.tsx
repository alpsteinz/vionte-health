import Image from "next/image";
import type { NorwoodLevel } from "@/content/home";

/**
 * ŞEMATİK GÖSTERİM — YER TUTUCU.
 *
 * DESIGN.md'ye göre nihai gösterim ya (1) klinik arşivinden onamlı, yüz
 * görünmeyen tepe fotoğrafları ya da (2) lisanslı Norwood ikon seti olmalı.
 * İkisi de gelene kadar burada geometrik bir şema kullanılıyor: yan profil +
 * tepe görünümü ikilisi, Norwood'un standart gösterimi.
 *
 * Küçük boyutta okunabilirlik için biçimler sadeleştirildi: yüz hatları yok,
 * yön yalnızca burun çıkıntısıyla belirtiliyor. Saç alanı koyu, saçsız alan
 * açık. Görseller geldiğinde yalnızca bu bileşen değiştirilir.
 */

const RAD = Math.PI / 180;
const SKULL = { cx: 48, cy: 44, r: 27 };

function polar(r: number, deg: number) {
  return [SKULL.cx + r * Math.cos(deg * RAD), SKULL.cy - r * Math.sin(deg * RAD)] as const;
}

/** Saç: kafatası yüzeyine oturan kalın bant */
function band(from: number, to: number) {
  const r = SKULL.r;
  const [x1, y1] = polar(r, from);
  const [x2, y2] = polar(r, to);
  const large = Math.abs(to - from) > 180 ? 1 : 0;
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 0 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

function SideView({ level }: { level: NorwoodLevel }) {
  // 0° = ön (alın), 90° = tepe, 180° = arka
  const front = level.hairline * 78;
  const crownStart = 180 - level.vertex * 165;
  const crownEnd = 180 + level.vertex * 35;
  const back = 222;
  const merged = crownStart <= front + 3;
  const hasCrown = level.vertex > 0.05;

  const segments = merged
    ? [band(crownEnd, back)]
    : hasCrown
      ? [band(front, crownStart), band(crownEnd, back)]
      : [band(front, back)];

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden focusable="false">
      {/* Baş silueti: boyun + kafatası + burun çıkıntısı (yön işareti).
          Açık zemin = saçsız yüzey; koyu bant = saç. */}
      <g className="fill-current opacity-20">
        <rect x="37" y="62" width="21" height="28" />
        <circle cx={SKULL.cx} cy={SKULL.cy} r={SKULL.r} />
        <path d="M74 44 L 84 51 L 74 57 Z" />
      </g>
      <g className="stroke-current opacity-40" fill="none" strokeWidth={2}>
        <circle cx={SKULL.cx} cy={SKULL.cy} r={SKULL.r} />
      </g>
      {/* Saç bandı — kafatası kenarına oturur */}
      {segments.map((d, i) => (
        <path
          key={i}
          d={d}
          className="stroke-current"
          strokeWidth={12}
          strokeLinecap="butt"
          fill="none"
        />
      ))}
    </svg>
  );
}

function TopView({ level }: { level: NorwoodLevel }) {
  const t = level.hairline;
  // Şakaklar merkezden daha çok geri çekilir — M biçimli saç çizgisi
  const yTemple = 15 + t * 46;
  const yCenter = 13 + t * 30;
  const crownR = level.vertex * 30;

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden focusable="false">
      <defs>
        <mask id={`nw-${level.id}`}>
          <rect width="100" height="100" fill="black" />
          <circle cx="50" cy="50" r="34" fill="white" />
          {/* Ön bölgede açılma */}
          <path
            d={`M 6 ${yTemple.toFixed(1)} C 22 ${yTemple.toFixed(1)} 34 ${yCenter.toFixed(1)} 50 ${yCenter.toFixed(1)} C 66 ${yCenter.toFixed(1)} 78 ${yTemple.toFixed(1)} 94 ${yTemple.toFixed(1)} L 94 0 L 6 0 Z`}
            fill="black"
          />
          {/* Tepe açıklığı — arkaya doğru kayık */}
          {crownR > 1 ? (
            <ellipse cx="50" cy="62" rx={crownR} ry={crownR * 0.9} fill="black" />
          ) : null}
        </mask>
      </defs>
      <circle cx="50" cy="50" r="34" className="fill-current opacity-30" />
      <circle cx="50" cy="50" r="34" className="fill-current" mask={`url(#nw-${level.id})`} />
    </svg>
  );
}

export function NorwoodFigure({ level }: { level: NorwoodLevel }) {
  /*
   * Klinik kendi Norwood setini yüklediğinde `level.gorsel` dolar ve
   * şematik çizim devre dışı kalır. Görsel gelmeyen seviyeler şemayla
   * görünmeye devam eder, yani set kısmi de yüklenebilir.
   */
  if (level.gorsel) {
    return (
      <div className="relative aspect-square w-full max-w-[7.5rem]">
        <Image
          src={level.gorsel}
          alt={`Norwood ${level.title} — dökülme deseni`}
          fill
          loading="lazy"
          sizes="120px"
          className="object-contain"
        />
      </div>
    );
  }

  return (
    // Hücre genişliğine göre ölçeklenir — dar ekranda taşmaz
    <div className="flex w-full items-center justify-center gap-1">
      <div className="aspect-square w-[46%] max-w-14">
        <SideView level={level} />
      </div>
      <div className="aspect-square w-[46%] max-w-14">
        <TopView level={level} />
      </div>
    </div>
  );
}
