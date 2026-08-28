"use client";

import { useEffect } from "react";

/**
 * .reveal sınıfı taşıyan öğelerden yalnızca ilk ekranın ALTINDA kalanları
 * gizleyip görünür alana girdiklerinde açar. Ekranda olanlara dokunulmaz.
 */
export function RevealScript() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const pending = nodes.filter(
      (node) => node.getBoundingClientRect().top > window.innerHeight * 0.9,
    );
    if (pending.length === 0) return;

    for (const node of pending) node.classList.add("reveal-pending");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove("reveal-pending");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    for (const node of pending) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return null;
}
