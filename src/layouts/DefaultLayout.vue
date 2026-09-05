<script setup lang="ts">
import TheNavbar from '@/components/layout/TheNavbar.vue'
</script>

<template>
  <div class="layout">
    <a class="skip-link" href="#main-content">Ir al contenido</a>
    <TheNavbar />
    <main id="main-content" class="layout__content">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__content {
    flex: 1;
  }
}
</style>
