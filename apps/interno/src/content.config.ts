import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// Fuente única: docs/ del repo. No duplicamos contenido.
// El loader incluye tanto los .md heredados (raíz de docs/) como los nuevos
// que vivan en docs/interno/.
export const collections = {
  docs: defineCollection({
    loader: glob({
      pattern: [
        '**/*.{md,mdx}',
        '!sales/**',
        '!brand/**',
        '!content/**',
        '!content-plan-2026.md',
        '!migracion-multipagina-plan.md',
      ],
      base: '../../docs',
    }),
    schema: docsSchema(),
  }),
};
