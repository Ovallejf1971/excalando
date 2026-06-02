import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "./_atoms";
import { SIGUIENTE_PASO } from "@/data/comercial-content";

export const SiguientePaso = () => (
  <Section id="siguiente-paso" dark>
    <SectionHeader
      n="08"
      eyebrow="Próximos pasos"
      title={SIGUIENTE_PASO.titulo}
      lead="Tres pasos. Cero compromiso hasta que firmes."
    />

    <div className="space-y-4 md:space-y-5 max-w-4xl">
      {SIGUIENTE_PASO.pasos.map((p, i) => (
        <motion.div
          key={p.n}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="bg-bg-2 border border-line-on-dark rounded-2xl p-6 md:p-8 md:flex md:gap-6 md:items-start"
        >
          <div className="md:w-20 flex-shrink-0 mb-3 md:mb-0">
            <div className="text-3xl md:text-4xl font-display font-bold text-accent">
              {p.n}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-display font-bold text-ink-on-dark mb-2">
              {p.accion}
            </h3>
            <p className="text-sm md:text-base text-ink-on-dark-2 leading-relaxed mb-4">
              {p.descripcion}
            </p>
            {p.cta && (
              <a
                href={p.cta.href}
                target={p.cta.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group inline-flex items-center gap-2 bg-accent text-bg px-5 py-2.5 rounded-full text-sm font-medium hover:bg-accent-2 transition-colors"
              >
                {p.cta.label}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  </Section>
);
