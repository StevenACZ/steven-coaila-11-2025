<script setup lang="ts">
import { ALL_TYPES } from '@/constants/pokemonTypes'
import TypeBadge from '@/components/pokemon/TypeBadge.vue'

const selectedTypes = defineModel<string[]>('selectedTypes', { default: () => [] })

function toggleType(type: string) {
  if (selectedTypes.value?.includes(type)) {
    selectedTypes.value = selectedTypes.value.filter((t) => t !== type)
  } else {
    selectedTypes.value = [...(selectedTypes.value || []), type]
  }
}
</script>

<template>
  <div class="filter">
    <TypeBadge
      v-for="type in ALL_TYPES"
      :key="type"
      :type="type"
      :selected="selectedTypes?.includes(type) ?? false"
      clickable
      @click="toggleType(type)"
    />
  </div>
</template>

<style lang="scss" scoped>
.filter {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
