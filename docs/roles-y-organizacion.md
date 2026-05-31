---
title: Roles y organización
description: Roles internos extendidos. Complementa Socios y roles.
---

# Roles y organización — eXcalando

**Última actualización:** 2026-05-05
**Owner:** Javier Ovalle

> eXcalando opera con un modelo híbrido: **2 humanos part-time + 10 agentes IA**.
> Cada función crítica está cubierta por un agente. Los humanos toman decisiones,
> cierran ventas, deciden estrategia, y supervisan el trabajo de los agentes.
> Los agentes ejecutan trabajo repetitivo, escalan a humanos cuando hace falta.

---

## Filosofía organizacional

### Principios

1. **AI-first, human-supervised.** Cada tarea repetitiva la hace primero un agente.
   Los humanos solo entran donde la IA no puede o no debe.
2. **Self-served para clientes.** El cliente puede avanzar 80% del journey sin
   hablar con un humano (Score → reporte → agente WhatsApp → agendar reunión).
3. **Transparencia con clientes.** El cliente sabe que está hablando con IA. No
   pretendemos ser humanos. Esa honestidad es nuestro diferencial.
4. **Aprendizaje continuo.** Cada conversación cerrada alimenta los prompts.
   La calidad sube semana a semana.
5. **Humanos para alto leverage.** Javier se enfoca en cerrar ventas y
   estrategia. Harol en infraestructura. Nadie pierde tiempo en tareas que un
   agente puede hacer.

### La regla del 80/15/5

- **80%** de las interacciones cliente las maneja un agente IA (responder, agendar, etc.)
- **15%** son interacciones supervisadas por humano (modo approval, casos complejos)
- **5%** son interacciones 100% humanas (cierre de venta, casos críticos, decisiones)

---

## Roles humanos

### Javier Ovalle — Socio Fundador

**Dedicación:** part-time variable
**Tiempo estimado:** 10-20 hrs/semana (variable según fase)

#### Responsabilidades core

| # | Responsabilidad | Frecuencia |
|---|---|---|
| 1 | **Cierre de ventas** — convertir leads calificados en clientes | A demanda (cada lead caliente) |
| 2 | **Estrategia** — decisiones de producto, precios, posicionamiento | Semanal (1-2 hrs) |
| 3 | **Vocero de marca personal** — LinkedIn de Javier, posts de visión | 2-3 posts/semana |
| 4 | **Supervisión de agentes** — review semanal de calidad IA | 1 hr/semana |
| 5 | **Approval mode** (primeras 100 conversaciones) | A demanda |
| 6 | **Crisis management** — alertas críticas (legal, bad language, sentiment crítico) | A demanda (idealmente 0-2/mes) |
| 7 | **Networking y referidos** — empuje activo a la red personal | Semanal |

#### KPIs personales

- **Conversion rate** de reuniones agendadas a clientes cerrados (target: >30%)
- **Tiempo de respuesta** a alertas críticas (target: <15 min)
- **Posts en LinkedIn** publicados/semana (target: 2-3)
- **Reuniones de venta/mes** (target: 8-12 en mes 3)

#### Agentes IA con los que más interactúa

- **Conversational Agent** (modo approval, primeras semanas)
- **Reporting Agent** (recibe daily summary)
- **Content Generator** (revisa drafts antes de publicar)

---

### Harol Valencia — Socio Fundador

**Dedicación:** part-time, a la par de Javier
**Tiempo estimado:** 10-15 hrs/semana

#### Responsabilidades core

| # | Responsabilidad | Frecuencia |
|---|---|---|
| 1 | **Infraestructura VPS** — servidores, deploys, backups | Continuo |
| 2 | **Workflows n8n** — implementación y mantenimiento de agentes | Semanal |
| 3 | **Bases de datos** — performance, scaling, queries | Mensual + on-demand |
| 4 | **Integraciones** — Evolution API, Chatwoot, Cal.com, Metabase | A demanda |
| 5 | **Soporte técnico a clientes** — implementaciones que requieren manos | A demanda |
| 6 | **Seguridad** — rotación de credenciales, monitoring | Trimestral |

#### KPIs técnicos

- **Uptime** del stack (target: >99.5%)
- **Tiempo medio para resolver incidente** (target: <1 hr)
- **Costos de infraestructura** dentro del presupuesto
- **Workflows n8n** implementados/mes (target: 1-2 nuevos en fase 1-2)

---

### Roles a sumar cuando el negocio lo justifique

Estos NO son contrataciones inmediatas. Son los siguientes humanos que tendrían
sentido sumar cuando el volumen lo justifique.

| Rol | Trigger para contratar | Modelo |
|---|---|---|
| **Customer Success Lead** | 5+ clientes activos | Contractor part-time, 10-20 hrs/sem |
| **Content / Marketing Lead** | Necesidad de >10 posts/sem o videos | Contractor part-time + freelance video |
| **Implementation Specialist** | 8+ proyectos en paralelo | Contractor full-time |
| **Sales Development Rep (SDR)** | Demanda > capacidad de Javier para ventas | Contractor part-time, comisión por venta |

**Ninguno se contrata antes del mes 4-6.** Antes, todo lo absorben Javier + Harol + agentes.

---

## Los 10 agentes IA

Resumen rápido. Detalle técnico completo en [`agentes-ia-stack.md`](./agentes-ia-stack.md).

| # | Agente | Función | Fase | Owner humano |
|---|---|---|---|---|
| 1 | **Conversational Agent** | Responde mensajes WhatsApp del cliente | V1 | Javier |
| 2 | **Analyzer Agent** | Clasifica cada mensaje (sentiment, intent, flags) | V1 | Javier |
| 3 | **Knowledge Agent** | RAG — busca en KB para responder con datos exactos | V1 | Harol (técnica) |
| 4 | **Lead Qualification Agent** | Califica leads del Score Digital, asigna prioridad | V1 | Javier |
| 5 | **Reporting Agent** | Daily summary a Javier (leads, alertas, oportunidades) | V2 | Javier |
| 6 | **Reactivation Agent** | Re-engages leads que abandonaron el funnel | V2 | Javier |
| 7 | **Content Generator** | Drafts de posts para LinkedIn / Instagram | V3 | Javier |
| 8 | **Newsletter Agent** | Newsletter mensual a base de leads y clientes | V3 | Javier |
| 9 | **Proposal Generator** | Genera propuestas customizadas desde Score Digital | V3 | Javier |
| 10 | **Onboarding Agent** | Acompaña al cliente recién firmado en sus primeros 30 días | V3 | Javier |

---

## Org chart visual

```
              ┌──────────────────────────┐    ┌──────────────────────────┐
              │      JAVIER OVALLE       │    │     HAROL VALENCIA       │
              │      Socio Fundador      │    │     Socio Fundador       │
              │  (estrategia, ventas,    │    │  (infra, workflows,      │
              │   contenido, producto)   │    │   integraciones técnicas)│
              └────────────┬─────────────┘    └────────────┬─────────────┘
                           │                               │
                           └───────────────┬───────────────┘
                                           │
                                           ▼
                          ┌────────────────────────────┐
                          │      10 AGENTES IA         │
                          │                            │
                          │  V1 (Producción AHORA)     │
                          │  • Conversational          │
                          │  • Analyzer                │
                          │  • Knowledge (RAG)         │
                          │  • Lead Qualification      │
                          │                            │
                          │  V2 (mes 2-3)              │
                          │  • Reporting               │
                          │  • Reactivation            │
                          │                            │
                          │  V3 (mes 4+)               │
                          │  • Content Generator       │
                          │  • Newsletter              │
                          │  • Proposal Generator      │
                          │  • Onboarding              │
                          └─────────────┬──────────────┘
                                        │
                                        ▼
                          ┌────────────────────────────┐
                          │     CLIENTES Y LEADS       │
                          │  (interactúan con          │
                          │   agentes principalmente)  │
                          └────────────────────────────┘
```

### Flujo de información

- **Cliente → Conversational Agent** (WhatsApp/web)
- **Conversational Agent ↔ Knowledge Agent** (consulta RAG)
- **Conversational Agent → Analyzer Agent** (paralelo, clasifica cada mensaje)
- **Analyzer Agent → Postgres** (guarda análisis)
- **Postgres → Reporting Agent** (consume análisis para summary)
- **Reporting Agent → Javier** (daily email/WhatsApp)
- **Alertas → Javier** (instantáneo si severity ≥ media)

---

## Cómo escalamos: humano vs agente vs herramienta

Cuando aparece una nueva tarea repetitiva en la operación, esta es la matriz de decisión:

| Característica de la tarea | Solución |
|---|---|
| Repetitiva, reglas claras, alto volumen | **Agente IA** |
| Repetitiva, reglas claras, bajo volumen | Workflow n8n simple (sin LLM) |
| Repetitiva, requiere juicio | **Agente IA con human-in-the-loop** |
| No repetitiva, requiere creatividad | **Humano (Javier)** |
| Técnica, requiere acceso a infra | **Humano (Harol)** |
| Requiere autoridad (firma, decisión final) | **Humano (Javier)** |
| Crisis o caso atípico | **Humano (Javier), agente debe escalar** |

---

## Comunicación interna humanos ↔ agentes

### Canales

| Canal | Propósito | Quién lo usa |
|---|---|---|
| **WhatsApp Javier** | Alertas críticas + WhatsApp del trabajo | Javier ↔ agentes (alertas), clientes |
| **Telegram bot** | Alertas medias + reportes | Javier recibe |
| **Email** | Reportes diarios consolidados | Javier recibe |
| **Chatwoot** | UI para tomar control de conversaciones | Javier interviene |
| **Metabase** | Dashboards de métricas | Javier + Harol |
| **n8n UI** | Configurar/editar workflows de agentes | Harol |
| **Repositorio docs/** | Estrategia, prompts, decisiones | Ambos |

### Cadencia

| Frecuencia | Qué pasa |
|---|---|
| **Tiempo real** | Alertas críticas (legal, bad language, sentiment drop) |
| **Cada 5 min** | Cliente pidió humano explícito |
| **Diaria** | Email resumen: leads del día, oportunidades, alertas no resueltas |
| **Semanal** | Review de calidad IA (Javier): conversaciones random, edits sugeridos |
| **Mensual** | Métricas comerciales + decisiones estratégicas |

---

## Cómo evoluciona la organización

### Fase 1 (mes 1-2): MVP operacional

- Javier: 80% en validar producto + cerrar primeros 3 clientes
- Harol: 80% en infraestructura + workflows base
- Agentes: V1 corriendo en modo approval

### Fase 2 (mes 3-4): Validación de mercado

- Javier: 60% ventas + 30% supervisión IA + 10% estrategia
- Harol: 50% mantener infra + 30% nuevos workflows + 20% mejoras
- Agentes: V1 en autopilot temático, V2 entrando

### Fase 3 (mes 5-6): Escalamiento

- Javier: 50% ventas + 30% estrategia + 20% review
- Harol: 60% infra y mantenimiento + 30% V3 + 10% mejoras
- Agentes: V1+V2 en autopilot completo, V3 entrando
- Posible primer humano contratado (Customer Success o Content)

### Fase 4 (mes 6+): Crecimiento

- Javier: 80% estrategia + ventas grandes + brand
- Harol: 80% mantener stack + escalar
- Agentes: 10 corriendo, mejorados continuamente
- 2-3 humanos adicionales (CS, Content, Implementation)

---

## Métricas globales de la organización

### Eficiencia (lo importante)

- **Conversaciones manejadas por agente / por humano** — target: 80/20 al mes 3
- **Costo por lead capturado** — target: <$5 USD en mes 3
- **Tiempo desde primer contacto hasta venta** — target: <14 días
- **Margen operativo** — target: >40% al mes 6

### Salud (que no rompamos cosas)

- **Uptime del stack** — target: >99.5%
- **NPS de clientes** — target: >40 al mes 6
- **Sentiment promedio en WhatsApp** — target: >0.3
- **Burnout signals** (Javier + Harol) — review mensual

---

## Preguntas frecuentes que te harán los clientes

(Y cómo responder coherente con la filosofía organizacional)

**"¿Cuántos son ustedes?"**
> Somos un equipo de 2 humanos + 10 agentes IA que diseñamos nosotros mismos.
> Es nuestro modelo: probamos en nuestra propia operación lo que ofrecemos a
> los clientes. Si no funcionara para nosotros, no te lo venderíamos.

**"¿Y si necesito hablar con alguien?"**
> Siempre podés. Escribís "humano" en WhatsApp y te respondemos en máximo 1 hora
> hábil. Pero si la pregunta la puede resolver el agente, te respondemos en
> 30 segundos.

**"¿No se siente impersonal?"**
> Lo que es impersonal es esperar 3 días por un email genérico. Nuestros agentes
> son rápidos, claros, y consistentes. Y cuando importa de verdad, hablás con
> Javier directo.

---

**Fin del documento.**

> Este doc es la base. El doc complementario [`agentes-ia-stack.md`](./agentes-ia-stack.md)
> tiene el detalle técnico de cada uno de los 10 agentes.
