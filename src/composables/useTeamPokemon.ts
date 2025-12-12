import { ref, computed } from 'vue'
import { usePokemonStore } from '@/stores/pokemonStore'
import { useTeam } from '@/composables/useTeam'
import type { Pokemon } from '@/types/pokemon'

export function useTeamPokemon() {
  const pokemonStore = usePokemonStore()
  const { pokemonIds, removeFromTeam } = useTeam()

  const pokemonList = ref<Pokemon[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const hasTeam = computed(() => pokemonList.value.length > 0)

  async function loadTeam() {
    if (pokemonIds.value.length === 0) return

    loading.value = true
    error.value = null

    try {
      const promises = pokemonIds.value.map((id) => pokemonStore.getById(id))
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
