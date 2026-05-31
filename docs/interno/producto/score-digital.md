---
title: Score Digital · algoritmo + roadmap de mejoras
description: Cómo funciona hoy, qué tiene de débil, qué mejorar y cuándo.
---

> El Score Digital es la **puerta de entrada** del embudo eXcalando. Si esto funciona bien, el resto del pipeline tiene combustible. Si esto está flojo, todo lo demás se siente caro.

## Cómo funciona hoy

- Wizard de 6 pasos. Implementado en [`src/score/`](https://github.com/Ovallejf1971/excalando/tree/main/src/score) del sitio público.
- **5 frentes** con pesos: Presencia web (25) · SEO local (20) · Captación (20) · Atención (20) · Automatización (15).
- Cada respuesta suma puntos en su frente. Score total = suma ponderada.
- Rangos: Crítico (<35) · Por mejorar (<55) · Aceptable (<75) · Sólido (≥75).
- Plan priorizado: arranca por el frente con peor score (mayor leverage).
- Entrega: reporte web inmediato + CTA "Agendar 30 min".

## Debilidades conocidas (qué falla hoy)

1. **No persiste leads en backend.** Hay `TODO` en `ScoreWizard.tsx` para POST a `/api/score`. Resultado: si alguien hace el Score y no agenda, perdemos el contacto.
2. **No envía el reporte por email.** El cliente lo ve en pantalla y se va. No queda nada que retomar después.
3. **No diferencia por vertical.** Mismas preguntas para clínica dental, restaurante o consultoría. Las recomendaciones son genéricas.
4. **Pesos no validados con clientes reales.** Los 25/20/20/20/15 son intuición de Javier, no datos.
5. **No mide su propio funnel.** ¿Cuántos empiezan el wizard? ¿Cuántos abandonan en qué paso? ¿Cuántos agendan después? Ni idea hoy.
6. **No conecta con CRM** (porque no hay CRM aún).
7. **El reporte es web-only.** No hay PDF descargable que el cliente pueda compartir con su equipo.
8. **No vuelve a contactar.** Sin email + sin sequence, un Score completado es un lead frío en 48h.

## Mejoras priorizadas (orden de leverage)

### Tier A — alto impacto, bajo esfuerzo (semana 1 cuando se ataque)

| # | Mejora | Quién | Cuándo |
|---|---|---|---|
| A1 | POST a `/api/score` → guardar en Postgres `scores_completados` | Harol | 1–2 días |
| A2 | Email automático con PDF del reporte (Resend o Postmark) | Harol + Javier | 2–3 días |
| A3 | Tracking del funnel del wizard (Plausible custom events por paso) | Harol | 1 día |

### Tier B — impacto medio, esfuerzo medio (semana 2)

| # | Mejora | Quién | Cuándo |
|---|---|---|---|
| B1 | Sequence de 3 emails post-Score (a los 0, 2, 5 días) | Javier copy + Harol n8n | 3–4 días |
| B2 | Selección de vertical al inicio → recomendaciones contextuales | Javier (textos) + Harol (lógica) | 4–6 días |
| B3 | Botón "Compartir con mi equipo" (link único al reporte) | Harol | 1 día |

### Tier C — impacto alto, esfuerzo alto (mes 2+)

| # | Mejora | Quién | Cuándo |
|---|---|---|---|
| C1 | Recalibrar pesos con datos reales (≥30 Scores completados) | Javier | Cuando haya datos |
| C2 | Versión SaaS — Score embebible en sitios de partners | Ambos | Mes 9+ |
| C3 | Diagnóstico Express pagado ($200K) — versión consultiva con Javier | Javier | Mes 4+ |

## KPIs del Score (a instrumentar)

| KPI | Meta inicial | Cómo se mide |
|---|---|---|
| Tasa de inicio del wizard (visitantes home → start) | ≥15% | Plausible event `score_start` |
| Tasa de finalización del wizard | ≥60% | Plausible event `score_finish` |
| Tasa de agendamiento post-Score | ≥20% | Cal.com con UTM |
| Tasa de conversión a cliente pago (Score → cliente) | ≥10% | CRM cuando exista |
| Tiempo medio de finalización | <6 min | Plausible |

## Disparador de revisión del algoritmo

Cuando haya **≥30 Scores completados de clientes reales** + datos de qué pasó después (agendó o no), recalibrar pesos. Hasta entonces, los 25/20/20/20/15 son hipótesis.
