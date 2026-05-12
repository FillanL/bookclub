import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useTheme } from '../useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    // Reset document attribute
    document.documentElement.removeAttribute('data-theme')
  })

  it('initializes with light theme by default', () => {
    const { theme } = useTheme()
    expect(theme.value).toBe('light')
  })

  it('sets theme and updates document attribute', () => {
    const { setTheme } = useTheme()

    setTheme('dark')

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(localStorage.getItem('bookclub-theme')).toBe('dark')
  })

  it('toggles between light and dark themes', () => {
    const { theme, toggleTheme } = useTheme()

    expect(theme.value).toBe('light')

    toggleTheme()
    expect(theme.value).toBe('dark')

    toggleTheme()
    expect(theme.value).toBe('light')
  })

  it('loads saved theme from localStorage', () => {
    localStorage.setItem('bookclub-theme', 'dark')

    const { initTheme, theme } = useTheme()
    initTheme()

    expect(theme.value).toBe('dark')
  })

  it('respects system preference when no saved theme', () => {
    // Mock matchMedia to return dark preference
    const matchMediaMock = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    })

    const { initTheme, theme } = useTheme()
    initTheme()

    expect(theme.value).toBe('dark')
  })
})
