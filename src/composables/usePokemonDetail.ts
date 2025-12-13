import { ref } from 'vue'
import { usePokemonStore } from '@/stores/pokemonStore'
import { pokemonService } from '@/services/pokemonService'
import { useTeam } from '@/composables/useTeam'
import type { Pokemon, EvolutionPokemon } from '@/types/pokemon'

export function usePokemonDetail(pokemonId: number) {
  const store = usePokemonStore()
  const { isInTeam } = useTeam()

  const pokemon = ref<Pokemon | null>(null)
  const evolutionChain = ref<EvolutionPokemon[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchPokemon(id: number): Promise<Pokemon> {
    const cached = store.getById(id)
    if (cached) return cached

    const data = await pokemonService.getById(id)

    store.setPokemon(data)

    return data
  }

  async function fetchSpeciesData(id: number) {
    const cached = store.getSpeciesData(id)
    if (cached) return cached

    const data = await pokemonService.getSpeciesData(id)

    store.setSpeciesData(id, data)

    return data
  }

  async function loadPokemon() {
    loading.value = true
    error.value = null

    try {
      const [pokemonData, speciesData] = await Promise.all([
        fetchPokemon(pokemonId),
        fetchSpeciesData(pokemonId),
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
