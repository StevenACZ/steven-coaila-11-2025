<script setup lang="ts">
import type { PokemonStat } from '@/types/pokemon'

interface Props {
  stats: PokemonStat[]
}

defineProps<Props>()

const statLabels: Record<string, string> = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SP.ATK',
  'special-defense': 'SP.DEF',
  speed: 'SPD',
}

function getStatPercentage(value: number): number {
  return Math.min((value / 180) * 100, 100)
}

function getStatColor(value: number): string {
  if (value >= 100) return '#22c55e'
  if (value >= 60) return '#eab308'
  return '#ef4444'
}
</script>

<template>
  <div class="stats">
    <div v-for="stat in stats" :key="stat.name" class="stats__row">
      <span class="stats__label">{{ statLabels[stat.name] || stat.name }}</span>
      <div class="stats__bar">
        <div
          class="stats__fill"
          :style="{
            width: getStatPercentage(stat.value) + '%',
            backgroundColor: getStatColor(stat.value),
          }"
        ></div>
      </div>
      <span class="stats__value">{{ stat.value }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.stats {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__label {
    width: 60px;
    font-size: 0.7rem;
    font-family: $font-family-display;
    color: $color-text-muted;
    text-transform: uppercase;
  }

  &__bar {
    flex: 1;
    height: 8px;
    background: $color-border;
    border-radius: 4px;
    overflow: hidden;
  }

  &__fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  &__value {
    width: 32px;
    font-size: 0.8rem;
    font-family: $font-family-display;
    color: $color-text;
    text-align: right;
  }
}
</style>
