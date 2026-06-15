<script setup lang="ts">
defineProps<{
  num: string
  nombre: string
  titulo: string
  dark?: boolean
}>()
</script>

<template>
  <div class="slidev-layout capa-layout" :class="{ dark }">
    <div class="capa-header">
      <Eyebrow :num="num" :label="nombre" />
    </div>
    <div class="capa-body">
      <div class="capa-titular">
        <h2>{{ titulo }}</h2>
      </div>
      <div class="capa-detalle">
        <slot />
      </div>
    </div>
    <div class="ex-footer-brand">eXcalando · Las 4 capacidades</div>
  </div>
</template>

<style scoped>
.capa-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.capa-body {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 4rem;
  align-items: center;
}
.capa-titular h2 {
  font-size: 4.5rem;
  line-height: 1;
  margin: 0;
}
</style>
