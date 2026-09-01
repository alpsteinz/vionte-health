"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { ContactLink } from "@/components/ui/contact-link";
import { Logo } from "./logo";
import { navigation } from "@/lib/navigation";
import { site } from "@/lib/site";
import { whatsappCta } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [lastPath, setLastPath] = useState(pathname);

  // Sayfa değiştiğinde menüyü kapat (render sırasında durum ayarlama —
  // effect içinde setState cascading render'a yol açar).
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setOpenGroup(null);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-[68px] items-center justify-between gap-6 md:h-[76px]">
          <Logo priority />

          <nav aria-label="Ana menü" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 px-3 py-6 text-[0.875rem] transition-colors",
                      isActive(item.href)
                        ? "text-blue"
                        : "text-ink hover:text-blue",
                    )}
                  >
                    {item.title}
                    {item.children ? (
                      <ChevronDown
                        className="size-3.5 text-muted transition-transform duration-200 group-hover:rotate-180"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    ) : null}
                  </Link>

                  {item.children ? (
                    <div className="invisible absolute left-0 top-full w-[262px] -translate-y-1 border border-line bg-white opacity-0 shadow-[0_12px_28px_-18px_rgba(13,33,56,0.35)] transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <ul className="py-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={cn(
                                "block px-5 py-2.5 text-[0.875rem] transition-colors hover:bg-paper hover:text-blue",
                                isActive(child.href) ? "text-blue" : "text-ink",
                              )}
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ContactLink
              href={whatsappCta.header}
              external
              className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}
            >
              {site.cta.primary}
            </ContactLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobil-menu"
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              className="-mr-2 p-2 text-navy lg:hidden"
            >
              {open ? (
                <X className="size-6" strokeWidth={1.5} aria-hidden />
              ) : (
                <Menu className="size-6" strokeWidth={1.5} aria-hidden />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobil menü */}
      <div
        id="mobil-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[68px] z-40 overflow-y-auto border-t border-line bg-white lg:hidden"
      >
        <Container className="py-6 pb-28">
          <ul className="divide-y divide-line border-y border-line">
            {navigation.map((item) => {
              const expanded = openGroup === item.href;
              return (
                <li key={item.href}>
                  {item.children ? (
                    <>
                      <div className="flex items-center justify-between">
                        <Link
                          href={item.href}
                          className="flex-1 py-4 font-serif text-lg text-navy"
                        >
                          {item.title}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setOpenGroup(expanded ? null : item.href)}
                          aria-expanded={expanded}
                          aria-label={`${item.title} alt menüsü`}
                          className="p-3 text-muted"
                        >
                          <ChevronDown
                            className={cn(
                              "size-4 transition-transform duration-200",
                              expanded && "rotate-180",
                            )}
                            strokeWidth={1.5}
                            aria-hidden
                          />
                        </button>
                      </div>
                      {expanded ? (
                        <ul className="pb-4 pl-4">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block border-l border-line py-2.5 pl-4 text-[0.9375rem] text-muted transition-colors hover:text-blue"
                              >
                                {child.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </>
                  ) : (
                    <Link href={item.href} className="block py-4 font-serif text-lg text-navy">
                      {item.title}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <ContactLink
            href={whatsappCta.header}
            external
            className={cn(buttonVariants(), "mt-8 w-full")}
          >
            {site.cta.primary}
          </ContactLink>

          <div className="mt-6 space-y-1 text-sm text-muted">
            <p>{site.contact.addressLine}</p>
            <ContactLink href={site.contact.phoneHref} className="block text-blue">
              {site.contact.phoneLabel}
            </ContactLink>
            <p>{site.contact.hours}</p>
          </div>
        </Container>
      </div>
    </header>
  );
}
