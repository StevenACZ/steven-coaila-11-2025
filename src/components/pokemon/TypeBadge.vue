<script setup lang="ts">
import { computed } from 'vue'
import { TYPE_COLORS } from '@/constants/pokemonTypes'

interface Props {
  type: string
  selected?: boolean
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  selected: false,
  clickable: false,
})

defineEmits<{
  click: []
}>()

const backgroundColor = computed(() => {
  const color = TYPE_COLORS[props.type] || '#777777'
  if (props.clickable && !props.selected) {
    return `${color}40`
  }
  return color
})

const textColor = computed(() => {
  if (props.clickable && !props.selected) return 'var(--color-text)'
  const color = TYPE_COLORS[props.type] || '#777777'
  const linear = (offset: number) => {
    const channel = parseInt(color.slice(offset, offset + 2), 16) / 255
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  }
  const luminance = 0.2126 * linear(1) + 0.7152 * linear(3) + 0.0722 * linear(5)
  return luminance > 0.179 ? '#000000' : '#ffffff'
})
</script>

<template>
  <component
    :is="clickable ? 'button' : 'span'"
    :type="clickable ? 'button' : undefined"
    :aria-pressed="clickable ? selected : undefined"
    class="badge"
    :class="{
      'badge--clickable': clickable,
      'badge--selected': selected,
    }"
    :style="{ backgroundColor, color: textColor }"
    @click="clickable && $emit('click')"
  >
    {{ type }}
  </component>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.badge {
  border: 0;
  font-family: inherit;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: $transition;
  user-select: none;

  &--clickable {
    cursor: pointer;

    &:hover {
      transform: scale(1.05);
    }
  }

  &--selected {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
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
