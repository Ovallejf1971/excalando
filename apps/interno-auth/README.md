# interno-auth — gateway de acceso al sitio interno

Pone **login por código al correo (OTP)** delante del sitio interno de eXcalando
(`apps/interno`, Astro Starlight). Reemplaza el htpasswd de OpenLiteSpeed por un
control con **roles admin/usuario** y **registro con aprobación**, replicando el
modelo de auth del PMO.

## Cómo funciona

- El usuario entra → escribe su correo → recibe un **código de 6 dígitos** (vence en
  10 min, un solo uso, máx. 5 intentos) → lo escribe → sesión por cookie firmada.
- **Registro:** cualquiera puede registrarse; queda **pendiente** hasta que un admin
  lo apruebe en `/auth/admin/usuarios`.
- **Roles:** `usuario` ve el sitio; `admin` además gestiona usuarios.
- El código se envía por el **webhook de Gmail de n8n** (`GMAIL_WEBHOOK_URL`), el
  mismo que usa el PMO.

## Rutas

| Ruta | Qué hace |
|---|---|
| `/auth/login` | pedir correo |
| `/auth/login/codigo` | escribir el código |
| `/auth/register` | crear cuenta (pendiente de aprobación) |
| `/auth/admin/usuarios` | panel de admin (aprobar / rol / activar / eliminar) |
| `/auth/logout` | cerrar sesión |
| `/*` | sitio estático protegido (Starlight) |

## Correr en local

```bash
cd apps/interno && npm run build        # genera ../interno/dist
cd ../interno-auth
cp .env.example .env                    # rellena WEB_SECRET_KEY (obligatoria)
python -m venv .venv && . .venv/Scripts/activate   # (Windows: .venv\Scripts\activate)
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8088
# http://localhost:8088  → te redirige a /auth/login
```

Sin `GMAIL_WEBHOOK_URL` el código **no se envía**: queda en los logs (útil para probar
en local).

## Deploy (VPS)

```bash
docker compose up -d --build
```

Monta `../interno/dist` como `/site` (solo lectura) y persiste la BD en el volumen
`interno_auth_data`. Escucha en `127.0.0.1:8088`; OpenLiteSpeed/CyberPanel hace de
proxy reverso de `interno.excalando.com` hacia ese puerto y se **quita el htpasswd**.
Pon `WEB_COOKIE_SECURE=true` (hay HTTPS).
