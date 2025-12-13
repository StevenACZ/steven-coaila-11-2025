<script setup lang="ts">
import { ref } from 'vue'
import type { Pokemon } from '@/types/pokemon'
import PokemonTypes from '@/components/pokemon/PokemonTypes.vue'
import PokemonStats from '@/components/pokemon/PokemonStats.vue'
import PokemonCry from '@/components/pokemon/PokemonCry.vue'

interface Props {
  pokemon: Pokemon
}

defineProps<Props>()
defineEmits<{
  click: []
  remove: []
}>()

const isCrying = ref(false)
</script>

<template>
  <div class="team-card" @click="$emit('click')">
    <button class="team-card__remove" @click.stop="$emit('remove')" title="Eliminar">✕</button>

    <div class="team-card__header">
      <img
        :src="pokemon.image"
        :alt="pokemon.name"
        class="team-card__image"
        :class="{ 'team-card__image--crying': isCrying }"
      />
      <div class="team-card__info">
        <span class="team-card__id">#{{ String(pokemon.id).padStart(3, '0') }}</span>
        <h3 class="team-card__name">{{ pokemon.name }}</h3>
        <PokemonTypes v-if="pokemon.types" :types="pokemon.types" />
      </div>
    </div>

    <div class="team-card__body">
      <PokemonStats v-if="pokemon.stats" :stats="pokemon.stats" />
    </div>

    <div class="team-card__footer">
      <PokemonCry v-if="pokemon.cry" :url="pokemon.cry" @playing="isCrying = $event" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.team-card {
  background: $color-surface;
  border-radius: $radius-lg;
  padding: 20px;
  cursor: pointer;
  transition: $transition;
  position: relative;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow;
    border-color: $color-primary;
  }

  &__remove {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(239, 68, 68, 0.1);
    border: none;
    color: #ef4444;
    font-size: 16px;
    cursor: pointer;
    transition: $transition;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: #ef4444;
      color: white;
    }
  }

  &__header {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
  }

  &__image {
    width: 100px;
    height: 100px;
    object-fit: contain;
    transition: transform 0.2s ease;

    @media (max-width: 767px) {
      width: 80px;
      height: 80px;
    }

    &--crying {
      animation: cry-shake 0.3s ease-in-out infinite;
      transform: scale(1.08);
    }
  }

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__id {
    font-size: 0.75rem;
    color: $color-text-muted;
    font-family: $font-family-display;
  }

  &__name {
    font-size: 1.5rem;
    font-family: $font-family-display;
    text-transform: uppercase;
    color: $color-text;
    margin: 4px 0 8px;

    @media (max-width: 767px) {
      font-size: 1.25rem;
    }
  }

  &__body {
    margin-bottom: 16px;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
  }
}

@keyframes cry-shake {
  0%,
  100% {
    transform: scale(1.08) translateY(0);
  }
  50% {
    transform: scale(1.08) translateY(-3px);
  }
}
</style>
