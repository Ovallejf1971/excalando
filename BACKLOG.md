# Backlog eXcalando — por prioridades

> Fuente única de verdad del backlog del proyecto. El roadmap detallado del Score
> Digital vive en [`docs/interno/producto/score-digital.md`](docs/interno/producto/score-digital.md).
>
> **No pertenecen a este proyecto** (son trabajo personal de Javier, viven aparte):
> asistencia corporativa Solidaria (Power Automate) · KB Ingest del asistente personal
> (Metabase / whitelist) · PMO / consola agéntica `asistente.lithv.net`.

_Última actualización: 2026-06-25_

---

## P0 — Dogfooding: lo que un prospecto vería (credibilidad de venta)

> Principio: si le vendemos esto a las PYMES, eXcalando tiene que usarlo primero y
> mostrarlo. La casa del herrero no puede tener azadón de palo.

- [ ] ⭐ **Asistente WhatsApp de eXcalando** — _en progreso 2026-06-30._
      OJO: el asistente **YA está construido y vivo en n8n** (Analyzer+Conversational+RAG+
      Alerts+bridges Twilio y Evolution), no era greenfield. Ver [[project_whatsapp_agent_excalando]].
      - [x] **KB actualizada y en producción** — 4 capacidades del pitch + FAQ + políticas,
            sin precios, Score a 5 frentes. Cargada a `agencia_digital` con `load_kb.py`.
            El RAG ya la sirve (verificado).
      - [x] **Chatwoot recuperado** — estaba en crash-loop (pid stale), ya vivo en `chat.lithv.net`.
      - [x] **Acceso API n8n headless** resuelto + backup de los 6 workflows vivos (`_live-backup/`).
      - [x] **Chatwoot conectado (espejo aditivo)** — inbox "eXcalando WhatsApp" (id 2, API)
            + contenedor `chatwoot-mirror` (`/opt/chatwoot-mirror`, poll 30s) que replica
            `mensajes_analisis` → Chatwoot. Twilio Bridge editado para persistir la respuesta
            del bot (`direction='out'`). **Entrantes Y salientes se espejan en vivo.** Inbox
            limpiado de datos de prueba. Ver `integrations/chatwoot-mirror/`.
            Token del espejo migrado a un usuario dedicado ("eXcalando Espejo", admin cuenta 3),
            ya no depende del login personal de un socio.
            Pendiente menor: fase 2 "hub" — que un humano responda DESDE Chatwoot al cliente.
      - [x] **RAG extendido** — ahora busca en las 3 tablas (servicios + FAQ + políticas) vía
            UNION, y el Conversational inyecta FAQ/políticas al contexto del LLM. Probado:
            "¿permanencia?"/"¿garantía?" ya se responden solas (antes escalaban). Además se
            corrigió un bug: el Conversational llamaba al RAG por URL pública (fallaba por SSL)
            → ahora interno. Versiones vivas en `integrations/n8n/_live-backup/`.
- [ ] **Score Digital A1** — persistir leads: `POST /api/score` → Postgres
      `scores_completados`. Hoy hay un `TODO` en `ScoreWizard.tsx`; si el visitante
      hace el Score y no agenda, perdemos el contacto.

## P1 — Mensaje y conversión (qué dice el sitio)

- [ ] **Revisar el pitch deck** (`apps/comercial-pitch`, Slidev) y confirmar que está
      bien. Javier prefiere su contenido al de la página actual → usarlo como base de
      la narrativa del sitio.
- [ ] **Repensar el Score Digital de la home** — producto + UX, no solo lo visual.
      Alinearlo con la narrativa del pitch.
- [ ] **Rediseño aspiracional del sitio** — salir del look "AI default" hacia plantillas
      world-class (Linear/Stripe/Cursor). _(ya en memoria)_

## P2 — Plataforma / seguridad

- [x] **Sitio interno (`interno.excalando.com`): auth robusta** — ✅ HECHO 2026-06-27.
      htpasswd reemplazado por gateway OTP (`apps/interno-auth`, FastAPI): código al
      correo, roles admin/usuario, registro con aprobación. Admins: Javier + Harol.
      Desplegado en VPS (`/opt/interno-auth`, contenedor `interno-auth` en `:8088`),
      vhost de OpenLiteSpeed convertido a proxy. Usa el webhook de Gmail del PMO.

## P3 — Score Digital, siguientes mejoras

> Detalle y responsables en [`docs/interno/producto/score-digital.md`](docs/interno/producto/score-digital.md).

- [ ] A2 — email automático con PDF del reporte (Resend/Postmark)
- [ ] A3 — tracking del funnel del wizard (Plausible, evento por paso)
- [ ] B1 — sequence de 3 emails post-Score (días 0/2/5)
- [ ] B2 — selección de vertical → recomendaciones contextuales
- [ ] B3 — botón "Compartir con mi equipo" (link único al reporte)
- [ ] C1 — recalibrar pesos con ≥30 Scores reales · C2 — versión SaaS embebible · C3 — Diagnóstico Express pagado

## Infra / pendientes transversales

- [ ] HTTPS de dashboards — DNS Hostinger (Javier + Harol)
- [ ] Evolution API / chip +57 bloqueado por IP del VPS (canal vivo = Twilio +1)
- [ ] Deploy `excalando.com`: faltan 4 secrets de GitHub (VPS_HOST/USER/SSH_KEY/PATH)
- [ ] Correo `hola@excalando.com` sin buzón (sin MX, rebota) → crear casilla o forward
- [ ] Rebrand: comprar dominio + handles, propagar nombre al repo

## Ideas sugeridas (a validar)

- **Embudo único medible:** conectar Score Digital → WhatsApp → Chatwoot → CRM e
  instrumentar los KPIs del Score que hoy no se miden (inicio/finalización/agenda).
- **"Así lo hacemos nosotros" como contenido de venta:** mostrar el propio stack de
  eXcalando (WhatsApp+Chatwoot, Score, automatizaciones) como prueba viva. El dogfooding
  se vuelve material de marketing.
