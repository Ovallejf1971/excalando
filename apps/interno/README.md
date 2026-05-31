# eXcalando · Libro interno

Sitio privado de documentación operativa de eXcalando. Astro + Starlight. Fuente única: `../../docs/`.

## Stack

- **Astro 5** + **Starlight** 0.30
- Contenido: glob loader apuntando a `../../docs/` (incluye `docs/interno/**` y los heredados con frontmatter Starlight).
- Salida: estático en `dist/`.

## Scripts

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # genera dist/
npm run preview    # sirve dist/ local para pruebas
```

## Estructura

```
apps/interno/
├── astro.config.mjs        ← sidebar + integraciones
├── src/
│   ├── content.config.ts   ← loader apuntando a ../../docs/
│   └── styles/custom.css   ← paleta eXcalando
└── package.json

docs/                       ← fuente única
├── interno/                ← contenido NUEVO sólo del libro
│   ├── index.md
│   ├── socios-y-roles.md
│   ├── pricing-interno.md
│   ├── unit-economics.md
│   ├── costos-reales.md
│   ├── producto/
│   ├── operacion/
│   ├── go-to-market/
│   ├── roadmap/
│   └── runbooks/
└── *.md                    ← docs heredados (BMC, ARQUITECTURA, etc.)
```

## Reglas

- **No duplicar.** Los `.md` viven en `docs/`. El libro los renderiza desde ahí.
- **Frontmatter Starlight** obligatorio en todo `.md` que entre al libro: `title:` mínimo, `description:` opcional.
- **Excluidos del libro** (vía glob): `docs/sales/**`, `docs/brand/**`, `docs/content/**`, archivados puntuales (`content-plan-2026.md`, `migracion-multipagina-plan.md`).

## Deploy en VPS

Pendiente — Harol implementa cuando tengamos subdominio `interno.excalando.com` activado.

### Plan de deploy propuesto

1. **Subdominio:** `interno.excalando.com` → mismo VPS Hostinger (62.72.27.80).
2. **Carpeta servida:** `/home/interno.excalando.com/public_html` (o equivalente en CyberPanel).
3. **Pipeline:** GitHub Action `deploy-interno.yml` — `npm run build` + `rsync apps/interno/dist/` al VPS.
4. **TLS:** Let's Encrypt vía CyberPanel.

### Auth — control de acceso por rol

Sitio **privado**. Tres opciones, ordenadas de simple a robusta:

#### Opción A — HTTP Basic Auth global (MVP, rápido)

OpenLiteSpeed `.htaccess` en `/home/interno.excalando.com/public_html/`:

```apacheconf
AuthType Basic
AuthName "eXcalando · Interno"
AuthUserFile /home/interno.excalando.com/.htpasswd
Require valid-user
```

Crear usuarios con `htpasswd -c /home/interno.excalando.com/.htpasswd javier` + `htpasswd /home/interno.excalando.com/.htpasswd harol`.

Pro: 15 minutos de setup. Contra: un solo nivel — todos ven todo.

#### Opción B — Basic Auth por path (acceso por rol)

Reglas de auth distintas por carpeta:

```
/                           → usuarios: javier, harol  (todo)
/interno/operacion/contabilidad-flujo  → +contador
/interno/operacion/freelancers-y-aliados → +aliados-comerciales
/interno/go-to-market/referidos → +referentes
```

Implementación con `<LocationMatch>` o `.htaccess` por subdirectorio + archivos `.htpasswd` separados.

Pro: cumple la matriz de acceso por rol del libro. Contra: gestión de usuarios manual.

#### Opción C — Auth con OAuth o magic links (largo plazo)

Cuando el libro lo usen >5 personas externas, integrar con Cloudflare Access (free tier permite 50 usuarios) o con un proxy con auth tipo Authelia/oauth2-proxy.

Pro: SSO, audit log, expiración. Contra: requiere otra pieza en el stack.

**Recomendación inicial:** opción A en primer release. Migrar a B cuando se sume el contador o el primer comercial referido.

## TODO

- [ ] Crear `src/assets/logo.svg` (reutilizar de `../../src/components/Logo.tsx`)
- [ ] Configurar GitHub Action de deploy
- [ ] Harol: levantar subdominio + auth básica
- [ ] Definir cuenta para Javier y Harol
- [ ] Agregar `EditLink` con repo correcto si cambia el path
