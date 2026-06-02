import { LogoMark, Wordmark } from "@/components/Logo";

export const Footer = () => (
  <footer className="section-dark px-5 sm:px-6 md:px-12 lg:px-20 py-12 md:py-16 border-t border-line-on-dark">
    <div className="md:flex md:items-end md:justify-between gap-10">
      <div className="mb-8 md:mb-0">
        <a href="#" className="flex items-center gap-2.5 mb-3">
          <LogoMark size={32} />
          <Wordmark className="text-xl text-ink-on-dark" />
        </a>
        <p className="text-sm text-ink-on-dark-3 max-w-md">
          Capacidades digitales con IA para PyMEs en Colombia y LATAM. Sin lock-in, sin contratos eternos, sin jerga inflada.
        </p>
      </div>
      <div className="text-xs font-mono uppercase tracking-[0.15em] text-ink-on-dark-3 space-y-1">
        <div>Pitch comercial · contenido privado</div>
        <div>Versión {new Date().toISOString().slice(0, 10)}</div>
        <div className="pt-3">
          <a
            href="https://excalando.com"
            className="text-ink-on-dark-2 hover:text-accent transition-colors normal-case font-sans"
          >
            excalando.com →
          </a>
        </div>
      </div>
    </div>
  </footer>
);
