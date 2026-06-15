<script setup lang="ts">
defineProps<{
  cliente?: string
}>()
</script>

<template>
  <div class="slidev-layout dark cover">
    <div class="cover-grid">
      <div class="cover-meta">
        <LogoMark :dark="true" :size="42" />
        <div class="cover-eyebrow" v-if="cliente">
          Propuesta preparada para <strong>{{ cliente }}</strong>
        </div>
      </div>
      <div class="cover-main">
        <h1 class="cover-lema">
          Construimos puentes<br />
          donde los demás<br />
          hacen <span class="ex-accent">muros</span>.
        </h1>
        <p class="cover-sub">
          Capacidades digitales con IA para PyMEs que quieren crecer.
        </p>
      </div>
      <div class="cover-footer">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.cover {
  padding: 4.5rem 6rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.cover-grid {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  gap: 2rem;
}
.cover-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.cover-eyebrow {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ex-ink-on-dark-2);
}
.cover-eyebrow strong {
  color: var(--ex-ink-on-dark);
  font-weight: 600;
}
.cover-main {
  align-self: center;
}
.cover-lema {
  font-size: 5.5rem;
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1.02;
  color: var(--ex-ink-on-dark);
  margin: 0;
}
.cover-sub {
  font-size: 1.5rem;
  color: var(--ex-ink-on-dark-2);
  margin-top: 2rem;
  max-width: 38rem;
}
.cover-footer {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ex-ink-on-dark-3);
}
</style>
