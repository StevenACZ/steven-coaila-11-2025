<script setup lang="ts">
interface Props {
  types: string[]
}

defineProps<Props>()

const typeColors: Record<string, string> = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
}
</script>

<template>
  <div class="types">
    <span
      v-for="type in types"
      :key="type"
      class="types__badge"
      :style="{ backgroundColor: typeColors[type] || '#777' }"
    >
      {{ type }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.types {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;

  &__badge {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    color: white;
    letter-spacing: 0.05em;
  }
}
</style>
