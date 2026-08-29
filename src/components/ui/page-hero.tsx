import { Container } from "./container";
import { Copy } from "./copy";

/** İç sayfa girişi: H1 = arama sorusu, ilk paragraf = doğrudan cevap */
export function PageHero({
  eyebrow,
  title,
  lead,
  aside,
}: {
  eyebrow?: string;
  title: string;
  lead: string;
  aside?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line bg-white">
      <Container>
        <div className="grid gap-10 py-12 md:py-16 lg:grid-cols-[1fr_340px] lg:gap-16">
          <div>
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <h1 className="h1 mt-5">{title}</h1>
            <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-muted md:text-[1.125rem]">
              <Copy text={lead} />
            </p>
          </div>
          {aside ? <div className="self-start">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
