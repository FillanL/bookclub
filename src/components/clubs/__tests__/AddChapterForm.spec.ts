import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AddChapterForm from '../AddChapterForm.vue'

describe('AddChapterForm', () => {
  it('disables submit when required fields are empty', () => {
    const wrapper = mount(AddChapterForm, {
      props: {
        clubId: 'club-1',
        nextOrder: 2,
      },
    })

    const button = wrapper.get('button[type="submit"]')
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('emits submit payload with trimmed fields', async () => {
    const wrapper = mount(AddChapterForm, {
      props: {
        clubId: 'club-1',
        nextOrder: 4,
      },
    })

    const [titleInput, referenceInput] = wrapper.findAll('input[type="text"]')
    if (!titleInput || !referenceInput) throw new Error('expected inputs')

    await titleInput.setValue('  Wilderness Wanderings ')
    await referenceInput.setValue(' Numbers 10-21 ')
    await wrapper.find('input[type="date"]').setValue('2025-02-28')

    const button = wrapper.get('button[type="submit"]')
    expect(button.attributes('disabled')).toBeUndefined()

    await wrapper.find('form').trigger('submit')

    const submitEvent = wrapper.emitted('submit')?.[0]?.[0]
    expect(submitEvent).toEqual({
      clubId: 'club-1',
      title: 'Wilderness Wanderings',
      reference: 'Numbers 10-21',
      order: 4,
      targetMeetingDate: '2025-02-28',
    })
  })
})
