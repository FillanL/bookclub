<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import ProfileForm from '@/components/settings/ProfileForm.vue'
import NotificationPreferences from '@/components/settings/NotificationPreferences.vue'
import ReadingCadenceCard from '@/components/settings/ReadingCadenceCard.vue'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()
const { profile, notifications, reading, loading, error } = storeToRefs(settingsStore)

onMounted(() => {
  if (!settingsStore.settings) {
    settingsStore.load()
  }
})

function handleProfileSubmit(updated: typeof profile.value) {
  if (updated) {
    settingsStore.updateProfile(updated)
  }
}

function handleNotificationChange(updated: typeof notifications.value) {
  if (updated) {
    settingsStore.updateNotifications(updated)
  }
}

function handleReadingChange(updated: typeof reading.value) {
  if (updated) {
    settingsStore.updateReading(updated)
  }
}
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
      <p class="text-gray-600 dark:text-gray-400">Tune your profile, cadence, and notifications.</p>
    </header>

    <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
    <p v-else-if="loading" class="text-sm text-gray-500">Loading preferences…</p>

    <div class="grid gap-6 lg:grid-cols-2">
      <ProfileForm
        :model-value="profile"
        :loading="loading"
        @submit="handleProfileSubmit"
      />
      <NotificationPreferences
        :model-value="notifications"
        @change="handleNotificationChange"
      />
      <ReadingCadenceCard
        class="lg:col-span-2"
        :model-value="reading"
        @change="handleReadingChange"
      />
    </div>
  </div>
</template>
