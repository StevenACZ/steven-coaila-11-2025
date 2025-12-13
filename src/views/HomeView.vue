<script setup lang="ts">
import { onMounted } from 'vue'
import { usePokemonList } from '@/composables/usePokemon'
import { usePokemonGrid } from '@/composables/usePokemonGrid'
import { useTeam } from '@/composables/useTeam'
import PokemonCard from '@/components/pokemon/PokemonCard.vue'
import TypeFilter from '@/components/pokemon/TypeFilter.vue'
import BasePagination from '@/components/common/BasePagination.vue'
import BaseLoader from '@/components/common/BaseLoader.vue'
import BaseSearchInput from '@/components/common/BaseSearchInput.vue'

const TOTAL_POKEMON = 151

const { pokemonList, loading, error, fetchPokemon } = usePokemonList()
const { isFull, isInTeam, togglePokemon } = useTeam()

const {
  currentPage,
  searchQuery,
  selectedTypes,
  isSearching,
  isFiltering,
  totalPages,
  filteredPokemon,
  displayedPokemon,
  goToPage,
} = usePokemonGrid(pokemonList, 25)

onMounted(() => fetchPokemon(TOTAL_POKEMON, 0))
</script>

<template>
  <div class="home">
    <div class="home__filters">
      <BaseSearchInput v-model="searchQuery" placeholder="Buscar Pokémon..." />
      <TypeFilter v-model:selected-types="selectedTypes" />
    </div>

    <BaseLoader v-if="loading" />
    <div v-else-if="error" class="home__error">{{ error }}</div>
    <div
      v-else-if="(isSearching || isFiltering) && filteredPokemon.length === 0"
      class="home__empty"
    >
      No se encontraron Pokémon
    </div>

    <TransitionGroup v-else name="grid" tag="main" class="home__grid">
      <PokemonCard
        v-for="pokemon in displayedPokemon"
        :key="pokemon.id"
        :pokemon="pokemon"
        :selected="isInTeam(pokemon.id)"
        :disabled="isFull && !isInTeam(pokemon.id)"
        @click="togglePokemon(pokemon.id)"
      />
    </TransitionGroup>

    <BasePagination
      v-if="!isSearching && !isFiltering && !loading"
      :current-page="currentPage"
      :total-pages="totalPages"
      @update:current-page="goToPage"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.home {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 767px) {
    padding: 16px 16px 100px 16px;
  }

  &__filters {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }

  &__error,
  &__empty {
    text-align: center;
    padding: 48px;
    font-size: 1.25rem;
    color: $color-text-muted;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
    margin-bottom: 40px;

    @media (max-width: 767px) {
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 12px;
      margin-bottom: 32px;
    }
  }
}

.grid-enter-active {
  transition: all 0.3s ease;
}

.grid-leave-active {
  transition: all 0.2s ease;
  position: absolute;
}

.grid-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.grid-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.grid-move {
  transition: transform 0.3s ease;
}
</style>
