<script setup lang="ts">
import { ref } from 'vue'

const upcomingMeetings = ref([
  {
    id: 1,
    club: 'Classic Literature Club',
    book: 'Pride and Prejudice',
    date: '2025-10-25',
    time: '7:00 PM',
    location: 'Online',
  },
  {
    id: 2,
    club: 'Science Fiction Fans',
    book: 'Dune',
    date: '2025-10-28',
    time: '6:30 PM',
    location: 'Central Library',
  },
  {
    id: 3,
    club: 'Mystery Lovers',
    book: 'The Silent Patient',
    date: '2025-11-02',
    time: '8:00 PM',
    location: 'Online',
  },
])
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calendar</h1>
      <p class="text-gray-600 dark:text-gray-400">Upcoming book club meetings and events</p>
    </div>

    <div class="space-y-4">
      <div
        v-for="meeting in upcomingMeetings"
        :key="meeting.id"
        class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
      >
        <div class="flex items-start gap-6">
          <div class="flex flex-col items-center justify-center bg-primary-100 dark:bg-primary-900/30 rounded-lg p-4 min-w-20">
            <span class="text-sm font-medium text-primary-700 dark:text-primary-300">
              {{ new Date(meeting.date).toLocaleDateString('en-US', { month: 'short' }) }}
            </span>
            <span class="text-3xl font-bold text-primary-700 dark:text-primary-300">
              {{ new Date(meeting.date).getDate() }}
            </span>
          </div>

          <div class="flex-1">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">{{ meeting.club }}</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-3">Discussing: {{ meeting.book }}</p>

            <div class="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div class="flex items-center gap-2">
                <span>🕐</span>
                <span>{{ meeting.time }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span>📍</span>
                <span>{{ meeting.location }}</span>
              </div>
            </div>

            <div class="mt-4 flex gap-3">
              <button class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
                Join Meeting
              </button>
              <button class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="upcomingMeetings.length === 0" class="text-center py-12">
        <p class="text-gray-500 dark:text-gray-400">No upcoming meetings scheduled</p>
      </div>
    </div>
  </div>
</template>
