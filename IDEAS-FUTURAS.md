# Ideas futuras / herramientas a considerar

Notas de cosas que evaluamos pero **decidimos no adoptar todavía**. Revisar cuando el contexto cambie.

---

## Ruflo (antes "claude-flow") — orquestador multi-agente

**Decisión 2026-06-13:** evaluado, **NO instalado**. Con Claude Code normal + las skills de marketing es suficiente por ahora.

**Qué es:** meta-harness de agentes para Claude Code (repo `ruvnet/ruflo`). Lanza varios agentes en paralelo (swarms), con memoria persistente entre sesiones y agentes especializados. Antes se llamaba claude-flow; el comando/paquete npm sigue siendo `ruflo`/`claude-flow`.

**Cuándo reconsiderarlo (señales de que YA conviene):**
- Cuando la producción de contenido (Content as a Service) necesite generar **muchas piezas en paralelo** — p.ej. drafts para los 6 verticales a la vez aplicando el lenguaje de 4 capas.
- Cuando montemos **SEO programático** (decenas de páginas por vertical/comparación con la misma plantilla).
- Cuando un mismo pipeline repetible justifique orquestar varios agentes coordinados.

**Cuándo NO** (sigue siendo overkill): tareas de un solo hilo (ajustar copy, un workflow n8n, un commit). Para eso, Claude Code normal + skills.

**Cómo instalarlo cuando llegue el momento** (requiere Node, ya está; Claude Code, ya está):

```powershell
# Inicializar Ruflo DENTRO de este repo (no global), para que solo cargue aquí:
npx ruflo@latest init
# Registrarlo como MCP con scope LOCAL (no 'user'/global) para no gravar tokens en otros proyectos:
claude mcp add ruflo --scope local -- npx ruflo@latest mcp start
```

**Por qué scope local y no global:** un MCP global carga sus definiciones de herramientas (Ruflo presume ~215) en TODOS los proyectos = impuesto de tokens permanente. Con scope local solo paga el costo aquí, donde se usa.

Repo: https://github.com/ruvnet/ruflo
