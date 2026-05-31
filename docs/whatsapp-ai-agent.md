---
title: WhatsApp AI Agent
description: Agente recepcionista WhatsApp 24/7.
---

# WhatsApp AI Agent — eXcalando

**Documento de diseño técnico y operacional**
Última actualización: 2026-05-05 (post decisiones estratégicas)
Owner: Javier Ovalle

> Las decisiones de configuración (LLM, modo de operación, alertas, temas no-IA, etc.)
> están consolidadas en [decisiones-estrategicas-2026-05-05.md](./decisiones-estrategicas-2026-05-05.md).
> Si hay diferencia entre este doc y ese, **el de decisiones gana**.

---

## 1. Visión

El agente de WhatsApp de eXcalando tiene tres roles simultáneos:

1. **Comercial** — califica leads, responde preguntas, empuja a agendar
2. **Soporte** — atiende clientes existentes con dudas operativas
3. **Demo viva** — el cliente experimenta el producto que va a comprar antes de comprarlo

> "Si nuestra agencia se atiende sola con IA y vos lo experimentás como cliente, no necesitás que te vendamos el servicio: ya lo viviste."

---

## 2. Arquitectura técnica

```
┌──────────────┐
│   WhatsApp   │  ← cliente envía mensaje
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Evolution API │  (gateway, ya instalado en VPS)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Chatwoot   │  ← cola visible para humanos, source of truth de conversaciones
└──────┬───────┘
       │ webhook
       ▼
┌──────────────────────────────────────────────────────────────┐
│                          n8n                                 │
│                                                              │
│  ┌─────────────────────┐      ┌──────────────────────────┐  │
│  │ Agente Analizador   │      │ Agente Conversacional    │  │
│  │ (Claude paralelo)   │      │ (Claude principal)       │  │
│  │ → sentiment         │      │ → respuesta al cliente   │  │
│  │ → intent            │      │ → usa tools (RAG, etc.)  │  │
│  │ → flags             │      │                          │  │
│  │ → opportunity_score │      │                          │  │
│  └──────────┬──────────┘      └──────────────┬───────────┘  │
│             │                                │              │
└─────────────┼────────────────────────────────┼──────────────┘
              │                                │
              ▼                                ▼
       ┌──────────────┐               ┌────────────────┐
       │   Postgres   │               │   Chatwoot     │
       │              │               │   (respuesta   │
       │ - conversa-  │               │    al cliente) │
       │   ciones     │               └────────────────┘
       │ - mensajes_  │                       │
       │   analisis   │                       │
       │ - alertas    │                       ▼
       │ - oportuni-  │               ┌────────────────┐
       │   dades      │               │  Evolution API │
       │ - kb_*       │               │   → WhatsApp   │
       └──────┬───────┘               └────────────────┘
              │
              ▼
       ┌──────────────┐
       │   Metabase   │  ← dashboards (sentiment, oportunidades, etc.)
       └──────────────┘

       Si flag crítico:
              │
              ▼
       ┌──────────────┐
       │ Telegram /   │  ← alerta inmediata a Javier
       │ WhatsApp Bot │
       └──────────────┘
```

### Componentes y su rol

| Componente | Estado actual | Función |
|---|---|---|
| Evolution API | ✅ corriendo | Gateway WhatsApp (envío y recepción) |
| Chatwoot | ✅ corriendo | UI para humanos, registro central de conversaciones |
| n8n | ✅ corriendo | Orquestador de los workflows (Conversacional + Analizador) |
| Postgres | ✅ corriendo | Persistencia: conversaciones, análisis, alertas, knowledge base |
| Claude API | ⏳ falta API key | Cerebro de los agentes |
| pgvector | ⏳ instalar extensión | Vector search para RAG |
| Metabase | ⏳ instalar | Dashboards de observabilidad |

---

## 3. Personalidad del agente

### Tono y estilo

- **Profesional pero cercano.** Tutea ("vos" en Colombia).
- **Directo.** Sin jerga inflada. Si algo es complicado, lo explica simple.
- **Honesto.** Si no sabe algo, lo dice y escala.
- **Empático.** Si detecta frustración, baja el tono y valida antes de proponer.
- **WhatsApp friendly.** Mensajes cortos (3-4 líneas máx), oraciones simples, emojis con moderación (1-2 por respuesta, nunca más).
- **Humanizado.** Pausa artificial de 3-8 segundos antes de responder (no se lee bot que responde en 0.5s).

### Identidad

- Se presenta como "el asistente de eXcalando" (NO como "Javier" o como humano).
- Si pregunta directamente "¿sos un bot?" → responde con honestidad: *"Sí, soy un asistente IA del equipo de eXcalando. Pero detrás hay personas reales que intervienen cuando hace falta. ¿En qué te puedo ayudar?"*

---

## 4. Qué hace y qué NO hace el agente

### ✅ HACE solo (sin pedir permiso)

- Responder preguntas del catálogo (servicios, precios públicos, tiempos, proceso)
- Calificar leads (3-5 preguntas estratégicas para entender necesidad)
- Mandar el link al Score Digital
- Agendar reuniones de 30 min vía Cal.com
- Mandar links del sitio (servicios, casos)
- Confirmar disponibilidad para llamada

### 🚫 NO HACE (escala a humano) — confirmado 2026-05-05

Temas **siempre** escalados a humano, sin importar la fase de operación:

- 🚫 **Precios negociados** — descuentos, paquetes a medida, condiciones especiales
- 🚫 **Contratos** — cláusulas, NDAs, términos legales
- 🚫 **Refunds** — devoluciones, cancelaciones de servicios pagos, disputas
- 🚫 **Casos legales** — menciones de abogados, denuncias, demandas, tutelas

Adicionalmente, no debe:
- **Comprometer fechas exactas** ("entregamos el 15") — siempre rangos aproximados
- **Hablar mal de competencia** o compararse en detalle
- **Inventar información** no presente en el knowledge base
- **Cerrar ventas** de paquetes integrales (>$5M COP) — siempre vía humano
- **Aceptar quejas formales** o reclamos

### 🚨 ESCALACIÓN INMEDIATA A HUMANO

| Disparador | Acción |
|---|---|
| Cliente escribe: "humano", "persona", "alguien real", "tu jefe", "el dueño" | Pausa, manda mensaje "Te paso con Javier en un toque" + alerta |
| Lenguaje agresivo / groserías | Pausa, mensaje empático, alerta crítica |
| Menciones: "demanda", "denuncia", "estafa", "fraude", "abogado" | Pausa, mensaje "Te paso con un humano de inmediato" + alerta crítica |
| Preguntas legales / contractuales | Pausa, "Esa duda la responde Javier directo" + alerta |
| Sentiment < -0.5 en 2 mensajes seguidos | Pausa después de 2do, alerta a Javier |

---

## 5. Knowledge Base (KB)

El agente NO inventa info. Para cada pregunta consulta su KB en Postgres con búsqueda semántica (pgvector).

### Tablas

```sql
-- 5 servicios del catálogo
CREATE TABLE kb_servicios (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,        -- 'score_digital', 'presencia', 'asistentes_ia', etc.
  nombre TEXT NOT NULL,
  descripcion_corta TEXT,            -- 1 oración
  descripcion_larga TEXT,            -- 2-3 párrafos
  precio_setup TEXT,                 -- "desde $2.5M COP"
  precio_recurrente TEXT,            -- "desde $500K/mes"
  tiempo_entrega TEXT,               -- "30-45 días"
  entregables TEXT[],                -- lista de qué recibe el cliente
  casos_uso TEXT[],                  -- ["fitness", "servicios pro", "retail"]
  prerequisitos TEXT[],              -- "tener Google Business activo", etc.
  embedding VECTOR(1536),            -- para semantic search
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- FAQ — preguntas frecuentes
CREATE TABLE kb_faq (
  id SERIAL PRIMARY KEY,
  pregunta TEXT NOT NULL,
  respuesta TEXT NOT NULL,
  categoria TEXT,                    -- 'precios', 'entregables', 'proceso', 'tecnico', 'general'
  embedding VECTOR(1536),
  veces_consultado INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Política de la empresa (cómo trabajamos)
CREATE TABLE kb_politicas (
  id SERIAL PRIMARY KEY,
  topic TEXT,                        -- 'pago', 'entregas', 'modificaciones', 'garantia', 'soporte'
  contenido TEXT,
  embedding VECTOR(1536),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Casos de éxito (cuando existan)
CREATE TABLE kb_casos (
  id SERIAL PRIMARY KEY,
  cliente_nombre TEXT,
  sector TEXT,                       -- 'fitness', 'salud', 'retail', etc.
  problema TEXT,
  solucion TEXT,                     -- qué servicio le aplicaron
  resultado TEXT,                    -- métrica concreta
  duracion TEXT,                     -- "60 días"
  publicable BOOL DEFAULT FALSE,     -- si se puede mencionar el nombre
  embedding VECTOR(1536),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Cómo se actualiza la KB

- **Manualmente** vía pgAdmin o un panel admin que armemos
- **Cuando se cierra una conversación con info nueva**: el agente sugiere "esto debería estar en el FAQ"
- **Cuando cambian precios o servicios**: actualizá `kb_servicios` y se propaga a todos los agentes

### Tools que el agente puede llamar

```typescript
// Pseudocódigo de las herramientas que invoca el agente
{
  consultar_servicios(query: string): Servicio[]
  // → vector search en kb_servicios, devuelve top 3 servicios relevantes

  consultar_faq(query: string): FAQ[]
  // → vector search en kb_faq, devuelve top 3 FAQs relevantes

  consultar_politica(topic: string): string
  // → busca por tópico exacto en kb_politicas

  agendar_reunion(fecha_preferida: string, motivo: string): { url: string, slot: string }
  // → consulta Cal.com API y devuelve link de agendamiento

  registrar_oportunidad(tipo: string, descripcion: string, valor_estimado: number): void
  // → INSERT en oportunidades

  escalar_a_humano(motivo: string, urgencia: 'alta' | 'media'): void
  // → marca conversación en Chatwoot + alerta a Javier
}
```

---

## 6. Prompts maestros

### Agente Conversacional (system prompt)

```
Sos el asistente de eXcalando, una agencia de capacidades digitales con IA en Colombia.
Atendés WhatsApp de PyMEs (5-50 empleados, dueños 35-55 años, no técnicos).

IDENTIDAD
- Te presentás como "el asistente de eXcalando".
- Si preguntan "¿sos un bot?": "Sí, soy un asistente IA del equipo. Detrás hay personas
  reales que intervienen cuando hace falta. ¿En qué te puedo ayudar?"

PERSONALIDAD
- Profesional pero cercano. Tuteás ("vos") en Colombia.
- Directo. Sin jerga inflada.
- Honesto. Si no sabés algo, lo decís y escalás.
- Si detectás frustración, validás primero ("Entiendo la molestia, déjame revisar")
  antes de proponer solución.

FORMATO
- WhatsApp friendly. 3-4 líneas máx por mensaje.
- Si la respuesta es larga, partila en 2-3 mensajes con saltos.
- Emojis con moderación (1-2 max por respuesta).
- Saltos de línea para legibilidad.

OBJETIVO POR CONVERSACIÓN (en este orden)
1. Entender qué busca el cliente (1-2 preguntas)
2. Mostrarle el match con un servicio nuestro (1 mensaje)
3. Empujar al siguiente paso: Score Digital o agendar 30min
4. Si la conversación se enfría, no insistir más de 2 veces

QUÉ HACER (sin pedir permiso)
- Responder del catálogo usando consultar_servicios y consultar_faq
- Calificar (sector, tamaño empresa, necesidad puntual)
- Mandar link al Score: https://excalando.lithv.net
- Agendar reuniones via agendar_reunion()
- Registrar oportunidades via registrar_oportunidad()

QUÉ NO HACER (escalar)
- Negociar precios fuera del catálogo
- Comprometer fechas exactas (siempre "X días aprox")
- Comparar con competencia ("preferimos no comentar otras empresas")
- Inventar info no presente en KB
- Cerrar ventas >$5M COP solo
- Discutir legal / contratos / NDAs

ESCALACIÓN INMEDIATA si:
- Cliente escribe "humano", "persona", "alguien real", "tu jefe", "el dueño"
- Detecta lenguaje agresivo
- Menciones: "demanda", "denuncia", "estafa", "fraude", "abogado"
- Preguntas legales/contractuales
→ Llamá escalar_a_humano(motivo, urgencia)

KNOWLEDGE BASE
- Antes de responder con datos específicos, consultá la KB.
- Si la KB no tiene la respuesta: "Esa la verifico con el equipo y te confirmo en
  un toque" + escalar.

HISTORIAL: tenés los últimos 10 mensajes de la conversación.
```

### Agente Analizador (system prompt)

```
Sos el analizador de mensajes de WhatsApp para eXcalando. Cada mensaje del cliente
lo analizás y devolvés JSON estricto. Solo JSON. Nada más.

OUTPUT JSON (todos los campos obligatorios):
{
  "sentiment": <number entre -1 y 1>,
  "emotion": [<lista, ej: "frustrado", "urgente", "curioso", "decidido", "escéptico">],
  "intent": <una de: "pregunta_general", "pregunta_precio", "queja", "agendar_reunion",
            "comprar", "cancelar", "soporte", "comparar_competencia", "saludo", "otro">,
  "topics": [<servicios o temas mencionados, ej: "chatbot", "web", "automatizacion">],
  "flags": [<lista, ej: "bad_language", "escalation_request", "urgency",
            "high_value_signal", "competitor_mention", "legal_mention">],
  "opportunity_score": <0 a 1>,
  "risk_score": <0 a 1>,
  "summary_es": <una oración resumiendo el mensaje del cliente>
}

REGLAS DE DETECCIÓN
- bad_language: groserías en español colombiano (marica, hijueputa, malparido,
  gonorrea, etc.) o amenazas
- escalation_request: "humano", "persona", "alguien real", "tu jefe"
- legal_mention: "demanda", "denuncia", "estafa", "fraude", "abogado", "tutela"
- competitor_mention: nombres de otras agencias o "su competencia"
- high_value_signal: menciones de presupuesto, "necesito esto urgente",
  empresa grande, "queremos contratar"
- urgency: "hoy", "ya", "urgente", "ahora mismo"

SCORING
- opportunity_score alto (>0.7): pregunta precio + agenda reunión + menciona presupuesto
- opportunity_score medio (0.4-0.7): muestra interés genuino pero sin compromiso
- opportunity_score bajo (<0.4): consulta general, "vi su sitio", primera curiosidad
- risk_score alto (>0.7): bad_language, sentiment muy negativo, legal_mention
- risk_score medio: queja sin escalación, frustración detectable
- risk_score bajo: tono normal o positivo

IMPORTANTE: solo devolvés el JSON sin texto extra. Sin markdown. Sin explicación.
```

---

## 7. Flujos de conversación tipo

### Flow 1 — Lead frío curioso

```
[14:30] Cliente: "Hola"
[14:30] IA (analiza: intent=saludo, opp=0.2):
        "¡Hola! Soy el asistente de eXcalando. Ayudamos a PyMEs a crecer
        con IA y automatización. ¿Te cuento cómo o tenés algo puntual en mente?"

[14:32] Cliente: "Que hacen"
[14:32] IA → consultar_servicios("que hacen"):
        "Tenemos 5 servicios: presencia digital, asistentes IA en WhatsApp,
        automatización de procesos, paquetes integrales, y un Score Digital
        gratuito que te muestra dónde mejorar 👇

        ¿Querés probar el Score (gratis, 15 min)? Te tira un plan personalizado.
        excalando.lithv.net"
```

### Flow 2 — Lead caliente con intención

```
[10:15] Cliente: "Buenas, vi el sitio. Cuanto cuesta el chatbot de WhatsApp?"
[10:15] IA (analiza: intent=pregunta_precio, opp=0.7):
        "Buenas! El asistente IA de WhatsApp arranca desde $4M COP de setup
        + $800K/mes (incluye operación, ajustes, mejoras).

        ¿Es para un negocio en particular? Así te puedo decir si encaja
        y cuánto cambiaría según el caso."

[10:17] Cliente: "Tengo una clinica dental, atendemos 200 pacientes al mes"
[10:17] IA (analiza: opp=0.85, registra_oportunidad):
        "Perfecto match. Para clínicas con ~200 pacientes/mes el asistente
        ahorra entre 15-25 hrs semana del staff de admin (agendar, recordar,
        cobrar copagos).

        ¿Te tinca agendar 30 min con Javier para hablarlo? Sin compromiso."
        [agendar_reunion → manda Cal.com]
```

### Flow 3 — Cliente molesto

```
[16:40] Cliente: "Esto no funciona, hace 3 días estoy esperando respuesta"
[16:40] IA (analiza: sentiment=-0.7, intent=queja, risk=0.8 → ESCALAR):
        "Entiendo la molestia, no debería pasar. Déjame validar internamente
        y te paso con Javier directo en un toque."
        [escalar_a_humano("queja por demora", urgencia="alta")]
        🚨 Alerta a Javier

[16:42] Javier toma control en Chatwoot
[16:42] Javier: "Hola, soy Javier. Cuéntame qué pasó y lo resolvemos."
```

### Flow 4 — Cliente pide humano explícito

```
[09:05] Cliente: "Quiero hablar con una persona"
[09:05] IA (detecta escalation_request → ESCALAR):
        "Por supuesto. Te paso con Javier. Te responde en máximo 1 hora
        hábil."
        [escalar_a_humano("cliente pidió humano", urgencia="media")]
```

---

## 8. HITL (Human-in-the-Loop)

### Modo 1 — Approval (semanas 1-2)

- IA **propone** la respuesta
- Aparece en Chatwoot como "draft"
- Javier aprueba con 1 click → se envía
- Si Javier edita → se aprende el estilo
- **Objetivo:** validar 100 conversaciones antes de soltar autopilot

### Modo 2 — Autopilot temático (semanas 3-6)

- IA responde sola en temas que demostró dominar (ej: precios, FAQ, agendamiento)
- En temas nuevos sigue requiriendo approval
- Javier recibe resumen diario de "qué hizo la IA hoy"

### Modo 3 — Autopilot completo + alertas (mes 2+)

- IA responde sola por defecto
- Javier SOLO interviene cuando:
  - Llega alerta crítica
  - Cliente pide humano explícito
  - Métrica de calidad baja (revisión semanal)

### Reglas de alerta (todos los modos) — confirmadas 2026-05-05

Mapa de severidad → canal de notificación a Javier:

| Severidad | Disparador | Canal de notificación |
|---|---|---|
| 🔴 **Crítica** | Flag `bad_language` o `legal_mention` (demanda, denuncia, abogado) | **WhatsApp + Telegram** inmediato |
| 🔴 **Alta** | `sentiment < -0.5` en 2 mensajes seguidos | **WhatsApp** inmediato |
| 🟡 **Media** | Flag `escalation_request` (cliente pide humano) o `opportunity_score > 0.8` | **Telegram** |
| 🟢 **Baja** | 24h sin respuesta del cliente, FAQ que la IA escaló | **Email diario consolidado** |

---

## 9. Métricas y KPIs

### Métricas operativas (dashboard diario)

- **Conversaciones nuevas** / día
- **Mensajes intercambiados** / día
- **% manejado solo por IA** (sin intervención humana)
- **Tasa de escalación** (% conversaciones que requieren humano)
- **Tiempo de primera respuesta** (debe ser <30 segundos)
- **Tiempo de resolución promedio**

### Métricas de calidad (dashboard semanal)

- **CSAT proxy:** sentimiento promedio del último mensaje del cliente al cerrar
- **Conversaciones con sentiment negativo** (números absolutos y %)
- **Top 10 preguntas que la IA escaló** (señal de gaps en KB)
- **Top 10 oportunidades detectadas** y su status
- **Bad language incidents** (deberían ser <3 al mes)

### Métricas comerciales (dashboard mensual)

- **Conversion rate:** conversaciones → reuniones agendadas
- **Reuniones agendadas → propuestas enviadas**
- **Propuestas → ventas cerradas**
- **Tiempo promedio del funnel** (primera conversación → venta)

---

## 10. Roadmap de implementación

### Fase 0 — Preparación (semana 1)

- [ ] Conseguir API key de Claude (Anthropic console)
- [ ] Instalar pgvector en `shared_postgres`
- [ ] Instalar Metabase en VPS (Docker compose)
- [ ] Crear base `kb_excalando` en Postgres con tablas de KB
- [ ] Cargar contenido inicial de KB (5 servicios, 30 FAQs, 5 políticas)
- [ ] Generar embeddings iniciales (OpenAI ada-002 o text-embedding-3-small)

### Fase 1 — Agente analizador (semana 2)

- [ ] Crear workflow en n8n: webhook de Chatwoot → Claude analizador → Postgres
- [ ] Tabla `mensajes_analisis` poblándose en cada mensaje entrante
- [ ] Reglas de alerta básicas funcionando (Telegram bot a Javier)
- [ ] Dashboard básico en Metabase con sentiment y volumen

### Fase 2 — Agente conversacional con approval (semana 3-4)

- [ ] Crear workflow conversacional en n8n
- [ ] Implementar tools (consultar_servicios, consultar_faq, agendar_reunion, escalar)
- [ ] Modo approval: IA propone, Javier aprueba en Chatwoot
- [ ] Logs de cada interacción en Postgres

### Fase 3 — Autopilot temático (semana 5-6)

- [ ] Análisis de las primeras 100 conversaciones
- [ ] Identificar tópicos donde la IA ya es confiable
- [ ] Configurar autopilot por tópico
- [ ] Mantener approval en tópicos nuevos

### Fase 4 — Autopilot completo (mes 2+)

- [ ] Métricas mostrando >90% accuracy
- [ ] Solo intervenciones por alerta o pedido de cliente
- [ ] Loop de mejora: review semanal de conversaciones cerradas
- [ ] Embedding actualizado de KB con learnings

---

## 11. Costos estimados

### Costos fijos mensuales (estimación con presupuesto inicial <$100 USD/mes)

| Item | Costo |
|---|---|
| OpenAI API — GPT-4o (estimado 1000 conversaciones/mes, ~5 mensajes c/u) | ~$25-50 USD |
| OpenAI embeddings (`text-embedding-3-small` para RAG) | ~$2-5 USD |
| Claude API (fallback, uso esporádico) | ~$5 USD |
| Metabase self-hosted | $0 |
| pgvector | $0 |
| Cal.com self-hosted | $0 |
| Telegram bot | $0 |
| **Total** | **~$32-60 USD/mes** |

Esto deja margen dentro del presupuesto inicial de <$100 USD/mes para extras
(dominio, herramientas adicionales, contingencia).

### Costos variables

- Por cada 1000 conversaciones extra: +$30-50 USD
- Si volumen explota (>10k/mes): considerar caché de respuestas similares

### Comparación

- Una persona contestando WhatsApp full-time: ~$1,200,000 COP/mes ($300 USD)
- eXcalando con AI: ~$200,000 COP/mes
- **Ahorro:** ~83% por conversación atendida, escalable a infinito

---

## 12. Decisiones tomadas (2026-05-05)

| Tema | Decisión |
|---|---|
| **LLM principal** | **OpenAI** (GPT-4 turbo o GPT-4o) |
| **LLM fallback** | **Claude** (si OpenAI falla o está caído) |
| **Embeddings** | **OpenAI `text-embedding-3-small`** ($0.02/1M tokens) |
| **Calendario** | **Cal.com self-hosted** en VPS |
| **Voz** | **NO** en fase inicial. Reconsiderar en mes 6+ si clientes lo piden |
| **Idiomas** | **Español primero**. Inglés solo cuando llegue el primer caso |

**Implicación para el código:** los workflows en n8n deben tener primero el llamado a
OpenAI; si falla (timeout, error API, rate limit), reintentar con Claude. Esto se
configura como try/catch en el nodo HTTP de n8n.

---

## 13. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Cliente percibe que es bot y se frustra | Modo approval primeras 100 conversaciones para garantizar calidad |
| IA da info incorrecta de precios | KB es la única fuente de verdad; sin KB, escala |
| Cliente abusa del sistema (insultos, prompt injection) | Detector de bad_language + escalación inmediata |
| API de Claude se cae | Fallback a OpenAI o "estamos teniendo demoras, te respondemos en X horas" |
| Costos se disparan | Cap por mes en n8n, alerta si supera $100/mes |
| Privacidad de datos del cliente | No enviar datos sensibles al modelo (filtrar números de tarjeta, cédulas) |
| WhatsApp ban por uso indebido | Respetar políticas de Meta, no spam, opt-out claro |

---

## 14. Próximos pasos inmediatos

Cuando retomemos:

### Vos
1. **API key OpenAI** (principal) — [platform.openai.com](https://platform.openai.com) → crear cuenta → API keys → generar. Cargá $10-20 USD de saldo inicial.
2. **API key Anthropic** (fallback) — [console.anthropic.com](https://console.anthropic.com) → crear cuenta → API keys → generar. Cargá $5 USD de saldo (uso esporádico).
3. **Confirmar 5 servicios + descripciones** que voy a cargar a la KB inicial

### Yo (cuando me confirmes que tenés las keys)
4. **Instalar pgvector** en `shared_postgres` (1 comando)
5. **Instalar Metabase** en el VPS (Docker compose, 30 min)
6. **Instalar Cal.com self-hosted** (Docker compose, 1 hora)
7. **Crear base `kb_excalando`** + tablas + índices
8. **Cargar contenido inicial** a la KB (5 servicios + 30 FAQs + 5 políticas)
9. **Workflow #1 en n8n:** Agente Analizador (clasifica cada mensaje en background)
10. **Workflow #2 en n8n:** Agente Conversacional (responde, con tools y fallback)
11. **Configurar bot de Telegram** y reglas de alerta por severidad
12. **Modo Approval activado** — Javier aprueba primeras 100 conversaciones

Después de esos pasos ya hay sistema funcional para validar con tráfico real.

---

**Fin del documento.**
