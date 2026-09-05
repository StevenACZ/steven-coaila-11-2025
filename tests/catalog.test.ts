import { describe, expect, it, vi } from 'vitest'
import { pokemonService } from '../src/services/pokemonService'
import api from '../src/api'

describe('cached Kanto catalog', () => {
  it('provides all types and detail stats without list or per-pokemon API requests', async () => {
    const network = vi.spyOn(api, 'get').mockRejectedValue(new Error('offline'))
    const list = await pokemonService.getList(151, 0)
    expect(list.count).toBe(151)
    expect(new Set(list.items.map((item) => item.id)).size).toBe(151)
    expect(list.items.every((item) => item.types?.length)).toBe(true)
    const pikachu = await pokemonService.getById(25)
    expect(pikachu.name).toBe('pikachu')
    expect(pikachu.stats?.length).toBe(6)
    expect(pikachu.types).toContain('electric')
    expect(network).not.toHaveBeenCalled()
    network.mockRestore()
  })
  it('respects catalog page boundaries and rejects invalid records', async () => {
    expect((await pokemonService.getList(25, 150)).items.map((item) => item.id)).toEqual([151])
    expect((await pokemonService.getList(25, 151)).items).toEqual([])
    await expect(pokemonService.getById(152)).rejects.toThrow()
    await expect(pokemonService.getList(25, -1)).rejects.toThrow()
  })
})
