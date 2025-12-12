<script setup lang="ts">
import { usePokemonList } from '@/composables/usePokemon'
import { onMounted } from 'vue'

const { pokemonList, loading, error, fetchPokemon } = usePokemonList()

onMounted(async () => {
  await fetchPokemon(151, 0)
  console.log('Pokemones:', pokemonList.value)
})
</script>

<template>
  <div class="home">
    <h1 v-if="loading">Cargando...</h1>
    <p v-else-if="error">Error: {{ error }}</p>
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  h1 {
    font-size: 2rem;
  }
}
</style>
