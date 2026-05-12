<script setup lang="ts">
import type { BookClub } from '@/types'

const props = defineProps<{
  clubs: BookClub[]
  selectedId: string | null
  loading?: boolean
  error?: string | null
  readyCounts?: Record<string, number>
}>()

const emit = defineEmits<{
  (event: 'select', clubId: string): void
}>()

function handleSelect(id: string) {
  emit('select', id)
}
</script>

<template>
  <aside class="space-y-4">
    <header>
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Your Clubs</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">Pick a group to manage its plan.</p>
    </header>

    <div v-if="loading" class="text-sm text-gray-500 dark:text-gray-400">Loading clubs…</div>
    <div v-else-if="error" class="text-sm text-red-500">{{ error }}</div>

    <ul v-else class="space-y-2">
      <li
        v-for="club in clubs"
        :key="club.id"
      >
        <button
          type="button"
          class="w-full rounded-lg border px-4 py-3 text-left transition-colors"
          :class="[
            selectedId === club.id
              ? 'border-primary-600 bg-primary-50 text-primary-700 dark:border-primary-500 dark:bg-primary-900/30 dark:text-primary-200'
              : 'border-gray-200 bg-white text-gray-800 hover:border-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200',
          ]"
          @click="handleSelect(club.id)"
        >
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-semibold">{{ club.name }}</h3>
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ club.members.length }} members</span>
          </div>
          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
            {{ club.description }}
          </p>
          <p v-if="club.currentBook" class="mt-2 text-xs font-medium text-primary-600 dark:text-primary-300">
            Currently reading: {{ club.currentBook.title }}
          </p>
          <p
            v-if="readyCounts && readyCounts[club.id]"
            class="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400"
          >
            {{ readyCounts[club.id] }} chapter<span v-if="readyCounts[club.id] !== 1">s</span> ready to review
          </p>
        </button>
      </li>
    </ul>
  </aside>
</template>
