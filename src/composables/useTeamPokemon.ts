import { ref, computed } from 'vue'
import { usePokemonStore } from '@/stores/pokemonStore'
import { pokemonService } from '@/services/pokemonService'
import { useTeam } from '@/composables/useTeam'
import type { Pokemon } from '@/types/pokemon'

export function useTeamPokemon() {
  const store = usePokemonStore()
  const { pokemonIds, removeFromTeam } = useTeam()

  const pokemonList = ref<Pokemon[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const hasTeam = computed(() => pokemonList.value.length > 0)

  async function fetchPokemon(id: number): Promise<Pokemon> {
    const cached = store.getById(id)
    if (cached) return cached

    const data = await pokemonService.getById(id)

    store.setPokemon(data)

    return data
  }

  async function loadTeam() {
    if (pokemonIds.value.length === 0) return

    loading.value = true
    error.value = null

    try {
      const promises = pokemonIds.value.map((id) => fetchPokemon(id))
      pokemonList.value = await Promise.all(promises)
    } catch {
      error.value = 'Error loading team'
    } finally {
      loading.value = false
    }
  }

  function removePokemon(id: number) {
    removeFromTeam(id)
    pokemonList.value = pokemonList.value.filter((p) => p.id !== id)
  }

  return {
    pokemonList,
    loading,
    error,
    hasTeam,
    loadTeam,
    removePokemon,
  }
}
