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
  const color = TYPE_COLORS[props.type] || '#777'
  if (props.clickable && !props.selected) {
    return `${color}40`
  }
  return color
})

const textColor = computed(() => {
  if (props.clickable && !props.selected) {
    return TYPE_COLORS[props.type] || '#777'
  }
  return 'white'
})
</script>

<template>
  <span
    class="badge"
    :class="{
      'badge--clickable': clickable,
      'badge--selected': selected,
    }"
    :style="{ backgroundColor, color: textColor }"
    @click="clickable && $emit('click')"
  >
    {{ type }}
  </span>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.badge {
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
</style>
