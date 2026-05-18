import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Sparkles, ChevronDown } from "lucide-react";
import { EMPLEADOS_DIGITALES } from "@/data/content";
import { Section, SectionHeader } from "./_atoms";

export const EmpleadosDigitales = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Section id="empleados-digitales">
      <SectionHeader
        n="05"
        eyebrow="Empleados sueltos"
        title={
          <>
            ¿Ya tienes web? <span className="text-accent">Agrégale empleados digitales.</span>
          </>
        }
        lead="Los empleados digitales son extensiones que cuidan tu presencia: el Vigilante monitorea tu ficha de Google, el Community Manager publica en tus redes, el Asistente WhatsApp atiende tu número. Si ya tienes esa base armada en otro lado, contrátalos sueltos para complementarla."
      />

      <div className="mb-8 p-4 border border-line rounded-sm bg-bg-2/40 max-w-3xl">
        <p className="text-sm text-ink-2">
          💡 <span className="font-semibold text-ink">¿No tienes web todavía?</span> Mejor arranca con
          un{" "}
          <a href="#presencia-digital" className="text-accent hover:underline">
            Nivel de Presencia Digital
          </a>{" "}
          — ahí ya vienen empleados incluidos según el nivel que elijas.
        </p>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-3 px-5 py-3 border border-line hover:border-accent/60 rounded-sm bg-bg-2 transition-colors"
      >
        <ChevronDown
          className={`h-5 w-5 text-accent transition-transform ${expanded ? "rotate-180" : ""}`}
        />
        <span className="font-mono text-sm text-ink uppercase tracking-wider">
          {expanded ? "Ocultar los 5 empleados" : "Conoce a los 5 empleados"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="empleados-list"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 32 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {EMPLEADOS_DIGITALES.map((emp, i) => (
                <motion.div
                  key={emp.nombre}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`p-6 border rounded-sm flex flex-col ${
                    emp.destacado ? "border-accent bg-accent/10" : "border-line bg-bg-2"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{emp.emoji}</span>
                    <div className="flex-1">
                      <div className="font-mono text-[11px] text-ink-3 tracking-[0.15em] uppercase">
                        {emp.rol}
                      </div>
                      <h3 className="text-lg font-semibold text-ink leading-tight mt-0.5">
                        {emp.nombre}
                      </h3>
                    </div>
                    {emp.destacado && (
                      <span className="text-[10px] font-mono text-accent border border-accent px-2 py-0.5 tracking-wider self-start">
                        TOP
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-ink-2 leading-relaxed mb-4 flex-1">{emp.descripcion}</p>

                  <div className="grid grid-cols-2 gap-2 mb-4 text-[12px]">
                    <div className="flex items-center gap-1.5 text-ink-3">
                      <Clock className="h-3.5 w-3.5 text-accent" />
                      <span>Tu tiempo: {emp.tiempoTuyo}/mes</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-ink-3">
                      <Sparkles className="h-3.5 w-3.5 text-accent" />
                      <span>Setup: {emp.setup}</span>
                    </div>
                  </div>

                  <div className="border-t border-line pt-3 mt-auto">
                    <div className="font-mono text-2xl font-semibold text-accent mb-1">
                      ${emp.precio}
                    </div>
                    <div className="text-[11px] text-ink-3">/mes · cancelación libre</div>
                    <p className="text-[12px] text-ink-3 mt-2 italic">{emp.paraQuien}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-5 border border-line rounded-sm bg-bg-2/40 max-w-3xl mx-auto text-center">
              <p className="text-sm text-ink-2">
                <span className="font-semibold text-ink">¿Quieres más de uno?</span> Combinaciones con
                descuento:{" "}
                <span className="text-accent font-mono">2 = -10%</span>
                {" · "}
                <span className="text-accent font-mono">3 = -15%</span>
                {" · "}
                <span className="text-accent font-mono">4 = -20%</span>
                {" · "}
                <span className="text-accent font-mono">5 = -25%</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};
