<script setup lang="ts">
import { onMounted } from 'vue'
import { usePokemonList } from '@/composables/usePokemon'
import { usePokemonGrid } from '@/composables/usePokemonGrid'
import { useTheme } from '@/composables/useTheme'
import { useTeam } from '@/composables/useTeam'
import PokemonCard from '@/components/pokemon/PokemonCard.vue'
import BasePagination from '@/components/common/BasePagination.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseLoader from '@/components/common/BaseLoader.vue'
import BaseSearchInput from '@/components/common/BaseSearchInput.vue'

const TOTAL_POKEMON = 151

const { pokemonList, loading, error, fetchPokemon } = usePokemonList()
const { isDark, toggleTheme } = useTheme()
const { teamSize, isFull, maxTeamSize, isInTeam, togglePokemon } = useTeam()

const {
  currentPage,
  searchQuery,
  isSearching,
  totalPages,
  filteredPokemon,
  displayedPokemon,
  goToPage,
} = usePokemonGrid(pokemonList, 25)

onMounted(() => fetchPokemon(TOTAL_POKEMON, 0))
</script>

<template>
  <div class="home">
    <header class="home__header">
      <h1>Pokédex</h1>
      <div class="home__team-status">
        <button
          class="theme-toggle"
          @click="toggleTheme"
          :title="isDark ? 'Modo día' : 'Modo noche'"
        >
          {{ isDark ? '☀️' : '🌙' }}
        </button>
        <span>{{ teamSize }}/{{ maxTeamSize }}</span>
        <BaseButton desktop-only :disabled="teamSize === 0"> Ver Equipo → </BaseButton>
      </div>
    </header>

    <BaseButton floating :disabled="teamSize === 0"> Ver Equipo ({{ teamSize }}) → </BaseButton>

    <div class="home__search">
      <BaseSearchInput v-model="searchQuery" placeholder="Buscar Pokémon..." />
    </div>

    <BaseLoader v-if="loading" />
    <div v-else-if="error" class="home__error">{{ error }}</div>
    <div v-else-if="isSearching && filteredPokemon.length === 0" class="home__empty">
      No se encontró "{{ searchQuery }}"
    </div>

    <main v-else class="home__grid">
      <PokemonCard
        v-for="pokemon in displayedPokemon"
        :key="pokemon.id"
        :pokemon="pokemon"
        :selected="isInTeam(pokemon.id)"
        :disabled="isFull && !isInTeam(pokemon.id)"
        @click="togglePokemon(pokemon.id)"
      />
    </main>

    <BasePagination
      v-if="!isSearching && !loading"
      :current-page="currentPage"
      :total-pages="totalPages"
      @update:current-page="goToPage"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.home {
  min-height: 100vh;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 767px) {
    padding: 16px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;

    h1 {
      font-size: 2.5rem;
      color: $color-primary;
      text-shadow: 0 0 20px rgba($color-primary, 0.5);

      @media (max-width: 767px) {
        font-size: 1.5rem;
      }
    }
  }

  &__team-status {
    display: flex;
    align-items: center;
    gap: 16px;

    @media (max-width: 767px) {
      gap: 8px;
    }

    span {
      font-size: 1.25rem;
      color: $color-text-muted;
      font-family: $font-family-display;

      @media (max-width: 767px) {
        font-size: 1rem;
      }
    }
  }

  &__search {
    margin-bottom: 20px;
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

.theme-toggle {
  width: 44px;
  height: 44px;
  border-radius: $radius-md;
  background: $color-surface;
  border: 1px solid $color-border;
  font-size: 1.25rem;
  cursor: pointer;
  transition: $transition;
  flex-shrink: 0;

  @media (max-width: 767px) {
    width: 36px;
    height: 36px;
    border-radius: $radius-sm;
    font-size: 1rem;
  }

  &:hover {
    background: $color-secondary;
  }
}
</style>
