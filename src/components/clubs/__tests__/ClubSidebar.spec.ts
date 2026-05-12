import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ClubSidebar from '../ClubSidebar.vue'
import type { BookClub } from '@/types'

function createClub(overrides: Partial<BookClub> = {}): BookClub {
  return {
    id: 'club-1',
    name: 'Chronological Bible Club',
    description: 'Walk through scripture together.',
    ownerId: 'user-owner',
    members: [
      { id: 'user-owner', name: 'Owner', role: 'owner' },
      { id: 'user-guest-1', name: 'Reader One', role: 'member' },
    ],
    readingPlan: [],
    currentBook: {
      id: 'bible',
      title: 'Bible',
      author: 'Various',
      description: 'Chronological plan',
    },
    createdAt: new Date('2025-01-01T00:00:00.000Z'),
    ...overrides,
  }
}

describe('ClubSidebar', () => {
  it('renders clubs and ready counts', () => {
    const clubs: BookClub[] = [
      createClub(),
      createClub({
        id: 'club-2',
        name: 'Family Reading',
        description: 'Weekly family study.',
      }),
    ]

    const wrapper = mount(ClubSidebar, {
      props: {
        clubs,
        selectedId: 'club-1',
        readyCounts: { 'club-1': 2, 'club-2': 0 },
      },
    })

    expect(wrapper.text()).toContain('Chronological Bible Club')
    expect(wrapper.text()).toContain('2 chapters ready to review')
  })

  it('emits select when a club is clicked', async () => {
    const clubs: BookClub[] = [createClub()]

    const wrapper = mount(ClubSidebar, {
      props: {
        clubs,
        selectedId: null,
      },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')?.[0]).toEqual(['club-1'])
  })
})
