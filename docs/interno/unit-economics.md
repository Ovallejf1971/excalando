---
title: Unit economics
description: CAC, LTV, ratio LTV/CAC y break-even. Versión inicial — actualizar tras primeros 3 clientes pagos.
---

> Documento provisional. Las cifras son **proyecciones** hasta que existan 3+ clientes pagos. Marcar como `validado` cuando haya datos reales.

## Definiciones operativas

- **CAC (Customer Acquisition Cost):** todo el costo asociado a conseguir un cliente — herramientas + horas humanas + pauta (si hay).
- **LTV (Lifetime Value):** ingreso promedio acumulado por cliente desde que entra hasta que se va.
- **Vida promedio cliente:** meses que un cliente típico se queda activo.

## CAC actual (fase orgánica, sin pauta)

| Componente | Costo mensual atribuido | Notas |
|---|---|---|
| Tiempo Javier en contenido + ventas | ~40h/mes × tarifa | A tarifa $100K/h = $4M COP/mes |
| Herramientas (Buffer + analytics + APIs IA contenido) | ~$50 USD/mes | — |
| Pauta | $0 | Regla: 3 meses orgánico antes |

Si conseguimos **2 clientes/mes** en estado de régimen → CAC ~$2M COP/cliente (sin pauta). Si conseguimos 1/mes → ~$4M COP.

> Esta cifra es alta porque incluye tiempo no monetarizado. CAC "cash out" real hoy: prácticamente $0.

## LTV proyectado

Hipótesis de vida promedio cliente:

| Escenario | Vida promedio | Tier promedio | LTV |
|---|---|---|---|
| Pesimista | 6 meses | Básico ($290K) | $1.74M + setup $1.5M = **$3.24M** |
| Realista | 12 meses | Intermedio ($790K) | $9.48M + setup $1.5M = **$10.98M** |
| Optimista | 24 meses | Profesional ($1.59M) | $38.16M + setup $1.5M = **$39.66M** |

> No incluye upsells (cliente que sube de tier o agrega servicios sueltos), que históricamente son la mayor fuente de LTV en agencias.

## Ratio LTV/CAC

| Escenario CAC | Escenario LTV | Ratio | Salud |
|---|---|---|---|
| $4M | $3.24M (pesimista) | 0.8× | 🔴 Quemamos plata |
| $4M | $10.98M (realista) | 2.7× | 🟡 Aceptable |
| $2M | $10.98M (realista) | 5.5× | 🟢 Bueno |
| $2M | $39.66M (optimista) | 20× | 🟢 Excepcional |

**Regla de salud:** ratio LTV/CAC ≥ 3× para considerar el modelo viable. Si <3× en estado de régimen, hay que mover una palanca:

- Bajar CAC (más automatización del contenido / referidos / SEO)
- Subir LTV (más retención / más upsell / subir precios)

## Disparadores de revisión

Recalcular este documento cuando:
- Se cierren los primeros 3 clientes pagos (validar CAC real)
- A los 6 meses del primer cliente (primer dato de retención real)
- Si se activa pauta (cambia CAC drásticamente)
