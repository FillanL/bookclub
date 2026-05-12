import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { ref } from 'vue'
import { useParallax } from '../useParallax'

describe('useParallax', () => {
  let element: HTMLElement

  beforeEach(() => {
    element = document.createElement('div')
    element.style.position = 'absolute'
    element.style.top = '500px'
    element.style.height = '300px'
    Object.defineProperty(element, 'offsetTop', {
      configurable: true,
      value: 500,
    })
    Object.defineProperty(element, 'offsetHeight', {
      configurable: true,
      value: 300,
    })
    document.body.appendChild(element)

    // Mock window properties
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      value: 768,
    })

    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    })
  })

  afterEach(() => {
    document.body.removeChild(element)
    vi.clearAllMocks()
  })

  it('initializes with zero offset', () => {
    const elementRef = ref(element)
    const { offset } = useParallax(elementRef)

    expect(offset.value).toBe(0)
  })

  it('calculates offset based on scroll position', () => {
    const elementRef = ref(element)
    const { offset } = useParallax(elementRef, { speed: 0.5 })

    // Simulate scroll
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 100,
    })

    window.dispatchEvent(new Event('scroll'))

    // Offset should be calculated based on scroll position and speed
    expect(offset.value).toBeLessThan(0) // Going up by default
  })

  it('respects speed option', () => {
    const elementRef = ref(element)
    const { offset, stop } = useParallax(elementRef, { speed: 0.2 })

    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 100,
    })

    window.dispatchEvent(new Event('scroll'))

    const slowOffset = offset.value

    // Reset
    stop?.()

    const elementRef2 = ref(element)
    const { offset: offset2, stop: stopFast } = useParallax(elementRef2, { speed: 0.8 })

    window.dispatchEvent(new Event('scroll'))

    // Higher speed should produce larger offset
    expect(Math.abs(offset2.value)).toBeGreaterThan(Math.abs(slowOffset))
    stopFast?.()
  })

  it('respects direction option', () => {
    const elementRefUp = ref(element)
    const { offset: offsetUp, stop: stopUp } = useParallax(elementRefUp, { direction: 'up' })

    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 100,
    })

    window.dispatchEvent(new Event('scroll'))

    const elementRefDown = ref(element)
    const { offset: offsetDown, stop: stopDown } = useParallax(elementRefDown, { direction: 'down' })

    window.dispatchEvent(new Event('scroll'))

    // Directions should produce opposite signs
    expect(Math.sign(offsetUp.value)).not.toBe(Math.sign(offsetDown.value))

    stopUp?.()
    stopDown?.()
  })

  it('handles null element reference gracefully', () => {
    const elementRef = ref<HTMLElement | null>(null)

    expect(() => {
      useParallax(elementRef)
    }).not.toThrow()
  })
})
