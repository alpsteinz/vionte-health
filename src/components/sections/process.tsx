import { Section, SectionHead } from "@/components/ui/section";
import { process } from "@/content/home";

export function Process() {
  return (
    <Section id="surec" tone="navy">
      <SectionHead
        eyebrow={process.eyebrow}
        title={process.title}
        tone="dark"
      />

      <ol className="rule-grid rule-grid-dark reveal mt-12 sm:grid-cols-2">
        {process.steps.map((step, i) => (
          <li key={step.title} className="bg-navy p-7 md:p-8">
            <span className="font-serif text-[2.2rem] leading-none text-blue-light/50">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="h4 mt-5 text-white">{step.title}</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-blue-light">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
