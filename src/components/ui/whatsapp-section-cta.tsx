import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ContactLink } from "@/components/ui/contact-link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Bölüm sonu ikincil WhatsApp CTA'sı. Hero'daki ve geniş banttaki dolu
 * yeşil butondan bilinçli olarak daha hafif — çerçeveli, ortalanmış tek
 * buton. Amaç: her bölümün sonunda bir yol sunmak ama sayfayı buton
 * tarlasına çevirmemek.
 */
export function WhatsappSectionCta({
  href,
  label,
  tone = "light",
}: {
  href: string;
  label: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "border-t py-10 text-center md:py-12",
        tone === "dark" ? "border-white/10 bg-navy" : "border-line bg-white",
      )}
    >
      <Container>
        <ContactLink
          href={href}
          external
          className={cn(
            buttonVariants({
              variant: tone === "dark" ? "whatsappOutlineLight" : "whatsappOutline",
            }),
          )}
        >
          <MessageCircle className="size-4 shrink-0" strokeWidth={1.5} aria-hidden />
          {label}
        </ContactLink>
      </Container>
    </div>
  );
}
