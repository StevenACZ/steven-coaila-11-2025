import { ref } from 'vue'
import { defineStore } from 'pinia'
import { pokemonService } from '@/services/pokemonService'
import type { Pokemon, EvolutionPokemon } from '@/types/pokemon'

export const usePokemonStore = defineStore('pokemon', () => {
  const cache = ref<Map<number, Pokemon>>(new Map())
  const speciesCache = ref<
    Map<number, { description: string; evolutionChain: EvolutionPokemon[] }>
  >(new Map())

  async function getById(id: number): Promise<Pokemon> {
    if (cache.value.has(id)) {
      return cache.value.get(id)!
    }
    const pokemon = await pokemonService.getById(id)
    cache.value.set(id, pokemon)
    return pokemon
  }

  async function getSpeciesData(id: number) {
    if (speciesCache.value.has(id)) {
      return speciesCache.value.get(id)!
    }

    const data = await pokemonService.getSpeciesData(id)
    speciesCache.value.set(id, data)
    return data
  }

  return {
    cache,
    getById,
    getSpeciesData,
  }
})
