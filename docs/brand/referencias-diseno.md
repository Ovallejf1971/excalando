# Referencias de diseño · para el rediseño aspiracional

> Doc interno de los fundadores. NO va en la arquitectura ni en material de cliente.
> Sirve para encontrar inspiración cuando se aborde el rediseño del sitio.

---

## Galerías curadas (las imprescindibles)

| Sitio | Para qué | Cómo usarlo |
|---|---|---|
| **[Awwwards](https://www.awwwards.com)** | Lo más premium en diseño web. Sitios premiados de agencias top y marcas grandes. | Filtrar por categoría "SaaS" o "Technology" + país USA/Europa |
| **[Land-book](https://land-book.com)** | Específicamente landing pages bien hechas. Categorizadas por industria y estilo. | Filtrar por "Agency", "SaaS B2B", "AI" |
| **[Lapa.ninja](https://www.lapa.ninja)** | Curaduría densa de landings, gratis. Buen filtro por color/estilo. | Usar el filtro "by industry" → Agency / SaaS |
| **[Httpster](https://httpster.net)** | Lista cronológica de sitios bien hechos. Estética indie, menos corporate. | Scroll diario, ver patrones nuevos |
| **[Godly.website](https://godly.website)** | Curaduría minimalista de los mejores sitios del momento. | Top picks de la semana |
| **[Mobbin](https://mobbin.com)** | Capturas de UI de apps móviles + web. Para ver flows completos, no solo landings. | Buscar "SaaS onboarding", "WhatsApp business" |
| **[SaaSPages](https://saaspages.xyz)** | Galería específica de landings SaaS, categorizada por sección (hero, pricing, etc.) | Para inspirarse en UNA sección puntual |
| **[Refero.design](https://refero.design)** | Componentes específicos de SaaS modernos: pricing tables, testimonials, integrations. | Cuando ya tenés concepto general, refinás por componente |

## Sitios concretos para estudiar (referencias world-class)

### Para tono y estructura general

- **[linear.app](https://linear.app)** — el estándar oro de SaaS B2B. Tipografía, animaciones, color management impecable
- **[stripe.com](https://stripe.com)** — gradients vivos, hero asimétrico, micro-interactions
- **[vercel.com](https://vercel.com)** — espaciado generoso, tipografía pesada, bento layouts
- **[cursor.com](https://cursor.com)** — producto en vivo en el hero, no screenshots estáticos
- **[lovable.dev](https://lovable.dev)** — type heavy, paleta inesperada
- **[resend.com](https://resend.com)** — minimalismo extremo, código real visible
- **[arc.net](https://arc.net)** — hero gigante con video loop, motion design ambicioso
- **[framer.com](https://framer.com)** — animaciones interactivas, layouts asimétricos

### Para agencias específicamente

- **[basement.studio](https://basement.studio)** — agencia con sitio premio
- **[active.theory](https://activetheory.net)** — interactivo extremo
- **[barrel.com](https://barrel.com)** — más corporate pero con personalidad
- **[locomotive.ca](https://locomotive.ca)** — scroll animations gold standard
- **[bruno-simon.com](https://bruno-simon.com)** — portfolio 3D (para inspirarse en romper reglas)

### Para AI agencies / IA-focused

- **[v0.dev](https://v0.dev)** — Vercel, IA generativa, look limpio
- **[perplexity.ai](https://perplexity.ai)** — IA con look serio
- **[anthropic.com](https://anthropic.com)** — para ver cómo se posiciona un líder de IA
- **[openai.com](https://openai.com)** — referencia base

### En español / LATAM (más cercano a tu mercado)

- **[truora.com](https://truora.com)** (Colombia)
- **[cobre.co](https://cobre.co)** (Colombia)
- **[rappi.com](https://rappi.com)** (estructura simple pero efectiva)
- **[platzi.com](https://platzi.com)** (cómo posiciona educación tech en español)
- **[mati.com.co](https://mati.com.co)** (Colombia)

## Recursos para componentes / patrones específicos

| Recurso | Cuándo usarlo |
|---|---|
| **[shadcn/ui](https://ui.shadcn.com)** | Ya lo usás en el sitio. Ver patrones nuevos y componentes que no tenés aún |
| **[Magic UI](https://magicui.design)** | Componentes con animaciones premium, copiables |
| **[Aceternity UI](https://ui.aceternity.com)** | Componentes "wow" — hero animations, scroll effects |
| **[21st.dev](https://21st.dev)** | Catálogo abierto de componentes React modernos |
| **[Hyper UI](https://www.hyperui.dev)** | Componentes Tailwind, gratis |
| **[Tailwind UI](https://tailwindui.com)** | Premium pero el referente de calidad. Plantillas completas. |

## Específicos para PRICING TABLES

- **[Linear pricing](https://linear.app/pricing)** — limpieza extrema
- **[Stripe pricing](https://stripe.com/pricing)** — comparativa transparente
- **[Vercel pricing](https://vercel.com/pricing)** — bento de planes
- **[Sentry pricing](https://sentry.io/pricing/)** — claridad técnica
- **[Resend pricing](https://resend.com/pricing)** — minimalista

## Metodología sugerida

**1. Mood board (30-60 min)** — abrir 10-15 sitios, captura de las secciones que te gustan, pegar en Notion/Figma/Miro, anotar qué te gustó de cada uno.

**2. Sintetizar 3 conceptos visuales (30 min)** — definir 3 direcciones posibles. Ej:
- A. Lovable-style cálido con paleta morado/verde
- B. Linear-style minimalista con cian más sofisticado
- C. Stripe-style con mesh gradients

**3. Validar con 3 personas del público (15 min cada una)** — mostrar los 3 sin contexto, preguntar cuál transmite más confianza/seriedad/innovación.

**4. Construir** el ganador en rama git separada antes de mergear a main.

## Reglas para NO caer en el "AI default"

- ❌ Evitá cian eléctrico (`#00D4FF`) — está en TODO sitio AI
- ❌ Evitá fondo `#0A1628` (azul oscuro estándar)
- ❌ Evitá Inter como única tipografía — combiná con serif o display custom
- ❌ Evitá hero con palabra cursiva accent (es el patrón #1 detectable)
- ❌ Evitá gradient blob detrás del hero
- ✅ Probá: paletas no convencionales, layouts asimétricos, hero con producto en vivo, tipografía variable
