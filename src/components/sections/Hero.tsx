import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "./_atoms";
import { ScoreDashboard } from "../ScoreDashboard";
import { LogoMark, Wordmark } from "../Logo";
import { EVENTS, track } from "@/lib/analytics";

type NavLink = { href: string; label: string; internal?: boolean };

const NAV_LINKS: NavLink[] = [
  { href: "/manifiesto", label: "Por qué eXcalando", internal: true },
  { href: "/score", label: "Score Digital", internal: true },
];

export const Nav = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 px-4 sm:px-6 md:px-12 lg:px-20 py-3.5 md:py-5 flex items-center justify-between border-b border-line backdrop-blur-md bg-bg/80">
      <Link to="/" className="flex items-center gap-2.5 sm:gap-3 min-w-0 group">
        <LogoMark className="shrink-0 transition-transform group-hover:rotate-3" />
        <Wordmark className="text-base text-ink" />
        <div className="hidden sm:block ml-2 font-mono text-[10px] tracking-[0.18em] text-ink-3 px-2 py-1 border border-line-2 uppercase">
          v.2026
        </div>
      </Link>
      <div className="hidden md:flex items-center gap-9 text-sm text-ink-2">
        {NAV_LINKS.map((l) =>
          l.internal ? (
            <Link key={l.href} to={l.href} className="hover:text-ink transition-colors">
              {l.label}
            </Link>
          ) : (
            <a key={l.href} href={l.href} className="hover:text-ink transition-colors">
              {l.label}
            </a>
          )
        )}
      </div>
      <div className="hidden md:block">
        <Button size="sm" asChild>
          <Link to="/score" onClick={() => track(EVENTS.NAV_CTA_CLICK)}>
            Score gratis <ArrowRight className="h-3.5 w-3.5" />
          </Link>
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
              {NAV_LINKS.map((l) =>
                l.internal ? (
                  <Link
                    key={l.href}
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className="py-3.5 text-base text-ink-2 hover:text-ink border-b border-line-2 last:border-b-0"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="py-3.5 text-base text-ink-2 hover:text-ink border-b border-line-2 last:border-b-0"
                  >
                    {l.label}
                  </a>
                )
              )}
              <div className="py-4">
                <Button asChild className="w-full">
                  <Link to="/score" onClick={() => setOpen(false)}>
                    Score gratis <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
};

const CONFIDENCE = [
  "Diagnóstico gratis",
  "3 minutos",
  "Sin tarjeta",
  "100% self-hosted",
];

const STATS = [
  { n: "30–90", l: "días a resultados medibles" },
  { n: "0", l: "lock-in / contratos eternos" },
  { n: "5–50", l: "empleados — nuestro sweet-spot" },
];

export const Hero = () => (
  <section className="relative overflow-hidden px-5 sm:px-6 md:px-12 lg:px-20 pt-14 sm:pt-20 md:pt-28 pb-20 md:pb-32">
    {/* Grid sutil sobre hueso */}
    <div className="absolute inset-0 grid-bg" aria-hidden />
    {/* Halo magenta cálido (en vez del cian glow del anterior) */}
    <div
      className="absolute -top-40 -right-32 w-[640px] h-[640px] rounded-full opacity-50 pointer-events-none"
      style={{ background: "radial-gradient(circle, rgba(0,102,255,0.18), transparent 60%)" }}
      aria-hidden
    />
    {/* Acento magenta tope superior (cita brand.dev / arc transición de color) */}
    <div className="absolute top-0 right-0 h-1 w-32 sm:w-48 bg-accent" aria-hidden />

    <div className="relative grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Eyebrow n="00 / eXcalando">Agencia de IA · Colombia + LATAM</Eyebrow>

        {/* Titular type-heavy con frase ancla */}
        <h1 className="mt-6 mb-7 md:mt-8 md:mb-9 font-display text-[44px] sm:text-5xl md:text-6xl lg:text-[92px] font-extrabold leading-[0.95] md:leading-[0.92] tracking-[-0.035em] md:tracking-[-0.04em] text-ink text-balance">
          Delega.
          <br />
          Automatiza.
          <br />
          Orquesta tu{" "}
          <span className="text-accent">operación</span>.
        </h1>

        <p className="text-lg md:text-xl leading-relaxed text-ink-2 max-w-xl mb-8">
          <strong className="text-ink font-semibold">Atención automatizada</strong> en WhatsApp,{" "}
          <strong className="text-ink font-semibold">roles repetitivos</strong> que trabajan solos y{" "}
          <strong className="text-ink font-semibold">tus sistemas hablándose</strong> sin copiar-pegar. Para PyMEs en Colombia y LATAM. Empieza por el diagnóstico gratuito — el resto, paso a paso.
        </p>

        <div className="flex flex-wrap gap-3 mb-7">
          <Button size="lg" asChild>
            <Link to="/score" onClick={() => track(EVENTS.HERO_CTA_SCORE)}>
              Arrancar Score Digital gratis <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/manifiesto" onClick={() => track(EVENTS.HERO_CTA_PROCESO)}>Ver cómo trabajamos</Link>
          </Button>
        </div>

        {/* Confidence row */}
        <ul className="flex flex-wrap gap-x-5 gap-y-2 mb-12 text-sm text-ink-3">
          {CONFIDENCE.map((c) => (
            <li key={c} className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-accent" />
              <span>{c}</span>
            </li>
          ))}
        </ul>

        {/* Stats */}
        <div className="flex flex-wrap gap-9">
          {STATS.map((s) => (
            <div key={s.l} className="border-l-2 border-accent/40 pl-4">
              <div className="font-display text-2xl font-bold text-ink tracking-tight">{s.n}</div>
              <div className="text-xs text-ink-3 mt-0.5 max-w-[180px]">{s.l}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Preview animado del wizard (decisión Francisco: botón + preview, no wizard en vivo) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative"
      >
        <div className="absolute -inset-4 rounded-3xl bg-accent/5 -z-10" aria-hidden />
        <ScoreDashboard />
        <div className="mt-4 flex justify-between font-mono text-[11px] text-ink-3 tracking-wider uppercase">
          <span>↑ Vista previa · Score Digital</span>
          <span>Live demo</span>
        </div>
      </motion.div>
    </div>
  </section>
);
