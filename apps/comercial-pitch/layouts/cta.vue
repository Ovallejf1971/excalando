<script setup lang="ts">
defineProps<{
  cliente?: string
}>()
</script>

<template>
  <div class="slidev-layout dark cta-layout">
    <div class="cta-grid">
      <div class="cta-top">
        <LogoMark :dark="true" :size="32" />
      </div>
      <div class="cta-main">
        <div class="ex-eyebrow">El próximo paso</div>
        <h1 class="cta-title">
          Empezamos por el<br />
          <span class="ex-accent">Score Digital</span>.
        </h1>
        <p class="cta-sub">
          5 minutos. Gratis. Te entregamos un reporte concreto antes de hablar de plata.
        </p>
        <slot />
      </div>
      <div class="cta-foot">
        eXcalando · {{ cliente || 'Capacidades digitales con IA' }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.cta-layout {
  padding: 4.5rem 6rem;
  height: 100%;
}
.cta-grid {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  gap: 2rem;
}
.cta-main {
  align-self: center;
}
.cta-title {
  font-size: 3.25rem;
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1.02;
  color: var(--ex-ink-on-dark);
  margin: 0.5rem 0 0 0;
}
.cta-sub {
  font-size: 1.15rem;
  color: var(--ex-ink-on-dark-2);
  margin-top: 0.9rem;
  max-width: 38rem;
}
.cta-foot {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ex-ink-on-dark-3);
}
</style>
