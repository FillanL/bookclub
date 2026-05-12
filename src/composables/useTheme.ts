import { ref, onMounted, getCurrentInstance } from 'vue'
import type { Theme } from '@/types'

const THEME_STORAGE_KEY = 'bookclub-theme'

const theme = ref<Theme>('light')

export function useTheme() {
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem(THEME_STORAGE_KEY, newTheme)
  }

  const toggleTheme = () => {
    setTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  const initTheme = () => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null
    const prefersDark =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches

    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
    setTheme(initialTheme)
  }

  const instance = getCurrentInstance()
  if (instance) {
    onMounted(() => {
      if (typeof window !== 'undefined') {
        initTheme()
      }
    })
  } else if (typeof window !== 'undefined') {
    initTheme()
  }

  return {
    theme,
    setTheme,
    toggleTheme,
    initTheme,
  }
}
