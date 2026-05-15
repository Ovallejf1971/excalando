# eXcalando · Landing — guía para Claude Code

Este repo es la landing one-page de **eXcalando**, una agencia colombiana de capacidades digitales con IA para PyMEs (5–50 empleados). El producto principal es el **Score Digital** — un diagnóstico gratuito que funciona como lead magnet.

## Stack

- **Vite + React 18 + TypeScript** (strict)
- **Tailwind CSS 3** — utility-first, sin CSS custom salvo `src/index.css`
- **shadcn/ui primitives** copiados in-tree en `src/components/ui/` (Button, Card, Accordion). MIT, modificables sin restricciones.
- **framer-motion** — animaciones del hero, scroll-reveals, transiciones del wizard
- **lucide-react** — iconografía
- **Path alias:** `@/*` → `src/*` (configurado en `tsconfig.json` y `vite.config.ts`)

## Cómo correr

```bash
pnpm install   # o npm/yarn — funciona con cualquiera
pnpm dev       # http://localhost:5173
pnpm build     # tsc -b && vite build → dist/
pnpm preview   # servir el build
```

## Arquitectura

```
src/
├── App.tsx                      ← composición de la landing (orden de secciones)
├── main.tsx                     ← entry point
├── index.css                    ← Tailwind directives + utilidades mínimas (.grid-bg, .shadow-card)
├── data/
│   └── content.ts               ← TODO el copy y datos hardcodeados (SERVICIOS, DOLORES, PROCESO, MANIFIESTO, FAQS, CASOS, LOGOS)
├── lib/
│   └── utils.ts                 ← cn() (clsx + tailwind-merge), formatCOP()
├── components/
│   ├── ScoreDashboard.tsx       ← dashboard animado del hero (preview del Score)
│   ├── ui/                      ← shadcn primitives (button, card, accordion)
│   └── sections/                ← una sección por archivo
│       ├── _atoms.tsx           ← Eyebrow, SectionHeader, Section (wrappers compartidos)
│       ├── Hero.tsx             ← Nav (con menú móvil) + Hero
│       ├── Problema.tsx, Servicios.tsx, Score.tsx, Proceso.tsx,
│       ├── Manifiesto.tsx, Casos.tsx, Faq.tsx, Cta.tsx, Footer.tsx
└── score/                       ← Score Digital (lead magnet funcional)
    ├── types.ts                 ← ScoreAnswers, ScoreReport, FrenteScore, AccionPlan
    ├── questions.ts             ← definición declarativa de los 6 pasos del wizard
    ├── scoring.ts               ← algoritmo: pesos por frente + mapping de respuestas → puntos
    ├── ScoreWizard.tsx          ← formulario multi-step con persistencia localStorage
    └── ScoreReport.tsx          ← reporte con score animado + plan priorizado + CTAs
```

## Convenciones del proyecto

- **Estilos:** todo Tailwind inline. Si necesitas un valor que no está en el config, usa arbitrary values (`text-[88px]`, `tracking-[-0.035em]`). No crees archivos CSS nuevos salvo emergencia.
- **Paleta** (definida en `tailwind.config.ts`):
  - Fondos: `bg` `#0A1628` · `bg-2` `#0d1b30` · `bg-3` `#102441`
  - Acento: `accent` `#00D4FF` (cian eléctrico) · `accent-2` `#00b4dc`
  - Texto: `ink` `#e6ecf5` · `ink-2` `#9fb0c8` · `ink-3` `#5e708a`
  - Líneas: `line` (sutil) · `line-2` (más visible)
  - Estado: `danger` `#ff5577` · `warn` `#ffb547` · `success` `#5fe0a3`
- **Tipografía:** Inter (display + cuerpo), JetBrains Mono (acentos técnicos: números, etiquetas, tracking wide).
- **Tono de copy:** directo, colombiano-neutral, sin jerga inflada. "Tu PyME está perdiendo plata. Te decimos dónde, gratis."
- **Numeración de secciones:** las secciones llevan eyebrow `00–08` (Hero=00, Problema=01, …, CTA=08). Si añades una sección, renumera consistentemente.
- **Animaciones:** entrada del hero con `motion` initial/animate; secciones con `whileInView` + `viewport={{ once: true }}` y delays escalonados (`i * 0.1`).
- **Responsive:** mobile-first. Breakpoints estándar de Tailwind. Verificar siempre en `<sm` (375px), `sm` (640+), `md` (768+), `lg` (1024+).
- **Componentes:** preferir composición de sections; cada sección es autocontenida. Si una sección crece >150 líneas, considera partirla.

## Score Digital — algoritmo

En `src/score/scoring.ts`:

- **5 frentes** con pesos: Presencia web (25), SEO local (20), Captación (20), Atención (20), Automatización (15) — suman 100.
- Cada respuesta del wizard suma puntos en su frente (0–100).
- Score total = `Σ (frente.score × frente.peso) / 100`.
- **Rangos:** Crítico (<35) · Por mejorar (<55) · Aceptable (<75) · Sólido (≥75).
- **Plan priorizado:** elige primero acciones del frente con peor score (mayor leverage). Top 5 ordenadas por impacto en pts.

Para añadir/cambiar preguntas: editar `src/score/questions.ts` (formato declarativo: `select | radio | yesno | counter | text`). Para cambiar pesos o lógica: `src/score/scoring.ts`. Los tipos viven en `src/score/types.ts`.

## TODOs marcados en código (integraciones pendientes)

Buscar `TODO:` en el repo para encontrar:

- `score/ScoreWizard.tsx` — POST de respuestas al backend (`/api/score`) + trigger del CRM (HubSpot/Notion/Airtable)
- `score/ScoreReport.tsx` — URL real de Calendly/Cal.com en el botón "Agendar" + envío de PDF por email
- `Cta.tsx` — Calendly embebido en el botón "Agendar una llamada"
- `Casos.tsx` — reemplazar testimonios por reales una vez aprobados por clientes
- `Casos.tsx` — reemplazar logos por SVGs reales en `/public/logos/`

## Tareas comunes que probablemente vas a hacer

### Cambiar copy
Editar `src/data/content.ts`. Los arrays exportados están tipados implícitamente; mantén la forma del objeto.

### Cambiar paleta de colores
Editar `tailwind.config.ts` (sección `theme.extend.colors`). Reiniciar dev server.

### Añadir una pregunta al Score
1. Añadir el campo a `ScoreAnswers` en `src/score/types.ts`.
2. Añadirlo a algún `STEPS[i].fields` en `src/score/questions.ts`.
3. Mapear la respuesta a puntos en `src/score/scoring.ts` (función `frenteScore` correspondiente).

### Conectar el formulario del Score a un backend
1. En `ScoreWizard.tsx`, dentro de `submit()`, hacer `fetch('/api/score', { method: 'POST', body: JSON.stringify({ answers, report }) })` antes de `setReport(r)`.
2. Crear el endpoint (Next.js API route, Vercel function, o un Express aparte). Probable persistir en Supabase/Postgres + enviar email transaccional con Resend/Postmark.
3. Para CRM: webhook a HubSpot/Notion/Airtable con los campos de contacto.

### Añadir una sección nueva
1. Crear `src/components/sections/MiSeccion.tsx` siguiendo el patrón de las existentes (usa `Section` + `SectionHeader` de `_atoms.tsx`).
2. Importarla y añadirla a `App.tsx` en el orden deseado.
3. Asignarle un número de eyebrow consistente (renumerar el resto si es necesario).

## Lo que NO debes hacer

- No introducir CSS-in-JS (styled-components, emotion). Tailwind es el único sistema.
- No reemplazar shadcn primitives por una librería UI (MUI, Chakra). Están copiados in-tree por una razón: control total.
- No añadir dependencias pesadas sin necesidad. La landing carga rápido y debe seguir así.
- No romper el path alias `@/`. Toda importación interna debe usarlo.
- No hardcodear colores (`#00D4FF`) — usar las clases del config (`text-accent`).
