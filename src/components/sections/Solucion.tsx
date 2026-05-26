import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, MessageSquare, Workflow, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "./_atoms";

const OUTCOMES = [
  {
    icon: Globe,
    titulo: "Te encuentran cuando te buscan.",
    desc: "Tu negocio aparece bien en Google, redes y donde tus clientes ya están mirando.",
  },
  {
    icon: MessageSquare,
    titulo: "Tu WhatsApp responde solo.",
    desc: "Atención 24/7 que agenda citas, contesta dudas y te avisa cuando hace falta una persona.",
  },
  {
    icon: Workflow,
    titulo: "Los procesos repetitivos se hacen solos.",
    desc: "Cotizar, facturar, agendar, hacer seguimiento. Lo que hoy te come horas, deja de hacerse a mano.",
  },
  {
    icon: BarChart3,
    titulo: "Decides mirando datos, no a ojo.",
    desc: "Una pantalla con lo que importa cada lunes. Sin reportes de 40 páginas.",
  },
];

export const Solucion = () => (
  <Section alt id="solucion">
    <SectionHeader
      n="03"
      eyebrow="Lo que hacemos"
      title={
        <>
          Aquí entramos nosotros. <span className="text-accent">Sin muros, sin jerga, sin lock-in.</span>
        </>
      }
      lead="Equipamos a tu PyME con cuatro capacidades digitales conectadas entre sí. No las vendemos por separado como cajas de un catálogo — las entregamos integradas para que tu negocio funcione mejor sin que tú estés metido en todo."
    />
    <div className="grid sm:grid-cols-2 gap-5 md:gap-6 mb-10 md:mb-12">
      {OUTCOMES.map((o, i) => (
        <motion.div
          key={o.titulo}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: i * 0.08 }}
          className="p-6 md:p-7 bg-bg border border-line-2 rounded-md flex gap-5"
        >
          <div className="shrink-0 w-11 h-11 rounded-sm bg-accent/10 flex items-center justify-center">
            <o.icon className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold tracking-tight text-ink mb-2 leading-tight">
              {o.titulo}
            </h3>
            <p className="text-[14px] leading-relaxed text-ink-2">{o.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
    <div className="flex flex-wrap gap-3">
      <Button asChild variant="outline">
        <Link to="/manifiesto">
          Ver las cuatro capacidades en detalle <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  </Section>
);
