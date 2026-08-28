import { Hero } from "@/components/sections/hero";
import { Techniques } from "@/components/sections/techniques";
import { Process } from "@/components/sections/process";
import { Team } from "@/components/sections/team";
import { Results } from "@/components/sections/results";
import { Reviews } from "@/components/sections/reviews";
import { Gallery } from "@/components/sections/gallery";
import { Myths } from "@/components/sections/myths";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { JsonLd } from "@/components/ui/json-ld";
import { faqSchema } from "@/lib/schema";
import { homeFaq } from "@/content/faq";

export default function Home() {
  return (
    <>
      <Hero />
      <Techniques />
      <Process />
      <Team />
      <Results />
      <Reviews />
      <Gallery />
      <Myths limit={3} />
      <Faq />
      <Contact />
      <JsonLd data={faqSchema(homeFaq)} />
    </>
  );
}
