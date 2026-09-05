<script setup lang="ts">
interface Props {
  modelValue: string
  placeholder?: string
  label?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Buscar...',
  label: 'Buscar Pokémon por nombre',
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="search">
    <input
      type="search"
      :aria-label="label"
      class="search__input"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.search {
  &__input {
    width: 100%;
    padding: 12px 16px;
    border-radius: $radius-md;
    border: 1px solid $color-border;
    background: $color-surface;
    color: $color-text;
    font-family: $font-family;
    font-size: 1rem;
    transition: $transition;
    outline: none;

    &::placeholder {
      color: $color-text-muted;
    }

    &:focus {
      border-color: $color-primary;
      box-shadow: 0 0 0 3px rgba($color-primary, 0.2);
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
