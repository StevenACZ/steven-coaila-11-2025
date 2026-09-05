<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

let focusAfterNavigation = false
const removeNavigationHook = useRouter().afterEach((_to, from) => {
  focusAfterNavigation = from.matched.length > 0
})
onBeforeUnmount(removeNavigationHook)

function focusHeading() {
  if (!focusAfterNavigation) return
  focusAfterNavigation = false
  const heading = document.querySelector('h1') ?? document.getElementById('main-content')
  heading?.setAttribute('tabindex', '-1')
  heading?.focus({ preventScroll: true })
}
</script>

<template>
  <DefaultLayout>
    <RouterView v-slot="{ Component }">
      <Transition name="scale" mode="out-in" @after-enter="focusHeading">
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
