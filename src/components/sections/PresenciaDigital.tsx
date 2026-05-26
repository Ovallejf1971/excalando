import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Section, SectionHeader } from "./_atoms";

const INCLUYE = [
  { titulo: "Página web profesional", desc: "Mobile-first, rápida, optimizada para Google. Sin plantillas genéricas." },
  { titulo: "Ficha de Google optimizada", desc: "Tu negocio aparece bien cuando alguien lo busca en Maps o en Google." },
  { titulo: "Reporte semanal de visitas", desc: "Cada lunes recibes en tu correo cuánto te visitan, de dónde llegan y qué hacen." },
  { titulo: "Vigilante de reseñas 24/7", desc: "Monitorea tus reseñas en Google, Facebook y TripAdvisor. Te avisa de las críticas en menos de 5 minutos." },
  { titulo: "Publicaciones en redes con tu aprobación", desc: "Te entregamos contenido listo cada semana. Tú apruebas con un clic y se publica solo." },
  { titulo: "Recuperación de clientes inactivos", desc: "Detecta clientes que no compran hace 60-180 días y los reactiva con campañas personalizadas." },
  { titulo: "WhatsApp atendido 24/7", desc: "Contesta preguntas frecuentes, agenda citas y escala a humano solo cuando hace falta." },
];

export const PresenciaDigital = () => (
  <Section id="presencia-digital">
    <SectionHeader
      n="04"
      eyebrow="Capa Presencia Digital"
      title={
        <>
          Que te encuentren, te elijan y te <span className="text-accent">contacten</span>.
        </>
      }
      lead="Tu cara digital. Lo que la gente ve cuando te busca en Google, entra a tu sitio o lee tus reseñas. Sin esto, no te encuentran."
    />
    <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
      {INCLUYE.map((item, i) => (
        <motion.div
          key={item.titulo}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="p-5 md:p-6 border border-line-2 rounded-md bg-bg-2 flex gap-4"
        >
          <div className="shrink-0 w-9 h-9 rounded-sm bg-accent/10 flex items-center justify-center">
            <Check className="h-4 w-4 text-accent" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold text-ink mb-1.5 tracking-tight leading-tight">
              {item.titulo}
            </h3>
            <p className="text-[13.5px] leading-relaxed text-ink-2">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
    <p className="mt-8 text-sm text-ink-3 max-w-2xl">
      Cuáles activamos, en qué orden y a qué profundidad lo definimos contigo en el diagnóstico gratuito. No vendemos paquetes pre-empacados.
    </p>
  </Section>
);
