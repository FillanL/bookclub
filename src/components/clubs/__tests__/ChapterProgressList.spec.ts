import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ChapterProgressList from '../ChapterProgressList.vue'
import type { BookClub } from '@/types'

const baseClub: BookClub = {
  id: 'club-1',
  name: 'Chronological Bible Club',
  description: 'Walk through scripture together.',
  ownerId: 'user-owner',
  members: [
    { id: 'user-owner', name: 'Owner', role: 'owner' },
    { id: 'user-reader', name: 'Reader', role: 'member' },
  ],
  readingPlan: [
    {
      id: 'chapter-1',
      title: 'Creation & Early World',
      reference: 'Genesis 1-11',
      order: 1,
      targetMeetingDate: '2025-01-15',
      completedByMemberIds: ['user-reader'],
    },
  ],
  currentBook: {
    id: 'bible',
    title: 'Bible',
    author: 'Various',
    description: 'Chronological plan',
  },
  createdAt: new Date('2025-01-01T00:00:00.000Z'),
}

describe('ChapterProgressList', () => {
  it('shows placeholder when no club is provided', () => {
    const wrapper = mount(ChapterProgressList, {
      props: {
        club: null,
        activeMemberId: null,
        readyChapterIds: [],
      },
    })

    expect(wrapper.text()).toContain('Choose or create a club')
  })

  it('renders chapter data and emits toggle', async () => {
    const wrapper = mount(ChapterProgressList, {
      props: {
        club: baseClub,
        activeMemberId: 'user-reader',
        readyChapterIds: ['chapter-1'],
      },
    })

    expect(wrapper.text()).toContain('Creation & Early World')
    expect(wrapper.text()).toContain('All readers are ready to meet.')

    await wrapper.find('input[type="checkbox"]').trigger('change')
    expect(wrapper.emitted('toggle-chapter')).toBeTruthy()
    expect(wrapper.emitted('toggle-chapter')?.[0]).toEqual(['chapter-1'])
  })

  it('emits member change events', async () => {
    const wrapper = mount(ChapterProgressList, {
      props: {
        club: baseClub,
        activeMemberId: 'user-reader',
        readyChapterIds: [],
      },
    })

    const select = wrapper.find('select')
    await select.setValue('user-owner')

    expect(wrapper.emitted('change-member')).toBeTruthy()
    expect(wrapper.emitted('change-member')?.[0]).toEqual(['user-owner'])
  })
})
