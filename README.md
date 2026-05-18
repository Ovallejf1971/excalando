# eXcalando · Landing One-Page

Landing page de eXcalando, lista para producción. React + TypeScript + Tailwind + shadcn/ui + framer-motion.

## Stack

- **Vite** — bundler / dev server
- **React 18 + TypeScript** — UI
- **Tailwind CSS 3** — estilos (todos inline, sin CSS custom salvo `index.css` mínimo)
- **shadcn/ui primitives** — `Button`, `Card`, `Accordion` (copiados in-tree, MIT, en `src/components/ui/`)
- **framer-motion** — animaciones del hero y scroll reveals
- **lucide-react** — iconografía

## Cómo correr

```bash
pnpm install   # o npm install / yarn
pnpm dev       # http://localhost:5173
pnpm build     # build de producción → dist/
```

## Estructura

```
src/
├── App.tsx                      ← composición principal de la landing
├── main.tsx
├── index.css                    ← Tailwind + utilidades mínimas
├── data/
│   └── content.ts               ← TODO el copy + datos hardcodeados (edita aquí)
├── lib/
│   └── utils.ts                 ← cn() + formatCOP()
└── components/
    ├── ScoreDashboard.tsx       ← dashboard animado del hero
    ├── ui/                      ← shadcn primitives
    │   ├── accordion.tsx
    │   ├── button.tsx
    │   └── card.tsx
    ├── score/                   ← Score Digital (lead magnet funcional)
    │   ├── types.ts
    │   ├── questions.ts         ← definición declarativa de los 6 pasos
    │   ├── scoring.ts           ← algoritmo (pesos por frente, mapping de respuestas)
    │   ├── ScoreWizard.tsx      ← formulario multi-step con persistencia localStorage
    │   └── ScoreReport.tsx      ← reporte con score animado + plan priorizado
    └── sections/
        ├── _atoms.tsx           ← Eyebrow, SectionHeader, Section
        ├── Hero.tsx             ← Nav (con menú hamburguesa móvil) + Hero
        ├── Problema.tsx         ← 3 dolores
        ├── Servicios.tsx        ← 5 servicios con precios "Desde $X"
        ├── Score.tsx            ← lead magnet · embebe ScoreWizard
        ├── Proceso.tsx          ← 4 fases
        ├── Manifiesto.tsx       ← 4 diferenciales numerados
        ├── Casos.tsx            ← testimonios + logos
        ├── Faq.tsx              ← acordeón shadcn
        ├── Cta.tsx              ← cierre con CTA grande
        └── Footer.tsx
```

## Score Digital — algoritmo

El Score se calcula en `src/score/scoring.ts`:

- **5 frentes** con pesos: Presencia web (25), SEO local (20), Captación (20), Atención (20), Automatización (15)
- Cada respuesta del wizard suma puntos en su frente (0–100)
- Score total = suma ponderada
- Rangos: Crítico (<35) · Por mejorar (<55) · Aceptable (<75) · Sólido (≥75)
- El plan priorizado elige primero acciones del frente con peor score (mayor leverage)

Para añadir/cambiar preguntas: editar `src/score/questions.ts`. Para cambiar pesos o lógica: `src/score/scoring.ts`.

## Editar contenido

Todo el copy y los datos están en **`src/data/content.ts`** como arrays exportados (SERVICIOS, DOLORES, PROCESO, MANIFIESTO, FAQS, CASOS, LOGOS). Cambia ahí y la UI se actualiza.

## TODOs marcados en el código

Búsquedas útiles para encontrar pendientes:

- `TODO:` → integraciones que faltan
  - `Casos.tsx` — reemplazar testimonios por reales
  - `Casos.tsx` — reemplazar logos por SVGs reales en `/public/logos/`
  - `Cta.tsx` — integrar formulario funcional + Calendly/Cal.com
  - `score/ScoreWizard.tsx` — POST de respuestas al backend + trigger del CRM
  - `score/ScoreReport.tsx` — URL de Calendly + envío de PDF por email

## Paleta y tipografía

Definidas en `tailwind.config.ts` (rediseño 2026-05-18):

- **bg** `#F4F1EC` (hueso) · **bg-2** `#EDE8E0` · **bg-3** `#E4DED2`
- **dark** `#0F0F0F` (secciones oscuras) · **dark-2** `#1A1A1A` · **dark-3** `#262626`
- **accent** `#0066FF` (Electric Blue) · **accent-2** `#0052CC` · **accent-3** `#4D94FF`
- **ink** `#222222` (texto sobre claro) · **ink-2** `#3a3a3a` · **ink-3** `#6b6b6b`
- **ink-on-dark** `#F4F1EC` (texto sobre oscuro) · **ink-on-dark-2** `#C9C3B8` · **ink-on-dark-3** `#8A857C`
- Fuentes: **Geist** display (700-900) + **Inter** body, **Geist Mono** para acentos técnicos

**Alternancia claro/oscuro:** las secciones alternan `bg` (claro) y `.section-dark` (oscuro) como dispositivo narrativo. La clase `.section-dark` traduce automáticamente los tokens light→dark (text-ink, border-line, bg-bg-2) vía overrides en `src/index.css`.

## Próximos pasos

1. ~~**Score Digital funcional**~~ ✓ implementado
2. ~~**Versión móvil pulida**~~ ✓ breakpoints + menú móvil + densidad afinados
3. **Backend del Score** — endpoint POST que guarde respuestas + envíe PDF + dispare CRM
4. **Páginas de servicio** — una por cada servicio para SEO y conversión
5. **Dashboard del cliente** — área privada con métricas mensuales
