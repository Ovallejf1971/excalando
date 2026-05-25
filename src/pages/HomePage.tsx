import { Hero } from "@/components/sections/Hero";
import { Contexto } from "@/components/sections/Contexto";
import { Problema } from "@/components/sections/Problema";
import { Solucion } from "@/components/sections/Solucion";
import { Showreel } from "@/components/sections/Showreel";
import { ScoreTeaser } from "@/components/sections/ScoreTeaser";

export const HomePage = () => (
  <>
    <Hero />
    <Contexto />
    <Problema />
    <Solucion />
    <Showreel />
    <ScoreTeaser />
  </>
);
