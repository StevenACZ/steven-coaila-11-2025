import { createPinia, setActivePinia } from 'pinia'
import { afterEach, expect, it, vi } from 'vitest'
import api from '../src/api'
import { useTeamStore } from '../src/stores/teamStore'
import { usePokemonDetail } from '../src/composables/usePokemonDetail'

afterEach(() => vi.restoreAllMocks())

it('leaves loading after a failed detail request and supports a successful retry', async () => {
  localStorage.clear()
  setActivePinia(createPinia())
  useTeamStore().addToTeam(25)
  vi.spyOn(api, 'get')
    .mockRejectedValueOnce(new Error('offline'))
    .mockResolvedValueOnce({
      data: {
        evolution_chain: { url: 'https://pokeapi.co/api/v2/evolution-chain/10/' },
        flavor_text_entries: [{ language: { name: 'es' }, flavor_text: 'Descripción de prueba.' }],
      },
    })
    .mockResolvedValueOnce({
      data: {
        chain: {
          species: { url: 'https://pokeapi.co/api/v2/pokemon-species/25/', name: 'pikachu' },
          evolves_to: [],
        },
      },
    })
  const detail = usePokemonDetail(25)
  await detail.loadPokemon()
  expect(detail.loading.value).toBe(false)
  expect(detail.error.value).toBeTruthy()
  await detail.loadPokemon()
  expect(detail.loading.value).toBe(false)
  expect(detail.error.value).toBeNull()
  expect(detail.pokemon.value?.name).toBe('pikachu')
  expect(detail.evolutionChain.value.map((item) => item.id)).toEqual([25])
})
