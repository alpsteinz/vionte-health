import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "./container";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Sayfa yolu" className="border-b border-line bg-white">
      <Container>
        <ol className="flex flex-wrap items-center gap-1.5 py-3.5 text-[0.8125rem] text-muted">
          {trail.map((crumb, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 ? (
                  <ChevronRight className="size-3.5 opacity-50" strokeWidth={1.5} aria-hidden />
                ) : null}
                {last ? (
                  <span aria-current="page" className="text-ink">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.href} className="transition-colors hover:text-blue">
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </nav>
  );
}
