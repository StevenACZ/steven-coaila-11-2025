import { storeToRefs } from 'pinia'
import { useTeamStore } from '@/stores/teamStore'

export function useTeam() {
  const store = useTeamStore()
  const { teamSize, isFull, isEmpty, selectedIds, pokemonIds } = storeToRefs(store)

  return {
    teamSize,
    isFull,
    isEmpty,
    selectedIds,
    pokemonIds,

    maxTeamSize: store.maxTeamSize,
    isInTeam: store.isInTeam,
    togglePokemon: store.togglePokemon,
    addToTeam: store.addToTeam,
    removeFromTeam: store.removeFromTeam,
    clearTeam: store.clearTeam,
  }
}
