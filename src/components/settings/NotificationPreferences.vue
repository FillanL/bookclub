<script setup lang="ts">
import type { NotificationPreferences } from '@/types'

const props = defineProps<{
  modelValue: NotificationPreferences | null
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: NotificationPreferences): void
  (event: 'change', value: NotificationPreferences): void
}>()

function toggle(key: keyof NotificationPreferences) {
  if (!props.modelValue) return
  const value = { ...props.modelValue, [key]: !props.modelValue[key] }
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <section class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
    <header class="mb-4">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">Choose what triggers alerts.</p>
    </header>

    <ul class="space-y-4">
      <li>
        <label class="flex items-center justify-between gap-4 text-sm text-gray-700 dark:text-gray-200">
          Meeting reminders
          <input
            type="checkbox"
            class="h-5 w-5 accent-primary-600"
            :checked="modelValue?.meetingReminders"
            @change="toggle('meetingReminders')"
          />
        </label>
      </li>
      <li>
        <label class="flex items-center justify-between gap-4 text-sm text-gray-700 dark:text-gray-200">
          Chapter completion alerts
          <input
            type="checkbox"
            class="h-5 w-5 accent-primary-600"
            :checked="modelValue?.chapterCompletionAlerts"
            @change="toggle('chapterCompletionAlerts')"
          />
        </label>
      </li>
      <li>
        <label class="flex items-center justify-between gap-4 text-sm text-gray-700 dark:text-gray-200">
          Daily digest email
          <input
            type="checkbox"
            class="h-5 w-5 accent-primary-600"
            :checked="modelValue?.dailyDigest"
            @change="toggle('dailyDigest')"
          />
        </label>
      </li>
    </ul>
  </section>
</template>
