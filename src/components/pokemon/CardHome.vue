<script setup lang="ts">
import type { Pokemon } from '@/types/pokemon'

interface Props {
  pokemon: Pokemon
  selected?: boolean
  disabled?: boolean
}

defineProps<Props>()
defineEmits<{
  click: []
}>()
</script>

<template>
  <div
    class="card"
    :class="{
      'card--selected': selected,
      'card--disabled': disabled,
    }"
    @click="$emit('click')"
  >
    <div class="card__check" v-if="selected">✓</div>
    <img :src="pokemon.image" :alt="pokemon.name" class="card__image" loading="lazy" />
    <span class="card__id">#{{ String(pokemon.id).padStart(3, '0') }}</span>
    <span class="card__name">{{ pokemon.name }}</span>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.card {
  background: $color-surface;
  border-radius: $radius-lg;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: $transition;
  border: 2px solid transparent;
  position: relative;

  @include mobile {
    border-radius: $radius-md;
    padding: 12px;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow;
  }

  &--selected {
    border-color: $color-success;
    background: rgba($color-success, 0.1);
  }

  &--disabled {
    opacity: 0.4;
    cursor: not-allowed;

    &:hover {
      transform: none;
    }
  }

  &__check {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    background: $color-success;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: white;

    @include mobile {
      top: 6px;
      right: 6px;
      width: 20px;
      height: 20px;
      font-size: 12px;
    }
  }

  &__image {
    width: 120px;
    height: 120px;
    margin: 0 auto 12px;
    object-fit: contain;

    @include mobile {
      width: 80px;
      height: 80px;
      margin: 0 auto 8px;
    }
  }

  &__id {
    display: block;
    font-family: $font-family-display;
    font-size: 0.75rem;
    color: $color-text-muted;
    margin-bottom: 4px;
    letter-spacing: 0.1em;

    @include mobile {
      font-size: 0.65rem;
      margin-bottom: 2px;
    }
  }

  &__name {
    font-family: $font-family-display;
    font-weight: 600;
    font-size: 1rem;
    text-transform: uppercase;
    color: $color-text;
    letter-spacing: 0.05em;

    @include mobile {
      font-size: 0.8rem;
    }
  }
}
</style>
