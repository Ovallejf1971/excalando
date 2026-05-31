---
title: Stack de agentes IA
description: Catálogo de agentes IA producto eXcalando.
---

# Stack de agentes IA — eXcalando

**Última actualización:** 2026-05-05
**Owner:** Francisco Ovalle (estrategia) + Harol Valencia (técnica)

> Detalle técnico de los 10 agentes IA que componen la operación de eXcalando.
> Para visión organizacional ver [`roles-y-organizacion.md`](./roles-y-organizacion.md).
> Para el agente de WhatsApp en detalle ver [`whatsapp-ai-agent.md`](./whatsapp-ai-agent.md).

---

## Arquitectura común a todos los agentes

Todos los agentes comparten esta estructura:

```
┌──────────────────────────────────────┐
│            n8n workflow              │
│                                      │
│  Trigger ─→ Pre-process ─→ LLM call  │
│                              │       │
│                              ▼       │
│                          Tools/RAG   │
│                              │       │
│                              ▼       │
│                       Post-process   │
│                              │       │
│                              ▼       │
│                          Output      │
└──────────────────────────────────────┘
        │                   │
        ▼                   ▼
   Postgres            Destinations
   (logs,              (Chatwoot, Email,
    análisis)          Telegram, etc.)
```

### Componentes comunes

- **LLM:** OpenAI GPT-4o (principal) → Claude Sonnet (fallback)
- **Embeddings:** OpenAI text-embedding-3-small (para RAG)
- **Vector DB:** pgvector en `agencia_digital` Postgres
- **Orquestación:** n8n
- **Persistencia:** Postgres (logs por agente, conversaciones, alertas, oportunidades)
- **Knowledge Base:** tablas `kb_*` en Postgres

### Convenciones de nombres

- Workflows en n8n: `agent-<nombre>` (ej: `agent-conversational`)
- Tablas de logs: `<nombre>_logs` cuando aplique
- Credentials en n8n: `OpenAI - eXcalando`, `Anthropic - eXcalando`

---

## Resumen de los 10 agentes

| # | Agente | Tipo | Modelo | Frecuencia | Costo/mes | Fase |
|---|---|---|---|---|---|---|
| 1 | **Conversational** | Conversacional | GPT-4o | Real-time | ~$25-40 | V1 |
| 2 | **Analyzer** | Clasificador | GPT-4o-mini | Real-time | ~$3-8 | V1 |
| 3 | **Knowledge (RAG)** | Tool/wrapper | (no LLM) | Real-time | $0 | V1 |
| 4 | **Lead Qualification** | Clasificador | GPT-4o-mini | Por lead | ~$1 | V1 |
| 5 | **Reporting** | Generador | GPT-4o-mini | Daily | ~$2 | V2 |
| 6 | **Reactivation** | Generador | GPT-4o | Weekly | ~$3 | V2 |
| 7 | **Content Generator** | Generador creativo | GPT-4o | 3x/semana | ~$5 | V3 |
| 8 | **Newsletter** | Generador largo | GPT-4o | Mensual | ~$2 | V3 |
| 9 | **Proposal Generator** | Generador estructurado | GPT-4o | Por lead | ~$2 | V3 |
| 10 | **Onboarding** | Conversacional + checklist | GPT-4o-mini | Por cliente | ~$1 | V3 |

**Total estimado mensual:** ~$45-65 USD (con 1000 conversaciones/mes)

---

## V1 — MVP (semanas 1-6)

### Agente 1 — Conversational Agent

**Propósito:** Responder mensajes de WhatsApp del cliente en tiempo real.

| Atributo | Valor |
|---|---|
| **Trigger** | Webhook de Chatwoot (mensaje nuevo del cliente) |
| **Inputs** | Texto del mensaje, historial últimos 10 mensajes, metadata cliente |
| **Outputs** | Respuesta de texto enviada al cliente vía Chatwoot → Evolution API |
| **Tools** | `consultar_servicios`, `consultar_faq`, `agendar_reunion`, `escalar_a_humano`, `registrar_oportunidad` |
| **Modelo** | GPT-4o (principal) → Claude Sonnet 4.6 (fallback) |
| **Costo** | ~$0.03 por conversación de 5 mensajes |
| **Owner** | Francisco (supervisión modo approval inicial) |

**Detalles operacionales:**
- Modo Approval: primeras 100 conversaciones, Francisco aprueba antes de enviar
- Modo Autopilot temático: temas dominados se envían directo
- Modo Autopilot completo: por defecto, intervención solo en alertas
- System prompt completo en [`whatsapp-ai-agent.md`](./whatsapp-ai-agent.md) sec. 6

**Métricas de éxito:**
- Tasa de edición de respuestas <5% (en modo approval, baja con el tiempo)
- Sentiment final positivo en >80% de conversaciones
- Tiempo de primera respuesta <30 seg
- Tasa de escalación a humano <15%

---

### Agente 2 — Analyzer Agent

**Propósito:** Clasificar cada mensaje del cliente (sentiment, intent, flags). Corre en paralelo al Conversational, alimenta dashboards y alertas.

| Atributo | Valor |
|---|---|
| **Trigger** | Mismo webhook que Conversational (paralelo, no serial) |
| **Inputs** | Texto del mensaje |
| **Outputs** | JSON con sentiment, emotion, intent, topics, flags, opportunity_score, risk_score |
| **Tools** | (ninguna — puro LLM call) |
| **Modelo** | GPT-4o-mini (suficiente para clasificación, mucho más barato) |
| **Costo** | ~$0.001 por mensaje |
| **Persistencia** | INSERT en `mensajes_analisis` |
| **Owner** | Francisco (lee output via dashboards) |

**Detalles operacionales:**
- Output 100% JSON estricto (system prompt fuerza esto)
- Si genera alertas (sentiment_drop, bad_language, legal_mention) → workflow de alertas
- System prompt completo en [`whatsapp-ai-agent.md`](./whatsapp-ai-agent.md) sec. 6

**Métricas de éxito:**
- Tasa de detección de bad_language >95%
- False positives en alertas críticas <5%
- Latencia <2 segundos

---

### Agente 3 — Knowledge Agent (RAG)

**Propósito:** No es un agente conversacional propiamente — es una capa que el Conversational invoca como tool. Hace búsqueda semántica en la KB.

| Atributo | Valor |
|---|---|
| **Trigger** | Llamado desde Conversational como tool |
| **Inputs** | Query en lenguaje natural |
| **Outputs** | Top 3-5 resultados relevantes de `kb_servicios`, `kb_faq`, `kb_politicas`, `kb_casos` |
| **Tools** | (es una tool en sí mismo) |
| **Modelo** | (no LLM — solo embeddings) |
| **Tecnología** | OpenAI text-embedding-3-small + pgvector cosine similarity |
| **Costo** | ~$0.0001 por query |
| **Owner** | Harol (mantener KB actualizada técnicamente) + Francisco (contenido) |

**Detalles operacionales:**
- Query del cliente → embed → search en pgvector → top K → return texto
- Threshold de similitud: cosine_distance < 0.3 (sino "no encontrado")
- Si no encuentra, Conversational dice "esa la verifico con el equipo y te confirmo"
- KB actualización: manual via pgAdmin O panel admin futuro

**Métricas de éxito:**
- Tasa de "encuentra respuesta" >85%
- Tiempo de query <500 ms
- Recall de FAQs en top 3: >90%

---

### Agente 4 — Lead Qualification Agent

**Propósito:** Cuando un lead completa el Score Digital, califica el lead automáticamente y le asigna prioridad para el follow-up de Francisco.

| Atributo | Valor |
|---|---|
| **Trigger** | Webhook de score-digital al cerrarse (mismo flujo actual) |
| **Inputs** | Respuestas + reporte del Score Digital |
| **Outputs** | JSON con: priority (`hot/warm/cold`), reason, suggested_first_touch, estimated_value |
| **Tools** | (ninguna) |
| **Modelo** | GPT-4o-mini |
| **Costo** | ~$0.005 por lead |
| **Persistencia** | UPDATE `leads` con campos `priority`, `qualification_reason`, `suggested_action` |
| **Owner** | Francisco (consume output para priorizar quién contactar primero) |

**Lógica de calificación (ejemplo):**

```
hot:    score < 35 + tamaño 10+ + sector con presupuesto + email empresarial
warm:   score < 55 + cualquier tamaño + email empresarial o personal
cold:   score >= 55 (ya están bien, baja necesidad)
```

**Detalles operacionales:**
- Se ejecuta DESPUÉS del INSERT de leads
- Suma 1-2 segundos al flujo actual (imperceptible)
- Output va a `leads.priority` y aparece en Metabase
- Trigger de notificación: si priority='hot' → WhatsApp inmediato a Francisco

**Métricas de éxito:**
- Acuerdo Francisco con clasificación >80% (review semanal)
- Conversion rate por categoría diferencial (hot >50%, warm 20%, cold 5%)

---

## V2 — Operación más profunda (mes 2-3)

### Agente 5 — Reporting Agent

**Propósito:** Generar el resumen diario que Francisco recibe cada mañana.

| Atributo | Valor |
|---|---|
| **Trigger** | Cron diario a las 7:00 AM (Bogotá) |
| **Inputs** | Queries a `leads`, `conversaciones`, `mensajes_analisis`, `alertas`, `oportunidades` (últimas 24h) |
| **Outputs** | Email + WhatsApp resumen estructurado |
| **Tools** | (consume datos via Postgres queries en n8n, no necesita tools LLM) |
| **Modelo** | GPT-4o-mini (para narrativa, datos van pre-procesados) |
| **Costo** | ~$0.05 por resumen diario |
| **Owner** | Francisco (consume) |

**Estructura del resumen diario:**

```
🌅 Buenos días Francisco. Resumen del día.

📊 LEADS (últimas 24h)
- Total nuevos: 4
- 🔴 Hot: 1 (Carolina, clínica dental, score 28)
- 🟡 Warm: 2
- 🟢 Cold: 1

💬 CONVERSACIONES
- Activas: 7
- Cerradas: 3 (2 satisfacción positiva, 1 escalada a vos)
- Sentimiento promedio: +0.4 ✅

🚨 ALERTAS
- Resueltas: 2
- Pendientes: 1 (tu revisar — link)

🎯 OPORTUNIDADES NUEVAS
- 3 detectadas, valor estimado: $12M COP

📅 AGENDA HOY
- 10:00 AM — Demo Carolina (lead hot ↑)
- 3:00 PM — Discovery con María (warm)
```

---

### Agente 6 — Reactivation Agent

**Propósito:** Re-engages leads que abandonaron el funnel sin convertir.

| Atributo | Valor |
|---|---|
| **Trigger** | Cron semanal (lunes 10 AM) |
| **Inputs** | Leads con `created_at` entre 14-60 días, sin conversación activa, no convertidos |
| **Outputs** | Mensaje WhatsApp personalizado a cada lead inactivo |
| **Tools** | `enviar_whatsapp` (vía Evolution API) |
| **Modelo** | GPT-4o (para personalizar bien) |
| **Costo** | ~$0.05 por re-engage |
| **Persistencia** | UPDATE `leads` con `reactivated_at`, INSERT en `conversaciones` |
| **Owner** | Francisco (modo approval para los primeros 20) |

**Reglas:**
- No reactivar si ya hubo 3+ intentos
- Personalizar el mensaje según el frente más débil de su Score Digital
- Approval mode los primeros 20 mensajes; después autopilot
- Cap mensual: 50 reactivaciones

**Ejemplo de mensaje generado:**
> Hola María, te escribo del equipo de eXcalando. Hace ~3 semanas hiciste el
> Score Digital y tu mayor oportunidad estaba en SEO local. Lanzamos un nuevo
> proceso para PyMEs que arranca por ahí. ¿Querés conversar 15 min y ver si
> aplica? Sin compromiso, prometido.

---

## V3 — Crecimiento y escala (mes 4+)

### Agente 7 — Content Generator

**Propósito:** Genera drafts de posts de LinkedIn (Francisco) y Instagram (marca eXcalando).

| Atributo | Valor |
|---|---|
| **Trigger** | Cron 3x/semana (lunes, miércoles, viernes 8 AM) |
| **Inputs** | Pillars de contenido, tendencias del sector, conversaciones cerradas (insights) |
| **Outputs** | 2 drafts: 1 para Francisco (LinkedIn), 1 para eXcalando (Instagram caption) |
| **Tools** | `consultar_pillars`, `analizar_conversaciones_recientes`, `generar_imagen` (futuro) |
| **Modelo** | GPT-4o |
| **Costo** | ~$0.15 por par de drafts |
| **Owner** | Francisco (review y publica desde apps nativas) |

**Detalle:**
- Los drafts llegan por email a las 8 AM
- Francisco copia, edita 5-10%, publica
- Imágenes a futuro: Replicate o DALL-E API
- Pillars y tono definidos en `estrategia-redes-sociales.md` (pendiente)

---

### Agente 8 — Newsletter Agent

**Propósito:** Genera el newsletter mensual a base de leads + clientes.

| Atributo | Valor |
|---|---|
| **Trigger** | Cron mensual (último viernes 10 AM) |
| **Inputs** | Highlights del mes (casos cerrados, insights de conversaciones, content top) |
| **Outputs** | Email HTML estructurado |
| **Tools** | (queries a Postgres + LLM generation) |
| **Modelo** | GPT-4o |
| **Costo** | ~$0.10 por newsletter |
| **Distribución** | n8n → Resend o Gmail (a base de leads + clientes) |
| **Owner** | Francisco (review antes de enviar) |

---

### Agente 9 — Proposal Generator

**Propósito:** Cuando un lead se vuelve hot y agenda reunión, este agente genera una propuesta personalizada **antes** de la reunión, para que Francisco la presente.

| Atributo | Valor |
|---|---|
| **Trigger** | Cuando se confirma reunión vía Cal.com con un lead hot |
| **Inputs** | Score Digital del lead + perfil de empresa + servicio sugerido |
| **Outputs** | PDF estructurado con: diagnóstico, plan, precio, cronograma |
| **Tools** | `consultar_servicios`, `consultar_casos`, `consultar_pricing` |
| **Modelo** | GPT-4o |
| **Costo** | ~$0.10 por propuesta |
| **Output format** | Markdown → conversión a PDF via Pandoc o API similar |
| **Owner** | Francisco (revisa, ajusta, envía como leave-behind tras la reunión) |

---

### Agente 10 — Onboarding Agent

**Propósito:** Acompaña al cliente recién firmado en sus primeros 30 días, con check-ins programados, recordatorios de tareas, y captura de feedback temprano.

| Atributo | Valor |
|---|---|
| **Trigger** | Cuando un lead pasa a `customer` (creación de cliente nuevo en CRM/Postgres) |
| **Inputs** | Servicio contratado, fecha kickoff |
| **Outputs** | Mensajes WhatsApp programados en checkpoints (día 1, 7, 14, 30) |
| **Tools** | `enviar_whatsapp`, `consultar_status_proyecto`, `escalar_a_francisco` |
| **Modelo** | GPT-4o-mini |
| **Costo** | ~$0.10 por cliente |
| **Owner** | Francisco (intervienen en respuestas si el cliente engancha conversación profunda) |

**Checkpoints:**
- **Día 1:** Bienvenida + qué esperar la primera semana
- **Día 7:** "¿Cómo va? ¿Hay alguna duda?"
- **Día 14:** Status del proyecto + próximos pasos
- **Día 30:** Feedback honesto + caso de éxito si aplica

---

## Orquestación en n8n

### Workflows a crear (en orden de implementación)

| Workflow | Fase | Dependencias |
|---|---|---|
| `agent-analyzer` | V1 | API key OpenAI, tabla `mensajes_analisis` |
| `agent-knowledge-rag` | V1 | KB poblada, embeddings generados |
| `agent-conversational` | V1 | Analyzer + KnowledgeRAG funcionando |
| `agent-lead-qualification` | V1 | Webhook Score Digital existente |
| `alerts-router` | V1 | Bot Telegram, configuración severidades |
| `agent-reporting` | V2 | Queries Postgres validadas |
| `agent-reactivation` | V2 | Score Digital con 50+ leads históricos |
| `agent-content-generator` | V3 | Pillars de contenido definidos |
| `agent-newsletter` | V3 | Resend configurado o Gmail OAuth |
| `agent-proposal-generator` | V3 | Cal.com integrado, plantilla de propuesta |
| `agent-onboarding` | V3 | CRM mínimo o tabla `clientes` |

### Patrón de error handling

Cada workflow tiene:
1. Try/catch en nodo HTTP del LLM
2. Fallback a Claude si OpenAI falla
3. Retry exponential backoff (3 intentos)
4. Si todos fallan: log a `agent_errors` + notificación a Harol

```
[Trigger] → [Validate input] → [Try OpenAI]
                                    │
                                    ├─→ success → [Process] → [Output]
                                    │
                                    └─→ fail → [Try Claude]
                                                  │
                                                  ├─→ success → [Process] → [Output]
                                                  │
                                                  └─→ fail → [Log + Alert Harol]
```

---

## Costos consolidados

### Estimación con 1000 conversaciones/mes

| Concepto | Costo mensual |
|---|---|
| Conversational Agent (3-5 mensajes c/u) | $25-40 USD |
| Analyzer Agent (1 análisis por mensaje) | $3-8 USD |
| Knowledge RAG (embeddings) | $1-3 USD |
| Lead Qualification (~50 leads/mes) | <$1 USD |
| Reporting Agent (30 reports) | $2 USD |
| Reactivation (~30 mensajes) | $2 USD |
| Content Generator (12 posts) | $2 USD |
| Newsletter (1) | $0.10 USD |
| Proposal Generator (~10) | $1 USD |
| Onboarding (~5 clientes) | $0.50 USD |
| Embeddings (KB updates) | $1 USD |
| **Total estimado** | **~$40-60 USD/mes** |

### Comparación

- Costo por conversación atendida por agente: **~$0.05 USD**
- Costo de una persona atendiendo full-time: **~$0.30 USD/conversación** (a $300/mes ÷ 1000 conv)
- **Ahorro:** ~83% por conversación

---

## Plan de implementación priorizada

### Sprint 1 — V1 fundamentales (semanas 1-2)

**Objetivo:** Sistema básico funcionando

- Día 1-2: Agente Analyzer (clasifica cada mensaje)
- Día 3-4: Knowledge RAG (KB con embeddings)
- Día 5-7: Agente Conversational (modo approval)
- Día 8: Agente Lead Qualification
- Día 9-10: Bot Telegram + reglas de alertas
- Día 11-14: Testing y ajustes con tráfico real

### Sprint 2 — V1 plus + V2 (semanas 3-4)

- Pulir prompts según feedback de Francisco
- Migrar Conversational a Autopilot temático
- Implementar Reporting Agent
- Diseñar Reactivation Agent

### Sprint 3 — V2 (semanas 5-6)

- Reactivation Agent en producción
- Refinement de dashboards Metabase
- Métricas semanales automatizadas
- Documentación operativa

### Sprint 4+ — V3 (mes 4+)

- Content Generator (cuando haya consistencia operativa)
- Newsletter (cuando haya 50+ contactos)
- Proposal Generator (cuando hayan cerrado primeros 3 clientes)
- Onboarding Agent (cuando entren los primeros clientes)

---

## Mantenimiento y mejora continua

### Review semanal (Francisco, 30 min)

- Leer 10 conversaciones random
- Marcar respuestas "buenas/malas"
- Identificar gaps en KB → tareas para Harol
- Decidir si algún tópico nuevo entra a Autopilot

### Review mensual (Francisco + Harol, 1 hora)

- Métricas de cada agente vs target
- Costo real vs presupuesto
- Backlog de mejoras priorizado
- Decisión de pasar al siguiente Sprint

### Trimestral

- Auditoría completa de prompts
- Optimización de costos (downgrade modelos donde se pueda)
- Decisión de agregar/eliminar agentes

---

## Casos límite y plan de contingencia

| Situación | Plan |
|---|---|
| OpenAI cae | Fallback automático a Claude (configurado en cada workflow) |
| Claude también cae | Mensaje a cliente: "Estamos teniendo demoras técnicas, te respondemos en X horas" + alerta a Harol |
| Costos se disparan (>$200/mes inesperado) | Cap configurado en n8n, alerta + downgrade temporal a GPT-4o-mini |
| Cliente abusa (groserías repetidas) | 3 strikes → pausa 24h + alerta a Francisco |
| Prompt injection detectado | Detector pre-LLM + escalación inmediata + log para análisis |
| Knowledge Base desactualizada | Alerta automática si KB no se updatea en 30 días |

---

**Fin del documento.**

> Para implementación práctica, los workflows en n8n se documentan en
> `integrations/n8n/` con su JSON exportable.
> Los prompts se versionan en `prompts/<agente>.md` (carpeta a crear).
