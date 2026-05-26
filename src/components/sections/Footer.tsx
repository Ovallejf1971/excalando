import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { LogoMark, Wordmark } from "../Logo";

export const Footer = () => (
  <footer className="section-dark px-5 sm:px-6 md:px-12 lg:px-20 pt-14 md:pt-20 pb-10 md:pb-12 border-t border-line-on-dark">
    <div className="grid sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 md:gap-12 mb-12 md:mb-16">
      <div>
        <a href="#" className="flex items-center gap-2.5 mb-5 group">
          <LogoMark className="transition-transform group-hover:rotate-3" />
          <Wordmark className="text-lg text-ink" />
        </a>
        <p className="text-[15px] leading-relaxed text-ink font-medium max-w-sm mb-2">
          Construimos puentes donde los demás hacen muros.
        </p>
        <p className="text-sm leading-relaxed text-ink-2 max-w-sm">
          Capacidades digitales con IA. Bogotá · Medellín · Cali.
        </p>
      </div>
      <div>
        <div className="font-mono text-[11px] text-ink-3 tracking-[0.15em] mb-4 uppercase">Servicios</div>
        {["Score Digital", "Presencia Digital", "Asistentes IA", "Automatización", "Paquetes Integrales"].map((s) => (
          <div key={s} className="text-sm text-ink-2 py-1.5">
            {s}
          </div>
        ))}
      </div>
      <div>
        <div className="font-mono text-[11px] text-ink-3 tracking-[0.15em] mb-4 uppercase">Contacto</div>
        <a
          href="mailto:hola@excalando.com"
          className="text-sm text-ink-2 hover:text-ink py-1.5 block transition-colors"
        >
          hola@excalando.com
        </a>
        <a
          href="https://wa.me/16184056029?text=Hola%2C%20vengo%20del%20sitio%20de%20eXcalando"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-ink-2 hover:text-ink py-1.5 block transition-colors"
        >
          Chat WhatsApp 24/7 ↗
        </a>
      </div>
      <div>
        <div className="font-mono text-[11px] text-ink-3 tracking-[0.15em] mb-4 uppercase">Síguenos</div>
        {[
          { l: "LinkedIn", h: "https://www.linkedin.com/company/excalando" },
          { l: "Instagram", h: "https://www.instagram.com/excalando" },
          { l: "YouTube", h: "https://www.youtube.com/@excalando" },
          { l: "GitHub", h: "https://github.com/excalando" },
        ].map((s) => (
          <a
            key={s.l}
            href={s.h}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-ink-2 hover:text-ink py-1.5 flex items-center gap-2 transition-colors"
          >
            {s.l} <ArrowUpRight className="h-3 w-3 text-ink-3" />
          </a>
        ))}
      </div>
    </div>
    <div className="border-t border-line-on-dark pt-6 flex justify-between items-center flex-wrap gap-4 text-xs text-ink-3 font-mono uppercase">
      <div>© 2026 eXcalando · NIT 901.XXX.XXX-X · Colombia</div>
      <div className="flex gap-6">
        <Link to="/terminos" className="hover:text-ink transition-colors">Términos</Link>
        <Link to="/privacidad" className="hover:text-ink transition-colors">Privacidad</Link>
      </div>
    </div>
  </footer>
);
