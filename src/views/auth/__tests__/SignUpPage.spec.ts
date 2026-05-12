import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import SignUpPage from '../SignUpPage.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: 'Home' } },
    { path: '/login', component: { template: 'Login' } },
    { path: '/signup', component: SignUpPage },
    { path: '/dashboard', component: { template: 'Dashboard' } },
  ],
})

beforeEach(async () => {
  router.push('/signup')
  await router.isReady()
})

describe('SignUpPage', () => {
  it('renders signup form', () => {
    const wrapper = mount(SignUpPage, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.find('h1').text()).toContain('Join BookClub')
    expect(wrapper.find('input[autocomplete="name"]').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[autocomplete="new-password"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('shows validation errors for empty fields', async () => {
    const wrapper = mount(SignUpPage, {
      global: {
        plugins: [router],
      },
    })

    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Name is required')
    expect(wrapper.text()).toContain('Email is required')
    expect(wrapper.text()).toContain('Password is required')
  })

  it('shows validation error for short name', async () => {
    const wrapper = mount(SignUpPage, {
      global: {
        plugins: [router],
      },
    })

    await wrapper.find('input[autocomplete="name"]').setValue('A')
    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Name must be at least 2 characters')
  })

  it('shows validation error for weak password', async () => {
    const wrapper = mount(SignUpPage, {
      global: {
        plugins: [router],
      },
    })

    await wrapper.find('input[autocomplete="name"]').setValue('John Doe')
    await wrapper.find('input[type="email"]').setValue('john@example.com')
    await wrapper.find('input[autocomplete="new-password"]').setValue('password')
    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Password must contain uppercase, lowercase, and number')
  })

  it('shows error when passwords do not match', async () => {
    const wrapper = mount(SignUpPage, {
      global: {
        plugins: [router],
      },
    })

    const passwordInputs = wrapper.findAll('input[type="password"]')
    await wrapper.find('input[autocomplete="name"]').setValue('John Doe')
    await wrapper.find('input[type="email"]').setValue('john@example.com')
    await passwordInputs[0]?.setValue('Password123')
    await passwordInputs[1]?.setValue('Password456')
    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Passwords do not match')
  })

  it('submits form with valid data', async () => {
    const push = vi.spyOn(router, 'push')
    const wrapper = mount(SignUpPage, {
      global: {
        plugins: [router],
      },
    })

    const passwordInputs = wrapper.findAll('input[type="password"]')
    await wrapper.find('input[autocomplete="name"]').setValue('John Doe')
    await wrapper.find('input[type="email"]').setValue('john@example.com')
    await passwordInputs[0]?.setValue('Password123')
    await passwordInputs[1]?.setValue('Password123')
    await wrapper.find('form').trigger('submit.prevent')

    await flushPromises()

    expect(push).toHaveBeenCalledWith('/dashboard')
  })

  it('has link to login page', () => {
    const wrapper = mount(SignUpPage, {
      global: {
        plugins: [router],
      },
    })

    const loginLink = wrapper.find('a[href*="login"]')
    expect(loginLink.exists()).toBe(true)
    expect(loginLink.text()).toContain('Sign in')
  })
})
