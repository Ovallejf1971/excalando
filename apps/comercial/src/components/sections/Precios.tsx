import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Section, SectionHeader } from "./_atoms";
import { PRECIOS } from "@/data/comercial-content";
import { cn } from "@/lib/utils";

export const Precios = () => (
  <Section id="precios" dark>
    <SectionHeader
      n="06"
      eyebrow="Cuánto cuesta"
      title={
        <>
          Rangos transparentes. <span className="text-accent">Sin sorpresas en factura.</span>
        </>
      }
      lead={PRECIOS.intro}
    />

    {/* Setup destacado arriba */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-8 md:mb-12 bg-bg-2 border border-line-on-dark rounded-2xl p-6 md:p-7 md:flex md:items-center md:justify-between md:gap-8"
    >
      <div>
        <div className="font-mono text-xs uppercase tracking-[0.15em] text-ink-on-dark-3 mb-1.5">
          Pago único
        </div>
        <div className="text-xl md:text-2xl font-display font-bold text-ink-on-dark">
          {PRECIOS.setup.label}
        </div>
        <div className="text-sm text-ink-on-dark-2 mt-1">{PRECIOS.setup.nota}</div>
      </div>
      <div className="text-3xl md:text-4xl font-display font-bold text-accent mt-3 md:mt-0">
        {PRECIOS.setup.rango}
      </div>
    </motion.div>

    {/* Tiers */}
    <div className="grid md:grid-cols-3 gap-4 md:gap-5">
      {PRECIOS.tiers.map((tier, i) => (
        <motion.div
          key={tier.nombre}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className={cn(
            "rounded-2xl p-6 md:p-8 border flex flex-col",
            tier.destacado
              ? "bg-accent text-bg border-accent shadow-glow"
              : "bg-bg-2 border-line-on-dark",
          )}
        >
          <div
            className={cn(
              "font-mono text-xs uppercase tracking-[0.15em] mb-3",
              tier.destacado ? "text-bg/80" : "text-ink-on-dark-3",
            )}
          >
            {tier.destacado ? "Más elegido" : "Plan"}
          </div>
          <h3
            className={cn(
              "text-2xl md:text-3xl font-display font-bold mb-1.5",
              tier.destacado ? "text-bg" : "text-ink-on-dark",
            )}
          >
            {tier.nombre}
          </h3>
          <div
            className={cn(
              "text-sm mb-5",
              tier.destacado ? "text-bg/80" : "text-ink-on-dark-2",
            )}
          >
            {tier.perfil}
          </div>
          <div
            className={cn(
              "text-2xl md:text-3xl font-display font-bold mb-6 pb-6 border-b",
              tier.destacado ? "text-bg border-bg/20" : "text-accent border-line-on-dark",
            )}
          >
            {tier.mensualidad}
          </div>
          <ul className="space-y-3 flex-1">
            {tier.incluye.map((item) => (
              <li
                key={item}
                className={cn(
                  "flex gap-2.5 text-sm leading-relaxed",
                  tier.destacado ? "text-bg/90" : "text-ink-on-dark-2",
                )}
              >
                <Check
                  className={cn(
                    "w-4 h-4 flex-shrink-0 mt-0.5",
                    tier.destacado ? "text-bg" : "text-accent",
                  )}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>

    <div className="mt-10 md:mt-14 text-center">
      <div className="font-mono text-xs uppercase tracking-[0.15em] text-ink-on-dark-3 mb-2">
        {PRECIOS.servicios.label}
      </div>
      <p className="text-base md:text-lg text-ink-on-dark-2 max-w-2xl mx-auto">
        {PRECIOS.servicios.nota}
      </p>
    </div>
  </Section>
);
