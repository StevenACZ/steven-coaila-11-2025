import api from './api'
import type { PokemonListResponse, Pokemon, PokemonDetailResponse } from '@/types/pokemon'

export const pokemonService = {
  async getList(limit = 25, offset = 0): Promise<{ items: Pokemon[]; count: number }> {
    const { data } = await api.get<PokemonListResponse>('/pokemon', {
      params: { limit, offset },
    })

    const promises = data.results.map(async (item) => {
      const { data: detail } = await api.get<PokemonDetailResponse>(item.url)

      return {
        id: detail.id,
        name: detail.name,
        image: detail.sprites.other['official-artwork'].front_default,
        types: detail.types.map((t) => t.type.name),
      }
    })

    const items = await Promise.all(promises)

    return {
      items,
      count: data.count,
    }
  },

  async getById(id: number): Promise<Pokemon> {
    const { data } = await api.get<PokemonDetailResponse>(`/pokemon/${id}`)

    return {
      id: data.id,
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default,
      types: data.types.map((t) => t.type.name),
      height: data.height,
      weight: data.weight,
      stats: data.stats.map((s) => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
      cry: data.cries.latest,
    }
  },

  async getEvolutionChain(id: number): Promise<EvolutionPokemon[]> {
    const { data: species } = await api.get(`/pokemon-species/${id}`)
    const { data: evolution } = await api.get(species.evolution_chain.url)

    const chain: EvolutionPokemon[] = []
    let current = evolution.chain

    while (current) {
      const pokemonId = parseInt(current.species.url.split('/').slice(-2, -1)[0])
      chain.push({
        id: pokemonId,
        name: current.species.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
      })
      current = current.evolves_to[0]
    }

    return chain
  },
}

export interface EvolutionPokemon {
  id: number
  name: string
  image: string
}
