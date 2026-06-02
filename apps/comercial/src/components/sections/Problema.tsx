import { motion } from "framer-motion";
import { Section, SectionHeader } from "./_atoms";
import { DOLORES } from "@/data/comercial-content";

export const Problema = () => (
  <Section id="problema" alt>
    <SectionHeader
      n="01"
      eyebrow="Por qué existimos"
      title={
        <>
          La mayoría de PyMEs están <span className="text-accent">offline donde importa</span>, y lo saben.
        </>
      }
      lead="Tres datos firmados que muestran el tamaño real del problema en LATAM. No son opiniones."
    />

    <div className="grid md:grid-cols-3 gap-5 md:gap-6">
      {DOLORES.map((d, i) => (
        <motion.div
          key={d.metrica}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="bg-bg border border-line rounded-2xl p-7 md:p-8 shadow-card"
        >
          <div className="text-5xl md:text-6xl font-display font-bold text-accent leading-none mb-4">
            {d.metrica}
          </div>
          <div className="text-base text-ink-2 leading-relaxed mb-4">
            <span className="text-ink font-medium">{d.contexto}</span> {d.impacto}
          </div>
          <div className="text-xs font-mono uppercase tracking-wide text-ink-3 pt-4 border-t border-line">
            {d.fuente}
          </div>
        </motion.div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-12 md:mt-16 max-w-3xl"
    >
      <p className="text-xl md:text-2xl text-ink-2 leading-relaxed text-pretty">
        No es que la gente no compre online. Compra muchísimo. Lo hace cuando encuentra
        a quién comprarle. Y la mayoría de las PyMEs latinoamericanas{" "}
        <span className="text-ink font-medium accent-underline">simplemente no aparece</span>.
      </p>
    </motion.div>
  </Section>
);
