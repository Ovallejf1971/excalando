<script setup lang="ts">
defineProps<{
  size?: number
  dark?: boolean
}>()
</script>

<template>
  <div class="logomark" :class="{ dark }" :style="{ fontSize: (size || 32) + 'px' }">
    <span class="word">
      e<span class="x">X</span>calando
    </span>
  </div>
</template>

<style scoped>
.logomark {
  font-family: var(--font-display);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1;
  color: var(--ex-ink);
}
.logomark.dark { color: var(--ex-ink-on-dark); }
.x {
  color: var(--ex-accent);
  font-weight: 900;
}
.logomark.dark .x { color: var(--ex-accent-3); }
</style>
