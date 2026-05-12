<script setup lang="ts">
import { computed } from 'vue'
import type { BookClub } from '@/types'

const props = defineProps<{
  club: BookClub | null
  activeMemberId: string | null
  readyChapterIds: string[]
}>()

const emit = defineEmits<{
  (event: 'toggle-chapter', chapterId: string): void
  (event: 'change-member', memberId: string): void
}>()

const memberOptions = computed(() => props.club?.members ?? [])

function handleToggle(id: string) {
  emit('toggle-chapter', id)
}

function handleMemberChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  emit('change-member', value)
}

function chapterCompletionLabel(club: BookClub, chapterId: string) {
  const chapter = club.readingPlan.find((entry) => entry.id === chapterId)
  if (!chapter) return ''
  const participantCount = club.members.filter((member) => member.role !== 'owner').length
  if (participantCount === 0) {
    return 'Awaiting members'
  }
  const completedCount = chapter.completedByMemberIds.filter((id) => id !== club.ownerId).length
  return `${completedCount}/${participantCount} readers checked in`
}
</script>

<template>
  <section class="space-y-6">
    <header v-if="club" class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
          {{ club.name }}
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Track chapter progress and prepare the next meeting.
        </p>
      </div>

      <label class="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        Acting as
        <select
          class="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          :value="activeMemberId ?? ''"
          @change="handleMemberChange"
        >
          <option
            v-for="member in memberOptions"
            :key="member.id"
            :value="member.id"
          >
            {{ member.name }} ({{ member.role }})
          </option>
        </select>
      </label>
    </header>

    <div v-if="!club" class="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
      Choose or create a club to begin planning your reading journey.
    </div>

    <ul v-else class="space-y-4">
      <li
        v-for="chapter in club.readingPlan"
        :key="chapter.id"
        class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-primary-400 dark:border-gray-700 dark:bg-gray-800"
        :class="readyChapterIds.includes(chapter.id) ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900' : ''"
      >
        <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Step {{ chapter.order }}
            </p>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ chapter.title }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ chapter.reference }}
            </p>
            <p
              v-if="chapter.targetMeetingDate"
              class="text-xs text-gray-400 dark:text-gray-500"
            >
              Target meeting: {{ new Date(chapter.targetMeetingDate).toLocaleDateString() }}
            </p>

            <p class="mt-2 text-xs font-medium text-gray-600 dark:text-gray-300">
              {{ chapterCompletionLabel(club, chapter.id) }}
            </p>

            <p
              v-if="readyChapterIds.includes(chapter.id)"
              class="mt-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400"
            >
              All readers are ready to meet.
            </p>
          </div>
          <div class="flex items-start gap-3">
            <label class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
              <input
                type="checkbox"
                class="h-5 w-5 accent-primary-600"
                :checked="chapter.completedByMemberIds.includes(activeMemberId ?? '')"
                :disabled="!activeMemberId"
                @change="handleToggle(chapter.id)"
              />
              Mark complete
            </label>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>
