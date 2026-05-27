import { Score } from "@/components/sections/Score";
import { PageMeta } from "@/components/PageMeta";

export const ScorePage = () => (
  <>
    <PageMeta
      title="Score Digital · Diagnóstico gratis en 5 minutos | eXcalando"
      description="Mide la madurez digital de tu PyME en 5 frentes (presencia, SEO local, captación, atención, automatización). Recibe un plan priorizado al instante. Gratis, sin tarjeta, 5 minutos."
      path="/score"
    />
    <Score />
  </>
);
