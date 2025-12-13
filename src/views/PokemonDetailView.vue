<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonDetail } from '@/composables/usePokemonDetail'
import PokemonTypes from '@/components/pokemon/PokemonTypes.vue'
import PokemonStats from '@/components/pokemon/PokemonStats.vue'
import PokemonCry from '@/components/pokemon/PokemonCry.vue'
import EvolutionChain from '@/components/pokemon/EvolutionChain.vue'
import BaseLoader from '@/components/common/BaseLoader.vue'

const route = useRoute()
const pokemonId = Number(route.params.id)

const { pokemon, evolutionChain, loading, error, loadPokemon, formatHeight, formatWeight } =
  usePokemonDetail(pokemonId)

const isCrying = ref(false)

onMounted(loadPokemon)
</script>

<template>
  <div class="detail">
    <BaseLoader v-if="loading" text="Cargando Pokémon..." />

    <div v-else-if="error" class="detail__error">{{ error }}</div>

    <template v-else-if="pokemon">
      <div class="detail__header">
        <img
          :src="pokemon.image"
          :alt="pokemon.name"
          class="detail__image"
          :class="{ 'detail__image--crying': isCrying }"
        />
        <div class="detail__info">
          <span class="detail__id">#{{ String(pokemon.id).padStart(3, '0') }}</span>
          <h1 class="detail__name">{{ pokemon.name }}</h1>
          <div class="detail__actions">
            <PokemonTypes v-if="pokemon.types" :types="pokemon.types" />
            <PokemonCry v-if="pokemon.cry" :url="pokemon.cry" @playing="isCrying = $event" />
          </div>
        </div>
      </div>

      <p v-if="pokemon.description" class="detail__description">
        {{ pokemon.description }}
      </p>

      <div class="detail__physical">
        <div class="detail__physical-item">
          <span class="detail__physical-label">Altura</span>
          <span class="detail__physical-value">{{ formatHeight(pokemon.height!) }}</span>
        </div>
        <div class="detail__physical-item">
          <span class="detail__physical-label">Peso</span>
          <span class="detail__physical-value">{{ formatWeight(pokemon.weight!) }}</span>
        </div>
      </div>

      <div class="detail__section">
        <h3 class="detail__section-title">Estadísticas</h3>
        <PokemonStats v-if="pokemon.stats" :stats="pokemon.stats" />
      </div>

      <div class="detail__section">
        <EvolutionChain :chain="evolutionChain" :current-id="pokemonId" />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.detail {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;

  @include mobile {
    padding: 16px 16px 100px 16px;
  }

  &__error {
    text-align: center;
    padding: 48px;
    font-size: 1.25rem;
    color: $color-text-muted;
  }

  &__header {
    display: flex;
    gap: 24px;
    margin-bottom: 32px;

    @include mobile {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 16px;
    }
  }

  &__image {
    width: 200px;
    height: 200px;
    object-fit: contain;
    transition: transform 0.2s ease;

    @include mobile {
      width: 150px;
      height: 150px;
    }

    &--crying {
      @include crying-animation(1.05);
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;

    @include mobile {
      justify-content: center;
    }
  }

  &__id {
    font-size: 1rem;
    color: $color-text-muted;
    font-family: $font-family-display;
  }

  &__name {
    font-size: 2.5rem;
    font-family: $font-family-display;
    text-transform: uppercase;
    color: $color-text;
    margin: 8px 0 16px;

    @include mobile {
      font-size: 2rem;
    }
  }

  &__description {
    font-size: 1rem;
    line-height: 1.6;
    color: $color-text-muted;
    margin-bottom: 24px;
    padding: 16px 20px;
    background: $color-surface;
    border-radius: $radius-md;
    font-style: italic;
  }

  &__physical {
    display: flex;
    gap: 32px;
    margin-bottom: 32px;
    padding: 20px;
    background: $color-surface;
    border-radius: $radius-md;

    @include mobile {
      justify-content: center;
    }
  }

  &__physical-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__physical-label {
    font-size: 0.75rem;
    color: $color-text-muted;
    text-transform: uppercase;
  }

  &__physical-value {
    font-size: 1.25rem;
    font-family: $font-family-display;
    color: $color-text;
  }

  &__section {
    margin-bottom: 32px;
    padding: 20px;
    background: $color-surface;
    border-radius: $radius-md;
  }

  &__section-title {
    font-size: 1rem;
    color: $color-text-muted;
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  &__footer {
    display: flex;
    justify-content: center;
  }
}
</style>
