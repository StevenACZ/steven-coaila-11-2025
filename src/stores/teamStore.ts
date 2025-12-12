import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const MAX_TEAM_SIZE = 6
const STORAGE_KEY = 'pokemon-team'

export const useTeamStore = defineStore('team', () => {
  const selectedIds = ref<Set<number>>(loadFromStorage())

  const teamSize = computed(() => selectedIds.value.size)
  const isFull = computed(() => teamSize.value >= MAX_TEAM_SIZE)
  const isEmpty = computed(() => teamSize.value === 0)
  const pokemonIds = computed(() => [...selectedIds.value])

  function isInTeam(id: number): boolean {
    return selectedIds.value.has(id)
  }

  function addToTeam(id: number): boolean {
    if (isFull.value || isInTeam(id)) {
      return false
    }

    const newSet = new Set(selectedIds.value)
    newSet.add(id)
    selectedIds.value = newSet

    saveToStorage()
    return true
  }

  function removeFromTeam(id: number): void {
    if (!isInTeam(id)) return

    const newSet = new Set(selectedIds.value)
    newSet.delete(id)
    selectedIds.value = newSet

    saveToStorage()
  }

  function togglePokemon(id: number): void {
    if (isInTeam(id)) {
      removeFromTeam(id)
    } else {
      addToTeam(id)
    }
  }

  function clearTeam(): void {
    selectedIds.value = new Set()
    saveToStorage()
  }

  function saveToStorage(): void {
    const ids = [...selectedIds.value]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  }

  function loadFromStorage(): Set<number> {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return new Set()

    try {
      const ids = JSON.parse(saved) as number[]
      return new Set(ids)
    } catch {
      return new Set()
    }
  }

  return {
    selectedIds,

    teamSize,
    isFull,
    isEmpty,
    pokemonIds,
    maxTeamSize: MAX_TEAM_SIZE,

    isInTeam,
    addToTeam,
    removeFromTeam,
    togglePokemon,
    clearTeam,
  }
})
