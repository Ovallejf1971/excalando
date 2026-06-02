import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section, SectionHeader } from "./_atoms";
import { FAQS } from "@/data/comercial-content";
import { cn } from "@/lib/utils";

export const Faq = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" alt>
      <SectionHeader
        n="09"
        eyebrow="Las preguntas duras"
        title={
          <>
            Las dudas que <span className="text-accent">la gente normalmente no se atreve a hacer</span>.
          </>
        }
        lead="Las respondemos antes de que las preguntes. Si tenés una que no está acá, escribinos."
      />

      <div className="space-y-3 max-w-3xl">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={f.pregunta}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="bg-bg border border-line rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left hover:bg-ink/5 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-base md:text-lg font-medium text-ink">
                  {f.pregunta}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-ink-3 flex-shrink-0 transition-transform",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              {isOpen && (
                <div className="px-5 md:px-6 pb-5 md:pb-6 text-sm md:text-base text-ink-2 leading-relaxed">
                  {f.respuesta}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};
