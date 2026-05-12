import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useClubStore } from '../clubs'

describe('useClubStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('loads clubs and selects the first one', async () => {
    const store = useClubStore()
    await store.loadClubs()

    expect(store.clubs.length).toBeGreaterThan(0)
    expect(store.selectedClub?.id).toBeDefined()
  })

  it('toggles chapter progress for active member and tracks ready chapters', async () => {
    const store = useClubStore()
    await store.loadClubs()

    const club = store.selectedClub
    expect(club).toBeTruthy()
    if (!club) return

    const firstChapter = club.readingPlan[0]
    expect(firstChapter).toBeDefined()
    if (!firstChapter) return
    await store.toggleChapter(firstChapter.id)

    const updatedChapter = store.selectedClub?.readingPlan[0]
    expect(updatedChapter?.completedByMemberIds).toContain(store.activeMemberId)

    const secondMember = club.members.find(
      (member) => member.role === 'member' && member.id !== store.activeMemberId,
    )
    if (!secondMember) return

    store.setActiveMember(secondMember.id)
    await store.toggleChapter(firstChapter.id)

    const readyChapters = store.chaptersReadyForReview
    expect(readyChapters.map((entry) => entry.id)).toContain(firstChapter.id)
  })

  it('adds chapters to the reading plan', async () => {
    const store = useClubStore()
    await store.loadClubs()

    const club = store.selectedClub
    expect(club).toBeTruthy()
    if (!club) return

    const nextOrder = club.readingPlan.length + 1
    await store.addChapter({
      clubId: club.id,
      title: 'Kingdom United',
      reference: '1 Samuel 8-12',
      order: nextOrder,
    })

    const updatedPlanLength = store.selectedClub?.readingPlan.length ?? 0
    expect(updatedPlanLength).toBe(nextOrder)
  })
})
