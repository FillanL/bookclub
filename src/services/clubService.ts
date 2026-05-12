import type { BookClub, ChapterPlan } from '@/types'
import { executeGraphQL, registerMockHandler } from './graphqlClient'
import { createMockClubs } from './mockData'

const GET_CLUBS = /* GraphQL */ `
  query GetBookClubs {
    bookClubs {
      id
      name
      description
      ownerId
      createdAt
      currentBook {
        id
        title
        author
        coverUrl
      }
      members {
        id
        name
        role
      }
      readingPlan {
        id
        title
        reference
        order
        targetMeetingDate
        completedByMemberIds
      }
    }
  }
`

const ADD_CHAPTER = /* GraphQL */ `
  mutation AddChapterToClub($clubId: ID!, $input: ChapterInput!) {
    addChapterToClub(clubId: $clubId, input: $input) {
      id
      title
      reference
      order
      targetMeetingDate
      completedByMemberIds
    }
  }
`

const TOGGLE_CHAPTER = /* GraphQL */ `
  mutation ToggleChapterCompletion($clubId: ID!, $chapterId: ID!, $memberId: ID!) {
    toggleChapterCompletion(clubId: $clubId, chapterId: $chapterId, memberId: $memberId) {
      id
      completedByMemberIds
    }
  }
`

type AddChapterVariables = {
  clubId: string
  input: {
    title: string
    reference: string
    order: number
    targetMeetingDate?: string
  }
}

type ToggleChapterVariables = {
  clubId: string
  chapterId: string
  memberId: string
}

let mockClubs = createMockClubs()

registerMockHandler('GetBookClubs', () => ({
  bookClubs: mockClubs.map((club) => ({
    ...club,
    // Ensure each call returns new references so consumers can mutate safely
    members: club.members.map((member) => ({ ...member })),
    readingPlan: club.readingPlan.map((chapter) => ({
      ...chapter,
      completedByMemberIds: [...chapter.completedByMemberIds],
    })),
  })),
}))

registerMockHandler('AddChapterToClub', (variables?: Record<string, unknown>) => {
  const { clubId, input } = variables as AddChapterVariables
  const club = mockClubs.find((entry) => entry.id === clubId)
  if (!club) {
    throw new Error(`Club ${clubId} not found`)
  }

  const nextChapter: ChapterPlan = {
    id: `chapter-${crypto.randomUUID?.() ?? Math.random().toString(16).slice(2)}`,
    title: input.title,
    reference: input.reference,
    order: input.order,
    targetMeetingDate: input.targetMeetingDate,
    completedByMemberIds: [],
  }

  club.readingPlan.push(nextChapter)

  return {
    addChapterToClub: nextChapter,
  }
})

registerMockHandler('ToggleChapterCompletion', (variables?: Record<string, unknown>) => {
  const { clubId, chapterId, memberId } = variables as ToggleChapterVariables
  const club = mockClubs.find((entry) => entry.id === clubId)
  if (!club) {
    throw new Error(`Club ${clubId} not found`)
  }

  const chapter = club.readingPlan.find((entry) => entry.id === chapterId)
  if (!chapter) {
    throw new Error(`Chapter ${chapterId} not found`)
  }

  const set = new Set(chapter.completedByMemberIds)
  if (set.has(memberId)) {
    set.delete(memberId)
  } else {
    set.add(memberId)
  }

  chapter.completedByMemberIds = [...set]

  return {
    toggleChapterCompletion: {
      id: chapter.id,
      completedByMemberIds: chapter.completedByMemberIds,
    },
  }
})

export async function fetchBookClubs(): Promise<BookClub[]> {
  const data = await executeGraphQL<{ bookClubs: BookClub[] }>(GET_CLUBS)
  return data.bookClubs
}

export async function addChapterToClub(variables: AddChapterVariables) {
  const data = await executeGraphQL<{ addChapterToClub: ChapterPlan }>(
    ADD_CHAPTER,
    variables,
  )
  return data.addChapterToClub
}

export async function toggleChapterCompletion(variables: ToggleChapterVariables) {
  const data = await executeGraphQL<{ toggleChapterCompletion: { id: string; completedByMemberIds: string[] } }>(
    TOGGLE_CHAPTER,
    variables,
  )
  return data.toggleChapterCompletion
}
