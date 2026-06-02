import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Section, SectionHeader } from "./_atoms";
import { AUDIENCIA } from "@/data/comercial-content";

export const ParaQuien = () => (
  <Section id="para-quien">
    <SectionHeader
      n="02"
      eyebrow="Para quién es esto"
      title={
        <>
          Esto es para vos si <span className="text-accent">te ves acá abajo</span>.
        </>
      }
      lead="Preferimos decirte qué NO somos antes de que firmes algo. Ahorra tiempo de los dos."
    />

    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-bg-2 border border-line rounded-2xl p-7 md:p-9"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-success/15 flex items-center justify-center">
            <Check className="w-5 h-5 text-success" />
          </div>
          <h3 className="text-xl md:text-2xl font-display font-bold text-ink">
            Si te ves acá, hablemos.
          </h3>
        </div>
        <ul className="space-y-4">
          {AUDIENCIA.paraTi.map((item) => (
            <li key={item} className="flex gap-3 text-base text-ink-2 leading-relaxed">
              <span className="text-success mt-1 flex-shrink-0">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-bg-2 border border-line rounded-2xl p-7 md:p-9"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-danger/15 flex items-center justify-center">
            <X className="w-5 h-5 text-danger" />
          </div>
          <h3 className="text-xl md:text-2xl font-display font-bold text-ink">
            Si te ves acá, mejor no.
          </h3>
        </div>
        <ul className="space-y-4">
          {AUDIENCIA.noEsParaTi.map((item) => (
            <li key={item} className="flex gap-3 text-base text-ink-3 leading-relaxed">
              <span className="text-danger mt-1 flex-shrink-0">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  </Section>
);
