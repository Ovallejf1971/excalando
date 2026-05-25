import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Eyebrow } from "@/components/sections/_atoms";
import { Proceso } from "@/components/sections/Proceso";

export const ProcesoPage = () => (
  <>
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        <Eyebrow n="—">Cómo trabajamos</Eyebrow>
        <h1 className="mt-6 mb-8 font-display text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-[-0.035em] text-ink text-balance">
          Sin sorpresas en <span className="text-accent">factura</span>. Sin contratos eternos.
        </h1>
        <p className="text-lg md:text-xl leading-relaxed text-ink-2">
          Cuatro fases. Diagnóstico gratis, plan priorizado, implementación medible y optimización continua. Tú decides hasta dónde llegar.
        </p>
      </motion.div>
    </Section>

    <Proceso />

    <Section dark>
      <div className="max-w-2xl">
        <Eyebrow n="—" className="text-ink-on-dark-3">Empieza por el diagnóstico</Eyebrow>
        <h2 className="mt-4 mb-6 text-3xl md:text-5xl font-bold tracking-tight text-ink-on-dark text-balance">
          Antes de cotizar, <span className="text-accent">sabemos qué necesitas</span>.
        </h2>
        <Button size="lg" asChild>
          <Link to="/score">
            Arrancar mi Score Digital <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Section>
  </>
);
