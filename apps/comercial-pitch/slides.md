---
theme: default
title: eXcalando — Pitch comercial
info: |
  Capacidades digitales con IA para PyMEs que quieren escalar.
  Construimos puentes donde los demás hacen muros.
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
transition: slide-left
mdc: true
canvasWidth: 1280
aspectRatio: 16/9
slideNumber: false
layout: cover
---

<!-- 00 — PORTADA -->

---
layout: section
title: El problema
eyebrow: El problema
num: "01"
---

<div class="problema-intro">
  <h2>
    Tu PyME está perdiendo<br />
    plata <span class="ex-accent">sin saber dónde</span>.
  </h2>
  <p class="lead">
    Dos datos que no necesitan interpretación.
  </p>

  <div class="metric-row">
    <div class="metric" v-click>
      <div class="ex-num-huge">92%</div>
      <div class="ex-divider"></div>
      <p class="metric-text">
        <strong>de las ventas en PyMEs LATAM</strong> todavía pasa por el mostrador,
        el voz-a-voz o la suerte.
      </p>
      <p class="metric-source">CEPAL · Cámara Colombiana de Comercio Electrónico, 2025</p>
    </div>
    <div class="metric" v-click>
      <div class="ex-num-huge">8/10</div>
      <div class="ex-divider"></div>
      <p class="metric-text">
        <strong>dueños de PyME dicen que su tecnología</strong> los frena más de
        lo que los ayuda.
      </p>
      <p class="metric-source">SAP SMB Insights, 2024</p>
    </div>
  </div>
</div>

<style>
.problema-intro h2 { font-size: 3.5rem; line-height: 1.05; margin: 0; }
.problema-intro .lead { font-size: 1.2rem; color: var(--ex-ink-3); margin-top: 1.25rem; }
.metric-row { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-top: 3rem; }
.metric { display: flex; flex-direction: column; }
.metric-text { font-size: 1.05rem; line-height: 1.45; color: var(--ex-ink-2); }
.metric-source { font-family: var(--font-mono); font-size: 0.7rem; color: var(--ex-ink-3); margin-top: 1rem; letter-spacing: 0.05em; }
</style>

---
layout: section
title: ¿Para quién es?
eyebrow: ¿Para quién es esto?
num: "02"
---

<div class="audience">
  <div class="audience-col">
    <h3 class="audience-title">Sí es para ti</h3>
    <ul class="audience-list yes">
      <li>Eres dueño/operador de una PyME entre <strong>5 y 50 empleados</strong></li>
      <li>Sabes que el mundo digital es importante pero <strong>no sabes por dónde empezar</strong></li>
      <li>Lo que tienes hoy (web, redes, WhatsApp) <strong>no te funciona como debería</strong></li>
      <li>Quieres <strong>delegar la operación digital</strong>, no aprender otra herramienta más</li>
    </ul>
  </div>
  <div class="audience-col">
    <h3 class="audience-title muted">No es para ti</h3>
    <ul class="audience-list no">
      <li>Empresa grande (>200 empleados) con equipo de IT propio</li>
      <li>Buscas el precio más bajo del mercado, no la mejor solución</li>
      <li>Quieres control técnico al 100% sin delegar nada</li>
      <li>Esperas resultados milagrosos en menos de 30 días</li>
    </ul>
  </div>
</div>

<style>
.audience { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
.audience-title { font-size: 1.5rem; margin-bottom: 1.5rem; }
.audience-title.muted { color: var(--ex-ink-3); }
.audience-list { list-style: none; padding: 0; margin: 0; }
.audience-list li { font-size: 1.05rem; line-height: 1.55; padding: 0.6rem 0; border-top: 1px solid var(--ex-line); }
.audience-list.no li { color: var(--ex-ink-3); }
</style>

---
layout: section
title: Las 4 capacidades
eyebrow: Las 4 capacidades
num: "03"
---

<h2 class="capas-titulo">
  Cuatro frentes que <span class="ex-accent">trabajan integrados</span>,
  no sueltos.
</h2>

<div class="capas-grid">
  <div class="capa-mini">
    <div class="capa-num">01</div>
    <div class="capa-name">Cómo te ven</div>
    <div class="capa-sub">Presencia Digital</div>
  </div>
  <div class="capa-mini">
    <div class="capa-num">02</div>
    <div class="capa-name">Cómo te hablan</div>
    <div class="capa-sub">Canales Digitales</div>
  </div>
  <div class="capa-mini">
    <div class="capa-num">03</div>
    <div class="capa-name">Cómo trabajas</div>
    <div class="capa-sub">Operación</div>
  </div>
  <div class="capa-mini">
    <div class="capa-num">04</div>
    <div class="capa-name">Cómo decides</div>
    <div class="capa-sub">Inteligencia</div>
  </div>
</div>

<style>
.capas-titulo { font-size: 3rem; margin: 0 0 3rem 0; }
.capas-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
.capa-mini { border-top: 2px solid var(--ex-accent); padding-top: 1.25rem; }
.capa-num { font-family: var(--font-mono); font-size: 0.85rem; color: var(--ex-accent); letter-spacing: 0.12em; }
.capa-name { font-family: var(--font-display); font-weight: 800; font-size: 1.5rem; margin: 0.75rem 0 0.25rem; }
.capa-sub { color: var(--ex-ink-3); font-size: 0.95rem; }
</style>

---
layout: capa
title: Cómo te ven
num: "01"
nombre: Cómo te ven
titulo: Presencia Digital
---

<p class="capa-desc">
  Tu web, tus redes, tu ficha de Google. Lo primero que aparece cuando alguien
  busca tu nombre. Si esto está descuidado, <strong>el cliente decide antes de hablarte</strong>.
</p>

<ul class="entregables">
  <li>Sitio web con dominio propio, hosting incluido</li>
  <li>Ficha de Google My Business optimizada</li>
  <li>SEO local básico para que aparezcas en tu zona</li>
  <li>Email profesional @tudominio</li>
</ul>

<style>
.capa-desc { font-size: 1.2rem; line-height: 1.5; color: var(--ex-ink-2); margin-bottom: 2rem; }
.entregables { list-style: none; padding: 0; margin: 0; }
.entregables li { font-size: 1rem; padding: 0.6rem 0; border-top: 1px solid var(--ex-line); position: relative; padding-left: 1.5rem; }
.entregables li::before { content: '→'; position: absolute; left: 0; color: var(--ex-accent); font-weight: 600; }
</style>

---
layout: capa
title: Cómo te hablan
num: "02"
nombre: Cómo te hablan
titulo: Canales Digitales
---

<p class="capa-desc">
  El WhatsApp, el chat de tu web, los DMs. La velocidad de respuesta es donde
  se gana o se pierde el negocio. Hoy <strong>esto puede pasar 24/7 sin un humano contestando</strong>.
</p>

<ul class="entregables">
  <li>WhatsApp Business profesional conectado a tu equipo</li>
  <li>Instagram y Facebook respondiendo desde un mismo lugar</li>
  <li>Formulario web que llega directo, no a un correo perdido</li>
  <li>Mensajes fuera de horario que no dejan al cliente colgado</li>
</ul>

<style>
.capa-desc { font-size: 1.2rem; line-height: 1.5; color: var(--ex-ink-2); margin-bottom: 2rem; }
.entregables { list-style: none; padding: 0; margin: 0; }
.entregables li { font-size: 1rem; padding: 0.6rem 0; border-top: 1px solid var(--ex-line); position: relative; padding-left: 1.5rem; }
.entregables li::before { content: '→'; position: absolute; left: 0; color: var(--ex-accent); font-weight: 600; }
</style>

---
layout: capa
title: Cómo trabajas
num: "03"
nombre: Cómo trabajas
titulo: Operación
---

<p class="capa-desc">
  Los procesos repetitivos de adentro: cotizar, facturar, agendar, recordar,
  despachar. <strong>Cada paso candidato a no hacerse a mano nunca más</strong>.
</p>

<ul class="entregables">
  <li>Reservas y agendamiento automático</li>
  <li>Cobros con link de pago integrado</li>
  <li>Notificaciones automáticas a tu equipo</li>
  <li>Reportes semanales por email sin que tengas que abrir nada</li>
</ul>

<style>
.capa-desc { font-size: 1.2rem; line-height: 1.5; color: var(--ex-ink-2); margin-bottom: 2rem; }
.entregables { list-style: none; padding: 0; margin: 0; }
.entregables li { font-size: 1rem; padding: 0.6rem 0; border-top: 1px solid var(--ex-line); position: relative; padding-left: 1.5rem; }
.entregables li::before { content: '→'; position: absolute; left: 0; color: var(--ex-accent); font-weight: 600; }
</style>

---
layout: capa
title: Cómo decides
num: "04"
nombre: Cómo decides
titulo: Inteligencia
---

<p class="capa-desc">
  Los datos que ya tienes pero no estás mirando. Cuánto vendes, qué cliente vuelve,
  qué producto se mueve, qué mes se cae. <strong>Decidir con esto cambia el negocio</strong>.
</p>

<ul class="entregables">
  <li>Recepcionista WhatsApp 24/7 que responde y agenda</li>
  <li>Vendedor de fidelización a tu base de clientes existente</li>
  <li>Vigilante de reputación que alerta reseñas</li>
  <li>Asistente de contenido que prepara borradores para tus redes</li>
</ul>

<style>
.capa-desc { font-size: 1.2rem; line-height: 1.5; color: var(--ex-ink-2); margin-bottom: 2rem; }
.entregables { list-style: none; padding: 0; margin: 0; }
.entregables li { font-size: 1rem; padding: 0.6rem 0; border-top: 1px solid var(--ex-line); position: relative; padding-left: 1.5rem; }
.entregables li::before { content: '→'; position: absolute; left: 0; color: var(--ex-accent); font-weight: 600; }
</style>

---
layout: proceso
title: Cómo trabajamos
eyebrow: Cómo trabajamos
num: "04"
---

<h2 class="proceso-titulo">5 etapas, plazos firmes, <span class="ex-accent">sin sorpresas</span>.</h2>

<div class="ptimeline">
  <div class="ptl-grid ptl-names">
    <div><strong>Diagnóstico</strong><span>3–5 días</span></div>
    <div><strong>Diseño</strong><span>5–7 días</span></div>
    <div><strong>Construcción</strong><span>10–30 días</span></div>
    <div><strong>Puesta en marcha</strong><span>3–5 días</span></div>
    <div class="ong"><strong>Operación</strong><span>mensual · continuo</span></div>
  </div>
  <div class="ptl-grid ptl-line">
    <div class="ptl-seg"><span class="dot"></span></div>
    <div class="ptl-seg"><span class="dot"></span></div>
    <div class="ptl-seg"><span class="dot"></span></div>
    <div class="ptl-seg"><span class="dot live"></span></div>
    <div class="ptl-seg ong"><span class="dot ong"></span></div>
  </div>
  <div class="ptl-grid ptl-weeks">
    <div>Semana 1</div>
    <div>Semana 2</div>
    <div>Semanas 3 – 6</div>
    <div>Semana 7 · en vivo</div>
    <div class="ong">continuo</div>
  </div>
  <p class="ptl-foot">Cada etapa entrega algo concreto: reporte + propuesta, blueprint firmado, sistema en pruebas, sistema en vivo y soporte mensual.</p>
</div>

---
layout: pricing
title: Inversión
eyebrow: Inversión
num: "05"
---

<h2 class="pricing-titulo">Setup fijo + mensualidad. <span class="ex-accent">Sin sorpresas</span>.</h2>
<p class="pricing-intro">
  Los rangos cubren PyMEs con distintas necesidades. El precio exacto depende del diagnóstico.
</p>

<div class="tiers">
  <div class="tier">
    <div class="tier-name">Básico</div>
    <div class="tier-perfil">Empieza por estar visible</div>
    <div class="tier-price">desde <strong>$290K</strong>/mes</div>
    <ul>
      <li>Sitio + dominio + hosting</li>
      <li>Ficha Google optimizada</li>
      <li>Reportes mensuales automáticos</li>
      <li>Mantenimiento incluido</li>
    </ul>
  </div>
  <div class="tier featured">
    <div class="tier-badge">Más elegido</div>
    <div class="tier-name">Intermedio</div>
    <div class="tier-perfil">Visible + activo</div>
    <div class="tier-price">desde <strong>$790K</strong>/mes</div>
    <ul>
      <li>Todo lo del Básico</li>
      <li>WhatsApp + chat web conectados</li>
      <li>Manejo de reseñas asistido</li>
      <li>Community manager IA</li>
      <li>Fidelización a tu base</li>
    </ul>
  </div>
  <div class="tier">
    <div class="tier-name">Profesional</div>
    <div class="tier-perfil">Todo cubierto</div>
    <div class="tier-price">desde <strong>$1.59M</strong>/mes</div>
    <ul>
      <li>Todo lo del Intermedio</li>
      <li>Recepcionista WhatsApp 24/7</li>
      <li>Automatización a medida</li>
      <li>Revisión estratégica mensual</li>
      <li>Soporte prioritario</li>
    </ul>
  </div>
</div>

<p class="setup-note">
  Setup inicial <strong>desde $1.5M COP</strong> · Pago único al firmar. Cubre toda la construcción.
</p>

<style>
.pricing-titulo { font-size: 2.5rem; margin: 0 0 0.75rem 0; }
.pricing-intro { font-size: 1.05rem; color: var(--ex-ink-3); margin: 0 0 2.5rem 0; }
.tiers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.tier { background: white; border: 1px solid var(--ex-line); border-radius: 12px; padding: 1.5rem; position: relative; }
.tier.featured { border-color: var(--ex-accent); box-shadow: 0 0 0 2px var(--ex-accent); }
.tier-badge { position: absolute; top: -0.7rem; left: 1.5rem; background: var(--ex-accent); color: white; font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.25rem 0.6rem; border-radius: 4px; }
.tier-name { font-family: var(--font-display); font-weight: 800; font-size: 1.5rem; }
.tier-perfil { color: var(--ex-ink-3); font-size: 0.9rem; margin: 0.25rem 0 1rem; }
.tier-price { font-size: 1.1rem; margin-bottom: 1rem; }
.tier-price strong { font-family: var(--font-display); font-size: 1.6rem; }
.tier ul { list-style: none; padding: 0; margin: 0; }
.tier li { font-size: 0.85rem; padding: 0.35rem 0; border-top: 1px solid var(--ex-line); }
.setup-note { font-size: 1.2rem; color: var(--ex-ink); text-align: center; margin-top: 2rem; padding: 1rem 1.5rem; background: var(--ex-bg-3); border-radius: 10px; border: 1px solid var(--ex-line); }
.setup-note strong { font-family: var(--font-display); font-size: 1.4rem; color: var(--ex-accent); }
</style>

---
layout: section
title: Por qué eXcalando
eyebrow: Por qué eXcalando
num: "06"
dark: true
---

<h2 class="dif-titulo">
  Lo que nadie más te va a ofrecer<br />
  <span class="ex-accent">sin letra chica</span>.
</h2>

<div class="dif-grid">
  <div class="dif-item">
    <div class="dif-name">Las 4 capas integradas</div>
    <p>No sueltas. Todo conecta entre sí desde el día uno.</p>
  </div>
  <div class="dif-item">
    <div class="dif-name">Cero lock-in</div>
    <p>Si te quieres ir, te llevas todo funcionando. Sin secuestros.</p>
  </div>
  <div class="dif-item">
    <div class="dif-name">Cobramos por valor</div>
    <p>El precio está atado al resultado, no a las horas.</p>
  </div>
  <div class="dif-item">
    <div class="dif-name">Sin penalidad de salida</div>
    <p>Sales cuando quieras con 30 días de aviso. Punto.</p>
  </div>
  <div class="dif-item">
    <div class="dif-name">Diagnóstico gratis</div>
    <p>Ves el valor antes de pagar un peso.</p>
  </div>
  <div class="dif-item">
    <div class="dif-name">Garantía 30–90 días</div>
    <p>Si no hay resultados, lo arreglamos. Sin costo extra.</p>
  </div>
</div>

<style>
.dif-titulo { font-size: 3.25rem; margin: 0 0 2.5rem 0; }
.dif-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem 3rem; }
.dif-item { border-top: 1px solid var(--ex-line-on-dark); padding-top: 1rem; }
.dif-name { font-family: var(--font-display); font-weight: 700; font-size: 1.2rem; margin-bottom: 0.5rem; }
.dif-item p { font-size: 0.95rem; color: var(--ex-ink-on-dark-2); line-height: 1.5; }
</style>

---
layout: cta
title: Siguiente paso
---

<div class="cta-actions">
  <div class="cta-step">
    <div class="step-num">01</div>
    <div>
      <strong>Haz el Score Digital</strong>
      <span class="step-meta">5 minutos · Gratis</span>
    </div>
  </div>
  <div class="cta-step">
    <div class="step-num">02</div>
    <div>
      <strong>Repasamos el reporte juntos</strong>
      <span class="step-meta">30 minutos · Sin compromiso</span>
    </div>
  </div>
  <div class="cta-step">
    <div class="step-num">03</div>
    <div>
      <strong>Propuesta firme</strong>
      <span class="step-meta">Alcance, plazos, precio · Sin presión</span>
    </div>
  </div>
</div>

<div class="cta-buttons">
  <a class="cta-primary" href="https://excalando.com/score" target="_blank" rel="noopener">Hacer el Score Digital →</a>
  <div class="cta-secondary">WhatsApp · +57 300 123 4567</div>
</div>

<style>
.cta-actions { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1.25rem; }
.cta-step { display: flex; gap: 1.5rem; align-items: baseline; padding: 0.55rem 0; border-top: 1px solid var(--ex-line-on-dark); color: var(--ex-ink-on-dark); }
.cta-step .step-num { font-family: var(--font-mono); font-size: 0.9rem; color: var(--ex-accent-3); letter-spacing: 0.12em; min-width: 2rem; }
.cta-step strong { font-family: var(--font-display); font-weight: 700; font-size: 1.2rem; display: block; }
.cta-step .step-meta { font-size: 0.9rem; color: var(--ex-ink-on-dark-3); margin-top: 0.25rem; display: block; }
.cta-buttons { display: flex; gap: 1.5rem; margin-top: 1.5rem; align-items: center; }
.cta-primary { background: var(--ex-accent); color: white; font-family: var(--font-display); font-weight: 700; padding: 1rem 1.5rem; border-radius: 8px; font-size: 1.1rem; text-decoration: none; display: inline-block; }
.cta-secondary { color: var(--ex-ink-on-dark); font-family: var(--font-mono); padding: 1rem 0; font-size: 1rem; letter-spacing: 0.05em; }
</style>
