"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const COOKIE_NAME = "vionte_cerez_onayi";
const ONE_YEAR = 60 * 60 * 24 * 365;

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function hasDecided() {
  return document.cookie.split("; ").some((c) => c.startsWith(`${COOKIE_NAME}=`));
}

/**
 * Zorunlu: çerez onayı.
 * Tercih çerezde saklanır — localStorage/sessionStorage kullanılmaz (AGENTS.md yasak).
 * Sunucu anlık görüntüsü "karar verilmiş" döner; band yalnızca istemcide,
 * çerez yokken görünür. Böylece SSR ile istemci arasında uyumsuzluk oluşmaz.
 */
export function CookieConsent() {
  const decided = useSyncExternalStore(subscribe, hasDecided, () => true);

  if (decided) return null;

  const decide = (value: "kabul" | "zorunlu") => {
    document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${ONE_YEAR}; SameSite=Lax`;
    for (const listener of listeners) listener();
  };

  return (
    <div
      role="dialog"
      aria-label="Çerez tercihi"
      className="fixed inset-x-0 bottom-[60px] z-40 border-t border-line bg-white md:bottom-0"
    >
      <Container>
        <div className="flex flex-col gap-5 py-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="measure text-sm text-muted">
            Bu sitede, siteyi kullanımınızı ölçmek ve deneyimi iyileştirmek için
            çerezler kullanılıyor. Ayrıntılar için{" "}
            <Link href="/cerez-politikasi" className="text-blue underline underline-offset-4">
              Çerez Politikası
            </Link>{" "}
            ve{" "}
            <Link href="/kvkk-aydinlatma-metni" className="text-blue underline underline-offset-4">
              KVKK Aydınlatma Metni
            </Link>
            .
          </p>
          <div className="flex shrink-0 gap-3">
            <Button variant="outline" size="sm" onClick={() => decide("zorunlu")}>
              Yalnızca zorunlu
            </Button>
            <Button size="sm" onClick={() => decide("kabul")}>
              Kabul et
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
