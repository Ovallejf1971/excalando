import { Nav, Hero } from "@/components/sections/Hero";
import { Problema } from "@/components/sections/Problema";
import { Score } from "@/components/sections/Score";
import { CatalogoIntro } from "@/components/sections/CatalogoIntro";
import { PresenciaDigital } from "@/components/sections/PresenciaDigital";
import { EmpleadosDigitales } from "@/components/sections/EmpleadosDigitales";
import { Automatizacion } from "@/components/sections/Automatizacion";
import { Proceso } from "@/components/sections/Proceso";
import { Manifiesto } from "@/components/sections/Manifiesto";
import { Casos } from "@/components/sections/Casos";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Nav />
      <Hero />
      <Problema />
      <Score />
      <CatalogoIntro />
      <PresenciaDigital />
      <EmpleadosDigitales />
      <Automatizacion />
      <Proceso />
      <Manifiesto />
      <Casos />
      <Faq />
      <Cta />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
