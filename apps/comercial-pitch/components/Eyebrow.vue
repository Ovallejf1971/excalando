<script setup lang="ts">
defineProps<{
  num?: string
  label: string
}>()
</script>

<template>
  <div class="ex-eyebrow">
    {{ label }}
  </div>
</template>
