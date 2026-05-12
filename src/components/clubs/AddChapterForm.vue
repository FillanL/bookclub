<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  clubId: string | null
  nextOrder: number
}>()

const emit = defineEmits<{
  (event: 'submit', payload: { clubId: string; title: string; reference: string; order: number; targetMeetingDate?: string }): void
}>()

const title = ref('')
const reference = ref('')
const targetMeetingDate = ref('')

function reset() {
  title.value = ''
  reference.value = ''
  targetMeetingDate.value = ''
}

function handleSubmit() {
  if (!props.clubId) return
  if (!title.value.trim() || !reference.value.trim()) return

  emit('submit', {
    clubId: props.clubId,
    title: title.value.trim(),
    reference: reference.value.trim(),
    order: props.nextOrder,
    targetMeetingDate: targetMeetingDate.value || undefined,
  })

  reset()
}
</script>

<template>
  <form
    class="space-y-3 rounded-lg border border-dashed border-gray-300 p-4 dark:border-gray-700"
    @submit.prevent="handleSubmit"
  >
    <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-100">Add chapter step</h3>
    <div class="grid gap-3 md:grid-cols-2">
      <label class="text-sm text-gray-600 dark:text-gray-300">
        Title
        <input
          v-model="title"
          type="text"
          class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          placeholder="e.g., Wilderness Wanderings"
        />
      </label>
      <label class="text-sm text-gray-600 dark:text-gray-300">
        Reference
        <input
          v-model="reference"
          type="text"
          class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          placeholder="Numbers 10-21"
        />
      </label>
    </div>
    <label class="block text-sm text-gray-600 dark:text-gray-300">
      Target meeting date
      <input
        v-model="targetMeetingDate"
        type="date"
        class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
      />
    </label>
    <button
      type="submit"
      class="w-full rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      :disabled="!clubId || !title.trim() || !reference.trim()"
    >
      Add to plan (step {{ nextOrder }})
    </button>
  </form>
</template>
