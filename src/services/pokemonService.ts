import api from '@/api'
import type {
  PokemonListResponse,
  Pokemon,
  PokemonDetailResponse,
  EvolutionPokemon,
} from '@/types/pokemon'

function getPokemonImageUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

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
        image: getPokemonImageUrl(detail.id),
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
      image: getPokemonImageUrl(data.id),
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

  async getSpeciesData(
    id: number,
  ): Promise<{ description: string; evolutionChain: EvolutionPokemon[] }> {
    const { data: species } = await api.get(`/pokemon-species/${id}`)
    const { data: evolution } = await api.get(species.evolution_chain.url)

    const flavorEntry = species.flavor_text_entries.find(
      (e: { language: { name: string } }) => e.language.name === 'es',
    )
    const description = flavorEntry?.flavor_text?.replace(/\n|\f/g, ' ') || ''

    const evolutionChain: EvolutionPokemon[] = []
    let current = evolution.chain

    while (current) {
      const pokemonId = parseInt(current.species.url.split('/').slice(-2, -1)[0])
      evolutionChain.push({
        id: pokemonId,
        name: current.species.name,
        image: getPokemonImageUrl(pokemonId),
      })
      current = current.evolves_to[0]
    }

    return { description, evolutionChain }
  },
}
