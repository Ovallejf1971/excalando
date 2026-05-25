import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Sparkles, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "./_atoms";

const BENEFITS = [
  { icon: Clock, t: "5 minutos", d: "Sin tarjeta, sin compromiso" },
  { icon: FileCheck, t: "Plan priorizado", d: "Qué hacer ya, qué después, qué dejar" },
  { icon: Sparkles, t: "Score 0–100", d: "Sobre 5 frentes que importan" },
];

export const ScoreTeaser = () => (
  <Section dark id="score" className="relative overflow-hidden">
    <div
      className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full pointer-events-none"
      style={{ background: "radial-gradient(circle, rgba(0,102,255,0.18), transparent 65%)" }}
      aria-hidden
    />
    <SectionHeader
      n="02"
      eyebrow="Score Digital · Gratis"
      title={
        <>
          5 minutos. <span className="text-accent">Cero costo.</span> Una hoja de ruta clara.
        </>
      }
      lead="Diagnóstico real de tu presencia digital. Mapeamos lo bueno y lo malo, y te entregamos un plan priorizado. Si no quieres seguir, te quedas con el plan."
    />
    <div className="grid sm:grid-cols-3 gap-5 md:gap-6 mb-12 md:mb-14">
      {BENEFITS.map((b, i) => (
        <motion.div
          key={b.t}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: i * 0.08 }}
          className="flex items-start gap-4 p-5 bg-bg-2 border border-line rounded-sm"
        >
          <div className="shrink-0 w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center">
            <b.icon className="h-5 w-5 text-accent" />
          </div>
          <div>
            <div className="text-[15px] font-semibold text-ink mb-1 tracking-tight">{b.t}</div>
            <div className="text-[13px] leading-relaxed text-ink-2">{b.d}</div>
          </div>
        </motion.div>
      ))}
    </div>
    <div className="flex flex-wrap gap-3">
      <Button size="lg" asChild>
        <Link to="/score">
          Arrancar mi Score Digital <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  </Section>
);
