<script setup lang="ts">
defineProps<{
  eyebrow?: string
  num?: string
  dark?: boolean
}>()
</script>

<template>
  <div class="slidev-layout section-layout" :class="{ dark }">
    <Eyebrow v-if="eyebrow" :num="num" :label="eyebrow" />
    <div class="section-content">
      <slot />
    </div>
    <div class="ex-footer-brand">eXcalando · Capacidades digitales con IA</div>
  </div>
</template>

<style scoped>
.section-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.section-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
