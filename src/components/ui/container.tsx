import { cn } from "@/lib/utils";

/**
 * İçerik kapsayıcısı.
 *
 * Kademeli genişlik `.shell` sınıfında, globals.css içinde tanımlıdır.
 */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "shell",
        className,
      )}
    >
      {children}
    </div>
  );
}
