import { ref } from 'vue'
import { usePokemonStore } from '@/stores/pokemonStore'
import { useTeam } from '@/composables/useTeam'
import type { Pokemon, EvolutionPokemon } from '@/types/pokemon'

export function usePokemonDetail(pokemonId: number) {
  const pokemonStore = usePokemonStore()
  const { isInTeam } = useTeam()

  const pokemon = ref<Pokemon | null>(null)
  const evolutionChain = ref<EvolutionPokemon[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadPokemon() {
    loading.value = true
    error.value = null

    try {
      const [pokemonData, speciesData] = await Promise.all([
        pokemonStore.getById(pokemonId),
        pokemonStore.getSpeciesData(pokemonId),
      ])

      if (!isInTeam(pokemonId)) {
        error.value = 'Este Pokémon no está en tu equipo'
        return
      }

      pokemon.value = { ...pokemonData, description: speciesData.description }
      evolutionChain.value = speciesData.evolutionChain
    } catch {
      error.value = 'Error al cargar el Pokémon'
    } finally {
      loading.value = false
    }
  }

  function formatHeight(height: number): string {
    return `${(height / 10).toFixed(1)} m`
  }

  function formatWeight(weight: number): string {
    return `${(weight / 10).toFixed(1)} kg`
  }

  return {
    pokemon,
    evolutionChain,
    loading,
    error,
    loadPokemon,
    formatHeight,
    formatWeight,
  }
}
