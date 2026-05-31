---
title: Pipeline de producción · cadena de fábrica
description: Cómo se construye un proyecto eXcalando, etapa por etapa, con inputs, outputs, responsable, tiempos y plantillas.
---

> Este es el documento más importante del libro. Si eXcalando va a escalar, la entrega tiene que ser **predecible** — como una línea de producción, no como artesanía improvisada cada vez.

## Principio rector

> **Vendemos rápido, entregamos por etapas con hitos visibles, cobramos a hitos.**

Un proyecto típico de eXcalando dura **30–90 días** desde el "sí" del cliente hasta operación estable. Se divide en 5 etapas. Cada etapa tiene **un dueño**, **un entregable verificable** y **un hito de cobro** (cuando aplica).

## Mapa de la cadena

```
[1 Descubrimiento]  →  [2 Diseño]  →  [3 Build]  →  [4 Handoff]  →  [5 Operación]
     3–5 días            5–7 días      10–30 días     3–5 días        continuo
     Score Digital       BluePrint    Stack vivo     Cliente usa    Mantenimiento
     + 1 reunión         firmado      en VPS         solo           + reportes
```

---

## Etapa 1 · Descubrimiento

| | |
|---|---|
| **Duración** | 3–5 días calendario |
| **Dueño** | Javier |
| **Apoyo** | — |
| **Input** | Cliente con interés + (idealmente) Score Digital completado |
| **Output** | **Reporte de hallazgos** + propuesta económica firmada |
| **Hito de cobro** | Firma + 50% setup ($750.000 COP) |

**Subpasos:**
1. Cliente completa Score Digital (gratis, automatizado).
2. Reunión de profundización 30–45 min (Zoom o presencial Bogotá).
3. Javier escribe **reporte de hallazgos** usando plantilla `[TODO crear plantilla]` — qué tiene el cliente, qué le falta, cuáles 3 dolores se atacan primero.
4. Propuesta económica con: alcance por capa, hitos, precios, mensualidad sugerida.
5. Firma electrónica (Cal.com + e-firma o PDF).

**Plantillas a crear:** `templates/reporte-hallazgos.md`, `templates/propuesta-economica.md`. TODO.

---

## Etapa 2 · Diseño (BluePrint)

| | |
|---|---|
| **Duración** | 5–7 días calendario |
| **Dueño** | Javier (estrategia) · Harol (arquitectura técnica) |
| **Input** | Propuesta firmada |
| **Output** | **BluePrint del proyecto** — documento técnico-comercial que detalla qué se va a construir |
| **Hito de cobro** | — (sigue dentro del 50% setup) |

**Subpasos:**
1. Sesión de discovery técnico con el cliente (1h) — quién accede a qué, qué herramientas ya usa, qué NO quiere automatizar.
2. Harol propone arquitectura por capa (qué piezas del stack, qué integraciones).
3. Javier propone copy, tono, voz de marca para Capa 2 y 4.
4. **Documento BluePrint** firmado por cliente — ningún cambio fuera de scope sin orden de cambio.

**Plantilla a crear:** `templates/blueprint-cliente.md`. TODO.

---

## Etapa 3 · Build

| | |
|---|---|
| **Duración** | 10–30 días según complejidad |
| **Dueño** | Harol (técnico) · Javier (contenido + revisión) |
| **Apoyo** | Freelancers ad-hoc (diseño visual, video) |
| **Input** | BluePrint firmado |
| **Output** | **Stack del cliente operativo en VPS de pruebas** |
| **Hito de cobro** | Saldo 50% setup al finalizar build ($750.000 COP) |

**Subpasos paralelizables por capa:**

### Capa 1 — Presencia
- [ ] Repo del cliente creado a partir de template
- [ ] Dominio configurado + Cloudflare
- [ ] Sitio deployado a staging
- [ ] SEO base + sitemap + GMB

### Capa 2 — Canales
- [ ] Evolution API instance creada con QR escaneado
- [ ] Chatwoot inbox configurado
- [ ] Webhooks Meta API
- [ ] Templates de respuesta cargados

### Capa 3 — Operación
- [ ] Cal.com configurado con disponibilidad real del cliente
- [ ] n8n workflows base creados
- [ ] Notificaciones de equipo activas
- [ ] Reporte semanal en Metabase

### Capa 4 — Inteligencia
- [ ] KB del cliente cargada en Postgres + pgvector
- [ ] Agente recepcionista probado con 50 consultas reales
- [ ] Reglas de escalado a humano definidas
- [ ] Tono de marca validado por Javier

**Templates a crear por capa:** `templates/cliente-base/` con esqueleto de repo + stack docker-compose. TODO.

---

## Etapa 4 · Handoff

| | |
|---|---|
| **Duración** | 3–5 días |
| **Dueño** | Javier |
| **Input** | Stack operativo en staging |
| **Output** | **Cliente usando el sistema** en producción + capacitado |
| **Hito de cobro** | Primera mensualidad |

**Subpasos:**
1. Migración de staging a dominio productivo del cliente.
2. Capacitación: 1–2 sesiones de 1h con dueño + responsable de operación del cliente.
3. Documento `guía-de-uso` personalizado (qué hace cada agente, cómo intervenir).
4. Activación de monitoreo + alerts.
5. **Sign-off** del cliente: confirma que el sistema responde como espera.

**Plantilla a crear:** `templates/guia-de-uso-cliente.md`. TODO.

---

## Etapa 5 · Operación continua

| | |
|---|---|
| **Duración** | Continuo (mes a mes) |
| **Dueño** | Harol (infra) · Javier (relación + estrategia) |
| **Input** | Cliente en producción |
| **Output** | Cliente activo, satisfecho, expandiendo |
| **Hito de cobro** | Mensualidad recurrente |

**Operativa mensual:**
- Reporte automático por email cada lunes (analista digital).
- Revisión humana del reporte: 30 min Javier cada lunes.
- Mantenimiento de infra: 1 sesión Harol cada 2 semanas.
- Reunión mensual con cliente (incluida en tier Profesional, opcional en Intermedio).
- Trigger de upsell: cuando el cliente pregunta por una funcionalidad que está en otra capa.

---

## Plantillas y activos compartidos (qué nos hace fábrica y no taller)

| Activo | Estado | Dónde vive |
|---|---|---|
| `templates/reporte-hallazgos.md` | TODO | `docs/interno/templates/` |
| `templates/propuesta-economica.md` | TODO | `docs/interno/templates/` |
| `templates/blueprint-cliente.md` | TODO | `docs/interno/templates/` |
| `templates/guia-de-uso-cliente.md` | TODO | `docs/interno/templates/` |
| Repo `cliente-base` (template sitio) | TODO | GitHub Ovallejf1971 |
| Stack `docker-compose-cliente.yml` | TODO | repo cliente-base |
| KB embedding pipeline | Parcial | n8n workflow |
| Prompts del recepcionista | TODO consolidar | Por cliente |

## Capacidad de la fábrica

Con la cadena actual (Javier + Harol, ambos parcial):

- **Build simultáneo:** 1–2 proyectos en etapa 3.
- **Operación simultánea:** hasta ~10 clientes en etapa 5 sin saturar.
- **Cuello de botella conocido:** Javier en etapa 2 (BluePrint requiere su tiempo). Si llega un 3er proyecto en build, frena la captación de nuevos.

> Conclusión operativa: el primer aliado a sumar cuando se sature no es un dev, es un **strategist junior** que pueda redactar BluePrints supervisados.

## Disparadores de revisión del pipeline

- Cuando se cierre el cliente #3 → revisar tiempos reales vs estimados.
- Cuando se sature la capacidad → revisar el cuello de botella y decidir si subcontratar o subir precios.
- Cada 3 meses → revisar plantillas, podar lo que no se usa.
