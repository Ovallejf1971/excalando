# Setup de tracking SEO — checklist para Francisco

Pasos manuales para activar Google Search Console, Bing Webmaster y Plausible. Hacer en orden — toma ~30 minutos.

## 1. Google Search Console (10 min)

1. Ir a https://search.google.com/search-console
2. Login con cuenta Google (idealmente la cuenta de eXcalando, no la personal)
3. **Add property → URL prefix → `https://excalando.com`** (con la `s` de https y la barra final)
4. Verification method: **HTML tag** (la opción que dice "Add a meta tag to your home page's `<head>` section")
5. Te muestra algo como:
   ```html
   <meta name="google-site-verification" content="abc123xyz...">
   ```
6. Copiar SOLO el valor de `content`.
7. Reemplazarlo en `index.html` línea ~13, donde dice:
   ```html
   <meta name="google-site-verification" content="TODO_REEMPLAZAR_CON_CODIGO_GOOGLE_SEARCH_CONSOLE" />
   ```
8. `git commit && git push` → GitHub Action despliega → esperar 1-2 min.
9. Volver a GSC y click **Verify**. Debería decir "Ownership verified" ✅.

### Submit del sitemap (después de verificar)

10. En GSC → Sitemaps (menú lateral) → URL del sitemap: `https://excalando.com/sitemap.xml` → Submit.
11. Google va a leer el sitemap en ~24h y empezar a indexar.

## 2. Bing Webmaster Tools (5 min)

1. Ir a https://www.bing.com/webmasters
2. Login con cuenta Microsoft (o Google — soporta ambos).
3. **Add a site** → `https://excalando.com`.
4. Opción "Import from Google Search Console" — si ya completaste GSC arriba, podés importar directo y te salta los pasos siguientes.
5. Si manual: verification method **Meta tag**, copiar el valor de `content` del meta `<meta name="msvalidate.01" ...>`.
6. Reemplazar en `index.html` línea ~14:
   ```html
   <meta name="msvalidate.01" content="TODO_REEMPLAZAR_CON_CODIGO_BING_WEBMASTER" />
   ```
7. Commit + push + esperar deploy + click Verify en Bing.
8. Sitemaps → submit `https://excalando.com/sitemap.xml`.

## 3. Plausible Analytics (depende de Harol)

1. Harol primero tiene que levantar Plausible en el VPS — ver `docs/infra-plausible-setup.md`.
2. Una vez levantado en `plausible.excalando.com`, vas a https://plausible.excalando.com/register
3. Creás tu cuenta admin.
4. Add a website → `excalando.com`.
5. Plausible te muestra el snippet — **NO hace falta agregarlo a `index.html`**, ya está pre-cargado apuntando al subdomain.
6. Verificar: en Plausible dashboard, deberías ver el primer pageview en ~30 segundos después de visitar excalando.com.
7. Configurar **Goals** (Settings → Goals) agregando cada evento custom:
   - `Score Completed` ← el más importante, es la conversión real
   - `Score Started`
   - `WhatsApp · Float Button`
   - `WhatsApp · CTA`
   - `Hero CTA · Score`
   - `Nav · CTA Score`
   - `FAQ Opened`
   - `Showreel · Scene Click`

## 4. Verificación final

Cuando los 3 estén arriba:

- En GSC → Coverage → debería empezar a aparecer "Discovered" → "Indexed" en 24-48h.
- En Bing → Site Explorer → similar.
- En Plausible → Dashboard → debería mostrar visitantes + lista de events en Goals.

## 5. Pendiente para más adelante

- **Google Business Profile** (ficha de Google Maps de eXcalando) — para SEO local Colombia.
- **Cuenta LinkedIn Company** + tracking con LinkedIn Insight Tag — para ads B2B.
- **Yandex Webmaster** — relevante si más adelante apuntás al mercado de Europa del Este.
