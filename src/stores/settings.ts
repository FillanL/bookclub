import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { NotificationPreferences, ProfileSettings, ReadingPreferences, UserSettings } from '@/types'
import { fetchSettings, saveNotifications, saveProfile, saveReadingPreferences } from '@/services/settingsService'

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<UserSettings | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const profile = computed(() => settings.value?.profile ?? null)
  const notifications = computed(() => settings.value?.notifications ?? null)
  const reading = computed(() => settings.value?.reading ?? null)

  async function load() {
    loading.value = true
    error.value = null
    try {
      settings.value = await fetchSettings()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load settings'
    } finally {
      loading.value = false
    }
  }

  async function updateNotifications(preferences: NotificationPreferences) {
    if (!settings.value) return
    const next = await saveNotifications(preferences)
    settings.value = {
      ...settings.value,
      notifications: next,
    }
  }

  async function updateReading(preferences: ReadingPreferences) {
    if (!settings.value) return
    const next = await saveReadingPreferences(preferences)
    settings.value = {
      ...settings.value,
      reading: next,
    }
  }

  async function updateProfile(profileUpdate: ProfileSettings) {
    if (!settings.value) return
    const next = await saveProfile(profileUpdate)
    settings.value = {
      ...settings.value,
      profile: next,
    }
  }

  return {
    settings,
    loading,
    error,
    profile,
    notifications,
    reading,
    load,
    updateNotifications,
    updateReading,
    updateProfile,
  }
})
