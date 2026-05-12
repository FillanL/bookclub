<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import ClubSidebar from '@/components/clubs/ClubSidebar.vue'
import ChapterProgressList from '@/components/clubs/ChapterProgressList.vue'
import AddChapterForm from '@/components/clubs/AddChapterForm.vue'
import { useClubStore } from '@/stores/clubs'

const clubStore = useClubStore()
const {
  clubs,
  selectedClub,
  selectedClubId,
  chaptersReadyForReview,
  activeMemberId,
  loading,
  error,
} = storeToRefs(clubStore)

const readyCountMap = computed<Record<string, number>>(() => {
  const totals: Record<string, number> = {}
  clubs.value.forEach((club) => {
    const participantIds = club.members.filter((member) => member.role !== 'owner').map((member) => member.id)
    totals[club.id] = club.readingPlan.filter((chapter) =>
      participantIds.length === 0
        ? false
        : participantIds.every((id) => chapter.completedByMemberIds.includes(id)),
    ).length
  })
  return totals
})

const nextOrder = computed(() =>
  selectedClub.value ? selectedClub.value.readingPlan.length + 1 : 1,
)

const readyChapterIds = computed(() => chaptersReadyForReview.value.map((chapter) => chapter.id))

onMounted(() => {
  if (!clubs.value.length) {
    clubStore.loadClubs()
  }
})

watch(
  selectedClub,
  (club) => {
    if (!club) return
    const hasActiveMember = club.members.some((member) => member.id === activeMemberId.value)
    if (!hasActiveMember) {
      const preferredMember =
        club.members.find((member) => member.role !== 'owner') ??
        club.members[0]
      if (preferredMember) {
        clubStore.setActiveMember(preferredMember.id)
      }
    }
  },
  { immediate: true },
)

function handleSelectClub(id: string) {
  clubStore.selectClub(id)
}

function handleMemberChange(memberId: string) {
  clubStore.setActiveMember(memberId)
}

async function handleAddChapter(payload: { clubId: string; title: string; reference: string; order: number; targetMeetingDate?: string }) {
  await clubStore.addChapter(payload)
}

async function handleToggleChapter(chapterId: string) {
  await clubStore.toggleChapter(chapterId)
}
</script>

<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">My Clubs</h1>
      <p class="text-gray-600 dark:text-gray-400">
        Set the reading pace, track chapter check-ins, and know when it is time to meet.
      </p>
    </header>

    <div class="grid gap-8 lg:grid-cols-[280px,1fr]">
      <ClubSidebar
        :clubs="clubs"
        :selected-id="selectedClubId"
        :loading="loading"
        :error="error"
        :ready-counts="readyCountMap"
        @select="handleSelectClub"
      />

      <div class="space-y-6">
        <AddChapterForm
          :club-id="selectedClub?.id ?? null"
          :next-order="nextOrder"
          @submit="handleAddChapter"
        />

        <ChapterProgressList
          :club="selectedClub"
          :active-member-id="activeMemberId"
          :ready-chapter-ids="readyChapterIds"
          @toggle-chapter="handleToggleChapter"
          @change-member="handleMemberChange"
        />
      </div>
    </div>
  </div>
</template>
