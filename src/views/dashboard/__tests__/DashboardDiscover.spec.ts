import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DashboardDiscover from '../DashboardDiscover.vue'

describe('DashboardDiscover', () => {
  it('renders discover page title', () => {
    const wrapper = mount(DashboardDiscover)

    expect(wrapper.find('h1').text()).toContain('Discover')
    expect(wrapper.text()).toContain('Find new clubs and books to explore')
  })

  it('displays recommended clubs section', () => {
    const wrapper = mount(DashboardDiscover)

    expect(wrapper.text()).toContain('Recommended Clubs')
    expect(wrapper.text()).toContain('Poetry Corner')
    expect(wrapper.text()).toContain('Historical Fiction')
    expect(wrapper.text()).toContain('Business Books')
  })

  it('shows club member counts', () => {
    const wrapper = mount(DashboardDiscover)

    expect(wrapper.text()).toContain('42 members')
    expect(wrapper.text()).toContain('58 members')
    expect(wrapper.text()).toContain('35 members')
  })

  it('displays club descriptions', () => {
    const wrapper = mount(DashboardDiscover)

    expect(wrapper.text()).toContain('Exploring classic and contemporary poetry')
    expect(wrapper.text()).toContain('Journey through time with historical novels')
    expect(wrapper.text()).toContain('Level up your career and business mindset')
  })

  it('has join club buttons', () => {
    const wrapper = mount(DashboardDiscover)

    const joinButtons = wrapper.findAll('button').filter(b => b.text().includes('Join Club'))
    expect(joinButtons.length).toBe(3)
  })

  it('displays trending books section', () => {
    const wrapper = mount(DashboardDiscover)

    expect(wrapper.text()).toContain('Trending Books')
    expect(wrapper.text()).toContain('Tomorrow, and Tomorrow, and Tomorrow')
    expect(wrapper.text()).toContain('Gabrielle Zevin')
    expect(wrapper.text()).toContain('Lessons in Chemistry')
    expect(wrapper.text()).toContain('Bonnie Garmus')
  })

  it('has add to reading list buttons', () => {
    const wrapper = mount(DashboardDiscover)

    const addButtons = wrapper.findAll('button').filter(b => b.text().includes('Add to Reading List'))
    expect(addButtons.length).toBe(3)
  })
})
