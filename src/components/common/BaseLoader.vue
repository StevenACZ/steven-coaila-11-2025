<script setup lang="ts">
interface Props {
  text?: string
}

withDefaults(defineProps<Props>(), {
  text: 'Cargando...',
})
</script>

<template>
  <div class="loader">
    <div class="loader__spinner"></div>
    <span class="loader__text">{{ text }}</span>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.loader {
  text-align: center;
  padding: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  &__spinner {
    width: 40px;
    height: 40px;
    border: 3px solid $color-border;
    border-top-color: $color-primary;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  &__text {
    font-size: 1.25rem;
    color: $color-text-muted;
    font-family: $font-family-display;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
