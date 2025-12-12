import { ref, watch } from 'vue'

const STORAGE_KEY = 'theme'
const isDark = ref(true)

function applyTheme(dark: boolean): void {
  document.documentElement.classList.toggle('light', !dark)
}

const saved = localStorage.getItem(STORAGE_KEY)
if (saved) {
  isDark.value = saved === 'dark'
  applyTheme(isDark.value)
}

watch(isDark, (value) => {
  localStorage.setItem(STORAGE_KEY, value ? 'dark' : 'light')
  applyTheme(value)
})

export function useTheme() {
  const toggleTheme = () => (isDark.value = !isDark.value)

  return {
    isDark,
    toggleTheme,
  }
}
