import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PROCESO } from "@/data/content";
import { Section, SectionHeader } from "./_atoms";

export const Proceso = () => (
  <Section dark id="proceso">
    <SectionHeader
      n="08"
      eyebrow="Cómo trabajamos"
      title={
        <>
          Cuatro fases. Sin sorpresas. <span className="text-accent">Sin reuniones-relleno.</span>
        </>
      }
    />
    <div className="grid md:grid-cols-2 lg:grid-cols-4 border border-line rounded-sm overflow-hidden">
      {PROCESO.map((p, i) => (
        <motion.div
          key={p.n}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className={`p-7 sm:p-9 bg-bg-2 relative ${i < 3 ? "lg:border-r border-line" : ""} ${i < PROCESO.length - 1 ? "border-b lg:border-b-0 border-line" : ""}`}
        >
          <div className="font-mono text-[11px] text-ink-3 tracking-[0.15em] mb-4">FASE / {p.n}</div>
          <h3 className="text-[22px] sm:text-[26px] font-semibold tracking-tight mb-1.5 text-ink text-balance">{p.fase}</h3>
          <div className="font-mono text-xs text-accent mb-5">{p.duracion}</div>
          <p className="text-sm leading-relaxed text-ink-2">{p.desc}</p>
          {i < 3 ? (
            <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-bg-2 items-center justify-center z-10">
              <ArrowRight className="h-3.5 w-3.5 text-accent" />
            </div>
          ) : null}
        </motion.div>
      ))}
    </div>
  </Section>
);
