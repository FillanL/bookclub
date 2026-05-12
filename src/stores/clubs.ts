import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { BookClub, ChapterPlan } from '@/types'
import { addChapterToClub, fetchBookClubs, toggleChapterCompletion } from '@/services/clubService'

function toDate(value: string | Date): Date {
  return value instanceof Date ? value : new Date(value)
}

export const useClubStore = defineStore('clubs', () => {
  const clubs = ref<BookClub[]>([])
  const selectedClubId = ref<string | null>(null)
  const activeMemberId = ref<string>('user-guest-1')
  const loading = ref(false)
  const error = ref<string | null>(null)

  const sortedClubs = computed(() =>
    clubs.value
      .map((club) => ({
        ...club,
        createdAt: toDate(club.createdAt),
        readingPlan: [...club.readingPlan].sort((a, b) => a.order - b.order),
      }))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
  )

  const selectedClub = computed<BookClub | null>(() => {
    const currentId = selectedClubId.value
    if (!currentId) return null
    return sortedClubs.value.find((club) => club.id === currentId) ?? null
  })

  const chaptersReadyForReview = computed(() => {
    const club = selectedClub.value
    if (!club) return []
    const memberIds = club.members.filter((member) => member.role !== 'owner').map((member) => member.id)
    return club.readingPlan.filter((chapter) => memberIds.every((id) => chapter.completedByMemberIds.includes(id)))
  })

  async function loadClubs() {
    loading.value = true
    error.value = null
    try {
      const data = await fetchBookClubs()
      clubs.value = data.map((club) => ({
        ...club,
        createdAt: toDate(club.createdAt),
      }))
      const [firstClub] = clubs.value
      if (!selectedClubId.value && firstClub) {
        selectedClubId.value = firstClub.id
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load book clubs'
    } finally {
      loading.value = false
    }
  }

  function selectClub(id: string) {
    selectedClubId.value = id
  }

  function setActiveMember(id: string) {
    activeMemberId.value = id
  }

  async function addChapter(chapter: {
    clubId: string
    title: string
    reference: string
    order: number
    targetMeetingDate?: string
  }) {
    const result = await addChapterToClub({
      clubId: chapter.clubId,
      input: {
        title: chapter.title,
        reference: chapter.reference,
        order: chapter.order,
        targetMeetingDate: chapter.targetMeetingDate,
      },
    })

    const club = clubs.value.find((entry) => entry.id === chapter.clubId)
    if (!club) return

    const nextPlan: ChapterPlan = {
      ...result,
      completedByMemberIds: [...result.completedByMemberIds],
    }
    club.readingPlan = [...club.readingPlan, nextPlan]
  }

  async function toggleChapter(chapterId: string) {
    const club = selectedClub.value
    const memberId = activeMemberId.value
    if (!club || !memberId) return

    const result = await toggleChapterCompletion({
      clubId: club.id,
      chapterId,
      memberId,
    })

    const targetClub = clubs.value.find((entry) => entry.id === club.id)
    if (!targetClub) return

    targetClub.readingPlan = targetClub.readingPlan.map((chapter) =>
      chapter.id === result.id
        ? {
            ...chapter,
            completedByMemberIds: [...result.completedByMemberIds],
          }
        : chapter,
    )
  }

  return {
    clubs: sortedClubs,
    selectedClubId,
    selectedClub,
    chaptersReadyForReview,
    activeMemberId,
    loading,
    error,
    loadClubs,
    selectClub,
    setActiveMember,
    addChapter,
    toggleChapter,
  }
})
