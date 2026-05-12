import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DashboardOverview from '../DashboardOverview.vue'

describe('DashboardOverview', () => {
  it('renders dashboard title and description', () => {
    const wrapper = mount(DashboardOverview)

    expect(wrapper.find('h1').text()).toContain('Dashboard Overview')
    expect(wrapper.text()).toContain("Here's what's happening with your book clubs")
  })

  it('displays stat cards', () => {
    const wrapper = mount(DashboardOverview)

    expect(wrapper.text()).toContain('Active Clubs')
    expect(wrapper.text()).toContain('Books Read')
    expect(wrapper.text()).toContain('Current Reading')
    expect(wrapper.text()).toContain('Upcoming Meetings')
  })

  it('shows stat values', () => {
    const wrapper = mount(DashboardOverview)

    expect(wrapper.text()).toContain('3')  // Active Clubs
    expect(wrapper.text()).toContain('12') // Books Read
    expect(wrapper.text()).toContain('2')  // Current Reading
    expect(wrapper.text()).toContain('5')  // Upcoming Meetings
  })

  it('displays recent activity section', () => {
    const wrapper = mount(DashboardOverview)

    expect(wrapper.find('h2').text()).toContain('Recent Activity')
    expect(wrapper.text()).toContain('Finished reading')
    expect(wrapper.text()).toContain('Joined')
    expect(wrapper.text()).toContain('Posted in')
  })

  it('shows activity timestamps', () => {
    const wrapper = mount(DashboardOverview)

    expect(wrapper.text()).toContain('hours ago')
    expect(wrapper.text()).toContain('day ago')
    expect(wrapper.text()).toContain('days ago')
  })
})
