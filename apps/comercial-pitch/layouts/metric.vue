<script setup lang="ts">
defineProps<{
  num?: string
  eyebrow?: string
  dark?: boolean
}>()
</script>

<template>
  <div class="slidev-layout metric-layout" :class="{ dark }">
    <Eyebrow v-if="eyebrow" :num="num" :label="eyebrow" />
    <div class="metric-grid">
      <slot />
    </div>
    <div class="ex-footer-brand">eXcalando · Capacidades digitales con IA</div>
  </div>
</template>

<style scoped>
.metric-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.metric-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  align-items: center;
}
</style>
