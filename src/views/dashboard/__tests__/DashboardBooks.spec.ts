import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DashboardBooks from '../DashboardBooks.vue'

describe('DashboardBooks', () => {
  it('renders books page title', () => {
    const wrapper = mount(DashboardBooks)

    expect(wrapper.find('h1').text()).toContain('My Books')
    expect(wrapper.text()).toContain('Track your reading progress')
  })

  it('displays add book button', () => {
    const wrapper = mount(DashboardBooks)

    const addButton = wrapper.find('button')
    expect(addButton.text()).toContain('Add Book')
  })

  it('displays book titles and authors', () => {
    const wrapper = mount(DashboardBooks)

    expect(wrapper.text()).toContain('Pride and Prejudice')
    expect(wrapper.text()).toContain('Jane Austen')
    expect(wrapper.text()).toContain('Dune')
    expect(wrapper.text()).toContain('Frank Herbert')
  })

  it('shows reading status badges', () => {
    const wrapper = mount(DashboardBooks)

    expect(wrapper.text()).toContain('Reading')
    expect(wrapper.text()).toContain('Completed')
    expect(wrapper.text()).toContain('To Read')
  })

  it('displays progress bars for reading books', () => {
    const wrapper = mount(DashboardBooks)

    expect(wrapper.text()).toContain('65%')
    expect(wrapper.text()).toContain('32%')
  })

  it('marks completed books with badge', () => {
    const wrapper = mount(DashboardBooks)

    expect(wrapper.text()).toContain('The Great Gatsby')
    expect(wrapper.text()).toContain('Completed')
  })

  it('renders correct number of book items', () => {
    const wrapper = mount(DashboardBooks)

    const bookItems = wrapper.findAll('.bg-white')
    expect(bookItems.length).toBe(4)
  })
})
