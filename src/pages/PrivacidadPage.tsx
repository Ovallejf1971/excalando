import { Section, Eyebrow } from "@/components/sections/_atoms";
import { PageMeta } from "@/components/PageMeta";

export const PrivacidadPage = () => (
  <>
    <PageMeta
      title="Política de Privacidad | eXcalando"
      description="Cómo eXcalando trata los datos personales: qué recolectamos, para qué, derechos del titular. Self-hosted, no vendemos datos. Cumple Ley 1581 Colombia."
      path="/privacidad"
    />
    <Section>
    <div className="max-w-3xl">
      <Eyebrow n="—">Legal</Eyebrow>
      <h1 className="mt-6 mb-4 font-display text-4xl md:text-6xl font-extrabold leading-[0.95] tracking-[-0.035em] text-ink">
        Política de Privacidad
      </h1>
      <p className="font-mono text-[11px] text-ink-3 tracking-wider uppercase mb-10">
        Última actualización: 25 de mayo de 2026
      </p>

      <div className="prose-content space-y-7 text-ink-2 text-base md:text-[17px] leading-relaxed">
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-ink mb-3 tracking-tight">1. Quiénes somos</h2>
          <p>
            Esta política aplica a <strong className="text-ink">eXcalando · Agencia Digital</strong> (en adelante "eXcalando"), responsable del tratamiento de datos personales recopilados a través de <a href="https://excalando.com" className="text-accent hover:underline">excalando.com</a>. Operamos desde Colombia bajo la Ley 1581 de 2012 y el Decreto 1377 de 2013.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold text-ink mb-3 tracking-tight">2. Qué datos recolectamos</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-ink">Datos del Score Digital:</strong> nombre, correo, sector de tu negocio, tamaño, respuestas del diagnóstico. Los usas para recibir tu reporte.</li>
            <li><strong className="text-ink">Datos de contacto:</strong> si nos escribes por correo, WhatsApp o formulario, conservamos esa conversación.</li>
            <li><strong className="text-ink">Datos de navegación:</strong> métricas anónimas vía Plausible Analytics (páginas vistas, fuente del tráfico). No usamos cookies de tracking ni Google Analytics.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold text-ink mb-3 tracking-tight">3. Para qué los usamos</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Entregarte tu Score Digital y plan personalizado.</li>
            <li>Responder a tu solicitud de información, propuesta o reunión.</li>
            <li>Enviarte contenido útil sobre digitalización de PyMEs (solo si tú decides suscribirte — nunca por defecto).</li>
            <li>Mejorar el sitio y nuestros servicios.</li>
          </ul>
          <p className="mt-3">
            <strong className="text-ink">No vendemos, alquilamos ni cedemos tus datos a terceros.</strong> Punto.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold text-ink mb-3 tracking-tight">4. Dónde viven tus datos</h2>
          <p>
            Toda la información se almacena en infraestructura propia (servidor self-hosted en Colombia). Algunos servicios técnicos puntuales (procesamiento de IA con Anthropic/OpenAI, hosting con Hostinger) pueden procesar datos en tránsito, sujetos a sus respectivas políticas. Nada sensible sale del servidor sin tu autorización.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold text-ink mb-3 tracking-tight">5. Cuánto tiempo</h2>
          <p>
            Conservamos tus datos mientras tengamos relación contigo o exista una obligación legal de hacerlo. Si nos pides borrarlos, lo hacemos dentro de los 30 días siguientes.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold text-ink mb-3 tracking-tight">6. Tus derechos</h2>
          <p>Como titular de tus datos, puedes en cualquier momento:</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li>Conocer qué datos tenemos tuyos.</li>
            <li>Actualizar, corregir o eliminar tus datos.</li>
            <li>Revocar tu autorización de tratamiento.</li>
            <li>Solicitar copia de tus datos en formato legible.</li>
          </ul>
          <p className="mt-3">
            Escríbenos a <a href="mailto:hola@excalando.com" className="text-accent hover:underline">hola@excalando.com</a> con tu solicitud. Respondemos en máximo 15 días hábiles.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold text-ink mb-3 tracking-tight">7. Cambios a esta política</h2>
          <p>
            Si actualizamos esta política, lo notificaremos en esta misma página con nueva fecha. Si los cambios son significativos, te avisaremos por correo (si nos lo diste).
          </p>
        </section>

        <section className="border-t border-line pt-7 mt-10">
          <p className="text-sm text-ink-3">
            ¿Dudas? Escribe a <a href="mailto:hola@excalando.com" className="text-accent hover:underline">hola@excalando.com</a>.
          </p>
          <p className="text-xs text-ink-3 mt-4">
            <em>Nota:</em> esta política está redactada en lenguaje directo para que la entienda cualquier persona. Si necesitas la versión legal completa o tienes preguntas formales, también puedes pedirla por correo.
          </p>
        </section>
      </div>
    </div>
  </Section>
  </>
);
