import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useSettingsStore } from '../settings'

describe('useSettingsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('loads settings', async () => {
    const store = useSettingsStore()
    await store.load()
    expect(store.profile?.displayName).toBeTruthy()
  })

  it('updates notification preferences', async () => {
    const store = useSettingsStore()
    await store.load()

    const prefs = store.notifications
    expect(prefs).toBeTruthy()
    if (!prefs) return

    await store.updateNotifications({
      ...prefs,
      dailyDigest: !prefs.dailyDigest,
    })

    expect(store.notifications?.dailyDigest).toBe(!prefs.dailyDigest)
  })

  it('updates reading cadence', async () => {
    const store = useSettingsStore()
    await store.load()
    const reading = store.reading
    expect(reading).toBeTruthy()
    if (!reading) return

    await store.updateReading({
      ...reading,
      cadence: 'daily',
    })

    expect(store.reading?.cadence).toBe('daily')
  })
})
