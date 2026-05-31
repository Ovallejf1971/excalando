---
title: Contabilidad · flujo
description: Qué le pasamos al contador, cuándo, en qué formato. Versión inicial para contador externo.
---

> Esta sección está dirigida al **contador** o aliado fiscal. Es la única que un contador necesita ver del libro interno.

## Estado actual

eXcalando aún **no tiene contador asignado**. Esto debe formalizarse antes del primer cliente pago.

## Lo que vamos a necesitar del contador

1. **Definir régimen tributario** apropiado (ver sección en [contratos-y-legal](/interno/operacion/contratos-y-legal/#régimen-tributario-actual)).
2. **Facturación electrónica DIAN** habilitada con proveedor (Alegra, Siigo, Loggro, etc.).
3. **Declaración mensual de retenciones e IVA** si aplica.
4. **Cuenta bancaria empresarial** o subcuenta del socio que recibe.
5. **Cierre contable trimestral** con estado de resultados.

## Lo que le entregamos cada mes

| Documento | Cuándo | Formato |
|---|---|---|
| Ingresos del mes (facturas emitidas) | Día 5 mes siguiente | Exportación CRM / Alegra |
| Egresos del mes (gastos pagados) | Día 5 mes siguiente | Hoja Excel + comprobantes |
| Lista de clientes activos + tier | Día 5 mes siguiente | Hoja Excel |
| Movimientos bancarios | Día 5 mes siguiente | Extracto PDF + CSV |

## Lo que NO necesita el contador (no compartir)

- Detalle técnico del stack interno
- BluePrints de proyectos
- Información comercial sensible (descuentos puntuales, pipeline de prospectos)
- Resto del libro interno

## Tareas pendientes contables

- [ ] Contratar contador (referido de red personal Javier)
- [ ] Definir régimen tributario
- [ ] Abrir cuenta bancaria empresarial o subcuenta dedicada
- [ ] Habilitar facturación electrónica
- [ ] Definir mes de cierre contable
