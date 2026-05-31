---
title: Modelo de 4 capas
description: "La arquitectura mental que vendemos al cliente. Internamente: qué entregamos exactamente por capa."
---

> En el lenguaje cliente decimos "capacidades digitales". Internamente las llamamos **capas** porque se construyen una sobre la otra: sin Presencia no hay Canales, sin Canales no hay Operación, sin Operación no hay Inteligencia útil.

## Capa 1 · Presencia Digital

**Qué es:** que el cliente exista digitalmente y sea encontrable.

**Entregables concretos:**
- Sitio web con dominio propio, hosting incluido, SEO base
- Ficha Google My Business optimizada
- Verificación en Bing + Apple Maps
- Schema.org + sitemap + robots.txt
- Email profesional `@dominio` (si no tiene)

**Stack interno:** Vite + React (template) o Astro (caso simple) · hosting en VPS · Cloudflare DNS · GMB API.

## Capa 2 · Canales Digitales

**Qué es:** que el cliente pueda recibir y dar mensajes por donde su público está.

**Entregables concretos:**
- WhatsApp Business con Evolution API
- Instagram + Facebook conectados a Chatwoot
- Formulario web → Chatwoot (no a un email perdido)
- Templates de respuesta + tono de marca documentado
- Horario de atención + mensaje fuera de horario

**Stack interno:** Chatwoot (omnichannel) · Evolution API (WA) · Meta Graph API · n8n para integraciones.

## Capa 3 · Operación

**Qué es:** que la conversación se vuelva acción sin que un humano arrastre datos a mano.

**Entregables concretos:**
- Reservas / agendamiento (Cal.com)
- Cobros (link de pago según país)
- Notificaciones automáticas a equipo del cliente
- Reportes semanales por email (analista digital)
- CRM básico de leads y conversaciones

**Stack interno:** Cal.com self-hosted · n8n para workflows · Postgres compartido · Metabase para reportes · CRM por definir (Twenty / EspoCRM).

## Capa 4 · Inteligencia

**Qué es:** que el sistema responda, recomiende y aprenda. Aquí es donde "agente IA" deja de ser palabra de moda.

**Entregables concretos:**
- Recepcionista WhatsApp 24/7 (responde, agenda, escala a humano)
- Vendedor de fidelización (campañas a base de clientes existente)
- Vigilante de reputación (alerta reviews + sugiere respuesta)
- Community manager (drafts de contenido aprobados antes de publicar)
- Knowledge base propia del cliente (preguntas + respuestas + tono)

**Stack interno:** Claude (Anthropic) primario · OpenAI fallback · Postgres + pgvector para KB · n8n para orquestación · Chatwoot para handoff humano.

## Por qué la capa importa para el cliente

> No se vende "4 cosas sueltas". Se vende **una progresión**.

| Si el cliente está en... | Le proponemos arrancar por... |
|---|---|
| "No tengo nada digital" | Capa 1 completa + base de Capa 2 |
| "Tengo Instagram pero no me escriben bien" | Capa 2 + ordenar Capa 1 si está rota |
| "Recibo muchos mensajes y no doy abasto" | Capa 3 (automatizar) + algo de Capa 4 (filtro) |
| "Quiero crecer ventas con lo que ya tengo" | Capa 4 completa (vendedor fidelización + recepcionista) |

**Score Digital** sirve precisamente para identificar en qué capa está el cliente y cuál es su mayor leverage. Ver [`score-digital`](/interno/producto/score-digital/).
