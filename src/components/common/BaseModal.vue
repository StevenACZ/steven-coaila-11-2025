<script setup lang="ts">
interface Props {
  show: boolean
  title?: string
}

defineProps<Props>()
defineEmits<{
  close: []
  confirm: []
}>()
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal">
          <h3 v-if="title" class="modal__title">{{ title }}</h3>
          <div class="modal__content">
            <slot />
          </div>
          <div class="modal__actions">
            <button class="modal__btn modal__btn--cancel" @click="$emit('close')">Cancelar</button>
            <button class="modal__btn modal__btn--confirm" @click="$emit('confirm')">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 16px;
}

.modal {
  background: $color-surface;
  border-radius: $radius-lg;
  padding: 24px;
  max-width: 400px;
  width: 100%;
  border: 1px solid $color-border;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);

  &__title {
    font-size: 1.25rem;
    font-family: $font-family-display;
    color: $color-text;
    margin-bottom: 16px;
  }

  &__content {
    color: $color-text-muted;
    margin-bottom: 24px;
    line-height: 1.5;
  }

  &__actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }

  &__btn {
    padding: 10px 20px;
    border-radius: $radius-sm;
    font-family: $font-family;
    font-weight: 500;
    cursor: pointer;
    transition: $transition;

    &--cancel {
      background: transparent;
      border: 1px solid $color-border;
      color: $color-text-muted;

      &:hover {
        background: $color-secondary;
      }
    }

    &--confirm {
      background: #ef4444;
      border: none;
      color: white;

      &:hover {
        background: #dc2626;
      }
    }
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
