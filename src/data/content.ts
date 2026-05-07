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
  { n: "01", titulo: "No vendemos horas. Vendemos resultados.", desc: "El precio se ata a lo que mueve tu negocio, no a cuántas reuniones tuvimos. Si no movemos la aguja, no facturamos." },
  { n: "02", titulo: "Stack propio. Cero lock-in.", desc: "Chatwoot, n8n, Evolution API, Claude/GPT — todo self-hosted bajo tu control. Te vas cuando quieras y te llevas todo." },
  { n: "03", titulo: "30–90 días o nada.", desc: "Si no ves resultados medibles en máximo 90 días, algo está mal y lo arreglamos. Sin contratos eternos." },
  { n: "04", titulo: "Hablamos como humanos, no como agencia.", desc: "Cero jerga inflada, cero reportes-relleno. Una llamada al mes con números reales y decisiones claras." },
];

export const FAQS = [
  { q: "¿Cuánto tiempo toma ver resultados?", a: "Quick-wins entre 30 y 45 días (mejoras de conversión, automatizaciones que te devuelven horas). Resultados estructurales (SEO, captación) en 60–90 días. Si pasados 90 días no ves números mejor, revisamos contigo sin costo." },
  { q: "¿Por qué dicen 'sin lock-in'?", a: "Todo lo que construimos corre en infraestructura que tú controlas (Chatwoot, n8n, Evolution API son open-source y self-hosted). Si mañana decides irte, te entregamos accesos, documentación y se acabó. No retenemos tu data ni tus flujos." },
  { q: "Mi PyME es muy pequeña / muy específica. ¿Aplica?", a: "Trabajamos con PyMEs de 5 a 50 empleados en sectores variados (servicios profesionales, retail, salud, educación, inmobiliario). Si tu modelo no encaja, te lo decimos en el Score Digital y te recomendamos a alguien que sí." },
  { q: "¿Necesito saber de tecnología?", a: "No. De hecho, la mayoría de nuestros clientes no son técnicos. Nuestro trabajo es traducir 'IA y automatización' a decisiones de negocio. Tú decides qué construir; nosotros lo hacemos." },
  { q: "¿Cómo se compara con contratar in-house?", a: "Un equipo in-house (dev + diseño + IA) te cuesta entre $20M y $40M mensuales y tarda 6 meses en arrancar. Nosotros entregamos el primer entregable en 30 días por una fracción. Cuando crezcas y quieras internalizar, te ayudamos con el handoff." },
  { q: "¿Y si la IA dice algo absurdo a un cliente?", a: "Por eso hay hand-off humano siempre disponible, guardrails específicos por industria y revisión periódica de conversaciones. La IA no opera sin red. Y todo queda auditable." },
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
