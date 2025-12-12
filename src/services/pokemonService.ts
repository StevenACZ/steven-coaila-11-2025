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
}
