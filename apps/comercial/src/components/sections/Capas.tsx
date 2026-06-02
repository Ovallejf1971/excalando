import { motion } from "framer-motion";
import { Section, SectionHeader } from "./_atoms";
import { CAPAS } from "@/data/comercial-content";

export const Capas = () => (
  <Section id="capas" dark>
    <SectionHeader
      n="03"
      eyebrow="Cómo lo hacemos"
      title={
        <>
          Cuatro capacidades. <span className="text-accent">Conectadas entre sí.</span>
        </>
      }
      lead="La mayoría de proveedores vende una pieza suelta. Acá las cuatro capas se construyen una sobre la otra, en el orden que más leverage te da."
    />

    <div className="space-y-4 md:space-y-5">
      {CAPAS.map((capa, i) => (
        <motion.div
          key={capa.n}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="bg-bg-2 border border-line-on-dark rounded-2xl p-6 md:p-10"
        >
          <div className="md:grid md:grid-cols-[200px_1fr] md:gap-10 items-start">
            <div className="mb-5 md:mb-0">
              <div className="font-mono text-xs uppercase tracking-[0.15em] text-ink-on-dark-3 mb-1.5">
                [{capa.n}] {capa.nombre}
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-ink-on-dark leading-tight">
                {capa.titulo}
              </h3>
            </div>
            <div>
              <p className="text-base md:text-lg text-ink-on-dark-2 leading-relaxed mb-5 text-pretty">
                {capa.descripcion}
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                {capa.entregables.map((e) => (
                  <li key={e} className="flex gap-2 text-sm md:text-base text-ink-on-dark-2">
                    <span className="text-accent flex-shrink-0">·</span>
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="mt-12 md:mt-16 max-w-3xl">
      <p className="text-xl md:text-2xl text-ink-on-dark-2 leading-relaxed text-pretty">
        Un solo frente bien resuelto no es estrategia digital.{" "}
        <span className="text-ink-on-dark font-medium">Es decoración.</span>
      </p>
    </div>
  </Section>
);
