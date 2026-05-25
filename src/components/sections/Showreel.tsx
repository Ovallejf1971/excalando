import { motion } from "framer-motion";
import { Eyebrow } from "./_atoms";
import { HeroShowreel } from "../HeroShowreel";

export const Showreel = () => (
  <section className="section-dark border-t border-line-on-dark px-5 sm:px-6 md:px-12 lg:px-20 py-12 md:py-16">
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 md:mb-8">
        <Eyebrow n="01 / muestra" className="text-ink-on-dark-3">
          Lo que construimos · en movimiento
        </Eyebrow>
        <h2 className="mt-3 font-display text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-ink-on-dark text-balance max-w-3xl">
          Mejor que contártelo: <span className="text-accent">míralo funcionando</span>.
        </h2>
        <p className="mt-3 max-w-2xl text-ink-on-dark-2 text-sm md:text-base leading-relaxed">
          Tres escenas reales del día a día de un cliente: cómo se ve el sitio, cómo responde el asistente y cómo viajan los pedidos sin que nadie los toque.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full rounded-2xl border border-line-on-dark-2 overflow-hidden shadow-card-dark"
        style={{ maxHeight: "440px", aspectRatio: "16 / 7" }}
      >
        <HeroShowreel />
      </motion.div>
    </div>
  </section>
);
