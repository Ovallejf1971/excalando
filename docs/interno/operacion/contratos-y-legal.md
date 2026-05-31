---
title: Contratos y legal
description: Templates de contratos, cláusulas no-negociables, qué consultar al abogado.
---

> Documento provisional. Requiere revisión legal antes de usarse con clientes reales.

## Cláusulas no-negociables (vienen del manifiesto)

1. **Sin lock-in:** el cliente puede llevarse todo el sistema funcionando cuando quiera. eXcalando provee dump de base de datos + acceso a configuraciones.
2. **Sin penalidad de salida:** compromiso sugerido de 6 meses, **no contractual**. Sale cuando quiera con 30 días de aviso.
3. **Garantía 30–90 días:** si no hay resultados medibles en 90 días, eXcalando arregla sin costo extra o devuelve setup proporcional.
4. **Propiedad intelectual:** todo lo construido específicamente para el cliente es del cliente. Los templates internos de eXcalando son de eXcalando.
5. **Confidencialidad bilateral:** ni el cliente comparte la metodología eXcalando, ni eXcalando comparte datos del cliente sin permiso.

## Templates a crear

| Template | Estado | Notas |
|---|---|---|
| Contrato de servicios mensual | TODO | Base: contrato de servicios profesionales colombiano. Incluir las 5 cláusulas no-negociables. |
| Orden de cambio | TODO | Para scope creep — si cliente pide algo fuera de BluePrint. |
| Acuerdo de confidencialidad (NDA) | TODO | Para reuniones de discovery con prospectos sensibles. |
| Acuerdo de freelancer / aliado | TODO | Ver [freelancers-y-aliados](/interno/operacion/freelancers-y-aliados/). |

## Qué consultar al abogado (cuando se contrate)

- Validez de e-firma en Colombia para servicios <$5M COP.
- Régimen tributario adecuado para eXcalando (¿simple, común, ESAL no aplica?).
- Manejo de datos personales del cliente bajo Habeas Data Colombia.
- Cláusula de IA: cómo declarar que se usa Claude/OpenAI sin que sea un problema legal.
- Modelo recomendado de facturación para mensualidad (cuenta de cobro vs factura electrónica DIAN).

## Régimen tributario actual

> TODO completar con Javier después de consulta con contador. Pendiente: definir si se factura como persona natural, RST o se constituye SAS.

## Habeas Data y manejo de info cliente

- Datos del cliente final (sus clientes) viven en su propio Postgres / Chatwoot.
- eXcalando es **encargado del tratamiento**, no responsable.
- Documento aparte: política de privacidad eXcalando ↔ cliente. TODO.
