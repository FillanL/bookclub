import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import NotificationPreferences from '../NotificationPreferences.vue'
import type { NotificationPreferences as Prefs } from '@/types'

const prefs: Prefs = {
  meetingReminders: true,
  chapterCompletionAlerts: false,
  dailyDigest: false,
}

describe('NotificationPreferences', () => {
  it('renders checkbox states', () => {
    const wrapper = mount(NotificationPreferences, {
      props: {
        modelValue: prefs,
      },
    })

    const inputs = wrapper.findAll('input[type="checkbox"]')
    const first = inputs[0]?.element as HTMLInputElement | undefined
    const second = inputs[1]?.element as HTMLInputElement | undefined
    expect(first?.checked).toBe(true)
    expect(second?.checked).toBe(false)
  })

  it('emits updates when toggled', async () => {
    const wrapper = mount(NotificationPreferences, {
      props: {
        modelValue: prefs,
      },
    })

    const secondToggle = wrapper.findAll('input[type="checkbox"]')[1]
    expect(secondToggle).toBeDefined()
    await secondToggle!.trigger('change')

    const changeEvent = wrapper.emitted('change')?.[0]?.[0] as Prefs
    expect(changeEvent.chapterCompletionAlerts).toBe(true)
  })
})
