import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Section, SectionHeader } from "./_atoms";
import { GARANTIA } from "@/data/comercial-content";

export const Garantia = () => (
  <Section id="garantia">
    <SectionHeader
      n="07"
      eyebrow="Compromisos"
      title={
        <>
          <span className="text-accent">{GARANTIA.titulo}.</span>
        </>
      }
    />

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-bg-2 border border-line rounded-2xl p-7 md:p-10 mb-10"
    >
      <div className="flex items-start gap-5">
        <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
          <Shield className="w-6 h-6 text-accent" />
        </div>
        <p className="text-base md:text-lg text-ink-2 leading-relaxed text-pretty">
          {GARANTIA.detalle}
        </p>
      </div>
    </motion.div>

    <div className="grid md:grid-cols-2 gap-3">
      {GARANTIA.compromisos.map((c, i) => (
        <motion.div
          key={c}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.07 }}
          className="bg-bg border border-line rounded-xl p-5 flex gap-3 items-start"
        >
          <span className="text-accent text-lg leading-none mt-0.5">✓</span>
          <span className="text-sm md:text-base text-ink-2">{c}</span>
        </motion.div>
      ))}
    </div>
  </Section>
);
