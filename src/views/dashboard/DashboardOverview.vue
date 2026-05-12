<script setup lang="ts">
import { ref } from 'vue'

const stats = ref([
  { label: 'Active Clubs', value: '3', icon: '👥' },
  { label: 'Books Read', value: '12', icon: '📚' },
  { label: 'Current Reading', value: '2', icon: '📖' },
  { label: 'Upcoming Meetings', value: '5', icon: '📅' },
])

const recentActivity = ref([
  { text: 'Finished reading "The Great Gatsby"', time: '2 hours ago' },
  { text: 'Joined "Classic Literature Club"', time: '1 day ago' },
  { text: 'Posted in "Science Fiction Fans"', time: '2 days ago' },
])
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard Overview</h1>
      <p class="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your book clubs.</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">{{ stat.label }}</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ stat.value }}</p>
          </div>
          <div class="text-4xl">{{ stat.icon }}</div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
      <div class="space-y-4">
        <div
          v-for="(activity, index) in recentActivity"
          :key="index"
          class="flex items-start gap-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
        >
          <div class="w-2 h-2 mt-2 rounded-full bg-primary-600"></div>
          <div class="flex-1">
            <p class="text-gray-900 dark:text-white">{{ activity.text }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ activity.time }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
