<script setup lang="ts"></script>

<template>
  <div class="detail">
    <h1>Detalle del Pokémon</h1>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.detail {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;

  h1 {
    font-size: 2rem;
    color: $color-text;
    margin-bottom: 16px;
  }
}
</style>
