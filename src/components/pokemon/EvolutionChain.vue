<script setup lang="ts">
import type { EvolutionPokemon } from '@/types/pokemon'

interface Props {
  chain: EvolutionPokemon[]
  currentId: number
}

defineProps<Props>()
</script>

<template>
  <div class="evolution">
    <h3 class="evolution__title">Cadena de Evolución</h3>
    <div class="evolution__chain">
      <template v-for="(pokemon, index) in chain" :key="pokemon.id">
        <div
          class="evolution__pokemon"
          :class="{ 'evolution__pokemon--current': pokemon.id === currentId }"
        >
          <img :src="pokemon.image" :alt="pokemon.name" class="evolution__image" />
          <span class="evolution__name">{{ pokemon.name }}</span>
        </div>
        <span v-if="index < chain.length - 1" class="evolution__arrow">→</span>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.evolution {
  &__title {
    font-size: 1rem;
    color: $color-text-muted;
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  &__chain {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;

    @media (max-width: 767px) {
      justify-content: flex-start;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      padding-bottom: 8px;
      gap: 12px;
      -webkit-overflow-scrolling: touch;

      &::-webkit-scrollbar {
        height: 4px;
      }

      &::-webkit-scrollbar-track {
        background: $color-border;
        border-radius: 2px;
      }

      &::-webkit-scrollbar-thumb {
        background: $color-primary;
        border-radius: 2px;
      }
    }
  }

  &__pokemon {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px;
    background: $color-surface;
    border-radius: $radius-md;
    border: 2px solid transparent;
    transition: $transition;
    flex-shrink: 0;
    scroll-snap-align: center;

    &--current {
      border-color: $color-primary;
      box-shadow: 0 0 15px rgba($color-primary, 0.3);
    }
  }

  &__image {
    width: 80px;
    height: 80px;
    object-fit: contain;

    @media (max-width: 767px) {
      width: 60px;
      height: 60px;
    }
  }

  &__name {
    font-family: $font-family-display;
    font-size: 0.85rem;
    text-transform: uppercase;
    color: $color-text;
  }

  &__arrow {
    font-size: 1.5rem;
    color: $color-text-muted;

    @media (max-width: 767px) {
      font-size: 1.25rem;
    }
  }
}
</style>
