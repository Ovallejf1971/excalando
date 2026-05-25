import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Eyebrow } from "@/components/sections/_atoms";

export const NotFoundPage = () => (
  <Section>
    <div className="max-w-2xl py-12 md:py-20">
      <Eyebrow n="404">Página no encontrada</Eyebrow>
      <h1 className="mt-6 mb-6 font-display text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-[-0.035em] text-ink">
        Te perdiste un <span className="text-accent">puente</span>.
      </h1>
      <p className="text-lg leading-relaxed text-ink-2 mb-8">
        La página que buscas no existe o se movió. Vuelve al inicio y desde ahí encontramos qué necesitas.
      </p>
      <Button size="lg" asChild>
        <Link to="/">
          <ArrowLeft className="h-4 w-4" /> Volver al inicio
        </Link>
      </Button>
    </div>
  </Section>
);
