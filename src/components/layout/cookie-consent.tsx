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
        <div className="flex flex-col gap-3 py-3.5 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:py-4">
          <p className="measure text-[0.8125rem] leading-relaxed text-muted">
            Site kullanımını ölçmek için çerez kullanıyoruz.{" "}
            <Link href="/cerez-politikasi" className="text-blue underline underline-offset-4">
              Çerez Politikası
            </Link>{" "}
            ·{" "}
            <Link href="/kvkk-aydinlatma-metni" className="text-blue underline underline-offset-4">
              KVKK Aydınlatma Metni
            </Link>
          </p>
          <div className="flex shrink-0 gap-2">
            <Button variant="outline" size="sm" className="flex-1 lg:flex-none" onClick={() => decide("zorunlu")}>
              Yalnızca zorunlu
            </Button>
            <Button size="sm" className="flex-1 lg:flex-none" onClick={() => decide("kabul")}>
              Kabul et
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
