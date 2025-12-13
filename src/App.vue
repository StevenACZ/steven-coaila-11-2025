<script setup lang="ts">
import { RouterView } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<template>
  <DefaultLayout>
    <RouterView v-slot="{ Component }">
      <Transition name="scale" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </DefaultLayout>
</template>

<style lang="scss">
.scale-enter-active,
.scale-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.scale-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.scale-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
