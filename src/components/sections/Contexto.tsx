import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Section } from "./_atoms";

export const Contexto = () => (
  <Section alt id="contexto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-center"
    >
      <div>
        <div className="font-mono text-[11px] tracking-[0.2em] text-ink-3 uppercase mb-5">
          [01] · Lo que está pasando
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-extrabold leading-[0.95] tracking-[-0.035em] text-ink text-balance mb-6">
          Algo cambió en los últimos 18 meses. <span className="text-accent">Pocas PyMEs se enteraron.</span>
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-ink-2">
          Lo que antes costaba miles de dólares — atención automatizada, web que vende sola, procesos sin papel, datos en una pantalla — hoy cabe en el presupuesto de una PyME.
        </p>
      </div>

      <div className="border-l-2 border-accent pl-6 md:pl-8">
        <div className="font-display text-7xl md:text-[140px] font-extrabold text-ink tracking-[-0.05em] leading-[0.85] mb-4">
          8%
        </div>
        <p className="text-lg md:text-xl leading-snug text-ink-2 max-w-md mb-3">
          de las ventas en LATAM viene del canal digital. El resto sigue dependiendo del mostrador, el voz a voz y la suerte.
        </p>
        <div className="font-mono text-[10px] text-ink-3 tracking-wider uppercase mb-5">
          Fuente: Cámara Colombiana de Comercio Electrónico 2025
        </div>
        <Link
          to="/manifiesto"
          className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline font-medium"
        >
          Ver el resto de los números <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.div>
  </Section>
);
