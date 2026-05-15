import { ArrowUpRight } from "lucide-react";

export const Footer = () => (
  <footer className="px-5 sm:px-6 md:px-12 lg:px-20 pt-14 md:pt-20 pb-10 md:pb-12 border-t border-line bg-bg">
    <div className="grid sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 md:gap-12 mb-12 md:mb-16">
      <div>
        <div className="flex items-center gap-2.5 mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 20V4h7a5 5 0 010 10H8" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" />
            <circle cx="18" cy="18" r="2.5" fill="#00D4FF" />
          </svg>
          <div className="font-bold text-lg tracking-tight">
            e<span className="text-accent">X</span>calando
          </div>
        </div>
        <p className="text-sm leading-relaxed text-ink-2 max-w-sm">
          Capacidades digitales con IA para PyMEs colombianas que quieren crecer en serio. Bogotá · Medellín · Cali.
        </p>
      </div>
      <div>
        <div className="font-mono text-[11px] text-ink-3 tracking-[0.15em] mb-4">SERVICIOS</div>
        {["Score Digital", "Presencia Digital", "Asistentes IA", "Automatización", "Paquetes Integrales"].map((s) => (
          <div key={s} className="text-sm text-ink-2 py-1.5">{s}</div>
        ))}
      </div>
      <div>
        <div className="font-mono text-[11px] text-ink-3 tracking-[0.15em] mb-4">CONTACTO</div>
        <div className="text-sm text-ink-2 py-1.5">hola@excalando.com</div>
        <div className="text-sm text-ink-2 py-1.5">+57 300 000 0000</div>
        <div className="text-sm text-ink-2 py-1.5">WhatsApp 24/7</div>
      </div>
      <div>
        <div className="font-mono text-[11px] text-ink-3 tracking-[0.15em] mb-4">SÍGUENOS</div>
        {["LinkedIn", "Instagram", "YouTube", "GitHub"].map((s) => (
          <div key={s} className="text-sm text-ink-2 py-1.5 flex items-center gap-2">
            {s} <ArrowUpRight className="h-3 w-3 text-ink-3" />
          </div>
        ))}
      </div>
    </div>
    <div className="border-t border-line pt-6 flex justify-between items-center flex-wrap gap-4 text-xs text-ink-3 font-mono">
      <div>© 2026 PICARD-IA · NIT 901.XXX.XXX-X · Colombia</div>
      <div className="flex gap-6">
        <span>Términos</span>
        <span>Privacidad</span>
        <span>Cookies</span>
      </div>
    </div>
  </footer>
);
