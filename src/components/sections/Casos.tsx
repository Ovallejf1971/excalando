import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Section, SectionHeader } from "./_atoms";

const VENTAJAS_EARLY = [
  {
    n: "01",
    titulo: "Precio fundador",
    desc: "Tarifa de lanzamiento por los primeros 12 meses. Bloqueas precio aunque después suba.",
  },
  {
    n: "02",
    titulo: "Acompañamiento directo",
    desc: "Trabajas directo con el equipo fundador. Sin intermediarios, sin junior trasnochando tu cuenta.",
  },
  {
    n: "03",
    titulo: "Stack personalizado",
    desc: "Configuramos los agentes IA y automatizaciones a tu negocio puntual, no plantilla genérica.",
  },
  {
    n: "04",
    titulo: "Caso de éxito co-construido",
    desc: "Si los resultados son buenos, lo documentamos juntos. Tú ganas visibilidad, nosotros prueba social.",
  },
];

export const Casos = () => (
  <Section alt id="casos">
    <SectionHeader
      n="10"
      eyebrow="Sé de los primeros"
      title={
        <>
          Estamos eligiendo los <span className="text-accent">primeros 5 clientes.</span>
        </>
      }
      lead="No te vamos a mostrar testimonios genéricos ni logos prestados. Recién arrancamos. Si te gusta lo que ves, puedes ser uno de los casos que documentamos juntos."
    />
    <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-12 md:mb-15">
      {VENTAJAS_EARLY.map((v, i) => (
        <motion.div
          key={v.n}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="p-6 sm:p-7 border border-line rounded-sm bg-white/[0.04] flex flex-col gap-3 min-h-[160px]"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 text-accent" />
            <div className="font-mono text-[11px] text-ink-3 tracking-[0.15em]">VENTAJA / {v.n}</div>
          </div>
          <h3 className="text-[20px] font-semibold tracking-tight text-ink">{v.titulo}</h3>
          <p className="text-sm leading-relaxed text-ink-2">{v.desc}</p>
        </motion.div>
      ))}
    </div>
    <div className="border-t border-line pt-8 sm:pt-10 text-center">
      <div className="font-mono text-[11px] text-ink-3 tracking-[0.15em] mb-3">CUPOS DISPONIBLES</div>
      <div className="font-mono text-[64px] sm:text-[88px] font-semibold text-accent tracking-tight leading-none mb-3">5</div>
      <p className="text-sm text-ink-2 max-w-md mx-auto">Hacé tu Score Digital primero. Si encaja, te proponemos cómo seguir.</p>
    </div>
  </Section>
);
