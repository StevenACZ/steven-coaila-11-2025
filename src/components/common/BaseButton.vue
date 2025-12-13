<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary'
  floating?: boolean
  desktopOnly?: boolean
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  floating: false,
  desktopOnly: false,
  disabled: false,
})
</script>

<template>
  <button
    class="btn"
    :class="[`btn--${variant}`, { 'btn--floating': floating }, { 'btn--desktop': desktopOnly }]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.btn {
  padding: 12px 24px;
  border-radius: $radius-md;
  border: 0px solid transparent;
  font-family: $font-family-display;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: $transition;
  cursor: pointer;
  white-space: nowrap;

  &--primary {
    background: $color-primary;
    color: white;
    box-shadow: 0 0 15px rgba($color-primary, 0.4);

    &:hover:not(:disabled) {
      background: #ff6b81;
      box-shadow: 0 0 25px rgba($color-primary, 0.6);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      box-shadow: none;
    }
  }

  &--secondary {
    background: $color-surface;
    color: $color-text;
    border: 1px solid $color-border;

    &:hover:not(:disabled) {
      background: $color-secondary;
    }
  }

  &--desktop {
    display: inline-block;

    @include mobile {
      display: none;
    }
  }

  &--floating {
    display: none;

    @include mobile {
      display: block;
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 100;
      box-shadow:
        0 4px 20px rgba(0, 0, 0, 0.3),
        0 0 15px rgba($color-primary, 0.4);
    }
  }
}
</style>
