import { ref } from 'vue'
import { usePokemonStore } from '@/stores/pokemonStore'
import { pokemonService } from '@/services/pokemonService'
import type { Pokemon } from '@/types/pokemon'

export function usePokemonList() {
  const store = usePokemonStore()
  const pokemonList = ref<Pokemon[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchPokemon(limit: number, offset: number) {
    loading.value = true
    error.value = null

    try {
      const cached = store.getList()
      if (cached) {
        pokemonList.value = cached
        return
      }

      const { items } = await pokemonService.getList(limit, offset)

      store.setList(items)

      pokemonList.value = items
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
