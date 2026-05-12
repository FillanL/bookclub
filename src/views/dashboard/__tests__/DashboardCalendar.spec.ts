import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DashboardCalendar from '../DashboardCalendar.vue'

describe('DashboardCalendar', () => {
  it('renders calendar page title', () => {
    const wrapper = mount(DashboardCalendar)

    expect(wrapper.find('h1').text()).toContain('Calendar')
    expect(wrapper.text()).toContain('Upcoming book club meetings and events')
  })

  it('displays upcoming meetings', () => {
    const wrapper = mount(DashboardCalendar)

    expect(wrapper.text()).toContain('Classic Literature Club')
    expect(wrapper.text()).toContain('Science Fiction Fans')
    expect(wrapper.text()).toContain('Mystery Lovers')
  })

  it('shows book titles being discussed', () => {
    const wrapper = mount(DashboardCalendar)

    expect(wrapper.text()).toContain('Pride and Prejudice')
    expect(wrapper.text()).toContain('Dune')
    expect(wrapper.text()).toContain('The Silent Patient')
  })

  it('displays meeting times', () => {
    const wrapper = mount(DashboardCalendar)

    expect(wrapper.text()).toContain('7:00 PM')
    expect(wrapper.text()).toContain('6:30 PM')
    expect(wrapper.text()).toContain('8:00 PM')
  })

  it('shows meeting locations', () => {
    const wrapper = mount(DashboardCalendar)

    expect(wrapper.text()).toContain('Online')
    expect(wrapper.text()).toContain('Central Library')
  })

  it('displays formatted dates', () => {
    const wrapper = mount(DashboardCalendar)

    // Check for month abbreviations
    expect(wrapper.text()).toMatch(/Oct|Nov/)
  })

  it('has join meeting buttons', () => {
    const wrapper = mount(DashboardCalendar)

    const joinButtons = wrapper.findAll('button').filter(b => b.text().includes('Join Meeting'))
    expect(joinButtons.length).toBe(3)
  })

  it('has view details buttons', () => {
    const wrapper = mount(DashboardCalendar)

    const detailButtons = wrapper.findAll('button').filter(b => b.text().includes('View Details'))
    expect(detailButtons.length).toBe(3)
  })
})
