import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "./_atoms";
import { ScoreDashboard } from "../ScoreDashboard";

const NAV_LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#score", label: "Score" },
  { href: "#proceso", label: "Proceso" },
  { href: "#casos", label: "Casos" },
  { href: "#faq", label: "FAQ" },
];

export const Nav = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 px-4 sm:px-6 md:px-12 lg:px-20 py-3.5 md:py-5 flex items-center justify-between border-b border-line backdrop-blur-md bg-bg/70">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
          <path d="M4 20V4h7a5 5 0 010 10H8" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" />
          <circle cx="18" cy="18" r="2.5" fill="#00D4FF" />
        </svg>
        <div className="font-bold text-base tracking-tight text-ink">
          e<span className="text-accent">X</span>calando
        </div>
        <div className="hidden sm:block ml-2 font-mono text-[10px] tracking-[0.15em] text-ink-3 px-2 py-1 border border-line-2">v.2026</div>
      </div>
      <div className="hidden md:flex items-center gap-9 text-sm text-ink-2">
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} className="hover:text-ink transition-colors">{l.label}</a>
        ))}
      </div>
      <div className="hidden md:block">
        <Button size="sm" asChild>
          <a href="#score">Score gratis <ArrowRight className="h-3.5 w-3.5" /></a>
        </Button>
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="md:hidden p-2 -mr-2 text-ink"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden absolute top-full left-0 right-0 bg-bg/95 backdrop-blur-md border-b border-line"
          >
            <div className="flex flex-col px-4 py-2">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3.5 text-base text-ink-2 hover:text-ink border-b border-line-2 last:border-b-0"
                >
                  {l.label}
                </a>
              ))}
              <div className="py-4">
                <Button asChild className="w-full">
                  <a href="#score" onClick={() => setOpen(false)}>
                    Score gratis <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
};

export const Hero = () => (
  <section className="relative overflow-hidden px-5 sm:px-6 md:px-12 lg:px-20 pt-12 sm:pt-16 md:pt-24 pb-20 md:pb-32">
    <div className="absolute inset-0 grid-bg" aria-hidden />
    <div className="absolute -top-32 right-40 w-[500px] h-[500px] rounded-full opacity-40 pointer-events-none"
         style={{ background: "radial-gradient(circle, rgba(0,212,255,0.35), transparent 60%)" }} aria-hidden />

    <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Eyebrow n="00 / eXcalando">Capacidades digitales con IA · Colombia</Eyebrow>
        <h1 className="mt-6 mb-6 md:mt-8 md:mb-8 text-[40px] sm:text-5xl md:text-6xl lg:text-[88px] font-bold leading-[1] md:leading-[0.98] tracking-[-0.03em] md:tracking-[-0.035em] text-ink text-balance">
          Tu PyME está perdiendo plata.{" "}
          <span className="text-accent italic font-normal">Te decimos dónde,</span> gratis.
        </h1>
        <p className="text-lg leading-relaxed text-ink-2 max-w-xl mb-10">
          Diagnóstico → implementación → resultados medibles en{" "}
          <strong className="text-ink font-semibold">30–90 días</strong>. Stack propio, self-hosted, cero lock-in. No vendemos horas; vendemos crecimiento.
        </p>
        <div className="flex flex-wrap gap-3 mb-12">
          <Button size="lg" asChild>
            <a href="#score">
              Hacer mi Score Digital gratis <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#proceso">Ver cómo trabajamos</a>
          </Button>
        </div>
        <div className="flex flex-wrap gap-9">
          {[
            { n: "30–90", l: "días a resultados" },
            { n: "0", l: "lock-in / contratos eternos" },
            { n: "5–50", l: "empleados, nuestro sweet-spot" },
          ].map((s) => (
            <div key={s.l} className="border-l border-line-2 pl-4">
              <div className="font-mono text-2xl font-semibold text-ink tracking-tight">{s.n}</div>
              <div className="text-xs text-ink-3 mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
        <ScoreDashboard />
        <div className="mt-4 flex justify-between font-mono text-[11px] text-ink-3 tracking-wider">
          <span>↑ EJEMPLO REAL · MARCA REAL S.A.S.</span>
          <span>ACTUALIZADO HACE 8s</span>
        </div>
      </motion.div>
    </div>
  </section>
);
