import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import HomePageLayout from '../HomePageLayout.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: 'Home' } },
    { path: '/login', component: { template: 'Login' } },
    { path: '/signup', component: { template: 'SignUp' } },
  ],
})

describe('HomePageLayout', () => {
  it('renders header with logo', () => {
    const wrapper = mount(HomePageLayout, {
      global: {
        plugins: [router],
        stubs: {
          RouterView: true,
        },
      },
    })

    expect(wrapper.text()).toContain('BookClub')
  })

  it('displays navigation links', () => {
    const wrapper = mount(HomePageLayout, {
      global: {
        plugins: [router],
        stubs: {
          RouterView: true,
        },
      },
    })

    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('Login')
    expect(wrapper.text()).toContain('Sign Up')
  })

  it('has theme toggle button', () => {
    const wrapper = mount(HomePageLayout, {
      global: {
        plugins: [router],
        stubs: {
          RouterView: true,
        },
      },
    })

    const themeButton = wrapper.find('button[aria-label="Toggle theme"]')
    expect(themeButton.exists()).toBe(true)
  })

  it('renders footer', () => {
    const wrapper = mount(HomePageLayout, {
      global: {
        plugins: [router],
        stubs: {
          RouterView: true,
        },
      },
    })

    expect(wrapper.find('footer').exists()).toBe(true)
    expect(wrapper.text()).toContain('2025 BookClub. All rights reserved')
  })

  it('has footer navigation links', () => {
    const wrapper = mount(HomePageLayout, {
      global: {
        plugins: [router],
        stubs: {
          RouterView: true,
        },
      },
    })

    expect(wrapper.text()).toContain('About Us')
    expect(wrapper.text()).toContain('Help Center')
    expect(wrapper.text()).toContain('Privacy Policy')
  })
})
