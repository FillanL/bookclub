import type { Book, BookClub, ChapterPlan, ClubMember } from '@/types'

const bibleChronologicalPlan: ChapterPlan[] = [
  {
    id: 'chapter-creation',
    title: 'Creation & Early World',
    reference: 'Genesis 1-11',
    order: 1,
    completedByMemberIds: [],
    targetMeetingDate: '2025-01-15',
  },
  {
    id: 'chapter-patriarchs',
    title: 'Patriarchs & Promises',
    reference: 'Genesis 12-36',
    order: 2,
    completedByMemberIds: [],
    targetMeetingDate: '2025-01-29',
  },
  {
    id: 'chapter-exodus',
    title: 'From Slavery to Sinai',
    reference: 'Exodus 1-24',
    order: 3,
    completedByMemberIds: [],
    targetMeetingDate: '2025-02-12',
  },
]

const coreMembers: ClubMember[] = [
  { id: 'user-owner', name: 'Club Host', role: 'owner' },
  { id: 'user-guest-1', name: 'Reader One', role: 'member' },
  { id: 'user-guest-2', name: 'Reader Two', role: 'member' },
]

const bibleBook: Book = {
  id: 'bible-nlt',
  title: 'The Holy Bible',
  author: 'Multiple Authors',
  coverUrl: '/covers/bible.jpg',
  description: 'Chronological reading plan focused on the biblical narrative in historical order.',
  isbn: '9780842355360',
}

export function createMockClubs(): BookClub[] {
  const createdAt = new Date('2024-12-30T00:00:00.000Z')
  const owner = coreMembers.find((member) => member.role === 'owner')
  if (!owner) {
    throw new Error('Mock data requires an owner member')
  }
  return [
    {
      id: 'club-bible-timeline',
      name: 'Chronological Bible Club',
      description: 'Walk through the Bible in historical order with weekly meetups.',
      ownerId: owner.id,
      members: coreMembers.map((member) => ({ ...member })),
      readingPlan: bibleChronologicalPlan.map((entry) => ({
        ...entry,
        completedByMemberIds: [...entry.completedByMemberIds],
      })),
      currentBook: bibleBook,
      createdAt,
    },
  ]
}
