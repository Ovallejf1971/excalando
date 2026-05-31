---
title: Runbooks · qué hacer si X falla
description: Procedimientos paso-a-paso ante incidentes en el stack. Pensados para que el de turno no tenga que pensar.
---

> Los runbooks son la diferencia entre "tenemos un problema" y "el sistema sigue arriba". Cada uno responde a UN síntoma.

## Cuándo se crea un runbook

Regla: **la segunda vez que pasa el mismo incidente, hay que escribir el runbook**. La primera vez aprendemos; la segunda capturamos el aprendizaje.

## Runbooks por crear (priorizados por impacto)

| Síntoma | Stack afectado | Dueño | Estado |
|---|---|---|---|
| Sitio público excalando.com caído (502 / no carga) | VPS + OpenLiteSpeed | Harol | TODO |
| Deploy desde GitHub falla | GitHub Actions + VPS | Harol | TODO |
| WhatsApp del cliente deja de responder | Evolution API + n8n | Harol | TODO |
| Chatwoot no recibe mensajes | Chatwoot + webhooks | Harol | TODO |
| n8n workflow falla en silencio | n8n + logging | Harol | TODO |
| Postgres `shared_postgres` lento o sin espacio | VPS + Docker | Harol | TODO |
| Knowledge base no devuelve resultados relevantes | pgvector + embeddings | Harol | TODO |
| Costo API Claude se dispara | Anthropic + logs internos | Javier + Harol | TODO |

## Plantilla de runbook (cuando se cree uno)

```markdown
---
title: "Runbook: <síntoma>"
---

## Síntoma
Cómo se ve el problema desde afuera.

## Impacto
Qué se rompe. Qué clientes ven el efecto.

## Diagnóstico rápido
1. Paso 1 — qué chequear primero.
2. Paso 2 — qué chequear si paso 1 está OK.

## Resolución
Pasos exactos. Comandos. Sin ambigüedad.

## Verificación
Cómo confirmar que ya está arreglado.

## Postmortem
Qué cambió a raíz de este incidente (config, monitor, alarma).
```
