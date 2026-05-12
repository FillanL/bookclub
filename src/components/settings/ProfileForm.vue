<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { ProfileSettings } from '@/types'

const props = defineProps<{
  modelValue: ProfileSettings | null
  loading?: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: ProfileSettings): void
  (event: 'submit', value: ProfileSettings): void
}>()

const form = reactive<ProfileSettings>({
  displayName: '',
  email: '',
  avatarUrl: undefined,
})

watch(
  () => props.modelValue,
  (value) => {
    if (!value) return
    form.displayName = value.displayName
    form.email = value.email
    form.avatarUrl = value.avatarUrl
  },
  { immediate: true },
)

function handleSubmit() {
  emit('submit', { ...form })
}

watch(
  form,
  (value) => {
    emit('update:modelValue', { ...value })
  },
  { deep: true },
)
</script>

<template>
  <section class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
    <header class="mb-4">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Profile</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">Update how club members see you.</p>
    </header>

    <form class="grid gap-4" @submit.prevent="handleSubmit">
      <label class="text-sm text-gray-600 dark:text-gray-300">
        Display name
        <input
          v-model="form.displayName"
          type="text"
          class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        />
      </label>

      <label class="text-sm text-gray-600 dark:text-gray-300">
        Email
        <input
          v-model="form.email"
          type="email"
          class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        />
      </label>

      <label class="text-sm text-gray-600 dark:text-gray-300">
        Avatar URL
        <input
          v-model="form.avatarUrl"
          type="url"
          class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          placeholder="https://"
        />
      </label>

      <button
        type="submit"
        class="justify-self-start rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        :disabled="loading"
      >
        Save profile
      </button>
    </form>
  </section>
</template>
