import { motion } from "framer-motion";
import { Bot, Globe, Workflow } from "lucide-react";
import { Section, SectionHeader } from "./_atoms";

const CAMINOS = [
  {
    icon: Globe,
    titulo: "Presencia Digital",
    desc: "Página web profesional + ficha de Google + empleados digitales incluidos. Tu base.",
    precio: "Desde $290K/mes",
    href: "#presencia-digital",
    destacado: true,
  },
  {
    icon: Bot,
    titulo: "Empleados sueltos",
    desc: "Si ya tienes web, agrégale 1 o varios agentes IA. Combinaciones con descuento.",
    precio: "Desde $180K/mes",
    href: "#empleados-digitales",
  },
  {
    icon: Workflow,
    titulo: "Automatización a Medida",
    desc: "Conectamos tus herramientas para que trabajen solas. Proyectos custom.",
    precio: "Desde $800K",
    href: "#automatizacion",
  },
];

export const CatalogoIntro = () => (
  <Section alt id="catalogo">
    <SectionHeader
      n="03"
      eyebrow="Catálogo"
      title={
        <>
          Tres caminos para trabajar con nosotros. <span className="text-accent">Tú eliges.</span>
        </>
      }
      lead="La Presencia Digital es la base (web + ficha de Google + empleados). Si ya tienes web, agrega empleados sueltos. Para procesos repetitivos, automatización a medida. Click en cualquier camino para ver el detalle."
    />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {CAMINOS.map((c, i) => {
        const Icon = c.icon;
        return (
          <motion.a
            key={c.titulo}
            href={c.href}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={`p-6 border rounded-sm flex flex-col group transition-colors no-underline ${
              c.destacado
                ? "border-accent bg-accent/10 hover:bg-accent/15"
                : "border-line bg-white/[0.04] hover:border-accent/50"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <Icon className="h-6 w-6 text-accent" />
              <h3 className="font-semibold text-ink text-lg flex-1">{c.titulo}</h3>
              {c.destacado && (
                <span className="text-[10px] font-mono text-accent border border-accent px-2 py-0.5 tracking-wider">
                  ⭐ TOP
                </span>
              )}
            </div>
            <p className="text-sm text-ink-2 mb-4 flex-1">{c.desc}</p>
            <div className="flex items-center justify-between text-sm border-t border-line pt-3">
              <span className="font-mono text-accent font-semibold">{c.precio}</span>
              <span className="text-ink-3 group-hover:text-accent transition-colors font-mono text-xs">
                Ver detalle ↓
              </span>
            </div>
          </motion.a>
        );
      })}
    </div>
  </Section>
);
