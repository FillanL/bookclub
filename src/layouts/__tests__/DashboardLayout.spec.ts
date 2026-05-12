import { beforeEach, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'
import DashboardLayout from '../DashboardLayout.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/dashboard', component: { template: 'Dashboard' } },
    { path: '/dashboard/clubs', component: { template: 'Clubs' } },
    { path: '/dashboard/books', component: { template: 'Books' } },
    { path: '/dashboard/discover', component: { template: 'Discover' } },
    { path: '/dashboard/calendar', component: { template: 'Calendar' } },
    { path: '/dashboard/settings', component: { template: 'Settings' } },
  ],
})

let pinia = createPinia()

beforeEach(async () => {
  pinia = createPinia()
  setActivePinia(pinia)
  router.push('/dashboard')
  await router.isReady()
})

describe('DashboardLayout', () => {
  it('renders dashboard header', () => {
    const wrapper = mount(DashboardLayout, {
      global: {
        plugins: [router, pinia],
        stubs: {
          RouterView: true,
        },
      },
    })

    expect(wrapper.text()).toContain('BookClub Dashboard')
  })

  it('has sidebar toggle button', () => {
    const wrapper = mount(DashboardLayout, {
      global: {
        plugins: [router, pinia],
        stubs: {
          RouterView: true,
        },
      },
    })

    const toggleButton = wrapper.find('button[aria-label="Toggle sidebar"]')
    expect(toggleButton.exists()).toBe(true)
  })

  it('displays sidebar navigation links', () => {
    const wrapper = mount(DashboardLayout, {
      global: {
        plugins: [router, pinia],
        stubs: {
          RouterView: true,
        },
      },
    })

    expect(wrapper.text()).toContain('Overview')
    expect(wrapper.text()).toContain('My Clubs')
    expect(wrapper.text()).toContain('My Books')
    expect(wrapper.text()).toContain('Discover')
    expect(wrapper.text()).toContain('Calendar')
  })

  it('has theme toggle button', () => {
    const wrapper = mount(DashboardLayout, {
      global: {
        plugins: [router, pinia],
        stubs: {
          RouterView: true,
        },
      },
    })

    const themeButton = wrapper.find('button[aria-label="Toggle theme"]')
    expect(themeButton.exists()).toBe(true)
  })

  it('has user profile dropdown', () => {
    const wrapper = mount(DashboardLayout, {
      global: {
        plugins: [router, pinia],
        stubs: {
          RouterView: true,
        },
      },
    })

    expect(wrapper.text()).toContain('Profile')
    expect(wrapper.text()).toContain('Settings')
    expect(wrapper.text()).toContain('Logout')
  })

  it('toggles sidebar when button is clicked', async () => {
    const wrapper = mount(DashboardLayout, {
      global: {
        plugins: [router, pinia],
        stubs: {
          RouterView: true,
        },
      },
    })

    const toggleButton = wrapper.find('button[aria-label="Toggle sidebar"]')
    const sidebar = wrapper.find('aside')

    // Initial state - sidebar open
    expect(sidebar.classes()).not.toContain('-ml-64')

    // Click toggle
    await toggleButton.trigger('click')
    expect(sidebar.classes()).toContain('-ml-64')

    // Click again
    await toggleButton.trigger('click')
    expect(sidebar.classes()).not.toContain('-ml-64')
  })
})
