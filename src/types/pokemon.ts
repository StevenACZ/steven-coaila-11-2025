export interface PokemonListItem {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

export interface PokemonDetailResponse {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
  types: Array<{
    slot: number
    type: {
      name: string
      url: string
    }
  }>
  stats: Array<{
    base_stat: number
    stat: {
      name: string
    }
  }>
  cries: {
    latest: string
  }
}

export interface Pokemon {
  id: number
  name: string
  image: string
  types: string[]
  height?: number
  weight?: number
  stats?: PokemonStat[]
  cry?: string
  description?: string
}

export interface PokemonStat {
  name: string
  value: number
}

export interface EvolutionPokemon {
  id: number
  name: string
  image: string
}
