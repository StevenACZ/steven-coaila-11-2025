import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Pokemon, EvolutionPokemon } from '@/types/pokemon'

export const usePokemonStore = defineStore('pokemon', () => {
  const listCache = ref<Pokemon[] | null>(null)
  const cache = ref<Map<number, Pokemon>>(new Map())
  const speciesCache = ref<
    Map<number, { description: string; evolutionChain: EvolutionPokemon[] }>
  >(new Map())

  function getList() {
    return listCache.value
  }

  function getById(id: number) {
    return cache.value.get(id) || null
  }

  function getSpeciesData(id: number) {
    return speciesCache.value.get(id) || null
  }

  function setList(list: Pokemon[]) {
    listCache.value = list
  }

  function setPokemon(pokemon: Pokemon) {
    cache.value.set(pokemon.id, pokemon)
  }

  function setSpeciesData(
    id: number,
    data: { description: string; evolutionChain: EvolutionPokemon[] },
  ) {
    speciesCache.value.set(id, data)
  }

  return {
    listCache,
    cache,
    speciesCache,

    getList,
    getById,
    getSpeciesData,

    setList,
    setPokemon,
    setSpeciesData,
  }
})
