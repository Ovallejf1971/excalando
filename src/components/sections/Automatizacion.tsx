import { Workflow, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "./_atoms";

const CASOS = [
  "Pedidos por WhatsApp creados solos en tu sistema de facturación",
  "Cotización aprobada → contrato firmado + agenda inicio + notifica equipo",
  "Tienda virtual conectada con tu inventario y tu contabilidad",
];

export const Automatizacion = () => (
  <Section id="automatizacion">
    <SectionHeader
      n="07"
      eyebrow="Automatización a Medida"
      title={
        <>
          ¿Tienes un proceso que <span className="text-accent">repites todos los días?</span>
        </>
      }
      lead="Conectamos las herramientas que ya usas para que trabajen solas y se hablen entre sí. Sin que tengas que copiar-pegar datos de un lado a otro nunca más."
    />
    <div className="max-w-3xl">
      <div className="p-6 sm:p-8 border border-line rounded-sm bg-white/[0.04] flex flex-col gap-5">
        <div className="flex items-start gap-3">
          <Workflow className="h-6 w-6 text-accent shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-ink text-lg mb-1">Proyectos a tu medida</h3>
            <p className="text-sm text-ink-2">Tres casos típicos que resolvemos:</p>
          </div>
        </div>
        <ul className="flex flex-col gap-2 list-none p-0">
          {CASOS.map((c) => (
            <li key={c} className="text-sm text-ink-2 flex gap-3 items-start">
              <span className="text-accent font-mono mt-0.5 shrink-0">+</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
        <div className="text-sm text-ink-3 italic border-l-2 border-accent/40 pl-3">
          <span className="font-semibold text-ink-2 not-italic">La regla 20/80:</span> el 20% de tus tareas
          repetitivas se llevan el 80% de tu tiempo administrativo. Una buena automatización te
          recupera 10 a 30 horas al mes.
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-3 pt-3 border-t border-line">
          <div>
            <div className="font-mono text-2xl font-semibold text-accent">Desde $800K</div>
            <div className="text-xs text-ink-3">cotización por proyecto · 3 niveles de complejidad</div>
          </div>
          <Button asChild>
            <a href="#cta">
              Hablar con nosotros <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  </Section>
);
