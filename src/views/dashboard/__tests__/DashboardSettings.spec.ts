import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import DashboardSettings from '../DashboardSettings.vue'

describe('DashboardSettings', () => {
  it('loads settings sections', async () => {
    setActivePinia(createPinia())
    const wrapper = mount(DashboardSettings)

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(wrapper.text()).toContain('Settings')
    expect(wrapper.text()).toContain('Profile')
    expect(wrapper.text()).toContain('Notifications')
  })
})
