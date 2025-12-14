<script setup lang="ts">
import TypeBadge from '@/components/pokemon/TypeBadge.vue'

interface Props {
  types: string[]
}

defineProps<Props>()
</script>

<template>
  <div class="types">
    <TypeBadge v-for="type in types" :key="type" :type="type" />
  </div>
</template>

<style lang="scss" scoped>
.types {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
</style>
