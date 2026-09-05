import api from '@/api'
import kanto from '@/data/kanto.json'
import type { Pokemon, EvolutionPokemon } from '@/types/pokemon'

function getPokemonImageUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export const pokemonService = {
  async getList(limit = 25, offset = 0): Promise<{ items: Pokemon[]; count: number }> {
    if (!Number.isInteger(limit) || !Number.isInteger(offset) || limit < 0 || offset < 0)
      throw new Error('Invalid catalog page')
    return {
      items: kanto
        .slice(offset, offset + limit)
        .map((item) => ({ ...item, image: getPokemonImageUrl(item.id) })),
      count: kanto.length,
    }
  },

  async getById(id: number): Promise<Pokemon> {
    const item = kanto.find((pokemon) => pokemon.id === id)
    if (!item) throw new Error('Pokemon is outside the Kanto catalog')
    return { ...item, image: getPokemonImageUrl(item.id) }
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
