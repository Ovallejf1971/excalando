import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageMeta } from "@/components/PageMeta";
import { Section, Eyebrow } from "@/components/sections/_atoms";
import { Manifiesto } from "@/components/sections/Manifiesto";
import { Capas } from "@/components/sections/Capas";
import { PresenciaDigital } from "@/components/sections/PresenciaDigital";
import { EmpleadosDigitales } from "@/components/sections/EmpleadosDigitales";
import { Automatizacion } from "@/components/sections/Automatizacion";
import { Proceso } from "@/components/sections/Proceso";

const DATOS = [
  { n: "99%", l: "de las empresas en LATAM son MIPYMES", fuente: "CEPAL 2025" },
  { n: "8%", l: "de las ventas en LATAM vienen del canal digital", fuente: "Cámara Colombiana de Comercio Electrónico 2025" },
  { n: "38%", l: "de las PyMEs LATAM usa IA hoy — 8 de cada 10 dueños quisiera adoptarla", fuente: "Microsoft Source LATAM 2025" },
  { n: "1/3", l: "de las empresas colombianas sobrevive a los primeros 5 años", fuente: "Confecámaras 2024" },
];

export const ManifiestoPage = () => (
  <>
    <PageMeta
      title="Por qué eXcalando · Manifesto, capacidades y cómo trabajamos"
      description="Lo que antes costaba miles de dólares hoy cabe en el presupuesto de una PyME. Datos sectoriales LATAM, las 4 capas digitales de un negocio, cómo trabajamos y nuestros principios."
      path="/manifiesto"
      type="article"
    />
    {/* 1. HERO — entrada narrativa */}
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        <Eyebrow n="—">Por qué eXcalando</Eyebrow>
        <h1 className="mt-6 mb-8 font-display text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-[-0.035em] text-ink text-balance">
          Algo cambió en los últimos <span className="text-accent">18 meses</span>. Pocas PyMEs se enteraron.
        </h1>
        <p className="text-lg md:text-xl leading-relaxed text-ink-2">
          Lo que antes costaba <strong className="text-ink">$5.000 dólares</strong> — un asistente que atiende a tus clientes 24/7, una web que vende sola, automatizaciones que liberan tu tiempo, dashboards que te dicen qué decisión tomar — hoy cabe en el presupuesto de una PyME.
        </p>
      </motion.div>
    </Section>

    {/* 2. DATOS FIRMADOS — la realidad del sector */}
    <Section alt>
      <div className="mb-12">
        <Eyebrow n="—">Los números</Eyebrow>
        <h2 className="mt-4 text-2xl md:text-4xl font-bold tracking-tight text-ink">
          En América Latina, esta es la realidad de las PyMEs.
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
        {DATOS.map((d, i) => (
          <motion.div
            key={d.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="border-l-2 border-accent pl-5"
          >
            <div className="font-display text-5xl md:text-6xl font-extrabold text-ink tracking-[-0.04em] leading-none mb-3">
              {d.n}
            </div>
            <p className="text-base md:text-lg leading-relaxed text-ink-2 mb-2">{d.l}</p>
            <div className="font-mono text-[11px] text-ink-3 tracking-wider uppercase">Fuente: {d.fuente}</div>
          </motion.div>
        ))}
      </div>
      <div className="mt-12 md:mt-16 max-w-2xl text-lg md:text-xl leading-relaxed text-ink-2">
        Esos números no van a cambiar solos. Y no van a cambiar mañana.
        <br /><br />
        Pregúntate algo simple: <strong className="text-ink">¿cuántos clientes te llegan hoy por canales digitales?</strong> Si la respuesta no te alcanza, el problema no es tu negocio. Es que nadie te tradujo lo digital en algo que puedas usar.
      </div>
    </Section>

    {/* 3. INSIGHT — el marco propietario: las 4 capas */}
    <Capas />

    {/* 4. SOLUCIÓN — detalle de cada capa */}
    <PresenciaDigital />
    <EmpleadosDigitales />
    <Automatizacion />

    {/* 5. CÓMO TRABAJAMOS — el proceso */}
    <Proceso />

    {/* 6. PRINCIPIOS — manifesto firmado */}
    <Manifiesto />

    {/* 7. CTA FINAL — al Score */}
    <Section dark>
      <div className="max-w-2xl">
        <Eyebrow n="—" className="text-ink-on-dark-3">Tu próximo paso</Eyebrow>
        <h2 className="mt-4 mb-6 text-3xl md:text-5xl font-bold tracking-tight text-ink-on-dark text-balance">
          Tu negocio no necesita estar a la altura del 2026. Necesita estar preparado para los <span className="text-accent">años que vienen</span>.
        </h2>
        <p className="text-lg leading-relaxed text-ink-on-dark-2 mb-8">
          Tú sigues haciendo lo que sabes hacer mejor: tu negocio. Nosotros construimos los puentes.
        </p>
        <Button size="lg" asChild>
          <Link to="/score">
            Arrancar mi Score Digital gratis <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Section>
  </>
);
