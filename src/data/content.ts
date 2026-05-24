// Single source of truth for landing copy & data — edit here.

export const SERVICIOS = [
  {
    n: "01",
    nombre: "Score Digital",
    icon: "search",
    desc: "Diagnóstico gratis de tu presencia digital en 5 minutos. Score 0-100 y plan de acción priorizado.",
    precio: "Gratis",
    precioNota: "5 min · sin tarjeta",
    bullets: [
      "Score 0-100 al instante",
      "Desglose por 6 frentes",
      "Top 3-5 acciones priorizadas",
    ],
    destacado: true,
  },
  {
    n: "02",
    nombre: "Presencia Digital",
    icon: "globe",
    desc: "Página web + ficha de Google + empleados digitales que cuidan tu reputación.",
    precio: "Desde $290K/mes",
    precioNota: "3 niveles · setup incluido",
    bullets: [
      "Página web rápida y responsive",
      "Tu ficha de Google optimizada",
      "Hasta 5 empleados digitales",
    ],
  },
  {
    n: "03",
    nombre: "Asistentes IA",
    icon: "bot",
    desc: "Tus empleados digitales 24/7. Trabajan sin descanso, contrátalos sueltos o juntos con descuento.",
    precio: "Desde $180K/mes",
    precioNota: "5 agentes · combinables",
    bullets: [
      "Recepcionista WhatsApp",
      "Vigilante de reseñas",
      "Community manager + 2 más",
    ],
  },
  {
    n: "04",
    nombre: "Automatización a Medida",
    icon: "workflow",
    desc: "Conectamos las herramientas que ya usas para que trabajen solas y se hablen entre sí.",
    precio: "Desde $800K",
    precioNota: "Por proyecto · 3 niveles",
    bullets: [
      "Pedidos automáticos en tu sistema",
      "Cotización → contrato + agenda",
      "Mantenimiento opcional",
    ],
  },
  {
    n: "05",
    nombre: "Paquetes Integrales",
    icon: "package",
    desc: "Combos con descuento hasta 21%. Web + agentes + automatización en un precio mensual.",
    precio: "Desde $490K/mes",
    precioNota: "4 paquetes · ahorras hasta $6.4M",
    bullets: [
      "🌱 Despegue · 🚀 Crecimiento",
      "💎 Ventas Pro · 👑 Transformación",
      "Sin penalidad · cancelación libre",
    ],
  },
] as const;

type CeldaValor = boolean | string;

export type NivelPresencia = {
  id: "basico" | "intermedio" | "profesional";
  emoji: string;
  nombre: string;
  precio: string;
  destacado?: boolean;
};

export type FilaPresencia = {
  feature: string;
  basico: CeldaValor;
  intermedio: CeldaValor;
  profesional: CeldaValor;
  esResaltado?: boolean;
};

export const PRESENCIA_DIGITAL: { filas: FilaPresencia[]; niveles: NivelPresencia[] } = {
  niveles: [
    { id: "basico", emoji: "🟢", nombre: "Básico", precio: "$290.000/mes" },
    { id: "intermedio", emoji: "🔵", nombre: "Intermedio", precio: "$790.000/mes", destacado: true },
    { id: "profesional", emoji: "🟣", nombre: "Profesional", precio: "$1.590.000/mes" },
  ],
  filas: [
    { feature: "Setup inicial (única vez)", basico: "$1.500.000", intermedio: "$1.500.000", profesional: "$1.500.000", esResaltado: true },
    { feature: "Compromiso", basico: "Mes a mes", intermedio: "Mes a mes", profesional: "Mes a mes" },
    { feature: "Página web profesional", basico: true, intermedio: true, profesional: true },
    { feature: "Tu ficha de Google optimizada", basico: true, intermedio: true, profesional: true },
    { feature: "📊 Tu analista digital", basico: true, intermedio: true, profesional: true },
    { feature: "👁️ Tu vigilante de reputación", basico: false, intermedio: true, profesional: true },
    { feature: "✍️ Tu community manager", basico: false, intermedio: true, profesional: true },
    { feature: "💌 Tu vendedor de fidelización", basico: false, intermedio: true, profesional: true },
    { feature: "💬 Tu recepcionista WhatsApp 24/7", basico: false, intermedio: false, profesional: true },
    { feature: "Reunión Zoom mensual contigo", basico: false, intermedio: false, profesional: true },
    { feature: "Actualizaciones de contenido", basico: "—", intermedio: "2/mes", profesional: "4/mes" },
    { feature: "Soporte por chat (IA + humano si es crítico)", basico: true, intermedio: true, profesional: true },
    { feature: "Soporte humano dedicado (lun-vie 8h)", basico: false, intermedio: false, profesional: true },
  ],
};

export type EmpleadoDigital = {
  emoji: string;
  rol: string;
  nombre: string;
  descripcion: string;
  precio: string;
  tiempoTuyo: string;
  setup: string;
  paraQuien: string;
  destacado?: boolean;
};

export const EMPLEADOS_DIGITALES: EmpleadoDigital[] = [
  {
    emoji: "📊",
    rol: "Tu analista digital",
    nombre: "Tu Reporte Semanal",
    descripcion: "Cada lunes te llega un mensaje con cómo te fue la semana: visitas, llamadas, búsquedas. Si pasa algo raro, te alerta de inmediato.",
    precio: "180.000",
    tiempoTuyo: "~0",
    setup: "3-5 días",
    paraQuien: "Quien invierte en marketing y quiere saber si funciona",
  },
  {
    emoji: "👁️",
    rol: "Tu vigilante de reputación",
    nombre: "Guardián de Reseñas",
    descripcion: "Vigila 24/7 tus reseñas en Google, Facebook y TripAdvisor. Responde solo las buenas, te avisa de las malas en menos de 5 minutos.",
    precio: "250.000",
    tiempoTuyo: "30 min",
    setup: "5-7 días",
    paraQuien: "Restaurantes, hoteles, clínicas, peluquerías",
  },
  {
    emoji: "✍️",
    rol: "Tu community manager",
    nombre: "Creador de Contenido",
    descripcion: "Cada lunes te entrega 3 publicaciones listas para esa semana. Tú apruebas con un clic y se publican solas en Instagram y Facebook.",
    precio: "480.000",
    tiempoTuyo: "1 h",
    setup: "7-10 días",
    paraQuien: "Negocios que tienen que publicar y no lo hacen",
  },
  {
    emoji: "💌",
    rol: "Tu vendedor de fidelización",
    nombre: "Recuperador de Clientes",
    descripcion: "Detecta clientes que no te compran hace 60-180 días y arma campañas personalizadas por WhatsApp o correo para reactivarlos.",
    precio: "420.000",
    tiempoTuyo: "1 h",
    setup: "10-14 días",
    paraQuien: "Servicios recurrentes con base de clientes",
  },
  {
    emoji: "💬",
    rol: "Tu recepcionista digital",
    nombre: "Asistente WhatsApp",
    descripcion: "Contesta tu WhatsApp 24/7. Responde preguntas, agenda citas, te avisa solo cuando hay que entrar tú (queja o venta caliente).",
    precio: "750.000",
    tiempoTuyo: "1.5 h",
    setup: "14-21 días",
    paraQuien: "Negocios que pierden ventas por no contestar a tiempo",
    destacado: true,
  },
];

export const DOLORES = [
  {
    n: "01",
    titulo: "Estás perdiendo clientes que ni siquiera sabes que existen",
    desc: "Mientras lees esto, alguien busca lo que vendes en Google y aterriza en la web de tu competencia. Sin presencia digital sólida, eres invisible.",
    metric: "73%",
    metricLabel: "de las búsquedas locales no pasan de la primera página",
  },
  {
    n: "02",
    titulo: "Las agencias te cobran caro y entregan poco",
    desc: "Reportes de 40 páginas, jerga inflada y resultados que no se notan en el banco. Pagaste por horas, no por crecimiento. Suena familiar.",
    metric: "$15M",
    metricLabel: "promedio gastado en agencias antes de venir con nosotros",
  },
  {
    n: "03",
    titulo: "Sabes que IA es importante. No sabes qué hacer con eso.",
    desc: "Lees titulares todos los días. Tu sobrino te explicó ChatGPT. Pero nadie te dice cómo aplicar IA a tu PyME sin contratar a un equipo de ingenieros.",
    metric: "0",
    metricLabel: "líneas de código que vas a tener que escribir",
  },
];

export const PROCESO = [
  { n: "01", fase: "Diagnóstico", duracion: "Semana 1", desc: "Score Digital + entrevista. Mapeamos dónde estás y dónde podrías estar." },
  { n: "02", fase: "Plan", duracion: "Semana 2", desc: "Hoja de ruta priorizada. Quick-wins primero, palancas grandes después." },
  { n: "03", fase: "Implementación", duracion: "Semanas 3–10", desc: "Construimos. Tú revisas. Iteramos. Sin sorpresas en factura." },
  { n: "04", fase: "Optimización", duracion: "Continuo", desc: "Métricas mensuales, ajustes, expansión. Crecimiento como práctica, no como evento." },
];

export const MANIFIESTO = [
  { n: "01", titulo: "Puentes, no muros.", desc: "El sector pone muros: jerga, lock-in, contratos eternos, precios opacos, herramientas que no hablan entre sí. Nosotros construimos puentes — entre tu negocio y lo que la IA puede hacer hoy, entre tus canales, entre lo que vendes y cómo decides. La X de eXcalando es ese cruce." },
  { n: "02", titulo: "No vendemos horas. Vendemos resultados.", desc: "El precio se ata a lo que mueve tu negocio, no a cuántas reuniones tuvimos. Si no movemos la aguja, no facturamos." },
  { n: "03", titulo: "Tu infraestructura. Cero lock-in.", desc: "Todo corre en servidores que tú controlas. Sin SaaS que te suban el precio. Sin datos atrapados en herramientas ajenas. Te vas cuando quieras y te llevas todo funcionando." },
  { n: "04", titulo: "30–90 días o nada.", desc: "Si no ves resultados medibles en máximo 90 días, algo está mal y lo arreglamos. Sin contratos eternos." },
  { n: "05", titulo: "Hablamos como humanos, no como agencia.", desc: "Cero jerga inflada, cero reportes-relleno. Una llamada al mes con números reales y decisiones claras." },
];

export type Capa = {
  id: "cara" | "voz" | "motor" | "inteligencia";
  emoji: string;
  nombre: string;
  subtitulo: string;
  desc: string;
  servicios: string[];
  href: string;
  precio: string;
  destacado?: boolean;
  futuro?: boolean;
};

export const CAPAS: Capa[] = [
  {
    id: "cara",
    emoji: "🌐",
    nombre: "Presencia Digital",
    subtitulo: "Cómo te ven",
    desc: "Tu presencia pública. Lo que la gente ve cuando te busca en Google, te entra al sitio o lee tus reseñas. Sin esto, no te encuentran.",
    servicios: [
      "Página web profesional",
      "Ficha de Google optimizada",
      "Reportes semanales de tráfico",
      "Vigilante de reseñas 24/7",
      "Community manager IA (redes sociales)",
    ],
    precio: "Desde $290K/mes",
    href: "#presencia-digital",
    destacado: true,
  },
  {
    id: "voz",
    emoji: "💬",
    nombre: "Canales Digitales",
    subtitulo: "Cómo te hablan",
    desc: "La conversación con quien te encontró. Tu WhatsApp atendido 24/7. Tu email respondido. Tus clientes inactivos reactivados. Sin esto, lo que te encuentra se enfría.",
    servicios: [
      "Recepcionista WhatsApp 24/7",
      "Vendedor de fidelización",
      "Asistentes que conversan como humanos",
      "Email automation (próximamente)",
      "Multi-canal omnicanal (próximamente)",
    ],
    precio: "Desde $180K/mes",
    href: "#empleados-digitales",
  },
  {
    id: "motor",
    emoji: "⚙️",
    nombre: "Operación",
    subtitulo: "Cómo trabajas",
    desc: "Lo que pasa atrás. Tus herramientas conectadas para que la información viaje sola. Tareas repetitivas que dejan de existir. Sin esto, escalar te rompe.",
    servicios: [
      "Automatización a medida",
      "Integración entre sistemas",
      "Flujos de pedidos automáticos",
      "Cotización → contrato sin tocar nada",
      "Mantenimiento incluido (opcional)",
    ],
    precio: "Desde $800K por proyecto",
    href: "#automatizacion",
  },
  {
    id: "inteligencia",
    emoji: "📊",
    nombre: "Inteligencia",
    subtitulo: "Cómo decides",
    desc: "El cerebro transversal. Dashboards que te dicen qué hacer. Datos que se vuelven decisiones. Esta capa cruza las otras tres y las hace crecer juntas.",
    servicios: [
      "Dashboards en tiempo real",
      "Calificación automática de leads",
      "Reportes mensuales automáticos",
      "Alertas inteligentes por canal",
      "Decisiones con datos, no a ojo",
    ],
    precio: "Incluido en Paquetes Integrales",
    href: "#capas",
    futuro: true,
  },
];

export const FAQS = [
  { q: "¿Cuánto cuesta implementar IA en una PyME?", a: "Depende del alcance. Una atención automatizada de WhatsApp completa para una PyME colombiana arranca con setup desde $1.5M y mensualidad desde $290.000. Los costos de infraestructura (servidor, licencias) son típicamente menos de $200.000/mes adicionales. En el Score Digital te damos una estimación según tu caso, gratis." },
  { q: "¿Cuál es la diferencia entre un chatbot y un asistente con IA?", a: "Un chatbot tradicional sigue un árbol de decisiones: si el cliente dice A, responde B. Si pregunta algo no previsto, se traba. Un asistente con IA entiende el contexto, conecta información de tu negocio, agenda, escala a humano cuando hace falta y aprende. La diferencia es como comparar un menú de teléfono con una recepcionista entrenada." },
  { q: "¿Vale la pena automatizar WhatsApp con IA en mi negocio?", a: "Si recibes más de 30 mensajes al día con preguntas repetidas (precios, horarios, disponibilidad, agendamientos), sí. La atención automatizada libera al equipo humano de lo repetitivo y solo te escala lo importante. ROI típico en 3–6 meses. Si tu volumen es menor o tus consultas son muy técnicas/personalizadas, te lo decimos honestamente en el Score." },
  { q: "¿Cuánto tiempo toma ver resultados?", a: "Quick-wins entre 30 y 45 días (mejoras de conversión, automatizaciones que te devuelven horas). Resultados estructurales (SEO, captación) en 60–90 días. Si pasados 90 días no ves números mejor, revisamos contigo sin costo." },
  { q: "¿Por qué dicen 'sin lock-in'?", a: "Todo lo que construimos corre en infraestructura que tú controlas — herramientas de código abierto sobre tu propio servidor. Si mañana decides irte, te entregamos accesos, documentación y se acabó. No retenemos tu data ni tus flujos. Te llevas todo funcionando, no fragmentos." },
  { q: "Mi PyME es muy pequeña / muy específica. ¿Aplica?", a: "Trabajamos con PyMEs de 5 a 50 empleados en servicios profesionales, retail, salud, transporte, comercio y manufactura. Si tu modelo no encaja, te lo decimos en el Score Digital y te recomendamos a alguien que sí." },
  { q: "¿Necesito saber de tecnología?", a: "No. De hecho, la mayoría de nuestros clientes no son técnicos. Nuestro trabajo es traducir IA y automatización a decisiones de negocio. Tú decides qué construir; nosotros lo hacemos y te entregamos en un lenguaje que entiendes." },
  { q: "¿Cómo se compara con contratar in-house?", a: "Un equipo in-house (desarrollador + diseñador + experto IA) te cuesta entre $20M y $40M mensuales y tarda 6 meses en arrancar. Nosotros entregamos el primer resultado en 30 días por una fracción. Cuando crezcas y quieras internalizar, te ayudamos con el traspaso." },
  { q: "¿Y si la IA le dice algo absurdo a un cliente?", a: "Por eso hay traspaso a humano siempre disponible, reglas específicas por industria y revisión periódica de conversaciones. La IA no opera sin red — siempre puedes intervenir en vivo desde el panel. Y todo queda auditable." },
];

export const CASOS = [
  { sector: "Servicios B2B", metrica: "+312%", label: "leads calificados", quote: "En 60 días pasamos de 8 leads/mes a más de 30. Y mejor calificados.", autor: "CEO · Bogotá", logo: "MR" },
  { sector: "Retail / Beauty", metrica: "−18h", label: "por semana en atención", quote: "El asistente de WhatsApp responde el 70% antes de que llegue al equipo.", autor: "Fundadora · Medellín", logo: "VS" },
  { sector: "Inmobiliario", metrica: "4.2x", label: "ROI en 90 días", quote: "Por fin entiendo qué está funcionando y qué no. Reportes en una pantalla.", autor: "Gerente · Cali", logo: "AC" },
];

export const LOGOS = [
  { m: "MR", n: "Marca Real" },
  { m: "VS", n: "Vélez Style" },
  { m: "AC", n: "AndesCasa" },
  { m: "TQ", n: "Téquerè" },
  { m: "OL", n: "Olivos&Co" },
  { m: "ZN", n: "Zona Norte" },
];
