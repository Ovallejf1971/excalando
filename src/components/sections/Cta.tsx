import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, Section } from "./_atoms";
import { EVENTS, track } from "@/lib/analytics";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "16184056029";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola, vengo del sitio de eXcalando. Quiero saber cómo pueden ayudar a mi negocio.",
)}`;

export const Cta = () => (
  <Section dark className="relative overflow-hidden py-20 md:py-32 lg:py-40">
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: "radial-gradient(ellipse at center, rgba(0,102,255,0.20), transparent 60%)" }}
      aria-hidden
    />
    <div className="relative text-center max-w-4xl mx-auto">
      <div className="flex justify-center">
        <Eyebrow n="12">Empieza hoy</Eyebrow>
      </div>
      <h2 className="text-[40px] sm:text-5xl md:text-7xl lg:text-[88px] font-bold leading-[1] tracking-[-0.03em] mt-5 md:mt-6 mb-6 md:mb-8 text-ink text-balance">
        Tu Score Digital,
        <br />
        <span className="text-accent italic font-normal">gratis y en 5 minutos.</span>
      </h2>
      <p className="text-base sm:text-lg leading-relaxed text-ink-2 max-w-2xl mx-auto mb-10 md:mb-12 text-pretty">
        Sin tarjeta, sin compromiso, sin la jerga inflada de siempre. Solo un mapa claro de qué arreglar primero.
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <Button size="lg" asChild>
          <a href="#score" onClick={() => track(EVENTS.HERO_CTA_SCORE, { from: "cta-section" })}>
            Hacer mi Score Digital gratis <ArrowRight className="h-[18px] w-[18px]" />
          </a>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track(EVENTS.WHATSAPP_CTA_CLICK, { from: "cta-section" })}
          >
            <MessageCircle className="h-[18px] w-[18px]" /> Hablemos por WhatsApp
          </a>
        </Button>
      </div>
      <div className="mt-14 md:mt-18 flex justify-center gap-x-8 sm:gap-x-12 gap-y-3 flex-wrap font-mono text-[11px] sm:text-xs text-ink-3 tracking-wider">
        <div>SIN COSTO</div>
        <div>SIN COMPROMISO</div>
        <div>RESPONDEMOS EN &lt; 24H</div>
      </div>
    </div>
  </Section>
);
