import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS } from "@/data/content";
import { Section, SectionHeader } from "./_atoms";

export const Faq = () => (
  <Section id="faq">
    <SectionHeader
      n="11"
      eyebrow="Preguntas frecuentes"
      title={
        <>
          Las dudas que <span className="text-accent">siempre nos hacen.</span>
        </>
      }
    />
    <Accordion type="single" collapsible defaultValue="item-0" className="border-t border-line-2">
      {FAQS.map((f, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger>
            <div className="flex items-center gap-3 md:gap-6">
              <span className="font-mono text-[13px] text-ink-3 tracking-wider hidden sm:inline">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[17px] md:text-[22px] font-medium tracking-tight text-ink text-balance">{f.q}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </Section>
);
