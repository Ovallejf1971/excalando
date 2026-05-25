import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "./_atoms";

type Plan = {
  nivel: "Básico" | "Intermedio" | "Profesional";
  precio: string;
  precioNota: string;
  resumen: string;
  bullets: string[];
  destacado?: boolean;
};

const PLANES: Plan[] = [
  {
    nivel: "Básico",
    precio: "$290.000",
    precioNota: "/ mes",
    resumen: "Empieza por estar visible. Web profesional + Google bien configurado + reportes semanales.",
    bullets: [
      "Página web profesional",
      "Ficha Google optimizada",
      "Reporte semanal de tráfico",
      "Setup único $1.500.000",
    ],
  },
  {
    nivel: "Intermedio",
    precio: "$790.000",
    precioNota: "/ mes",
    resumen: "Visible + activo. Web + Google + reseñas + redes + recuperación de clientes inactivos.",
    bullets: [
      "Todo lo del plan Básico",
      "Vigilante de reseñas 24/7",
      "Community manager (12 posts/mes)",
      "Recuperador de clientes inactivos",
    ],
    destacado: true,
  },
  {
    nivel: "Profesional",
    precio: "$1.590.000",
    precioNota: "/ mes",
    resumen: "Todo cubierto. Suma WhatsApp 24/7 atendido por IA + reunión mensual contigo.",
    bullets: [
      "Todo lo del plan Intermedio",
      "Recepcionista WhatsApp 24/7",
      "Reunión Zoom mensual",
      "Soporte humano lun–vie",
    ],
  },
];

export const PlanesTeaser = () => (
  <Section id="planes">
    <SectionHeader
      n="04"
      eyebrow="Planes mensuales · sin lock-in"
      title={
        <>
          Tres formas de arrancar. <span className="text-accent">Sin contratos eternos.</span>
        </>
      }
      lead="Mes a mes. Te vas cuando quieras. El setup único es el mismo en los tres ($1.500.000) y se cobra una sola vez."
    />
    <div className="grid md:grid-cols-3 gap-5 md:gap-6">
      {PLANES.map((p, i) => (
        <motion.div
          key={p.nivel}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: i * 0.08 }}
          className={`relative p-6 md:p-7 border rounded-md flex flex-col ${
            p.destacado
              ? "border-accent bg-accent/[0.04]"
              : "border-line-2 bg-bg-2"
          }`}
        >
          {p.destacado && (
            <div className="absolute -top-3 left-6 font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-1 bg-accent text-white">
              Más elegido
            </div>
          )}
          <div className="mb-5">
            <div className="font-mono text-[11px] tracking-[0.15em] text-ink-3 uppercase mb-2">
              Plan {p.nivel}
            </div>
            <div className="flex items-baseline gap-1 mb-3">
              <div className="font-display text-3xl md:text-4xl font-extrabold text-ink tracking-[-0.03em]">
                {p.precio}
              </div>
              <div className="text-sm text-ink-3 font-mono">{p.precioNota}</div>
            </div>
            <p className="text-[14px] leading-relaxed text-ink-2">{p.resumen}</p>
          </div>
          <div className="space-y-2 mb-7 flex-1">
            {p.bullets.map((b) => (
              <div key={b} className="flex items-start gap-2 text-[13.5px] text-ink-2">
                <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span className="leading-snug">{b}</span>
              </div>
            ))}
          </div>
          <Button asChild variant={p.destacado ? "primary" : "outline"} className="w-full">
            <Link to="/capacidades">
              Ver detalle <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </motion.div>
      ))}
    </div>
    <div className="mt-10 text-center text-sm text-ink-3">
      ¿No sabes cuál te conviene?{" "}
      <Link to="/score" className="text-accent hover:underline font-medium">
        Diagnostica con el Score Digital gratis →
      </Link>
    </div>
  </Section>
);
