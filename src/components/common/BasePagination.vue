<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currentPage: number
  totalPages: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:currentPage': [page: number]
}>()

const isFirstPage = computed(() => props.currentPage === 1)
const isLastPage = computed(() => props.currentPage === props.totalPages)

function goToPage(page: number) {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page)
  }
}
</script>

<template>
  <footer class="pagination">
    <button class="page-btn" :disabled="isFirstPage" @click="goToPage(currentPage - 1)">←</button>

    <button
      v-for="page in totalPages"
      :key="page"
      class="page-btn"
      :class="{ 'page-btn--active': page === currentPage }"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>

    <button class="page-btn" :disabled="isLastPage" @click="goToPage(currentPage + 1)">→</button>
  </footer>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 767px) {
    gap: 6px;
    padding-bottom: 80px;
  }
}

.page-btn {
  width: 40px;
  height: 40px;
  border-radius: $radius-sm;
  border: 0px solid transparent;
  background: $color-surface;
  color: $color-text;
  font-family: $font-family-display;
  font-weight: 600;
  font-size: 0.85rem;
  transition: $transition;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  outline: none;

  @media (max-width: 767px) {
    width: 32px;
    height: 32px;
    font-size: 0.75rem;
  }

  &:focus-visible {
    outline: 2px solid $color-primary;
    outline-offset: 2px;
  }

  &:hover:not(:disabled) {
    background: $color-secondary;
  }

  &--active {
    background: $color-primary;
    color: white;
    box-shadow: 0 0 10px rgba($color-primary, 0.5);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
}
</style>
