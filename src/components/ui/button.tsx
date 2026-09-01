import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * DESIGN.md: Dolu lacivert, hover'da mavi. Uppercase, letter-spacing 0.1em,
 * 0.9rem. Yuvarlaklık yok.
 */
const button = cva(
  "inline-flex items-center justify-center gap-2 text-[0.8125rem] uppercase tracking-[0.1em] font-normal transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-navy text-white hover:bg-blue",
        light: "bg-white text-navy hover:bg-blue-light hover:text-navy",
        outline:
          "border border-line text-navy hover:border-navy hover:bg-navy hover:text-white",
        outlineLight:
          "border border-line-dark text-white hover:border-blue-light hover:bg-blue-light hover:text-navy",
        whatsapp: "bg-[#1f7a4d] text-white hover:bg-[#186139]",
        /* Bölüm sonu ikincil CTA — birincil WhatsApp butonundan bilinçli olarak daha hafif */
        whatsappOutline:
          "border border-[#1f7a4d] text-[#1f7a4d] hover:bg-[#1f7a4d] hover:text-white",
        whatsappOutlineLight:
          "border border-white/30 text-white hover:border-[#1f7a4d] hover:bg-[#1f7a4d]",
      },
      size: {
        md: "px-6 py-3.5",
        sm: "px-4 py-2.5 text-[0.75rem]",
        lg: "px-8 py-4",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = VariantProps<typeof button> & { className?: string };

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(button({ variant, size }), className)} {...props} />
  );
}

export function ButtonLink({
  className,
  variant,
  size,
  href,
  ...props
}: ButtonProps &
  Omit<React.ComponentProps<typeof Link>, "className"> & { href: string }) {
  return (
    <Link
      href={href}
      className={cn(button({ variant, size }), className)}
      {...props}
    />
  );
}

export { button as buttonVariants };
