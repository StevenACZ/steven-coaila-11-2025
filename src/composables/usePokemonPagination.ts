import { ref, computed, type Ref } from 'vue'
import type { Pokemon } from '@/types/pokemon'

export function usePokemonPagination(pokemonList: Ref<Pokemon[]>, perPage: number) {
  const currentPage = ref(1)
  const searchQuery = ref('')
  const selectedTypes = ref<string[]>([])

  const isSearching = computed(() => searchQuery.value.length > 0)
  const isFiltering = computed(() => selectedTypes.value.length > 0)
  const totalPages = computed(() => Math.ceil(pokemonList.value.length / perPage))

  const filteredPokemon = computed(() => {
    let result = pokemonList.value

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter((p) => p.name.toLowerCase().includes(query))
    }

    if (selectedTypes.value.length > 0) {
      result = result.filter((p) => selectedTypes.value.every((type) => p.types?.includes(type)))
    }

    return result
  })

  const displayedPokemon = computed(() => {
    if (isSearching.value || isFiltering.value) return filteredPokemon.value
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
    selectedTypes,
    isSearching,
    isFiltering,
    totalPages,
    filteredPokemon,
    displayedPokemon,

    goToPage,
  }
}
