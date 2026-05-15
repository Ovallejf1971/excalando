# Decisiones estratégicas — 2026-05-05

Snapshot de las decisiones tomadas en la sesión del 5 de mayo de 2026, después de
recibir el plan estratégico ampliado (HITL, agentes IA, observabilidad, redes
sociales, modelo financiero, etc.).

Las decisiones se aplican a **todos los docs estratégicos** que se vayan generando
desde aquí. Si una decisión cambia, se actualiza este doc y se propaga.

---

## 👤 Equipo y dedicación

### 1. Francisco Ovalle — fundador

- **Dedicación:** part-time variable
- **Rol:** estratega, ventas, decisiones de negocio, vocero de marca personal
- **Implicación:** el sistema debe operar de forma autónoma cuando Francisco no
  esté disponible. La automatización no es un nice-to-have, es **requisito**.

### 2. Harol Mauricio Valencia — socio técnico

- **Dedicación:** part-time, a la par de Francisco
- **Rol:** infraestructura, deployments, automatizaciones, soporte VPS
- **Implicación:** los workflows técnicos los puede sostener Harol; las decisiones
  de producto y comercial las toma Francisco.

### 3. Equipo extendido

- **Estado actual:** sin terceros
- **Plan:** sumar manos cuando el volumen lo justifique (probable mes 4-6 si los
  números acompañan). Roles candidatos: copywriter, comercial, diseñador.

---

## 💰 Modelo económico

### 4. Presupuesto operativo mensual

- **Inicial:** **<$100 USD/mes** — ultra lean, casi todo open source
- **Filosofía:** validar idea antes de invertir más
- **Trigger para escalar:** si el modelo demuestra ser viable y rentable, evaluar
  ampliar inversión (más adelante)

**Implicación práctica para el stack:**
- Self-hosted siempre que sea posible (Metabase, Plausible, Cal.com, Chatwoot, n8n — ya están)
- APIs: usar gratis o tier mínimo (OpenAI ~$30, Claude fallback solo si OpenAI cae)
- Pauta paga: $0 los primeros 3 meses
- Dominio + branding: lo mínimo necesario por ahora

### 5. Volumen de leads esperado

- **Meta inicial:** **4 leads/semana** (~16/mes) desde el Score Digital
- **Implicación:** el embudo se optimiza para conversión cualitativa, no
  para volumen masivo

---

## 🌎 Mercado objetivo

### 6. Geografía

- **Fase 1 (mes 1-2):** Bogotá presencial + virtual
- **Fase 2 (mes 3+):** Colombia entero (clientes que se puedan atender virtual)
- **Fase 3 (mes 6+):** LATAM (Colombia + México + resto) si el modelo escala

**Implicación:** copy del sitio en español neutral colombiano, pero preparado
para regionalización futura. CTAs de WhatsApp con código país +57 por ahora.

### 7. Sectores objetivo

- **Decisión:** los servicios son **transversales** — no se prioriza sector
- **Implicación:** la KB del agente WhatsApp debe poder atender consultas de
  cualquier sector. El Score Digital ya pregunta sector y se segmenta a posteriori
  (no a priori).

---

## 🛒 Servicios

### 8. Servicio prioritario

- **Decisión:** **Presencia Digital + Asistentes IA en WhatsApp** (los dos en paralelo)
- **Razón:** son los más logrables y los que permiten "hacerlo en vivo" (la propia
  agencia opera con eso, prueba viva del producto)
- **Implicación comercial:** el funnel debe empujar hacia uno de estos dos primero;
  Automatización y Paquetes Integrales son upsell posterior

---

## 📣 Marketing y marca

### 9. Cara visible

- **Decisión:** **ambos en paralelo**
- **Francisco** como founder content (LinkedIn personal, Twitter/X, posts de visión)
- **eXcalando** como producto/marca (Instagram, web, casos)
- **Implicación:** dos calendarios de contenido distintos pero coordinados. El
  agente de contenido IA debe poder generar drafts para ambos perfiles.

### 10. Estrategia de adquisición

- **Decisión:** **solo orgánico los primeros 3 meses**
- **Canales orgánicos prioritarios:**
  - LinkedIn (Francisco personal + página eXcalando)
  - Instagram (página eXcalando)
  - Referidos (empuje activo a la red personal)
  - SEO de blog/contenido a futuro
- **Pauta paga:** $0 inicial. **Trigger de evaluación:** si al mes 1 los números
  no acompañan, considerar pauta liviana ($50-150 USD/mes).
- **Implicación:** la inversión va en **tiempo y contenido**, no en dinero.

---

## 🏷️ Marca: nombre

> **Resolución (2026-05-13):** El nombre fue lockeado en **eXcalando · Agencia Digital**.
> El razonamiento histórico de "Picard-IA" que vivía en esta sección quedó obsoleto y se removió.
> Detalles del nombre nuevo + handles + decisiones de marca en
> `docs/estrategia-agencia-digital-ia.md` sección 0 y en `.agents/product-marketing-context.md`.

### Historial de descarte (corto)

| Nombre | Razón de descarte | Fecha |
|---|---|---|
| Picard-IA | Asociación a IA + guion problemático + suena importado para PyME LATAM | 2026-05-10 |
| Kinetia | Colisión con `getkinetia.com` (misma estilización "KinetIA") | 2026-05-13 |
| KinetiK | `kinetik.com` es empresa NYSE listed (gas/oil); todos los TLDs tomados | 2026-05-13 |
| BeKinetic, GenKinetic | 100% inglés, rompían filtro "español, pronunciable LATAM no anglo" | 2026-05-13 |

---

## 🤖 Decisiones del WhatsApp AI Agent

### 12. Canal de alertas (combinación según severidad)

| Severidad | Disparador | Notificación |
|---|---|---|
| 🔴 **Crítica** | Lenguaje agresivo, mención legal (demanda/denuncia/abogado) | **WhatsApp + Telegram** |
| 🔴 **Alta** | Sentiment cae < -0.5 dos veces seguidas | **WhatsApp** |
| 🟡 **Media** | Cliente pide humano explícito, oportunidad caliente (>0.8) | **Telegram** |
| 🟢 **Baja** | 24h sin respuesta del cliente, FAQ que la IA escaló | **Email diario consolidado** |

### 13. Modo de operación del agente

- **Fase 1 (semanas 1-2 después de lanzamiento):** **Modo Approval** — la IA
  propone respuesta, Francisco aprueba antes de enviar
- **Fase 2 (semanas 3-6):** **Modo Autopilot temático** — IA responde sola en
  temas dominados, approval para temas nuevos
- **Fase 3 (mes 2+):** **Modo Autopilot completo** — IA por defecto, intervención
  humana solo por alertas

**Trigger para avanzar de fase:** métricas de calidad consistentes (tasa de
edición de respuestas <5%, sentiment final positivo en >80% de las conversaciones,
cero alertas críticas no resueltas).

### 14. Temas que NUNCA toca la IA sola

La IA **siempre** escala a humano (sin importar la fase) en estos casos:

- 🚫 **Precios negociados** — descuentos, paquetes a medida, condiciones especiales
- 🚫 **Contratos** — cláusulas, NDAs, términos legales
- 🚫 **Refunds** — devoluciones, cancelaciones de servicios pagos, disputas
- 🚫 **Casos legales** — menciones de abogados, denuncias, demandas, tutelas

### 15. Stack del agente

| Componente | Decisión |
|---|---|
| **LLM principal** | OpenAI (GPT-4 turbo o GPT-4o) |
| **LLM fallback** | Claude (Sonnet 4.6 o Opus 4.7) si OpenAI cae o falla |
| **Embeddings** | OpenAI `text-embedding-3-small` ($0.02/1M tokens) |
| **Calendario** | Cal.com self-hosted en VPS |
| **Voz** | NO en fase inicial. Reconsiderar en mes 6+ si clientes lo piden |
| **Idiomas** | Español primero. Inglés solo cuando llegue primer caso. |

---

## 📌 Decisiones que quedan abiertas (para próximas sesiones)

Estas están listadas para que no se nos olviden:

1. **Confirmar nombre "eXcalando"** o pivotar (decisión en 1-2 semanas)
2. **Comprar dominio definitivo** (depende de #1)
3. **Crear handles sociales reales** (depende de #1 y #2)
4. **Definir paquetes de precios públicos** (3 tiers por servicio) — irá en `modelo-financiero.md`
5. **Definir entregables explícitos** por servicio — irá en `entregables-por-servicio.md`
6. **Calendario editorial de redes** — irá en `estrategia-redes-sociales.md`
7. **Demos a construir** (sectores específicos para mostrar) — irá en `demos-en-sitio.md`
8. **Roles de los 10 agentes IA** — irá en `roles-y-organizacion.md` y `agentes-ia-stack.md`

---

**Las decisiones de este doc son la fuente de verdad. Si entran en conflicto con
otros docs, este gana.**
