<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { useTeamStore } from '@/stores/teamStore'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseModal from '@/components/common/BaseModal.vue'

const router = useRouter()
const route = useRoute()
const { isDark, toggleTheme } = useTheme()

const teamStore = useTeamStore()
const { teamSize } = storeToRefs(teamStore)
const { maxTeamSize, clearTeam } = teamStore

const showClearModal = ref(false)
const homeButton = ref<HTMLButtonElement | null>(null)

const isHome = () => route.path === '/'
const isTeamList = () => route.path === '/team'
const isTeamDetail = () => route.path.startsWith('/team/') && route.params.id

function goHome() {
  router.push('/')
}

function goToTeam() {
  router.push('/team')
}

function goBack() {
  if (isTeamDetail()) {
    router.push('/team')
  } else {
    router.push('/')
  }
}

async function handleClearTeam() {
  clearTeam()
  showClearModal.value = false
  await nextTick()
  homeButton.value?.focus()
}
</script>

<template>
  <nav class="navbar" aria-label="Navegación principal">
    <div class="navbar__container">
      <button type="button" ref="homeButton" class="navbar__logo" @click="goHome">Pokédex</button>

      <div class="navbar__actions">
        <button
          type="button"
          :aria-label="isDark ? 'Activar modo día' : 'Activar modo noche'"
          class="navbar__theme"
          @click="toggleTheme"
          :title="isDark ? 'Modo día' : 'Modo noche'"
        >
          {{ isDark ? '☀️' : '🌙' }}
        </button>

        <button
          v-if="isHome() && teamSize > 0"
          type="button"
          aria-label="Reiniciar equipo"
          class="navbar__reset"
          @click="showClearModal = true"
          title="Reiniciar equipo"
        >
          🗑️
        </button>

        <span
          class="navbar__counter"
          role="status"
          :aria-label="`${teamSize} de ${maxTeamSize} Pokémon en el equipo`"
          >{{ teamSize }}/{{ maxTeamSize }}</span
        >

        <BaseButton v-if="isHome()" :disabled="teamSize === 0" @click="goToTeam" desktop-only>
          Ver Equipo →
        </BaseButton>

        <BaseButton v-else-if="isTeamDetail()" variant="secondary" @click="goBack" desktop-only>
          ← Volver al equipo
        </BaseButton>

        <BaseButton v-else-if="isTeamList()" variant="secondary" @click="goBack" desktop-only>
          ← Volver
        </BaseButton>
      </div>
    </div>
  </nav>

  <Teleport to="body">
    <BaseButton v-if="isHome()" :disabled="teamSize === 0" @click="goToTeam" floating>
      Ver Equipo ({{ teamSize }}) →
    </BaseButton>

    <BaseButton v-else-if="isTeamDetail()" variant="secondary" @click="goBack" floating>
      ← Volver al equipo
    </BaseButton>

    <BaseButton v-else-if="isTeamList()" variant="secondary" @click="goBack" floating>
      ← Volver
    </BaseButton>
  </Teleport>

  <BaseModal
    :show="showClearModal"
    title="Reiniciar Equipo"
    @close="showClearModal = false"
    @confirm="handleClearTeam"
  >
    ¿Estás seguro de que quieres reiniciar tu equipo? Se eliminarán todos los Pokémon seleccionados.
  </BaseModal>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba($color-bg, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid $color-border;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    @include mobile {
      padding: 12px 16px;
    }
  }

  &__logo {
    font-size: 1.75rem;
    font-family: $font-family-display;
    font-weight: 700;
    color: $color-primary;
    background: none;
    border: none;
    cursor: pointer;
    text-shadow: 0 0 20px rgba($color-primary, 0.5);
    transition: $transition;

    @include mobile {
      font-size: 1.25rem;
    }

    &:hover {
      text-shadow: 0 0 30px rgba($color-primary, 0.8);
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 12px;

    @include mobile {
      gap: 8px;
    }
  }

  &__theme,
  &__reset {
    width: 40px;
    height: 40px;
    border-radius: $radius-sm;
    background: $color-surface;
    border: 1px solid $color-border;
    font-size: 1.1rem;
    cursor: pointer;
    transition: $transition;

    @include mobile {
      width: 36px;
      height: 36px;
      font-size: 1rem;
    }

    &:hover {
      background: $color-secondary;
    }
  }

  &__reset:hover {
    background: rgba(239, 68, 68, 0.2);
    border-color: #ef4444;
  }

  &__counter {
    font-size: 1.1rem;
    color: $color-text-muted;
    font-family: $font-family-display;

    @include mobile {
      font-size: 0.9rem;
    }
  }
}
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
  }
}
</style>
