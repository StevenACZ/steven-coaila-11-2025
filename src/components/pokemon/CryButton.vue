<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'

interface Props {
  url: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  playing: [isPlaying: boolean]
}>()

const isPlaying = ref(false)
const audioError = ref(false)
let audio: HTMLAudioElement | null = null

watch(isPlaying, (value) => emit('playing', value))

async function play() {
  if (audio) {
    stop()
    return
  }

  audioError.value = false
  const currentAudio = new Audio(props.url)
  audio = currentAudio
  currentAudio.volume = 0.2
  currentAudio.onended = stop
  currentAudio.onerror = () => {
    if (audio !== currentAudio) return
    stop()
    audioError.value = true
  }
  try {
    await currentAudio.play()
    if (audio === currentAudio) isPlaying.value = true
  } catch {
    if (audio !== currentAudio) return
    stop()
    audioError.value = true
  }
}

function stop() {
  if (audio) {
    audio.onended = null
    audio.onerror = null
    audio.pause()
    audio = null
  }
  isPlaying.value = false
}

watch(() => props.url, stop)
onBeforeUnmount(stop)
</script>

<template>
  <div class="cry-control">
    <button
      type="button"
      class="cry-btn"
      :class="{ 'cry-btn--playing': isPlaying }"
      :aria-label="isPlaying ? 'Detener sonido del Pokémon' : 'Escuchar sonido del Pokémon'"
      @click.stop="play"
    >
      <span aria-hidden="true">{{ isPlaying ? '🔊' : '🔈' }}</span>
      {{ isPlaying ? 'Detener' : 'Escuchar' }}
    </button>
    <span v-if="audioError" class="cry-error" role="status"
      >No se pudo reproducir. Inténtalo de nuevo.</span
    >
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.cry-control {
  display: grid;
  gap: 8px;
}
.cry-error {
  color: $color-text-muted;
  font-size: 0.8rem;
}

.cry-btn {
  padding: 8px 16px;
  border-radius: $radius-sm;
  background: $color-surface;
  border: 1px solid $color-border;
  color: $color-text;
  font-family: $font-family;
  font-size: 0.85rem;
  cursor: pointer;
  transition: $transition;

  &:hover {
    background: $color-secondary;
  }

  &--playing {
    background: $color-primary;
    color: white;
    border-color: $color-primary;
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
