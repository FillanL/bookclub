import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createPinia } from 'pinia'
import LoginPage from '../LoginPage.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: 'Home' } },
    { path: '/login', component: LoginPage },
    { path: '/signup', component: { template: 'SignUp' } },
    { path: '/dashboard', component: { template: 'Dashboard' } },
  ],
})

let pinia = createPinia()

beforeEach(async () => {
  pinia = createPinia()
  router.push('/login')
  await router.isReady()
})

describe('LoginPage', () => {
  it('renders login form', async () => {
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [router, pinia],
      },
    })

    expect(wrapper.find('h1').text()).toContain('Welcome Back')
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('shows validation errors for empty fields', async () => {
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [router, pinia],
      },
    })

    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Email is required')
    expect(wrapper.text()).toContain('Password is required')
  })

  it('shows validation error for invalid email', async () => {
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [router, pinia],
      },
    })

    await wrapper.find('input[type="email"]').setValue('invalid-email')
    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Invalid email format')
  })

  it('shows validation error for short password', async () => {
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [router, pinia],
      },
    })

    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('input[type="password"]').setValue('12345')
    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Password must be at least 6 characters')
  })

  it('submits form with valid credentials', async () => {
    const push = vi.spyOn(router, 'push')
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [router, pinia],
      },
    })

    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('input[type="password"]').setValue('password123')
    await wrapper.find('form').trigger('submit.prevent')

    await flushPromises()

    expect(push).toHaveBeenCalledWith('/dashboard')
  })

  it('has link to signup page', () => {
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [router, pinia],
      },
    })

    const signupLink = wrapper.find('a[href*="signup"]')
    expect(signupLink.exists()).toBe(true)
    expect(signupLink.text()).toContain('Sign up')
  })
})
