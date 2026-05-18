import { motion } from "framer-motion";
import { Section, SectionHeader } from "./_atoms";
import { CAPAS } from "@/data/content";

export const Capas = () => (
  <Section alt id="capas">
    <SectionHeader
      n="03"
      eyebrow="Las 4 capas"
      title={
        <>
          Tu negocio crece en cuatro capas. <span className="text-accent italic font-normal">Las cubrimos todas.</span>
        </>
      }
      lead="La mayoría de PyMEs tiene muros entre estas capas — la web no habla con WhatsApp, WhatsApp no habla con el sistema. Nosotros construimos puentes. Click en cualquiera para ver el detalle."
    />

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {CAPAS.map((capa, i) => (
        <motion.a
          key={capa.id}
          href={capa.href}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: i * 0.08 }}
          className={`group relative p-5 md:p-6 border rounded-md transition-all no-underline flex flex-col ${
            capa.destacado
              ? "border-accent/60 bg-accent/[0.08] hover:bg-accent/[0.12] hover:border-accent"
              : capa.futuro
              ? "border-line-2 bg-bg-2 hover:border-accent/40 opacity-95"
              : "border-line-2 bg-bg-2 hover:border-accent/50"
          }`}
        >
          {/* Header: emoji + nombre + subtítulo */}
          <div className="mb-4">
            <div className="text-3xl md:text-4xl mb-2">{capa.emoji}</div>
            <div className="flex items-baseline gap-2 mb-1">
              <h3 className="text-xl md:text-2xl font-bold text-ink tracking-tight">{capa.nombre}</h3>
              {capa.futuro && (
                <span className="font-mono text-[9px] text-ink-3 border border-line-2 px-1.5 py-0.5 tracking-wider">
                  TRANSVERSAL
                </span>
              )}
            </div>
            <div className="font-mono text-[11px] text-accent tracking-[0.1em] uppercase">
              {capa.subtitulo}
            </div>
          </div>

          {/* Descripción */}
          <p className="text-[13.5px] leading-relaxed text-ink-2 mb-4 flex-shrink-0">
            {capa.desc}
          </p>

          {/* Servicios */}
          <div className="space-y-1.5 mb-5 flex-1">
            {capa.servicios.map((s, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[12.5px] text-ink-2">
                <span className="text-accent text-[10px] mt-1">▸</span>
                <span className="leading-snug">{s}</span>
              </div>
            ))}
          </div>

          {/* Footer: precio + CTA */}
          <div className="flex items-center justify-between text-xs border-t border-line pt-3 mt-auto">
            <span className="font-mono text-accent font-semibold text-[11.5px]">
              {capa.precio}
            </span>
            <span className="text-ink-3 group-hover:text-accent transition-colors font-mono">
              Ver ↓
            </span>
          </div>
        </motion.a>
      ))}
    </div>

    {/* Nota sobre puentes */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-10 md:mt-14 max-w-3xl mx-auto text-center"
    >
      <p className="text-sm md:text-base text-ink-2 leading-relaxed">
        <span className="text-accent font-semibold">Lo que nos hace distintos:</span> las 4 capas se hablan entre sí.
        Una venta que cierra el bot en <strong className="text-ink">Voz</strong> dispara la
        operación en <strong className="text-ink">Motor</strong>, actualiza tu reporte en
        <strong className="text-ink"> Inteligencia</strong> y se refleja en tu
        <strong className="text-ink"> Cara</strong>. Todo conectado. Todo fluye.
      </p>
    </motion.div>
  </Section>
);
