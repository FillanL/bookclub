<script setup lang="ts">
import type { ReadingPreferences } from '@/types'

const props = defineProps<{
  modelValue: ReadingPreferences | null
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: ReadingPreferences): void
  (event: 'change', value: ReadingPreferences): void
}>()

const cadenceOptions: Array<{ value: ReadingPreferences['cadence']; label: string }> = [
  { value: 'daily', label: 'Daily check-ins' },
  { value: 'weekly', label: 'Weekly rhythm' },
  { value: 'biweekly', label: 'Every other week' },
]

const meetingDayOptions: Array<{ value: ReadingPreferences['defaultMeetingDay']; label: string }> = [
  { value: 'monday', label: 'Monday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
]

function updateCadence(cadence: ReadingPreferences['cadence']) {
  if (!props.modelValue) return
  const value = { ...props.modelValue, cadence }
  emit('update:modelValue', value)
  emit('change', value)
}

function updateMeetingDay(event: Event) {
  if (!props.modelValue) return
  const defaultMeetingDay = (event.target as HTMLSelectElement).value as ReadingPreferences['defaultMeetingDay']
  const value = { ...props.modelValue, defaultMeetingDay }
  emit('update:modelValue', value)
  emit('change', value)
}

function updateTimezone(event: Event) {
  if (!props.modelValue) return
  const timezone = (event.target as HTMLInputElement).value
  const value = { ...props.modelValue, timezone }
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <section class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
    <header class="mb-4">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Reading cadence</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">Set the pace for new chapter releases.</p>
    </header>

    <div class="space-y-4">
      <div class="grid gap-2">
        <p class="text-sm font-medium text-gray-700 dark:text-gray-200">Cadence</p>
        <div class="grid gap-2 md:grid-cols-3">
          <button
            v-for="option in cadenceOptions"
            :key="option.value"
            type="button"
            class="rounded-md border px-3 py-2 text-sm"
            :class="[
              modelValue?.cadence === option.value
                ? 'border-primary-600 bg-primary-50 text-primary-700 dark:border-primary-500 dark:bg-primary-900/30 dark:text-primary-200'
                : 'border-gray-300 text-gray-700 hover:border-primary-500 dark:border-gray-700 dark:text-gray-200',
            ]"
            @click="updateCadence(option.value)"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <label class="block text-sm text-gray-600 dark:text-gray-300">
        Default meeting day
        <select
          class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          :value="modelValue?.defaultMeetingDay"
          @change="updateMeetingDay"
        >
          <option
            v-for="option in meetingDayOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </label>

      <label class="block text-sm text-gray-600 dark:text-gray-300">
        Timezone
        <input
          class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          :value="modelValue?.timezone"
          @input="updateTimezone"
          placeholder="America/New_York"
        />
      </label>
    </div>
  </section>
</template>
