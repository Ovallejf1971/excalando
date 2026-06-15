---
theme: default
title: eXcalando — Pitch para {{ CLIENTE }}
info: Propuesta personalizada para {{ CLIENTE }}.
highlighter: shiki
lineNumbers: false
transition: slide-left
mdc: true
canvasWidth: 1280
aspectRatio: 16/9
layout: cover
cliente: "{{ CLIENTE }}"
---

<!--
PLANTILLA DE CLIENTE
====================

Reemplaza {{ CLIENTE }} con el nombre del cliente.
Personaliza los slides marcados con // PERSONALIZAR.
El resto puede quedarse igual al maestro (slides.md).

Para presentar:
  npm run dev:cliente --cliente=NOMBRE_ARCHIVO_SIN_EXTENSION

Para exportar PDF:
  npm run export:cliente --cliente=NOMBRE_ARCHIVO_SIN_EXTENSION
-->

---
layout: section
eyebrow: El problema en tu sector
num: "01"
---

<!-- // PERSONALIZAR: reemplaza el problema genérico por uno específico del sector del cliente -->

<div class="problema-intro">
  <h2>
    En tu sector, <span class="ex-accent">{{ DOLOR_SECTOR }}</span><br />
    cuesta más de lo que parece.
  </h2>
  <p class="lead">
    {{ DATO_ESPECIFICO_SECTOR }}
  </p>
</div>

<style>
.problema-intro h2 { font-size: 4rem; line-height: 1.05; margin: 0; }
.problema-intro .lead { font-size: 1.25rem; color: var(--ex-ink-3); margin-top: 1.5rem; }
</style>

---

<!--
A partir de aquí, copia los slides del maestro (slides.md) que quieras incluir.
Las 4 capacidades, proceso y precios suelen quedarse iguales.
Personaliza solo: portada (ya hecha arriba), problema sectorial,
y CTA final (con el WhatsApp/contacto del closer asignado al cliente).
-->
