import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { navigation } from "@/lib/navigation";

export default function NotFound() {
  return (
    <Container className="py-24 md:py-32">
      <p className="eyebrow">404</p>
      <h1 className="h1 mt-5 text-[clamp(2.1rem,4.6vw,3.4rem)]">Sayfa bulunamadı</h1>
      <p className="measure mt-6 text-[1.0625rem] text-muted">
        Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Aşağıdaki
        bölümlerden devam edebilirsiniz.
      </p>

      <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
        {navigation.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="border-b border-line pb-1 text-[0.9375rem] text-navy transition-colors hover:border-blue hover:text-blue"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>

      <ButtonLink href="/" className="mt-12">
        Ana sayfaya dön
      </ButtonLink>
    </Container>
  );
}
