# Plan · Migración a sitio multi-página

*Borrador 2026-05-23 · Pendiente de aprobación de Javier antes de tocar código.*

---

## Por qué

Decisión del 2026-05-23: la landing one-pager actual tiene 14 secciones, demasiados frentes que compiten por atención. Linear, Stripe y Cursor (referencias del rediseño aspiracional) usan 5-8 secciones en home + páginas dedicadas para profundizar.

**Beneficios concretos:**
- SEO: cada URL captura una keyword/intención propia
- Compartible: `excalando.com/manifiesto` se puede compartir directo desde LinkedIn
- Profundidad sin saturar: cada página es tan extensa como necesite
- Mantenimiento: cambiar el manifesto no afecta el flujo de conversión

---

## Arquitectura informacional

### Páginas fase 1 (mes 1)

```
/                       LANDING PRINCIPAL
                        - Hero (lema + CTA al Score)
                        - Qué hacemos (4 outcomes cortos, sin nombrar capas)
                        - Score Digital (lead magnet primario)
                        - FAQ compacto
                        - Footer

/manifiesto             MANIFESTO COMPLETO
                        - El manifesto v6 firmado
                        - Los 4 datos citables (CEPAL, Confecámaras, SAP, Microsoft)
                        - Metáfora puentes vs muros desarrollada
                        - CTA suave: "Hacer mi Score Digital"

/capacidades            LAS 4 CAPAS EN PROFUNDIDAD
                        - Modelo de 4 capas con naming canónico:
                          Presencia Digital · Canales Digitales · Operación · Inteligencia
                        - Una sección por capa con qué resuelve
                        - Cierre: "Todo conectado, todo fluye"
                        - CTA suave: "Diagnostica con el Score Digital"

/score                  WIZARD SCORE DIGITAL
                        - Hoy es sección anidada. Pasa a URL propia compartible.
                        - Mismo wizard funcional, sin cambios de lógica.
                        - Página de resultado compartible con UTM tracking.

/proceso                CÓMO TRABAJAMOS
                        - Diagnóstico → Plan → Implementación → Optimización
                        - Migra el contenido actual de la sección Proceso

/footer-pages           LEGAL
                        - /privacidad
                        - /terminos
                        - Contenido mínimo legal
```

### Páginas fase 2 (mes 2-3, post-validación piloto contenido)

```
/blog                   ÍNDICE DE CONTENIDO
                        - Listado paginado por pilar (P1/P2/P3/P4)
                        - Filtro por categoría
                        - RSS feed para suscripciones

/blog/[slug]            PIEZA INDIVIDUAL
                        - Long-forms P2 y P4 del piloto
                        - Informes sectoriales P1 (resumen + PDF descargable)
                        - JSON-LD Article schema

/casos                  CASOS REALES
                        - Vacío en fase 1
                        - Se llena cuando haya 3+ clientes con permiso
```

### Páginas fase 3 (mes 4+, cuando aplique)

```
/sobre-nosotros         Equipo (Javier + Harol + freelancers)
/precios                Pricing transparente (solo cuando fase 2 del contenido se active)
/contacto               Form simple (opcional — el Score ya es la puerta principal)
```

---

## Implementación técnica

### Stack target

- **Mantener** Vite + React 18 + TypeScript (no migrar a Next.js / Astro — el costo no se justifica para el volumen actual)
- **Agregar** `react-router-dom` v6 para enrutamiento client-side
- **Agregar** plugin de prerender estático para SEO (`vite-plugin-prerender` o `vite-react-ssg`) — clave para que cada ruta indexe en Google sin JS

### Refactor de App.tsx

Hoy:
```tsx
// App.tsx — one-pager actual
<Hero />
<Showreel />
<Problema />
<Score />
<Capas />
<PresenciaDigital />
<EmpleadosDigitales />
<Automatizacion />
<Proceso />
<Manifiesto />
<Casos />
<Faq />
<Cta />
<Footer />
```

Después:
```tsx
// App.tsx — multi-página
<BrowserRouter>
  <Nav />  {/* Nav real con links, no smooth-scroll */}
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/manifiesto" element={<ManifiestoPage />} />
    <Route path="/capacidades" element={<CapacidadesPage />} />
    <Route path="/score" element={<ScorePage />} />
    <Route path="/proceso" element={<ProcesoPage />} />
    <Route path="/privacidad" element={<PrivacidadPage />} />
    <Route path="/terminos" element={<TerminosPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
  <Footer />
</BrowserRouter>
```

Cada página vive en `src/pages/<NombrePage>.tsx` y compone secciones del directorio `src/components/sections/` actual.

### Cambios en hosting (VPS + OpenLiteSpeed)

Para que `excalando.com/manifiesto` sirva el SPA en lugar de devolver 404:

Crear `/home/excalando.com/public_html/.htaccess`:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
```

(Esto está documentado en `/vps-deploy` skill como caso típico SPA.)

Si activamos prerender estático, no hace falta — cada ruta se sirve como HTML real desde `dist/manifiesto/index.html`, etc.

### Workflow de deploy

Sin cambios. El `deploy.yml` actual hace `npm run build` + rsync al VPS. El build de Vite con prerender genera los HTMLs estáticos, rsync los sube. Cero cambios al pipeline.

---

## Plan por etapas

Recomendación: **5 etapas en 5-7 días hábiles**, no big-bang. Cada etapa termina con sitio funcional y publicable.

### Etapa 0 · Preparación (medio día)
- Instalar `react-router-dom`
- Decidir plugin de prerender (recomiendo `vite-react-ssg` por simplicidad)
- Crear `src/pages/` con `HomePage.tsx` que solo importa lo que hoy compone `App.tsx` (cero cambio visual)
- Verificar deploy sigue funcionando

### Etapa 1 · `/manifiesto` (1 día)
- Crear `ManifiestoPage.tsx` con el contenido completo del manifesto v6
- Cambiar el link "Manifiesto" del Nav para apuntar a `/manifiesto`
- Quitar la sección Manifiesto de la home
- Verificar: home más corta, página dedicada funcional, deploy OK

### Etapa 2 · `/capacidades` (1 día)
- Crear `CapacidadesPage.tsx` con las 4 capas (naming nuevo: Presencia Digital · Canales Digitales · Operación · Inteligencia)
- Quitar de la home: Capas + PresenciaDigital + EmpleadosDigitales + Automatizacion (4 secciones)
- Agregar en home: nueva sección "Qué hacemos" sintética con 4 outcomes cortos
- Verificar deploy + responsive

### Etapa 3 · `/score` y `/proceso` (1 día)
- Mover Score wizard a página propia `/score`
- Mover Proceso a página propia `/proceso`
- En home: dejar solo un teaser del Score + CTA "Hacer Score Digital" → `/score`
- Quitar sección Proceso de la home

### Etapa 4 · Páginas legales + cleanup (medio día)
- Crear `/privacidad` y `/terminos` con contenido mínimo legal
- Eliminar la sección CTA de la home (redundante con Score)
- Limpiar imports y archivos no usados
- Verificar Lighthouse / Plausible

### Etapa 5 · SEO finishing (medio día)
- JSON-LD por página (Article para manifesto, FAQPage para FAQ, etc.)
- Sitemap.xml regenerado con todas las rutas
- Meta tags por página (title, description, OG)
- Submit sitemap a Google Search Console

---

## Costo estimado

| Etapa | Tiempo |
|---|---|
| 0. Preparación | 4 horas |
| 1. /manifiesto | 6 horas |
| 2. /capacidades | 6 horas |
| 3. /score + /proceso | 6 horas |
| 4. Legales + cleanup | 4 horas |
| 5. SEO finishing | 4 horas |
| **Total** | **~30 horas** (4 días de trabajo concentrado) |

Spread sobre 1-2 semanas para no interferir con la generación de contenido del piloto.

---

## Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Prerender plugin falla con framer-motion (animaciones del hero) | Probar en etapa 0 con `vite-react-ssg`. Plan B: usar `react-snap` o renunciar al prerender (acepta peor SEO inicial). |
| Links externos antiguos a `excalando.com#capas` se rompen | Implementar redirects en `.htaccess`: `Redirect 301 /#capas /capacidades` |
| Plausible analytics: trackeo de páginas separadas requiere config | Plausible auto-detecta cambios de ruta con SPA mode (ya viene habilitado en script). |
| Footer queda inconsistente entre páginas | Componente Footer único compartido por todas las rutas — ya planeado. |

---

## Lo que NO incluye este plan

- ❌ Cambio de stack a Next.js o Astro (alternativa válida pero costo no justificado hoy)
- ❌ Rediseño visual de las páginas (mantenemos paleta hueso + Electric Blue, font Geist, sistema de secciones actual)
- ❌ Reescritura de copy más allá de los ajustes necesarios para la nueva arquitectura
- ❌ CMS headless (sigue siendo contenido hardcoded en TS, suficiente para volumen actual)

Si quieres alguno de estos como segunda iteración, se planifica aparte.

---

## Decisión pendiente de Javier

Antes de tocar código:

1. **¿Aprobado el plan?** ¿Cambias algo de la arquitectura informacional (páginas que faltan/sobran)?
2. **¿Arrancamos por etapa 0 + 1 esta semana** o esperamos a que pase el piloto de contenido (mes 1)?
3. **¿Prerender estático para SEO sí o no?** Sí es lo recomendado pero suma 4 horas. Sin prerender funciona igual para usuarios pero Google indexa peor las páginas profundas.
