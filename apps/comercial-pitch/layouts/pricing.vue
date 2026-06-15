<script setup lang="ts">
defineProps<{
  eyebrow?: string
  num?: string
  dark?: boolean
}>()
</script>

<template>
  <div class="slidev-layout pricing-layout" :class="{ dark }">
    <Eyebrow v-if="eyebrow" :num="num" :label="eyebrow" />
    <div class="pricing-content">
      <slot />
    </div>
    <div class="ex-footer-brand">eXcalando · Inversión</div>
  </div>
</template>

<style scoped>
.pricing-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.pricing-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
