// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import rehypeMermaid from 'rehype-mermaid';

// Sitio interno eXcalando — privado, sirve docs del monorepo
// Fuente única: ../../docs/  (ver src/content.config.ts)
export default defineConfig({
  site: 'https://interno.excalando.com',
  redirects: { '/': '/interno/' },
  markdown: {
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
    rehypePlugins: [[rehypeMermaid, { strategy: 'img-svg', dark: true }]],
  },
  integrations: [
    starlight({
      title: 'eXcalando · Interno',
      description: 'Libro operativo de eXcalando. Acceso restringido.',
      customCss: ['./src/styles/custom.css'],
      social: {
        github: 'https://github.com/Ovallejf1971/excalando',
      },
      editLink: {
        baseUrl: 'https://github.com/Ovallejf1971/excalando/edit/main/',
      },
      sidebar: [
        {
          label: 'Inicio',
          link: '/',
        },
        {
          label: '01 · Quiénes somos',
          items: [
            { label: 'Socios y roles', link: '/interno/socios-y-roles/' },
            { label: 'Organización', slug: 'roles-y-organizacion' },
            { label: 'Manifiesto (sitio público)', link: 'https://excalando.com/manifiesto', attrs: { target: '_blank' } },
          ],
        },
        {
          label: '02 · Modelo de negocio',
          items: [
            { label: 'Business Model Canvas', slug: 'business-model-canvas' },
            { label: 'Plan de negocio (largo)', slug: 'plan-negocio-agencia-digital-ia' },
            { label: 'Pricing interno + márgenes', link: '/interno/pricing-interno/' },
            { label: 'Unit economics (CAC · LTV · break-even)', link: '/interno/unit-economics/' },
            { label: 'Costos reales mensuales', link: '/interno/costos-reales/' },
          ],
        },
        {
          label: '03 · Producto',
          items: [
            { label: 'Modelo de 4 capas', link: '/interno/producto/modelo-4-capas/' },
            { label: 'Pipeline de producción (cadena de fábrica)', link: '/interno/producto/pipeline-produccion/' },
            { label: 'Catálogo de agentes IA', slug: 'agentes-ia-stack' },
            { label: 'Score Digital — algoritmo + roadmap', link: '/interno/producto/score-digital/' },
            { label: 'WhatsApp agent', slug: 'whatsapp-ai-agent' },
          ],
        },
        {
          label: '04 · Stack técnico',
          items: [
            { label: 'Arquitectura general', slug: 'arquitectura' },
            { label: 'Infraestructura instalada', slug: 'infraestructura-instalada' },
            { label: 'Deploy VPS', slug: 'infra-vps-deploy' },
            { label: 'Plausible analytics', slug: 'infra-plausible-setup' },
            { label: 'SEO tracking', slug: 'seo-tracking-setup' },
            { label: 'Runbooks (qué hacer si falla X)', link: '/interno/runbooks/' },
          ],
        },
        {
          label: '05 · Go-to-Market',
          items: [
            { label: 'Estrategia comercial', slug: 'estrategia-agencia-digital-ia' },
            { label: 'Content strategy v2', slug: 'content-strategy-2026-v2' },
            { label: 'Programa de referidos', link: '/interno/go-to-market/referidos/' },
          ],
        },
        {
          label: '06 · Operación',
          items: [
            { label: 'Onboarding cliente', link: '/interno/operacion/onboarding-cliente/' },
            { label: 'Contratos y legal', link: '/interno/operacion/contratos-y-legal/' },
            { label: 'Contabilidad — flujo', link: '/interno/operacion/contabilidad-flujo/' },
            { label: 'Freelancers y aliados', link: '/interno/operacion/freelancers-y-aliados/' },
          ],
        },
        {
          label: '07 · Roadmap y decisiones',
          items: [
            { label: 'Estado proyecto (snapshot)', slug: 'estado-proyecto-2026-05-31' },
            { label: 'Decisiones estratégicas', slug: 'decisiones-estrategicas-2026-05-05' },
            { label: 'Decisiones pendientes', link: '/interno/roadmap/decisiones-pendientes/' },
          ],
        },
      ],
    }),
  ],
});
