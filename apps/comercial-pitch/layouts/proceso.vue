<script setup lang="ts">
defineProps<{
  eyebrow?: string
  num?: string
  dark?: boolean
}>()
</script>

<template>
  <div class="slidev-layout proceso-layout" :class="{ dark }">
    <Eyebrow v-if="eyebrow" :num="num" :label="eyebrow" />
    <div class="proceso-content">
      <slot />
    </div>
    <div class="ex-footer-brand">eXcalando · Cómo trabajamos juntos</div>
  </div>
</template>

<style scoped>
.proceso-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.proceso-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
