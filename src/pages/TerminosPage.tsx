import { Section, Eyebrow } from "@/components/sections/_atoms";
import { PageMeta } from "@/components/PageMeta";

export const TerminosPage = () => (
  <>
    <PageMeta
      title="Términos y Condiciones | eXcalando"
      description="Términos de uso de excalando.com. Propiedad intelectual, uso permitido, ley aplicable Colombia. Lenguaje directo."
      path="/terminos"
    />
    <Section>
    <div className="max-w-3xl">
      <Eyebrow n="—">Legal</Eyebrow>
      <h1 className="mt-6 mb-4 font-display text-4xl md:text-6xl font-extrabold leading-[0.95] tracking-[-0.035em] text-ink">
        Términos y Condiciones
      </h1>
      <p className="font-mono text-[11px] text-ink-3 tracking-wider uppercase mb-10">
        Última actualización: 25 de mayo de 2026
      </p>

      <div className="prose-content space-y-7 text-ink-2 text-base md:text-[17px] leading-relaxed">
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-ink mb-3 tracking-tight">1. Aceptación</h2>
          <p>
            Al usar <a href="https://excalando.com" className="text-accent hover:underline">excalando.com</a> aceptas estos términos. Si no estás de acuerdo, no uses el sitio. Operamos desde Colombia bajo legislación colombiana.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold text-ink mb-3 tracking-tight">2. Qué encuentras aquí</h2>
          <p>
            El sitio contiene información sobre nuestros servicios, herramientas gratuitas (como el Score Digital) y contenido educativo. La información es de carácter general y no constituye asesoría legal, financiera o técnica vinculante hasta que firmemos un contrato formal contigo.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold text-ink mb-3 tracking-tight">3. Uso permitido</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Puedes consultar el sitio libremente para informarte.</li>
            <li>Puedes compartir nuestro contenido citando la fuente.</li>
            <li>Puedes usar el Score Digital cuantas veces quieras.</li>
            <li>Puedes contactarnos por cualquier canal disponible.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold text-ink mb-3 tracking-tight">4. Uso NO permitido</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Copiar contenido propio (marca, manifesto, framework de 4 capas, algoritmo del Score) para republicarlo como tuyo.</li>
            <li>Hacer scraping masivo del sitio sin nuestro permiso.</li>
            <li>Intentar acceder a áreas no públicas o vulnerar el sitio.</li>
            <li>Usar el sitio para actividades ilegales o que violen derechos de terceros.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold text-ink mb-3 tracking-tight">5. Propiedad intelectual</h2>
          <p>
            El contenido del sitio (textos, diseño, marca, framework de 4 capas, algoritmo del Score Digital, manifesto) es propiedad de eXcalando. El stack técnico que usamos es mayormente de código abierto y se respetan sus licencias.
          </p>
          <p className="mt-3">
            Si vas a usar fragmentos con fines comerciales o académicos, escríbenos primero — normalmente decimos que sí.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold text-ink mb-3 tracking-tight">6. Limitación de responsabilidad</h2>
          <p>
            El sitio se ofrece "tal cual". Hacemos lo posible por mantener la información actualizada y precisa, pero no garantizamos que esté libre de errores o que esté disponible 24/7. No somos responsables por decisiones que tomes basadas únicamente en información del sitio — para decisiones importantes, asesórate formalmente.
          </p>
          <p className="mt-3">
            Si nos contratas como agencia, los términos específicos de cada servicio se definen en propuestas y contratos por separado.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold text-ink mb-3 tracking-tight">7. Enlaces externos</h2>
          <p>
            El sitio puede contener enlaces a páginas de terceros (referencias bibliográficas, herramientas, redes sociales). No somos responsables del contenido de esos sitios externos.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold text-ink mb-3 tracking-tight">8. Cambios a estos términos</h2>
          <p>
            Podemos actualizar estos términos cuando lo consideremos necesario. La fecha al inicio refleja la última actualización. Si los cambios son significativos, te avisaremos visiblemente en el sitio.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold text-ink mb-3 tracking-tight">9. Ley aplicable</h2>
          <p>
            Estos términos se rigen por las leyes de la República de Colombia. Cualquier disputa se resolverá en los tribunales competentes de la ciudad de Bogotá D.C.
          </p>
        </section>

        <section className="border-t border-line pt-7 mt-10">
          <p className="text-sm text-ink-3">
            ¿Dudas? Escribe a <a href="mailto:hola@excalando.com" className="text-accent hover:underline">hola@excalando.com</a>.
          </p>
          <p className="text-xs text-ink-3 mt-4">
            <em>Nota:</em> estos términos están redactados en lenguaje directo. Para temas legales formales (contratos, cláusulas específicas, propuestas comerciales) usamos documentos separados firmados por ambas partes.
          </p>
        </section>
      </div>
    </div>
  </Section>
  </>
);
