import { Hero } from "@/components/sections/hero";
import { Techniques } from "@/components/sections/techniques";
import { Process } from "@/components/sections/process";
import { Referral } from "@/components/sections/referral";
import { Team } from "@/components/sections/team";
import { WhatsappBand } from "@/components/sections/whatsapp-band";
import { Results } from "@/components/sections/results";
import { Reviews } from "@/components/sections/reviews";
import { Myths } from "@/components/sections/myths";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { WhatsappSectionCta } from "@/components/ui/whatsapp-section-cta";
import { JsonLd } from "@/components/ui/json-ld";
import { faqSchema } from "@/lib/schema";
import { homeFaq } from "@/content/faq";
import { whatsappCta } from "@/lib/whatsapp";

export default function Home() {
  return (
    <>
      <Hero />
      <Techniques />
      <WhatsappSectionCta href={whatsappCta.teknikler} label="Hangi Teknik Size Uygun? Sorun" tone="light" />
      <Process />
      <WhatsappSectionCta href={whatsappCta.surec} label="Süreci Birlikte Planlayalım" tone="dark" />
      <Referral />
      <Team />
      <WhatsappBand />
      <Results />
      <WhatsappSectionCta href={whatsappCta.vakalar} label="Sizin İçin Ne Mümkün? Öğrenin" tone="light" />
      <Reviews />
      <Myths limit={3} />
      <Faq />
      <WhatsappSectionCta href={whatsappCta.sss} label="Aklınızdaki Soruyu Sorun" tone="light" />
      <Contact />
      <JsonLd data={faqSchema(homeFaq)} />
    </>
  );
}
