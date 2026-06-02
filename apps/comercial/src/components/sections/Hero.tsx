import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LogoMark, Wordmark } from "@/components/Logo";
import { META } from "@/data/comercial-content";

export const Hero = () => (
  <section className="relative px-5 sm:px-6 md:px-12 lg:px-20 pt-8 pb-20 md:pt-12 md:pb-28 bg-bg overflow-hidden">
    <div className="grid-bg absolute inset-0 pointer-events-none" />

    {/* Nav */}
    <nav className="relative flex items-center justify-between mb-20 md:mb-28">
      <a href="/" className="flex items-center gap-2.5">
        <LogoMark size={32} />
        <Wordmark className="text-lg" />
      </a>
      <div className="hidden md:flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] text-ink-3">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span>Pitch comercial · privado</span>
      </div>
    </nav>

    {/* Hero copy */}
    <div className="relative max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-ink-3 mb-8"
      >
        <span className="text-accent">[00]</span>
        <span>Capacidades digitales con IA para tu PyME</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-[40px] sm:text-5xl md:text-6xl lg:text-[88px] font-display font-bold leading-[0.95] tracking-[-0.03em] text-ink text-balance mb-6 md:mb-8"
      >
        {META.lema.split(" ").map((w, i) =>
          w.toLowerCase().includes("puente") || w.toLowerCase().includes("muro") ? (
            <span key={i}>
              <span className="text-accent">{w}</span>{" "}
            </span>
          ) : (
            <span key={i}>{w} </span>
          ),
        )}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="text-xl md:text-2xl lg:text-3xl text-ink-2 max-w-3xl text-pretty mb-12"
      >
        {META.sublema} Sin lock-in, sin contratos eternos, sin jerga inflada. Cobramos por resultados, no por reuniones.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <a
          href="#siguiente-paso"
          className="group inline-flex items-center justify-center gap-2 bg-ink text-bg px-7 py-4 rounded-full font-medium hover:bg-accent transition-colors"
        >
          Empecemos por el diagnóstico gratis
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </a>
        <a
          href="#capas"
          className="inline-flex items-center justify-center gap-2 border border-line-2 text-ink px-7 py-4 rounded-full font-medium hover:bg-ink/5 transition-colors"
        >
          Ver qué hacemos
        </a>
      </motion.div>
    </div>
  </section>
);
