import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Eyebrow } from "@/components/sections/_atoms";
import { Capas } from "@/components/sections/Capas";
import { PresenciaDigital } from "@/components/sections/PresenciaDigital";
import { EmpleadosDigitales } from "@/components/sections/EmpleadosDigitales";
import { Automatizacion } from "@/components/sections/Automatizacion";

export const CapacidadesPage = () => (
  <>
    {/* Las 4 capas — tiene su propio header */}
    <Capas />

    {/* Detalle: Presencia Digital */}
    <PresenciaDigital />

    {/* Detalle: Canales Digitales (Empleados Digitales) */}
    <EmpleadosDigitales />

    {/* Detalle: Operación (Automatización) */}
    <Automatizacion />

    {/* Cierre + CTA */}
    <Section dark>
      <div className="max-w-2xl">
        <Eyebrow n="—" className="text-ink-on-dark-3">Tu próximo paso</Eyebrow>
        <h2 className="mt-4 mb-6 text-3xl md:text-5xl font-bold tracking-tight text-ink-on-dark text-balance">
          Antes de cotizar nada, <span className="text-accent">diagnostica</span>.
        </h2>
        <p className="text-lg leading-relaxed text-ink-on-dark-2 mb-8">
          El Score Digital te dice cuál de las cuatro capas tienes mejor resuelta hoy y por dónde conviene empezar. Gratis, 5 minutos, sin tarjeta.
        </p>
        <Button size="lg" asChild>
          <Link to="/score">
            Arrancar mi Score Digital <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Section>
  </>
);
