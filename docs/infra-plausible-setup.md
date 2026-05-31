---
title: Plausible Analytics
description: Setup de Plausible self-hosted en VPS.
---

# Plausible Analytics self-hosted en VPS — guía para Harol

Setup de Plausible Community Edition en el VPS Hostinger, expuesto en `plausible.excalando.com`. La landing ya tiene el script Plausible cargado (en `index.html`) — apenas Plausible esté arriba, empieza a registrar pageviews + eventos custom sin tocar el código.

## Subdominio

1. En CyberPanel → Websites → Create Website:
   - Domain: `plausible.excalando.com`
   - Email: el tuyo
   - PHP: cualquiera (no se usa)
2. En el DNS de excalando.com agregar:
   ```
   A    plausible    62.72.27.80    TTL 300
   ```
   (Si DNS está en GitHub Pages ahora, este record convive sin problema con los A apex de Pages — son hosts distintos.)

## Docker compose

Plausible CE oficial: https://github.com/plausible/community-edition

Resumen ejecutivo (en el VPS, como root):

```bash
mkdir -p /opt/plausible && cd /opt/plausible
git clone https://github.com/plausible/community-edition.git .
cp .env.example .env
```

Editar `.env` con:
- `BASE_URL=https://plausible.excalando.com`
- `SECRET_KEY_BASE=` → generar con `openssl rand -base64 48`
- `HTTP_PORT=8000` (interno; OpenLiteSpeed proxea al subdominio)
- `DISABLE_REGISTRATION=invite_only` (solo Javier/Harol crean cuenta)

Si querés reusar el `shared_postgres` y `shared_redis` existentes (ver `docs/ARQUITECTURA.md`), apuntar en `.env`:
- `DATABASE_URL=postgres://plausible:<pwd>@shared_postgres:5432/plausible_db`
- (Plausible además necesita Clickhouse — eso sí debe quedar nuevo, no hay shared).

Levantar:
```bash
docker compose up -d
```

## Reverse proxy en OpenLiteSpeed

CyberPanel → Websites → plausible.excalando.com → Manage → Rewrite Rules. Agregar:
```
RewriteEngine On
RewriteRule ^(.*)$ http://127.0.0.1:8000/$1 [P,L]
```

O usar el Web Admin de OLS para definir un Virtual Host externo apuntando a `127.0.0.1:8000`.

## SSL Let's Encrypt

CyberPanel → Websites → plausible.excalando.com → SSL → Issue SSL.

## Primer login

Una vez levantado, ir a `https://plausible.excalando.com/register`. Crear cuenta admin. Agregar el sitio `excalando.com`. Listo — empieza a registrar.

## Verificación

Desde Javier/tu máquina:
```bash
curl -I https://plausible.excalando.com/js/script.outbound-links.js
# Debe devolver 200 OK con Content-Type: application/javascript
```

Una vez OK, ir a https://excalando.com, navegar un poco, y en el dashboard de Plausible deberías ver el primer pageview en ~30 segundos.

## Eventos custom que ya están cableados

Ver `src/lib/analytics.ts` — la landing dispara estos eventos:

- `Nav · CTA Score` — click en el botón "Score gratis" del nav
- `Hero CTA · Score` / `Hero CTA · Proceso` — botones del hero
- `Score Started` — primera interacción con el wizard
- `Score Step Next` — cada paso del wizard (props: step, step_id)
- `Score Completed` — al calcular (props: score, rango, frente_top)
- `Score Restart` — reset del wizard
- `WhatsApp · Float Button` — click en el botón flotante (props: scrolled_y)
- `WhatsApp · CTA` — botón WhatsApp de la sección CTA
- `FAQ Opened` — apertura de un acordeón FAQ
- `Showreel · Scene Click` — click en dots del showreel (props: scene)

En Plausible, ir a "Goals" y agregar cada uno como goal para verlos en el funnel.

## Mantenimiento

- Backups: la data está en Clickhouse + Postgres. Plausible recomienda backup diario del volumen Clickhouse (`/var/lib/clickhouse/`).
- Updates: `cd /opt/plausible && git pull && docker compose pull && docker compose up -d`.
- Logs: `docker compose logs -f plausible`.
