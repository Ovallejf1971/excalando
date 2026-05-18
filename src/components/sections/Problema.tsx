import { motion } from "framer-motion";
import { DOLORES } from "@/data/content";
import { Section, SectionHeader } from "./_atoms";

export const Problema = () => (
  <Section>
    <SectionHeader
      n="01"
      eyebrow="El problema"
      title={
        <>
          Tres motivos por los que tu PyME{" "}
          <span className="text-accent">no está creciendo</span> al ritmo que merece.
        </>
      }
      lead="Si te suenan, no estás solo. Y tampoco es culpa tuya — la mayoría de proveedores te están vendiendo el problema, no la solución."
    />
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
      {DOLORES.map((d, i) => (
        <motion.div
          key={d.n}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="p-7 sm:p-9 border border-line rounded-sm bg-bg-2 relative overflow-hidden"
        >
          <div className="font-mono text-[11px] text-ink-3 tracking-[0.15em]">DOLOR / {d.n}</div>
          <h3 className="text-xl sm:text-2xl font-semibold leading-tight tracking-tight mt-5 mb-4 text-ink text-balance">{d.titulo}</h3>
          <p className="text-[15px] leading-relaxed text-ink-2 mb-7 sm:mb-8 text-pretty">{d.desc}</p>
          <div className="border-t border-line pt-5 flex items-baseline gap-3">
            <div className="font-mono text-[32px] sm:text-[38px] font-semibold text-accent tracking-tight">{d.metric}</div>
            <div className="text-xs text-ink-3 leading-snug flex-1">{d.metricLabel}</div>
          </div>
        </motion.div>
      ))}
    </div>
  </Section>
);
