<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { useTeam } from '@/composables/useTeam'
import BaseButton from '@/components/common/BaseButton.vue'

const router = useRouter()
const route = useRoute()
const { isDark, toggleTheme } = useTheme()
const { teamSize, maxTeamSize } = useTeam()

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
</script>

<template>
  <nav class="navbar">
    <div class="navbar__container">
      <button class="navbar__logo" @click="goHome">Pokédex</button>

      <div class="navbar__actions">
        <button
          class="navbar__theme"
          @click="toggleTheme"
          :title="isDark ? 'Modo día' : 'Modo noche'"
        >
          {{ isDark ? '☀️' : '🌙' }}
        </button>

        <span class="navbar__counter">{{ teamSize }}/{{ maxTeamSize }}</span>

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
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

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

    @media (max-width: 767px) {
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

    @media (max-width: 767px) {
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

    @media (max-width: 767px) {
      gap: 8px;
    }
  }

  &__theme {
    width: 40px;
    height: 40px;
    border-radius: $radius-sm;
    background: $color-surface;
    border: 1px solid $color-border;
    font-size: 1.1rem;
    cursor: pointer;
    transition: $transition;

    @media (max-width: 767px) {
      width: 36px;
      height: 36px;
      font-size: 1rem;
    }

    &:hover {
      background: $color-secondary;
    }
  }

  &__counter {
    font-size: 1.1rem;
    color: $color-text-muted;
    font-family: $font-family-display;

    @media (max-width: 767px) {
      font-size: 0.9rem;
    }
  }
}
</style>
