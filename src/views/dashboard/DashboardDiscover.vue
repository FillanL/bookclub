<script setup lang="ts">
import { ref } from 'vue'

const recommendedClubs = ref([
  { id: 1, name: 'Poetry Corner', members: 42, description: 'Exploring classic and contemporary poetry' },
  { id: 2, name: 'Historical Fiction', members: 58, description: 'Journey through time with historical novels' },
  { id: 3, name: 'Business Books', members: 35, description: 'Level up your career and business mindset' },
])

const trendingBooks = ref([
  { id: 1, title: 'Tomorrow, and Tomorrow, and Tomorrow', author: 'Gabrielle Zevin' },
  { id: 2, title: 'Lessons in Chemistry', author: 'Bonnie Garmus' },
  { id: 3, title: 'The Midnight Library', author: 'Matt Haig' },
])
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Discover</h1>
      <p class="text-gray-600 dark:text-gray-400">Find new clubs and books to explore</p>
    </div>

    <!-- Recommended Clubs -->
    <div class="mb-12">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recommended Clubs</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="club in recommendedClubs"
          :key="club.id"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
        >
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ club.name }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{{ club.members }} members</p>
          <p class="text-gray-700 dark:text-gray-300 mb-4">{{ club.description }}</p>
          <button class="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
            Join Club
          </button>
        </div>
      </div>
    </div>

    <!-- Trending Books -->
    <div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Trending Books</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="book in trendingBooks"
          :key="book.id"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
        >
          <div class="w-full h-48 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg mb-4 flex items-center justify-center text-white text-6xl">
            📕
          </div>
          <h3 class="font-bold text-gray-900 dark:text-white mb-1">{{ book.title }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">by {{ book.author }}</p>
          <button class="w-full py-2 border border-primary-600 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors font-medium">
            Add to Reading List
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
