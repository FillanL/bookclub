import { ref, onMounted, onUnmounted, getCurrentInstance, computed, type Ref } from 'vue'

export interface ParallaxOptions {
  speed?: number // 0.1 to 1, where lower is slower
  direction?: 'up' | 'down'
}

export function useParallax(elementRef: Ref<HTMLElement | null>, options: ParallaxOptions = {}) {
  const { speed = 0.5, direction = 'up' } = options
  const offset = ref(0)

  const handleScroll = () => {
    if (!elementRef.value) return

    const scrolled = window.scrollY
    const elementTop = elementRef.value.offsetTop
    const elementHeight = elementRef.value.offsetHeight
    const windowHeight = window.innerHeight

    // Only apply parallax when element is in viewport
    if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
      const relativeScroll = scrolled - elementTop + windowHeight
      offset.value = relativeScroll * speed * (direction === 'up' ? -1 : 1)
    }
  }

  const attach = (runInitial = true) => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    if (runInitial) {
      handleScroll()
    }
  }
  const detach = () => {
    window.removeEventListener('scroll', handleScroll)
  }

  const instance = getCurrentInstance()

  if (instance) {
    onMounted(() => attach(true))
    onUnmounted(detach)
  } else {
    attach(false)
  }

  return {
    offset,
    transform: computed(() => `translateY(${offset.value}px)`),
    refresh: handleScroll,
    stop: detach,
  }
}
