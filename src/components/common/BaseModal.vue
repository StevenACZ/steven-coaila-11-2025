<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

interface Props {
  show: boolean
  title?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  confirm: []
}>()
const dialog = ref<HTMLDialogElement | null>(null)
let previousFocus: HTMLElement | null = null

function syncDialog() {
  if (!dialog.value) return
  if (props.show && !dialog.value.open) {
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    dialog.value.showModal()
  } else if (!props.show && dialog.value.open) {
    dialog.value.close()
    if (previousFocus?.isConnected) previousFocus.focus()
  }
}

function onBackdropClick(event: MouseEvent) {
  if (event.target !== dialog.value || !dialog.value) return
  const bounds = dialog.value.getBoundingClientRect()
  if (
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom
  )
    emit('close')
}

watch(() => props.show, syncDialog, { flush: 'post' })
onMounted(syncDialog)
onBeforeUnmount(() => {
  dialog.value?.close()
  if (previousFocus?.isConnected) previousFocus.focus()
})
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialog"
      class="modal"
      :aria-label="title || 'Confirmar acción'"
      @cancel.prevent="emit('close')"
      @click="onBackdropClick"
    >
      <h2 v-if="title" class="modal__title">{{ title }}</h2>
      <div class="modal__content"><slot /></div>
      <div class="modal__actions">
        <button
          type="button"
          autofocus
          class="modal__btn modal__btn--cancel"
          @click="emit('close')"
        >
          Cancelar
        </button>
        <button type="button" class="modal__btn modal__btn--confirm" @click="emit('confirm')">
          Confirmar
        </button>
      </div>
    </dialog>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.modal::backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
}

.modal {
  margin: auto;
  max-height: calc(100dvh - 32px);
  overflow-y: auto;
  width: min(400px, calc(100% - 32px));
  background: $color-surface;
  border-radius: $radius-lg;
  padding: 24px;
  max-width: 400px;
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
      background: #b91c1c;
      border: none;
      color: white;

      &:hover {
        background: #991b1b;
      }
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
