import { motion } from "framer-motion";
import { Section, SectionHeader } from "./_atoms";

type Empleado = {
  emoji: string;
  rol: string;
  descripcion: string;
  paraQuien: string;
};

const EMPLEADOS: Empleado[] = [
  {
    emoji: "📊",
    rol: "Tu analista digital",
    descripcion: "Cada lunes te llega un mensaje con cómo te fue la semana: visitas, llamadas, búsquedas. Si pasa algo raro, te alerta de inmediato.",
    paraQuien: "Quien invierte en marketing y quiere saber si funciona",
  },
  {
    emoji: "👁️",
    rol: "Tu vigilante de reputación",
    descripcion: "Vigila 24/7 tus reseñas en Google, Facebook y TripAdvisor. Responde solo las buenas, te avisa de las malas en menos de 5 minutos.",
    paraQuien: "Restaurantes, hoteles, clínicas, peluquerías",
  },
  {
    emoji: "✍️",
    rol: "Tu community manager",
    descripcion: "Cada lunes te entrega 3 publicaciones listas para esa semana. Tú apruebas con un clic y se publican solas en Instagram y Facebook.",
    paraQuien: "Negocios que tienen que publicar y no lo hacen",
  },
  {
    emoji: "💌",
    rol: "Tu vendedor de fidelización",
    descripcion: "Detecta clientes que no te compran hace 60-180 días y arma campañas personalizadas por WhatsApp o correo para reactivarlos.",
    paraQuien: "Servicios recurrentes con base de clientes",
  },
  {
    emoji: "💬",
    rol: "Tu recepcionista WhatsApp",
    descripcion: "Contesta tu WhatsApp 24/7. Responde preguntas, agenda citas, te avisa solo cuando hay que entrar tú (queja o venta caliente).",
    paraQuien: "Negocios que pierden ventas por no contestar a tiempo",
  },
];

export const EmpleadosDigitales = () => (
  <Section alt id="empleados-digitales">
    <SectionHeader
      n="05"
      eyebrow="Capa Canales Digitales"
      title={
        <>
          5 empleados digitales que trabajan <span className="text-accent">solos</span>.
        </>
      }
      lead="Roles repetitivos que cuidan tu día a día sin que tengas que estar encima. Atienden, vigilan, publican, recuperan y responden. Mientras tú haces lo que sabes hacer mejor."
    />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {EMPLEADOS.map((emp, i) => (
        <motion.div
          key={emp.rol}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="p-5 md:p-6 border border-line-2 rounded-md bg-bg flex flex-col"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{emp.emoji}</span>
            <h3 className="text-base md:text-lg font-semibold text-ink leading-tight tracking-tight">
              {emp.rol}
            </h3>
          </div>
          <p className="text-[13.5px] leading-relaxed text-ink-2 mb-4 flex-1">{emp.descripcion}</p>
          <p className="text-[12px] text-ink-3 italic border-t border-line-2 pt-3">
            Para: {emp.paraQuien}
          </p>
        </motion.div>
      ))}
    </div>
    <p className="mt-8 text-sm text-ink-3 max-w-2xl">
      Pueden ir solos o combinados. Cuál o cuáles te conviene lo definimos contigo en el diagnóstico gratuito.
    </p>
  </Section>
);
