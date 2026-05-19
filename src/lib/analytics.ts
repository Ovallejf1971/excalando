// Tracking helper para Plausible Analytics (self-hosted).
// Falla silently si Plausible no está cargado o el script no existe — nada se rompe en producción.
//
// Uso:
//   track("Score Started");
//   track("WhatsApp Click", { from: "hero" });
//   track("Score Completed", { score: 42, plan_top: "presencia-web" });

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

export const track = (event: string, props?: Record<string, string | number | boolean>) => {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.plausible === "function") {
      window.plausible(event, props ? { props } : undefined);
    } else if (import.meta.env.DEV) {
      // En dev, log a consola para verificar que los eventos se disparen como esperamos
      // eslint-disable-next-line no-console
      console.debug("[analytics:dev]", event, props || {});
    }
  } catch {
    // Silently ignore — nunca debe romper la UI por un fallo de tracking
  }
};

// Eventos canónicos — usar siempre estas constantes (no strings sueltos)
// para que los reportes en Plausible sean consistentes.
export const EVENTS = {
  HERO_CTA_SCORE: "Hero CTA · Score",
  HERO_CTA_PROCESO: "Hero CTA · Proceso",
  SCORE_STARTED: "Score Started",
  SCORE_STEP_NEXT: "Score Step Next",
  SCORE_COMPLETED: "Score Completed",
  SCORE_RESTART: "Score Restart",
  WHATSAPP_FLOAT_CLICK: "WhatsApp · Float Button",
  WHATSAPP_CTA_CLICK: "WhatsApp · CTA",
  NAV_CTA_CLICK: "Nav · CTA Score",
  FAQ_OPENED: "FAQ Opened",
  SHOWREEL_SCENE_CLICK: "Showreel · Scene Click",
} as const;
