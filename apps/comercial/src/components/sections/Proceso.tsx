import { motion } from "framer-motion";
import { Section, SectionHeader } from "./_atoms";
import { PROCESO } from "@/data/comercial-content";

export const Proceso = () => (
  <Section id="proceso">
    <SectionHeader
      n="04"
      eyebrow="Cómo trabajamos"
      title={
        <>
          De la primera reunión a tu sistema en vivo, <span className="text-accent">en 30 a 90 días</span>.
        </>
      }
      lead="Cinco etapas con dueño claro, plazo definido y un entregable verificable. Cobramos a hitos, no por adelantado."
    />

    <div className="space-y-3">
      {PROCESO.map((p, i) => (
        <motion.div
          key={p.n}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.07 }}
          className="bg-bg-2 border border-line rounded-xl p-5 md:p-7 md:grid md:grid-cols-[80px_1fr_auto] md:gap-8 md:items-center"
        >
          <div className="flex items-center gap-3 md:block mb-3 md:mb-0">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
              [{p.n}]
            </span>
            <span className="md:hidden text-xs font-mono text-ink-3">{p.duracion}</span>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-display font-bold text-ink mb-2">
              {p.nombre}
            </h3>
            <p className="text-sm md:text-base text-ink-2 leading-relaxed mb-2">
              {p.descripcion}
            </p>
            <div className="text-xs font-mono uppercase tracking-wide text-ink-3">
              Entregable: <span className="text-ink-2 normal-case font-sans">{p.entregable}</span>
            </div>
          </div>
          <div className="hidden md:block text-right">
            <div className="text-xs font-mono uppercase tracking-wide text-ink-3 mb-1">Duración</div>
            <div className="text-sm font-medium text-ink">{p.duracion}</div>
          </div>
        </motion.div>
      ))}
    </div>
  </Section>
);
