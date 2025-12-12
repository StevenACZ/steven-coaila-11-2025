import { ref } from 'vue'
import { usePokemonStore } from '@/stores/pokemonStore'
import type { Pokemon } from '@/types/pokemon'

export function usePokemonList() {
  const pokemonStore = usePokemonStore()
  const pokemonList = ref<Pokemon[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchPokemon(limit: number, offset: number) {
    loading.value = true
    error.value = null
    try {
      pokemonList.value = await pokemonStore.getList(limit, offset)
    } catch {
      error.value = 'Error loading Pokemon'
    } finally {
      loading.value = false
    }
  }

  return {
    pokemonList,
    loading,
    error,
    fetchPokemon,
  }
}
