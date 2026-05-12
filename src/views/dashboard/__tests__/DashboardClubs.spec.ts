import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { nextTick } from 'vue'
import DashboardClubs from '../DashboardClubs.vue'
import { useClubStore } from '@/stores/clubs'

async function mountWithStore() {
  const pinia = createPinia()
  setActivePinia(pinia)
  const wrapper = mount(DashboardClubs, {
    global: {
      plugins: [pinia],
    },
  })

  await useClubStore().loadClubs()
  await nextTick()
  await nextTick()

  return wrapper
}

describe('DashboardClubs', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('renders heading and helper copy', async () => {
    const wrapper = await mountWithStore()
    expect(wrapper.find('h1').text()).toContain('My Clubs')
    expect(wrapper.text()).toContain('Set the reading pace')
  })

  it('lists available clubs in sidebar', async () => {
    const wrapper = await mountWithStore()
    expect(wrapper.text()).toContain('Your Clubs')
    expect(wrapper.text()).toContain('Chronological Bible Club')
  })

  it('shows chapter checklist for selected club', async () => {
    const wrapper = await mountWithStore()
    expect(wrapper.text()).toContain('Creation & Early World')
    expect(wrapper.text()).toContain('Mark complete')
  })
})
