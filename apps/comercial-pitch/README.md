# eXcalando · Pitch comercial (Slidev)

Sistema de presentación para reuniones comerciales. Plantilla maestra + variantes por cliente.
Exportable a PDF.

## Estructura

```
apps/comercial-pitch/
├── slides.md              ← Pitch MAESTRO (copy genérico)
├── clients/
│   ├── _template.md       ← Skeleton para nuevos clientes
│   └── <cliente>.md       ← Una variante por cada cliente
├── layouts/               ← Layouts custom (cover, capa, proceso, pricing, cta...)
├── components/            ← LogoMark, Eyebrow
├── styles/index.css       ← Paleta + tipografía eXcalando
└── setup/main.ts          ← Carga del CSS
```

## Comandos

```bash
# Instalar (una sola vez)
npm install

# Presentar el pitch maestro
npm run dev

# Presentar una variante por cliente
npm run dev:cliente --cliente=restaurante-andes

# Exportar PDF del maestro
npm run export

# Exportar PDF de una variante
npm run export:cliente --cliente=restaurante-andes
```

El PDF queda en `dist/<cliente>.pdf`.

## Crear una variante para un cliente nuevo

1. Copiá `clients/_template.md` a `clients/<nombre-cliente>.md`
2. Reemplazá `{{ CLIENTE }}`, `{{ DOLOR_SECTOR }}` y `{{ DATO_ESPECIFICO_SECTOR }}`
3. Si querés cambiar más slides, copiá los que necesites desde `slides.md` y editalos
4. Lo demás (las 4 capacidades, proceso, precios) suele quedarse igual al maestro

## Editar el pitch maestro

Editá `slides.md`. Cada slide está separado por `---`. La estructura de layouts y estilos
está definida en `layouts/` y `styles/index.css` — generalmente no necesitás tocar esos.

## Marca

- Logotipo: la **X** mayúscula azul en `eXcalando` (componente `LogoMark.vue`)
- Paleta: hueso `#F4F1EC` sobre claro · `#0F0F0F` sobre oscuro · acento Electric Blue `#0066FF`
- Tipografía: Geist (display, peso pesado) + Inter (cuerpo) + Geist Mono (acentos técnicos)
- Lema lockeado: "Construimos puentes donde los demás hacen muros. Capacidades digitales con IA."

## Slides incluidas

1. Portada (lema)
2. El problema (intro)
3. Tres datos (92% · $5K · 8/10)
4. ¿Para quién es esto? (Sí / No)
5. Las 4 capacidades (overview)
6. Capa 01 · Cómo te ven (Presencia)
7. Capa 02 · Cómo te hablan (Canales)
8. Capa 03 · Cómo trabajas (Operación)
9. Capa 04 · Cómo decides (Inteligencia)
10. Cómo trabajamos (5 etapas)
11. Inversión (3 tiers + setup)
12. Por qué eXcalando (diferenciadores)
13. CTA — Score Digital + WhatsApp
