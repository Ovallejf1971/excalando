import { Hero } from "@/components/sections/Hero";
import { Problema } from "@/components/sections/Problema";
import { ParaQuien } from "@/components/sections/ParaQuien";
import { Capas } from "@/components/sections/Capas";
import { Proceso } from "@/components/sections/Proceso";
import { Diferenciadores } from "@/components/sections/Diferenciadores";
import { Precios } from "@/components/sections/Precios";
import { Garantia } from "@/components/sections/Garantia";
import { SiguientePaso } from "@/components/sections/SiguientePaso";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";

export default function App() {
  return (
    <main className="min-h-screen bg-bg text-ink antialiased">
      <Hero />
      <Problema />
      <ParaQuien />
      <Capas />
      <Proceso />
      <Diferenciadores />
      <Precios />
      <Garantia />
      <SiguientePaso />
      <Faq />
      <Footer />
    </main>
  );
}
