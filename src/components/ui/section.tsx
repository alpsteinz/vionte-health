import { cn } from "@/lib/utils";
import { Container } from "./container";

type Tone = "paper" | "white" | "navy";

const tones: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  white: "bg-white text-ink",
  navy: "bg-navy text-white",
};

export function Section({
  id,
  tone = "paper",
  className,
  containerClassName,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-24", tones[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "reveal",
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow", tone === "dark" && "eyebrow-light")}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn("h2 mt-4", tone === "dark" && "text-white")}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={cn(
            "measure mt-5 text-[1.0625rem]",
            tone === "dark" ? "text-blue-light" : "text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
