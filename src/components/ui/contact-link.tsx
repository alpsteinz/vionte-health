import { safeHref } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * İletişim bağlantısı. Adres yer tutucuysa (`[tel:...]`) link üretmez;
 * bunun yerine tıklanamaz ve görsel olarak işaretli bir öğe döner.
 * Böylece çalışmayan bir "Ara" düğmesi sessizce yayına gitmez.
 */
export function ContactLink({
  href,
  external,
  className,
  pendingClassName,
  children,
  ...rest
}: {
  href: string;
  external?: boolean;
  className?: string;
  pendingClassName?: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const safe = safeHref(href);

  if (!safe) {
    return (
      <span
        title="İletişim bilgisi bekleniyor — yayından önce girilecek"
        aria-disabled="true"
        className={cn(
          className,
          "cursor-not-allowed decoration-dotted underline-offset-4 opacity-60 [text-decoration-line:underline]",
          pendingClassName,
        )}
      >
        {children}
      </span>
    );
  }

  return (
    <a
      href={safe}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
