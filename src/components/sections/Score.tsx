import { motion } from "framer-motion";
import { Section, SectionHeader } from "./_atoms";
import { ScoreWizard } from "@/score/ScoreWizard";

const PASOS = [
  { n: "01", t: "Cuéntanos de tu negocio", d: "Formulario corto. Sector, tamaño, dónde quieres crecer. 5 minutos." },
  { n: "02", t: "Auditamos tu presencia", d: "Web, SEO local, redes, reputación, embudo. Mapeamos lo bueno y lo malo." },
  { n: "03", t: "Recibes tu Score + plan", d: "Reporte priorizado: qué hacer ya, qué hacer después, qué dejar para luego." },
];

export const Score = () => (
  <Section dark id="score" className="relative overflow-hidden">
    <div
      className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full pointer-events-none"
      style={{ background: "radial-gradient(circle, rgba(0,102,255,0.18), transparent 65%)" }}
      aria-hidden
    />
    <SectionHeader
      n="02"
      eyebrow="Score Digital · Gratis"
      title={
        <>
          5 minutos. <span className="text-accent">Cero costo.</span> Una hoja de ruta clara.
        </>
      }
      lead="Es nuestro lead magnet, sí. También es la mejor forma que conocemos de que veas el valor antes de pagar un peso. Si después no quieres seguir, te quedas con el plan."
    />
    <div className="grid md:grid-cols-3 gap-6 mb-15">
      {PASOS.map((p, i) => (
        <motion.div
          key={p.n}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="p-9 bg-bg-2 border border-line rounded-sm relative"
        >
          <div className="font-mono text-[64px] font-light text-accent leading-none mb-6 tracking-tight">{p.n}</div>
          <h3 className="text-[22px] font-semibold tracking-tight mb-3 text-ink">{p.t}</h3>
          <p className="text-sm leading-relaxed text-ink-2">{p.d}</p>
        </motion.div>
      ))}
    </div>
    <div className="mt-10">
      <ScoreWizard />
    </div>
  </Section>
);
