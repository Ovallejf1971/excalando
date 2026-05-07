import { motion } from "framer-motion";
import { MANIFIESTO } from "@/data/content";
import { Section, SectionHeader } from "./_atoms";

export const Manifiesto = () => (
  <Section>
    <SectionHeader
      n="09"
      eyebrow="Por qué Picard-IA"
      title={
        <>
          No somos una agencia más. <span className="text-accent">Esto es lo que nos diferencia.</span>
        </>
      }
    />
    <div className="border-t border-line-2">
      {MANIFIESTO.map((m, i) => (
        <motion.div
          key={m.n}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          className="border-b border-line-2 py-8 md:py-10 grid md:grid-cols-[120px_1fr_1.5fr] gap-4 md:gap-15 items-baseline"
        >
          <div className="font-mono text-[56px] md:text-[88px] font-light text-accent tracking-[-0.05em] leading-none">{m.n}</div>
          <h3 className="text-[22px] md:text-[30px] font-semibold leading-tight tracking-tight text-ink text-balance">{m.titulo}</h3>
          <p className="text-base md:text-[17px] leading-relaxed text-ink-2">{m.desc}</p>
        </motion.div>
      ))}
    </div>
  </Section>
);
