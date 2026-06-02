import { motion } from "framer-motion";
import { Section, SectionHeader } from "./_atoms";
import { DIFERENCIADORES } from "@/data/comercial-content";

export const Diferenciadores = () => (
  <Section id="diferenciadores" alt>
    <SectionHeader
      n="05"
      eyebrow="Por qué nosotros"
      title={
        <>
          Siete cosas que nos hacen <span className="text-accent">distintos a los demás</span>.
        </>
      }
      lead="Si una agencia te ofrece dos o tres de estas, ya es buena. Las siete juntas, no las hemos visto en otro lugar."
    />

    <div className="grid md:grid-cols-2 gap-4 md:gap-5">
      {DIFERENCIADORES.map((d, i) => (
        <motion.div
          key={d.titulo}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          className="bg-bg border border-line rounded-xl p-6 md:p-7"
        >
          <div className="font-mono text-xs uppercase tracking-[0.15em] text-accent mb-3">
            [0{i + 1}]
          </div>
          <h3 className="text-lg md:text-xl font-display font-bold text-ink mb-3 leading-snug">
            {d.titulo}
          </h3>
          <p className="text-sm md:text-base text-ink-2 leading-relaxed">{d.detalle}</p>
        </motion.div>
      ))}
    </div>
  </Section>
);
