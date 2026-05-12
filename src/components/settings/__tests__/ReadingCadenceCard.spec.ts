import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ReadingCadenceCard from '../ReadingCadenceCard.vue'
import type { ReadingPreferences } from '@/types'

const readingPrefs: ReadingPreferences = {
  cadence: 'weekly',
  defaultMeetingDay: 'wednesday',
  timezone: 'America/New_York',
}

describe('ReadingCadenceCard', () => {
  it('highlights selected cadence', () => {
    const wrapper = mount(ReadingCadenceCard, {
      props: {
        modelValue: readingPrefs,
      },
    })

    const selected = wrapper.findAll('button').find((button) => button.classes().includes('text-primary-700'))
    expect(selected).toBeDefined()
  })

  it('emits change when selection updates', async () => {
    const wrapper = mount(ReadingCadenceCard, {
      props: {
        modelValue: readingPrefs,
      },
    })

    const dailyButton = wrapper.findAll('button')[0]
    expect(dailyButton).toBeDefined()
    await dailyButton!.trigger('click')

    const emitted = wrapper.emitted('change')?.[0]?.[0] as ReadingPreferences
    expect(emitted.cadence).toBe('daily')
  })
})
