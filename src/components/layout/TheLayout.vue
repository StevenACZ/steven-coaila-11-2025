<script setup lang="ts">
import TheNavbar from './TheNavbar.vue'
</script>

<template>
  <div class="layout">
    <TheNavbar />
    <main class="layout__content">
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
