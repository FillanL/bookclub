<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <nav class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">
              📚 BookClub
            </div>
          </div>

          <div class="flex items-center gap-6">
            <RouterLink
              to="/"
              class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Home
            </RouterLink>
            <RouterLink
              to="/login"
              class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Login
            </RouterLink>
            <RouterLink
              to="/signup"
              class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Sign Up
            </RouterLink>
            <button
              @click="toggleTheme"
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              <span v-if="theme === 'light'">🌙</span>
              <span v-else>☀️</span>
            </button>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="pt-20">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-12">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">BookClub</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Connect with readers, discover new books, and share your love of reading.
            </p>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">About Us</a></li>
              <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">How It Works</a></li>
              <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Browse Clubs</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Support</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Help Center</a></li>
              <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Contact Us</a></li>
              <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Connect</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Twitter</a></li>
              <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Instagram</a></li>
              <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; 2025 BookClub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
