import { motion } from "framer-motion";
import { Workflow } from "lucide-react";
import { Section, SectionHeader } from "./_atoms";

const CASOS = [
  "Pedidos por WhatsApp creados solos en tu sistema de facturación.",
  "Cotización aprobada → contrato firmado + agenda inicio + notifica equipo.",
  "Tienda virtual conectada con tu inventario y tu contabilidad.",
  "Factura emitida → notifica al cliente con link de pago → registra pago recibido.",
  "Nuevo cliente del WhatsApp → entra al CRM → recibe email de bienvenida.",
];

export const Automatizacion = () => (
  <Section id="automatizacion">
    <SectionHeader
      n="06"
      eyebrow="Capa Operación"
      title={
        <>
          Procesos que <span className="text-accent">se hacen solos</span>.
        </>
      }
      lead="Conectamos las herramientas que ya usas para que trabajen entre ellas. Sin copiar-pegar datos. Sin papeles. Sin que tengas que estar encima."
    />
    <div className="max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45 }}
        className="p-6 md:p-7 border border-line-2 rounded-md bg-bg-2"
      >
        <div className="flex items-start gap-3 mb-5">
          <Workflow className="h-6 w-6 text-accent shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-ink text-lg mb-1 tracking-tight">Casos típicos que resolvemos</h3>
            <p className="text-sm text-ink-2">Cada PyME tiene su mezcla. Estos son ejemplos reales:</p>
          </div>
        </div>
        <ul className="flex flex-col gap-2.5 list-none p-0 mb-5">
          {CASOS.map((c) => (
            <li key={c} className="text-[14px] leading-relaxed text-ink-2 flex gap-3 items-start">
              <span className="text-accent font-mono mt-0.5 shrink-0">+</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
        <div className="text-sm text-ink-3 italic border-l-2 border-accent/40 pl-3 py-1">
          <span className="font-semibold text-ink-2 not-italic">La regla 20/80:</span> el 20% de tus tareas repetitivas se llevan el 80% de tu tiempo administrativo. Una buena automatización te recupera 10 a 30 horas al mes.
        </div>
      </motion.div>
    </div>
    <p className="mt-8 text-sm text-ink-3 max-w-2xl">
      Qué automatizar primero y a qué nivel de profundidad lo definimos contigo en el diagnóstico gratuito.
    </p>
  </Section>
);
