---
title: Infraestructura instalada
description: Servicios Docker corriendo en el VPS.
---

# Infraestructura instalada — eXcalando

**Última actualización:** 2026-05-05
**Owner técnico:** Harol Mauricio Valencia + Francisco Ovalle

Estado de la infraestructura del proyecto eXcalando en el VPS Hostinger.

---

## ✅ Lo que está corriendo en el VPS

### Bases de datos (Postgres compartido)

Todo en `shared_postgres` (Docker, red `shared-network`).

| Database | Propósito | Estado |
|---|---|---|
| `agencia_digital` | Leads del Score Digital + Knowledge Base + HITL (conversaciones, alertas, oportunidades) | ✅ activa, schema completo |
| `metabase` | Metadata interna de Metabase | ✅ creada |
| `calcom` | Cal.com (eventos, usuarios, integraciones) | ✅ creada, 588 migraciones aplicadas |

### Extensiones Postgres

- **pgvector 0.8.1** instalada en `agencia_digital` para embeddings y búsqueda semántica (RAG)

### Tablas en `agencia_digital`

#### Leads (existentes)
- `leads` — capturas del Score Digital con score, frentes, plan
- vista `leads_resumen`

#### Knowledge Base (nuevas, con embeddings vectoriales)
- `kb_servicios` — los 5 servicios del catálogo
- `kb_faq` — preguntas frecuentes
- `kb_politicas` — políticas internas (cómo cobramos, garantías, etc.)
- `kb_casos` — casos de éxito (cuando los haya)

Todas con índice HNSW para `cosine_ops` sobre embeddings.

#### HITL — Conversaciones y observabilidad (nuevas)
- `conversaciones` — un row por hilo de WhatsApp
- `mensajes_analisis` — análisis sentiment/intent/topics/flags por mensaje
- `alertas` — disparadas por reglas (bad_language, sentiment_drop, opportunity, legal_mention, etc.)
- `oportunidades` — señales de venta detectadas en conversaciones

#### Vistas para dashboards
- `conversaciones_activas` — hilo de WhatsApp con sentimiento + minutos sin respuesta
- `alertas_pendientes` — alertas no revisadas, ordenadas por severidad
- `oportunidades_abiertas` — oportunidades activas con valor estimado

---

## 🐳 Contenedores Docker corriendo

| Contenedor | Puerto interno | Función |
|---|---|---|
| `shared_postgres` | 5432 | Base de datos compartida |
| `shared_redis` | 6379 | Caché, colas |
| `n8n` | (interno) | Orquestador de workflows |
| `n8n_nginx` | 5678 (público) | Reverse proxy n8n |
| `chatwoot_web` | (interno) | Chat omnichannel |
| `chatwoot_sidekiq` | - | Workers de Chatwoot |
| `chatwoot_nginx` | 3001 | Reverse proxy Chatwoot |
| `pgadmin4` | (web) | UI Postgres |
| `evolution-api` | (interno) | Gateway WhatsApp |
| **`metabase`** | **3002** (localhost) | **Dashboards de leads + HITL** ⭐ nuevo |
| **`calcom`** | **3003** (localhost) | **Calendario para agendar reuniones** ⭐ nuevo |
| `angel-verde-admin-api` | 8001 | (otro proyecto, no eXcalando) |
| `georeferenciacion-api` | (otro proyecto) | (otro proyecto, no eXcalando) |

---

## 🌐 URLs externas activas

| URL | Servicio | Estado |
|---|---|---|
| https://excalando.lithv.net | Landing + Score Digital | ✅ live |
| https://n8n.lithv.net | n8n UI | ✅ live |
| https://chat.lithv.net | Chatwoot UI | ✅ live |
| https://db.lithv.net | pgAdmin UI | ✅ live |
| **https://metabase.lithv.net** | **Metabase UI** | ⏳ **falta crear subdominio** |
| **https://cal.lithv.net** | **Cal.com UI** | ⏳ **falta crear subdominio** |

---

## ⏳ Pendiente para que Metabase y Cal.com sean accesibles públicamente

Las dos aplicaciones están corriendo, pero **solo accesibles desde dentro del VPS** (en `localhost:3002` y `localhost:3003`). Para que sean accesibles externamente vía subdominio, se requiere:

### Tarea para Harol

Crear 2 subdominios en CyberPanel apuntando a las apps Docker locales como **reverse proxy**:

#### Subdominio 1 — Metabase

- **Dominio:** `metabase.lithv.net`
- **Tipo:** Reverse Proxy a `http://127.0.0.1:3002`
- **SSL:** Let's Encrypt automático
- **Notas:** Metabase es una webapp Next.js-like, requiere passthrough de WebSocket si Metabase los usa

#### Subdominio 2 — Cal.com

- **Dominio:** `cal.lithv.net`
- **Tipo:** Reverse Proxy a `http://127.0.0.1:3003`
- **SSL:** Let's Encrypt automático
- **Notas:** Cal.com es Next.js, requiere passthrough completo (HTTP/2 OK)

### Configuración recomendada del reverse proxy

Si CyberPanel UI permite configurar reverse proxy directo, usar esa opción. Si requiere modificar el vhost, contenido sugerido (OpenLiteSpeed):

```
extprocessor metabase {
  type                    proxy
  address                 127.0.0.1:3002
  maxConns                100
  pcKeepAliveTimeout      60
  initTimeout             60
  retryTimeout            0
  respBuffer              0
}

context / {
  type                    proxy
  handler                 metabase
  addDefaultCharset       off
}
```

(Análogo para `calcom` cambiando puerto a 3003.)

---

## 🔧 Próxima configuración después de los subdominios

### Metabase (después de tener https://metabase.lithv.net)

1. Acceder a https://metabase.lithv.net
2. Setup wizard: crear admin user (`ovallejf@gmail.com`)
3. Add database: conectar a `shared_postgres` → database `agencia_digital`
4. Crear los 7 dashboards estratégicos (definidos en doc del WhatsApp Agent)

### Cal.com (después de tener https://cal.lithv.net)

1. Acceder a https://cal.lithv.net
2. Setup wizard: crear admin user
3. Configurar Google Calendar como integración (usar la cuenta de Francisco)
4. Crear event types:
   - **Discovery 30 min** (lead nuevo)
   - **Demo 45 min** (lead calificado)
   - **Onboarding 60 min** (cliente nuevo)
5. Configurar SMTP (Gmail OAuth o Resend) para enviar confirmaciones
6. Generar link único de booking → integrar en el agente WhatsApp y en el sitio

---

## 🛠️ Stack de herramientas — resumen final

| Capa | Herramienta | Estado |
|---|---|---|
| **Infraestructura** | VPS Hostinger 62.72.27.80 | ✅ corriendo |
| **Panel** | CyberPanel + OpenLiteSpeed | ✅ |
| **DB** | Postgres 15.14 + pgvector 0.8.1 + Redis | ✅ |
| **Frontend** | Vite + React + Tailwind (`excalando.lithv.net`) | ✅ live |
| **Orquestación** | n8n | ✅ |
| **Chat omnichannel** | Chatwoot | ✅ |
| **WhatsApp gateway** | Evolution API | ✅ |
| **Email transaccional** | Gmail OAuth via n8n | ✅ |
| **Dashboard interno** | Metabase | ⏳ falta subdominio |
| **Calendario** | Cal.com self-hosted | ⏳ falta subdominio |
| **DB UI** | pgAdmin | ✅ |
| **LLM principal** | OpenAI (key pendiente) | ⏳ |
| **LLM fallback** | Claude (key pendiente) | ⏳ |
| **Embeddings** | OpenAI text-embedding-3-small | ⏳ pendiente con key |

---

## 📋 Checklist de "casi listo"

- [x] Postgres con pgvector + KB + tablas HITL
- [x] Metabase corriendo (interno)
- [x] Cal.com corriendo (interno)
- [ ] Subdominio metabase.lithv.net (Harol)
- [ ] Subdominio cal.lithv.net (Harol)
- [ ] OpenAI API key (Francisco)
- [ ] Anthropic API key (Francisco)
- [ ] Setup admin Metabase + dashboards
- [ ] Setup admin Cal.com + event types
- [ ] Cargar contenido inicial KB (5 servicios + 30 FAQs)
- [ ] Workflow n8n: Agente Analizador
- [ ] Workflow n8n: Agente Conversacional
- [ ] Bot Telegram para alertas
- [ ] Activación modo Approval (primeras 100 conversaciones)
