import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfileForm from '../ProfileForm.vue'
import type { ProfileSettings } from '@/types'

const baseProfile: ProfileSettings = {
  displayName: 'Host',
  email: 'host@example.com',
  avatarUrl: 'https://example.com/avatar.png',
}

describe('ProfileForm', () => {
  it('renders initial values', () => {
    const wrapper = mount(ProfileForm, {
      props: {
        modelValue: baseProfile,
      },
    })

    const nameInput = wrapper.get('input[type="text"]').element as HTMLInputElement
    const emailInput = wrapper.get('input[type="email"]').element as HTMLInputElement

    expect(nameInput.value).toBe('Host')
    expect(emailInput.value).toBe('host@example.com')
  })

  it('emits submit with latest values', async () => {
    const wrapper = mount(ProfileForm, {
      props: {
        modelValue: baseProfile,
      },
    })

    await wrapper.get('input[type="text"]').setValue('Club Captain')
    await wrapper.get('form').trigger('submit')

    const payload = wrapper.emitted('submit')?.[0]?.[0] as ProfileSettings
    expect(payload.displayName).toBe('Club Captain')
  })
})
