import { Hero } from "@/components/sections/Hero";
import { Contexto } from "@/components/sections/Contexto";
import { Problema } from "@/components/sections/Problema";
import { Solucion } from "@/components/sections/Solucion";
import { Showreel } from "@/components/sections/Showreel";
import { ScoreTeaser } from "@/components/sections/ScoreTeaser";
import { PageMeta } from "@/components/PageMeta";

export const HomePage = () => (
  <>
    <PageMeta
      title="eXcalando · Capacidades digitales con IA para PyMEs en Colombia y LATAM"
      description="Construimos puentes donde los demás hacen muros. Atención automatizada en WhatsApp, roles repetitivos que trabajan solos y tus sistemas hablándose. Diagnóstico gratis en 5 minutos."
      path="/"
    />
    <Hero />
    <Contexto />
    <Problema />
    <Solucion />
    <Showreel />
    <ScoreTeaser />
  </>
);
