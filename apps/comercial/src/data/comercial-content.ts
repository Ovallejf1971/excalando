// Contenido del pitch comercial eXcalando.
// Fuente de verdad de TODO el copy. Editar acá, no en componentes.

export const META = {
  lema: "Construimos puentes donde los demás hacen muros.",
  sublema: "Capacidades digitales con IA.",
};

// 01 — Problema con los 3 datos firmados (CEPAL, Confecámaras, etc.)
export const DOLORES = [
  {
    metrica: "92%",
    contexto: "de las ventas en PyMEs LATAM",
    impacto: "todavía pasa por el mostrador, el voz-a-voz o la suerte.",
    fuente: "CEPAL · Cámara Colombiana de Comercio Electrónico, 2025",
  },
  {
    metrica: "$5.000 USD",
    contexto: "es lo que pierde al mes",
    impacto: "una PyME promedio por procesos manuales que ya podrían estar automatizados.",
    fuente: "Microsoft Work Trend Index LATAM, 2024",
  },
  {
    metrica: "8 de cada 10",
    contexto: "dueños de PyME dicen que su tecnología",
    impacto: "los frena más de lo que los ayuda.",
    fuente: "SAP SMB Insights, 2024",
  },
];

// 02 — Para quién es esto (anti-persona explícita es parte del pitch)
export const AUDIENCIA = {
  paraTi: [
    "Sos dueño/operador de una PyME entre 5 y 50 empleados",
    "Sabés que el mundo digital es importante pero no sabés por dónde empezar",
    "Lo que tenés hoy (web, redes, WhatsApp) no te funciona como debería",
    "Querés delegar la operación digital, no aprender otra herramienta más",
  ],
  noEsParaTi: [
    "Empresa grande (>200 empleados) con equipo de IT propio",
    "Buscás el precio más bajo del mercado, no la mejor solución",
    "Querés control técnico al 100% sin delegar nada",
    "Esperás resultados milagrosos en menos de 30 días",
  ],
};

// 03 — Las 4 capacidades en lenguaje cliente
export const CAPAS = [
  {
    n: "01",
    nombre: "Cómo te ven",
    titulo: "Presencia Digital",
    descripcion: "Tu web, tus redes, tu ficha de Google. Lo primero que aparece cuando alguien busca tu nombre. Si esto está descuidado, el cliente decide antes de hablarte.",
    entregables: [
      "Sitio web con dominio propio, hosting incluido",
      "Ficha de Google My Business optimizada",
      "SEO local básico para que aparezcas en tu zona",
      "Email profesional @tudominio",
    ],
  },
  {
    n: "02",
    nombre: "Cómo te hablan",
    titulo: "Canales Digitales",
    descripcion: "El WhatsApp, el chat de tu web, los DMs. La velocidad de respuesta es donde se gana o se pierde el negocio. Hoy esto puede pasar 24/7 sin un humano contestando.",
    entregables: [
      "WhatsApp Business profesional conectado a tu equipo",
      "Instagram y Facebook respondiendo desde un mismo lugar",
      "Formulario web que llega directo, no a un correo perdido",
      "Mensajes fuera de horario que no dejan al cliente colgado",
    ],
  },
  {
    n: "03",
    nombre: "Cómo trabajas",
    titulo: "Operación",
    descripcion: "Los procesos repetitivos de adentro: cotizar, facturar, agendar, recordar, despachar. Cada paso candidato a no hacerse a mano nunca más.",
    entregables: [
      "Reservas y agendamiento automático",
      "Cobros con link de pago integrado",
      "Notificaciones automáticas a tu equipo",
      "Reportes semanales por email sin que tengas que abrir nada",
    ],
  },
  {
    n: "04",
    nombre: "Cómo decides",
    titulo: "Inteligencia",
    descripcion: "Los datos que ya tenés pero no estás mirando. Cuánto vendés, qué cliente vuelve, qué producto se mueve, qué mes se cae. Decidir con esto cambia el negocio.",
    entregables: [
      "Recepcionista WhatsApp 24/7 que responde y agenda",
      "Vendedor de fidelización a tu base de clientes existente",
      "Vigilante de reputación que alerta reseñas",
      "Asistente de contenido que prepara borradores para tus redes",
    ],
  },
];

// 04 — Proceso (versión cliente del pipeline 5 etapas)
export const PROCESO = [
  {
    n: "01",
    nombre: "Diagnóstico",
    duracion: "3 a 5 días",
    descripcion: "Empezamos con el Score Digital gratuito. En una reunión de 30 minutos te entregamos un reporte: qué tenés, qué te falta, cuáles 3 dolores atacamos primero.",
    entregable: "Reporte de hallazgos + propuesta económica",
  },
  {
    n: "02",
    nombre: "Diseño",
    duracion: "5 a 7 días",
    descripcion: "Diseñamos contigo el plan completo: qué se construye en cada una de las 4 capas, qué herramientas se conectan, en qué orden. Lo firmás antes de cualquier código.",
    entregable: "BluePrint del proyecto",
  },
  {
    n: "03",
    nombre: "Construcción",
    duracion: "10 a 30 días",
    descripcion: "Levantamos todo en paralelo. Vos ves el avance desde el día 14 en un entorno de pruebas. Sin sorpresas al final.",
    entregable: "Tu sistema operando en pruebas",
  },
  {
    n: "04",
    nombre: "Puesta en marcha",
    duracion: "3 a 5 días",
    descripcion: "Migramos todo a producción. Te capacitamos a vos y a quien designes para operarlo día a día. Documento personalizado de cómo usar cada cosa.",
    entregable: "Tu sistema en vivo + guía de uso",
  },
  {
    n: "05",
    nombre: "Operación continua",
    duracion: "Mes a mes",
    descripcion: "Reportes automáticos cada lunes. Mantenimiento incluido. Reunión mensual si vos lo querés. Sin contratos largos.",
    entregable: "Soporte mensual + mejoras continuas",
  },
];

// 05 — Diferenciadores
export const DIFERENCIADORES = [
  {
    titulo: "Las 4 capas integradas, no sueltas",
    detalle: "La mayoría vende una sola (solo web, o solo chatbot, o solo redes). Acá todo conecta entre sí desde el primer día.",
  },
  {
    titulo: "Cero lock-in",
    detalle: "Si algún día te querés ir, te llevás todo funcionando. Te entregamos accesos, dump de tu base de datos, y configuraciones. Ningún proveedor te tiene secuestrado.",
  },
  {
    titulo: "Cobramos por valor, no por hora",
    detalle: "El precio está atado al resultado, no a cuántas reuniones tuvimos. Sabés lo que pagás antes de empezar.",
  },
  {
    titulo: "Sin penalidad de salida",
    detalle: "Te sugerimos un compromiso de 6 meses para ver resultados. No es contractual. Salís cuando quieras con 30 días de aviso.",
  },
  {
    titulo: "Operamos con lo mismo que vendemos",
    detalle: "Los agentes IA que respondes nuestro WhatsApp, los reportes que recibimos, el manejo de leads — todo corre sobre la misma tecnología que te ofrecemos. Si no nos sirviera, no te la venderíamos.",
  },
  {
    titulo: "Diagnóstico gratis",
    detalle: "Antes de pagar un peso, hacés el Score Digital y recibís un reporte concreto. Ves el valor antes de comprar.",
  },
  {
    titulo: "Garantía de 30 a 90 días o lo arreglamos",
    detalle: "Si en 90 días no hay resultados medibles, lo arreglamos sin costo extra. Sin letra chica.",
  },
];

// 06 — Precios (en rangos, "desde")
export const PRECIOS = {
  intro: "Trabajamos con un setup inicial fijo y mensualidad. Los rangos cubren PyMEs con distintas necesidades. El precio exacto depende del diagnóstico.",
  setup: {
    label: "Setup inicial",
    rango: "desde $1.5M COP",
    nota: "Pago único al firmar. Cubre toda la construcción.",
  },
  tiers: [
    {
      nombre: "Básico",
      perfil: "Empieza por estar visible",
      mensualidad: "desde $290K/mes",
      incluye: [
        "Sitio + dominio + hosting",
        "Ficha Google optimizada",
        "Reportes mensuales automáticos",
        "Mantenimiento incluido",
      ],
    },
    {
      nombre: "Intermedio",
      perfil: "Visible + activo",
      mensualidad: "desde $790K/mes",
      destacado: true,
      incluye: [
        "Todo lo del Básico",
        "WhatsApp Business + chat web conectados",
        "Manejo de reseñas asistido",
        "Community manager IA (drafts para tus redes)",
        "Fidelización a tu base de clientes",
      ],
    },
    {
      nombre: "Profesional",
      perfil: "Todo cubierto",
      mensualidad: "desde $1.59M/mes",
      incluye: [
        "Todo lo del Intermedio",
        "Recepcionista WhatsApp 24/7 con IA",
        "Automatización a medida de tus procesos",
        "Reunión mensual de revisión estratégica",
        "Soporte prioritario",
      ],
    },
  ],
  servicios: {
    label: "Servicios sueltos",
    nota: "Si solo necesitás una pieza, también se puede armar a la medida. Conversemos.",
  },
};

// 07 — Garantía y compromisos
export const GARANTIA = {
  titulo: "30 a 90 días o lo arreglamos",
  detalle: "Si al día 90 de operación no hay resultados medibles según lo que firmamos en el diagnóstico, lo arreglamos sin costo extra hasta que sí los haya. O te devolvemos el setup proporcional. Sin letra chica.",
  compromisos: [
    "Sin lock-in técnico — te podés llevar todo funcionando",
    "Sin penalidad de salida — el compromiso es de palabra, no de contrato",
    "Sin sorpresas en factura — lo que firmás es lo que pagás",
    "Reuniones de progreso semanales durante construcción",
  ],
};

// 08 — Próximo paso
export const SIGUIENTE_PASO = {
  titulo: "¿Cómo arranca esto?",
  pasos: [
    {
      n: "01",
      accion: "Hacé el Score Digital (gratis, 5 min)",
      descripcion: "Es un cuestionario inteligente que te entrega un reporte de en qué frentes estás bien y en cuáles tenés oportunidad. Hecho para vos, no para nosotros.",
      cta: { label: "Hacer el Score", href: "https://excalando.com/score" },
    },
    {
      n: "02",
      accion: "Reunión de 30 minutos",
      descripcion: "Repasamos juntos el reporte, te muestro casos similares al tuyo, y vemos si tiene sentido seguir. Si no, te quedás con el reporte y listo — sin costo.",
      cta: { label: "Agendar reunión", href: "https://wa.me/573001234567?text=Hola%2C%20vi%20el%20pitch%20de%20eXcalando%20y%20quiero%20agendar%20una%20reunión" },
    },
    {
      n: "03",
      accion: "Propuesta firme",
      descripcion: "Si seguimos, te entrego una propuesta con alcance, plazos y precio. La firmás o no — sin presiones.",
    },
  ],
};

// 09 — FAQ comercial (preguntas duras esperadas)
export const FAQS = [
  {
    pregunta: "¿En cuánto tiempo veo resultados?",
    respuesta:
      "Las primeras señales (más conversaciones respondidas, mejor presencia, automatizaciones funcionando) las ves entre la semana 4 y 6. Resultados de negocio medibles (más leads, mejor conversión, menos tiempo en operativo) entre el día 60 y 90. Nuestra garantía de 90 días aplica acá.",
  },
  {
    pregunta: "¿Qué pasa si quiero terminar el servicio?",
    respuesta:
      "Tres cosas. Una: avisás con 30 días. Dos: te entregamos todo funcionando — dump de tu base de datos, accesos a tus integraciones, manual de operación. Tres: si te llevás equipo técnico propio, sigue funcionando. No tenemos forma de 'apagarte el servicio' como represalia.",
  },
  {
    pregunta: "¿Y si soy muy chico/grande para esto?",
    respuesta:
      "Si tenés menos de 5 empleados probablemente no estás listo todavía — el ROI no compensa la complejidad. Si tenés más de 200 ya necesitás soluciones más grandes que las nuestras. Para PyMEs entre 5 y 50 empleados es donde más valor entregamos.",
  },
  {
    pregunta: "¿Por qué cobran setup + mensualidad y no solo mensualidad?",
    respuesta:
      "El setup cubre lo que se construye una sola vez: arquitectura, integraciones, capacitación, contenido inicial. La mensualidad cubre operación continua, mantenimiento, mejoras. Mezclarlas terminaría pagando dos veces lo mismo, o cobrándote más alto la mensualidad para compensar. Preferimos transparencia.",
  },
  {
    pregunta: "¿Usan inteligencia artificial?",
    respuesta:
      "Sí, pero la IA no es lo que vendemos. Vendemos resultados — WhatsApp que responde solo, reportes que llegan sin que los pidas, procesos que se hacen sin que un humano los arrastre. La IA es el cómo, no el qué. Y siempre con supervisión humana en lo que importa.",
  },
  {
    pregunta: "¿Mi información está segura?",
    respuesta:
      "Sí. Todo corre en infraestructura propia que controlamos nosotros, no en servicios de terceros donde tus datos se mezclan con los de otros. Vos sos responsable de los datos de tus clientes; nosotros somos encargados del tratamiento. Firmamos NDA si lo necesitás.",
  },
  {
    pregunta: "¿Trabajan en mi sector?",
    respuesta:
      "Las 4 capacidades son transversales — funcionan igual para una clínica dental, un restaurante, una consultoría o un retail. Lo que cambia es el copy, los flujos de conversación, los reportes. Eso lo configuramos para tu sector en el diseño.",
  },
];
