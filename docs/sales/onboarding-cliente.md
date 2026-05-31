# Onboarding de Cliente Nuevo · Primeros 30 días

> Lo que mandamos al cliente en cada checkpoint para que se sienta acompañado, no abandonado.
> Este flujo lo va a operar el Agente Onboarding (n8n) cuando esté listo.
> Mientras tanto, Javier lo ejecuta manual con estas plantillas.

---

## Día 0 · Inmediatamente después de firmar

### Email + WhatsApp

**Asunto:** ¡Bienvenido a eXcalando, {NOMBRE}! Esto es lo que sigue 🚀

**Cuerpo:**

```
Hola {NOMBRE},

Bienvenido a eXcalando. Acabás de dar el primer paso para que tu negocio
opere como las empresas grandes — con menos esfuerzo del que pensás.

Lo que vamos a hacer en las próximas 4 semanas:

📅 Semana 1 — Discovery
- Lunes {fecha}: Reunión kick-off (60 min). Te mandé invitación de calendario.
- Te pedimos accesos a:
  ✓ Google My Business
  ✓ Instagram + Facebook (si está en tu plan)
  ✓ Tu sistema de facturación o CRM (si aplica)

📅 Semana 2 — Diseño del plan
- Te mostramos el plan detallado en pantalla
- Aprobás (o ajustamos) en máximo 5 días

📅 Semana 3-4 — Construcción
- Trabajamos en silencio. Vos seguís con tu negocio.
- Te avisamos cuando algo necesite tu aprobación.

📅 Día 30 — Primer resultado en vivo
- Reunión de revisión (45 min)
- Vemos métricas iniciales
- Decidimos qué expandir o ajustar

Tu canal de contacto directo:
💬 WhatsApp 24/7: +57 [número]
📧 Email: hola@excalando.com

Si necesitás algo antes del kick-off, escribí. No tenés que esperar.

Confía en el proceso.

Javier Ovalle
Socio Fundador · eXcalando
```

**Acciones internas paralelas:**
- [ ] Crear ticket en sistema interno con datos del cliente
- [ ] Asignar single point of contact (SPOC) de eXcalando
- [ ] Configurar instancia en n8n / Postgres / Chatwoot según servicios contratados
- [ ] Enviar factura de setup
- [ ] Agendar kick-off en Cal.com

---

## Día 7 · Check-in temprano

### Solo WhatsApp (mensaje corto)

```
Hola {NOMBRE}, asistente de eXcalando.

Ya pasó una semana desde que arrancamos. Quería confirmar:

✅ ¿Recibiste el setup que prometimos?
✅ ¿Tenemos los accesos que pedimos?
✅ ¿Algún tema que quieras revisar antes del día 30?

Si todo va bien, no tenés que responder.
Si algo falta, escribí ahora y lo resolvemos en el día.
```

**Acciones internas:**
- [ ] Verificar que todos los accesos fueron entregados (Google, redes, etc.)
- [ ] Verificar que la construcción técnica va según cronograma
- [ ] Si hay bloqueos pendientes del cliente, escalarlo aquí

---

## Día 14 · Status del proyecto

### Email + WhatsApp

**Asunto:** Status día 14 · {CLIENTE} · {servicio}

**Cuerpo:**

```
Hola {NOMBRE},

Mitad del primer mes. Esto es lo que avanzamos:

✅ Lo que ya está vivo:
- {Entregable 1 completado}
- {Entregable 2 completado}

🔄 Lo que estamos terminando esta semana:
- {Entregable en progreso 1}
- {Entregable en progreso 2}

⏳ Lo que sigue para los próximos 14 días:
- {Próximo hito 1}
- {Próximo hito 2}

📊 Métricas iniciales (línea base):
{Si hay datos iniciales, mostrar 2-3 números. Si no, decir "Empezamos a medir desde el día 30, esa es nuestra línea base"}

Si querés revisar algo antes del día 30, agendamos llamada rápida.
Si todo bien, nos vemos en la revisión del día 30.

Confía en el proceso.

Javier
```

**Acciones internas:**
- [ ] Revisar avance vs cronograma
- [ ] Si hay desviaciones > 1 semana, notificar al cliente proactivamente con plan de recuperación
- [ ] Capturar primera métrica de línea base para el reporte del día 30

---

## Día 30 · Primer resultado + reunión

### Email con agenda + Cal.com

**Asunto:** Mañana revisamos resultados de tu primer mes 📊

**Cuerpo:**

```
Hola {NOMBRE},

Mañana tenemos nuestra reunión de revisión de mes 1.
Te mando agenda para que llegues con preguntas listas:

🕐 Hora: {hora} (45 min)
🔗 Link Zoom: {link}

Agenda:

1. (5 min) Cómo te sentiste estas primeras 4 semanas
2. (15 min) Métricas reales: línea base vs lo que esperábamos
3. (15 min) Lo que aprendimos y qué ajustar
4. (10 min) Plan para mes 2: qué expandir o cambiar

Si no podés mañana, respondé y reagendamos.

Si querés ir leyendo de antemano:
{link al reporte del mes 1 generado automáticamente}

Confía en el proceso.

Javier
```

**Acciones internas:**
- [ ] Generar reporte mes 1 con plantilla `reporte-mensual-template.md`
- [ ] Preparar slides cortas (3-4) con los highlights
- [ ] Preparar 1-2 propuestas concretas de ajuste basadas en lo aprendido
- [ ] Después de la reunión: capturar feedback NPS (1-10) en CRM

---

## Día 30+1 · Después de la reunión

### Email post-reunión

**Asunto:** Lo que acordamos para mes 2 · {CLIENTE}

**Cuerpo:**

```
Hola {NOMBRE},

Gracias por la conversación de hoy.
Esto es lo que acordamos:

📌 Continuar con:
- {Acción acordada 1}
- {Acción acordada 2}

🆕 Empezamos a probar:
- {Nuevo experimento 1}
- {Nuevo experimento 2}

⏸ Pausamos / cambiamos:
- {Si aplica}

📅 Próximo checkpoint formal: día 60 (~{fecha})
📅 Siguiente reunión sugerida: ~{fecha}

Mensual NPS: ¿cómo nos calificás del 1 al 5 después de este mes?
- 5: superó expectativas
- 1: no cumplió

Tu respuesta nos ayuda a corregir lo que haga falta.

Confía en el proceso.

Javier
```

---

## Triggers automáticos (cuando Agente Onboarding esté en n8n)

Para que el Agente Onboarding funcione solo, necesita estos triggers:

| Trigger | Cuándo dispara | Qué manda |
|---|---|---|
| `customer_created` | Al insertar registro en tabla `clientes` con `status='active'` | Email + WhatsApp Día 0 |
| `cron daily 9am` | Día 7 desde fecha de firma | WhatsApp Día 7 |
| `cron daily 9am` | Día 14 desde fecha de firma | Email + WhatsApp Día 14 |
| `cron daily 9am` | Día 28 desde fecha de firma | Email con agenda de reunión Día 30 |
| `reunion_completada` | Al cerrar reunión Day 30 en Cal.com con tag `revision-mes-1` | Email post-reunión |

Cuando los servicios estén operativos:
- Si NPS mes 1 < 3 → escalar a Javier automáticamente
- Si NPS mes 1 = 5 → activar flujo `caso-exito-candidato` (pedir si quieren ser caso)
- Si cliente pasa día 60 sin completar acción acordada → recordatorio amable

---

## Plantillas reusables para situaciones inesperadas

### Si hay retraso en entregable

```
Hola {NOMBRE},

Quería avisarte algo antes que te enteres por otro lado:

El {entregable} que prometimos para {fecha original} se nos va a {N días}
porque {motivo breve y honesto}.

Nuevo compromiso: {fecha realista}.

Si esto te afecta de alguna forma, decime y lo conversamos.

Disculpas por la demora.

Javier
```

### Si el cliente no responde 7+ días

```
Hola {NOMBRE},

No supe de vos hace una semana, quería confirmar que todo va bien
y que no tenés algún tema pendiente de mi lado.

Si necesitás algo, escribí.
Si todo va, basta con un 👍

Javier
```

### Si el cliente expresa frustración

```
Hola {NOMBRE},

Te leo y entiendo la frustración.

Esto se gestiona de inmediato. ¿Podemos hablar 15 minutos hoy mismo?
Te paso link para agendar la primera hora disponible: {link Cal.com}

Mientras tanto, escribí acá lo que más te preocupa para llegar
preparado a la llamada.

Javier
```

---

**eXcalando · Agencia Digital · Colombia**
hola@excalando.com · excalando.com
