<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors">
    <!-- Navigation handled by layout -->

    <!-- HERO (Parallax) -->
    <section
      class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      :style="{ transform: `translateY(${scrollY * 0.05}px)` }"
    >
      <!-- Parallax Background Elements -->
      <div
        class="absolute inset-0 opacity-10 dark:opacity-5"
        :style="{ transform: `translateY(${scrollY * 0.3}px)` }"
      >
        <div class="absolute top-20 left-10 text-9xl">📚</div>
        <div class="absolute top-40 right-20 text-7xl">📖</div>
        <div class="absolute bottom-40 left-1/4 text-8xl">📕</div>
        <div class="absolute bottom-20 right-1/3 text-6xl">📗</div>
      </div>

      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <p class="inline-flex items-center gap-2 rounded-full border border-primary-200 dark:border-gray-700 bg-primary-50 dark:bg-gray-800 px-4 py-2 text-sm tracking-wide text-primary-700 dark:text-primary-300 mb-6">
            <span class="h-2 w-2 rounded-full bg-primary-600 animate-pulse"></span>
            Read together. Think deeper.
          </p>
          <h1
            class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
            :style="{ transform: `translateY(${scrollY * 0.1}px)` }"
          >
            Your book club,<br class="hidden sm:block" />
            <span class="text-primary-600 dark:text-primary-400">beautifully organized</span>
          </h1>
          <p
            class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10"
            :style="{ transform: `translateY(${scrollY * 0.15}px)` }"
          >
            Plan meetings, spark discussion, track reading, and discover your next favorite book — all in one elegant place.
          </p>
          <div
            class="flex flex-col sm:flex-row items-center justify-center gap-4"
            :style="{ transform: `translateY(${scrollY * 0.2}px)` }"
          >
            <RouterLink
              to="/signup"
              class="px-8 py-4 bg-primary-600 text-white text-lg font-semibold rounded-xl hover:bg-primary-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
            >
              Create a Club
            </RouterLink>
            <a
              href="#features"
              class="px-8 py-4 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 text-lg font-semibold rounded-xl border-2 border-primary-600 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-gray-700 transition-all"
            >
              Explore features
            </a>
          </div>
          <dl class="mt-12 grid grid-cols-3 gap-6 text-center max-w-lg mx-auto">
            <div>
              <dt class="text-3xl font-bold text-gray-900 dark:text-white">2k+</dt>
              <dd class="text-sm text-gray-600 dark:text-gray-400">Clubs</dd>
            </div>
            <div>
              <dt class="text-3xl font-bold text-gray-900 dark:text-white">150k</dt>
              <dd class="text-sm text-gray-600 dark:text-gray-400">Books tracked</dd>
            </div>
            <div>
              <dt class="text-3xl font-bold text-gray-900 dark:text-white">98%</dt>
              <dd class="text-sm text-gray-600 dark:text-gray-400">Satisfaction</dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <!-- FEATURES -->
    <section
      id="features"
      class="py-20 sm:py-28 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
    >
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
          Everything your club needs
        </h2>
        <p class="text-center text-gray-600 dark:text-gray-400 mb-12">
          Lightweight. Opinionated where it matters. Flexible everywhere else.
        </p>

        <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="group rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-8 hover:border-primary-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="mb-4">
              <span class="text-5xl">📅</span>
            </div>
            <h3 class="font-bold text-xl text-gray-900 dark:text-white mb-2">Meetings</h3>
            <p class="text-gray-600 dark:text-gray-400">Smart scheduling, reminders, and attendance.</p>
          </div>

          <div class="group rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-8 hover:border-primary-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="mb-4">
              <span class="text-5xl">💬</span>
            </div>
            <h3 class="font-bold text-xl text-gray-900 dark:text-white mb-2">Discussions</h3>
            <p class="text-gray-600 dark:text-gray-400">Guided prompts, threads, and highlights.</p>
          </div>

          <div class="group rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-8 hover:border-primary-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="mb-4">
              <span class="text-5xl">📚</span>
            </div>
            <h3 class="font-bold text-xl text-gray-900 dark:text-white mb-2">Library</h3>
            <p class="text-gray-600 dark:text-gray-400">Shared reading lists, ratings, and notes.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PARALLAX DIVIDER -->
    <section
      class="relative h-96 overflow-hidden"
      :style="{ transform: `translateY(${(scrollY - 1000) * 0.2}px)` }"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-900">
        <div
          class="absolute inset-0 opacity-20"
          :style="{ transform: `translateY(${(scrollY - 1000) * 0.4}px)` }"
        >
          <div class="absolute top-10 left-10 text-9xl">📖</div>
          <div class="absolute bottom-10 right-10 text-9xl">✨</div>
        </div>
      </div>
      <div class="relative h-full flex items-center justify-center">
        <div class="text-center text-white">
          <h3 class="text-4xl font-bold mb-4">Join 10,000+ Happy Readers</h3>
          <p class="text-xl opacity-90">Building meaningful connections through books</p>
        </div>
      </div>
    </section>

    <!-- CALLOUT / CTA -->
    <section id="join" class="py-20 sm:py-28 bg-gray-50 dark:bg-gray-900">
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <h3 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to start reading together?
        </h3>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Spin up a club, invite friends, and pick your first book — all in minutes.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <RouterLink
            to="/signup"
            class="px-8 py-4 bg-primary-600 text-white text-lg font-semibold rounded-xl hover:bg-primary-700 transform hover:scale-105 transition-all shadow-lg"
          >
            Create a Club
          </RouterLink>
          <RouterLink
            to="/login"
            class="px-8 py-4 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 text-lg font-semibold rounded-xl border-2 border-primary-600 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-gray-700 transition-all"
          >
            Sign In
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Footer handled by layout -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrollY = ref(0)

const handleScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
