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
      className="max-w-4xl"
    >
      <div className="font-mono text-[11px] tracking-[0.2em] text-ink-3 uppercase mb-5">
        [01] · Lo que está pasando
      </div>
      <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[0.95] tracking-[-0.035em] text-ink text-balance mb-7">
        Lo que antes costaba miles de dólares hoy cabe en el presupuesto de una PyME. <span className="text-accent">Pocas se enteraron.</span>
      </h2>
      <p className="text-base md:text-lg leading-relaxed text-ink-2 max-w-2xl mb-6">
        Atención automatizada, web que vende sola, procesos sin papel, decisiones con datos. La tecnología bajó de precio. La barrera ya no es plata — es saber por dónde empezar.
      </p>
      <Link
        to="/manifiesto"
        className="inline-flex items-center gap-1.5 text-sm md:text-base text-accent hover:underline font-medium"
      >
        Los números que tenemos sobre esto <ArrowUpRight className="h-4 w-4" />
      </Link>
    </motion.div>
  </Section>
);
