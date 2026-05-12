<script setup lang="ts">
import { ref } from 'vue'

const books = ref([
  { id: 1, title: 'Pride and Prejudice', author: 'Jane Austen', status: 'reading', progress: 65 },
  { id: 2, title: 'Dune', author: 'Frank Herbert', status: 'reading', progress: 32 },
  { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', status: 'completed', progress: 100 },
  { id: 4, title: '1984', author: 'George Orwell', status: 'to-read', progress: 0 },
])
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Books</h1>
        <p class="text-gray-600 dark:text-gray-400">Track your reading progress</p>
      </div>
      <button class="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold">
        Add Book
      </button>
    </div>

    <div class="space-y-4">
      <div
        v-for="book in books"
        :key="book.id"
        class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">{{ book.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">by {{ book.author }}</p>

            <div class="flex items-center gap-4">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium',
                  book.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                  book.status === 'reading' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                  'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                ]"
              >
                {{ book.status === 'to-read' ? 'To Read' : book.status === 'reading' ? 'Reading' : 'Completed' }}
              </span>

              <div v-if="book.status === 'reading'" class="flex-1 max-w-md">
                <div class="flex items-center gap-2">
                  <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      class="bg-primary-600 h-2 rounded-full transition-all"
                      :style="{ width: `${book.progress}%` }"
                    ></div>
                  </div>
                  <span class="text-sm text-gray-600 dark:text-gray-400 font-medium">{{ book.progress }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
