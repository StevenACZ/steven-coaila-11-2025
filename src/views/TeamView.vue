<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useTeamStore } from '@/stores/teamStore'
import { useTeamPokemon } from '@/composables/useTeamPokemon'
import PokemonTeamCard from '@/components/pokemon/PokemonTeamCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseLoader from '@/components/common/BaseLoader.vue'

const router = useRouter()

const teamStore = useTeamStore()
const { isEmpty } = storeToRefs(teamStore)

const { pokemonList, loading, error, hasTeam, loadTeam, removePokemon } = useTeamPokemon()

function goToDetail(id: number) {
  router.push(`/team/${id}`)
}

function goToHome() {
  router.push('/')
}

onMounted(loadTeam)
</script>

<template>
  <div class="team">
    <h1 class="team__title">Mi Equipo</h1>

    <BaseLoader v-if="loading" text="Cargando equipo..." />

    <div v-else-if="error" class="team__error">{{ error }}</div>

    <div v-else-if="isEmpty" class="team__empty">
      <p>No tienes Pokémon en tu equipo</p>
      <BaseButton @click="goToHome">Agregar Pokémon</BaseButton>
    </div>

    <main v-else-if="hasTeam" class="team__grid">
      <PokemonTeamCard
        v-for="pokemon in pokemonList"
        :key="pokemon.id"
        :pokemon="pokemon"
        @click="goToDetail(pokemon.id)"
        @remove="removePokemon(pokemon.id)"
      />
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.team {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;

  @include mobile {
    padding: 16px 16px 100px 16px;
  }

  &__title {
    font-size: 2rem;
    color: $color-text;
    margin-bottom: 24px;

    @include mobile {
      font-size: 1.5rem;
    }
  }

  &__error {
    text-align: center;
    padding: 48px;
    font-size: 1.25rem;
    color: $color-text-muted;
  }

  &__empty {
    text-align: center;
    padding: 80px 24px;

    p {
      font-size: 1.5rem;
      color: $color-text-muted;
      margin-bottom: 24px;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;

    @include mobile {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }
}
</style>
