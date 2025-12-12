<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  url: string
}

const props = defineProps<Props>()

const isPlaying = ref(false)
const audio = ref<HTMLAudioElement | null>(null)

function play() {
  if (isPlaying.value) {
    stop()
    return
  }

  audio.value = new Audio(props.url)
  audio.value.volume = 0.2
  audio.value.onended = () => (isPlaying.value = false)
  audio.value.play()
  isPlaying.value = true
}

function stop() {
  if (audio.value) {
    audio.value.pause()
    audio.value = null
  }
  isPlaying.value = false
}
</script>

<template>
  <button class="cry-btn" :class="{ 'cry-btn--playing': isPlaying }" @click.stop="play">
    {{ isPlaying ? '🔊' : '🔈' }} Cry
  </button>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

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
</style>
