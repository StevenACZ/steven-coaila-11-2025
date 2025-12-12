import { ref, computed, type Ref } from 'vue'
import type { Pokemon } from '@/types/pokemon'

export function usePokemonGrid(pokemonList: Ref<Pokemon[]>, perPage: number) {
  const currentPage = ref(1)
  const searchQuery = ref('')

  const isSearching = computed(() => searchQuery.value.length > 0)
  const totalPages = computed(() => Math.ceil(pokemonList.value.length / perPage))

  const filteredPokemon = computed(() => {
    const query = searchQuery.value.toLowerCase()
    return pokemonList.value.filter((p) => p.name.toLowerCase().includes(query))
  })

  const displayedPokemon = computed(() => {
    if (isSearching.value) return filteredPokemon.value
    const start = (currentPage.value - 1) * perPage
    return pokemonList.value.slice(start, start + perPage)
  })

  function goToPage(page: number): void {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  return {
    currentPage,
    searchQuery,
    isSearching,
    totalPages,
    filteredPokemon,
    displayedPokemon,
    goToPage,
  }
}
