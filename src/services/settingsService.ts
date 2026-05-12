import type { NotificationPreferences, ProfileSettings, ReadingPreferences, UserSettings } from '@/types'
import { executeGraphQL, registerMockHandler } from './graphqlClient'

const GET_SETTINGS = /* GraphQL */ `
  query GetUserSettings {
    userSettings {
      profile {
        displayName
        email
        avatarUrl
      }
      notifications {
        meetingReminders
        chapterCompletionAlerts
        dailyDigest
      }
      reading {
        cadence
        defaultMeetingDay
        timezone
      }
    }
  }
`

const UPDATE_NOTIFICATIONS = /* GraphQL */ `
  mutation UpdateNotifications($input: NotificationInput!) {
    updateNotifications(input: $input) {
      meetingReminders
      chapterCompletionAlerts
      dailyDigest
    }
  }
`

const UPDATE_READING = /* GraphQL */ `
  mutation UpdateReading($input: ReadingPreferencesInput!) {
    updateReadingPreferences(input: $input) {
      cadence
      defaultMeetingDay
      timezone
    }
  }
`

const UPDATE_PROFILE = /* GraphQL */ `
  mutation UpdateProfile($input: ProfileInput!) {
    updateProfile(input: $input) {
      displayName
      email
      avatarUrl
    }
  }
`

type NotificationPayload = { input: NotificationPreferences }
type ReadingPayload = { input: ReadingPreferences }
type ProfilePayload = { input: ProfileSettings }

let mockSettings: UserSettings = {
  profile: {
    displayName: 'Club Host',
    email: 'host@example.com',
    avatarUrl: undefined,
  },
  notifications: {
    meetingReminders: true,
    chapterCompletionAlerts: true,
    dailyDigest: false,
  },
  reading: {
    cadence: 'weekly',
    defaultMeetingDay: 'wednesday',
    timezone: 'America/New_York',
  },
}

registerMockHandler('GetUserSettings', () => ({
  userSettings: structuredClone(mockSettings),
}))

registerMockHandler('UpdateNotifications', (variables?: Record<string, unknown>) => {
  const { input } = variables as NotificationPayload
  mockSettings = {
    ...mockSettings,
    notifications: { ...input },
  }
  return { updateNotifications: structuredClone(mockSettings.notifications) }
})

registerMockHandler('UpdateReading', (variables?: Record<string, unknown>) => {
  const { input } = variables as ReadingPayload
  mockSettings = {
    ...mockSettings,
    reading: { ...input },
  }
  return { updateReadingPreferences: structuredClone(mockSettings.reading) }
})

registerMockHandler('UpdateProfile', (variables?: Record<string, unknown>) => {
  const { input } = variables as ProfilePayload
  mockSettings = {
    ...mockSettings,
    profile: { ...mockSettings.profile, ...input },
  }
  return { updateProfile: structuredClone(mockSettings.profile) }
})

export async function fetchSettings(): Promise<UserSettings> {
  const { userSettings } = await executeGraphQL<{ userSettings: UserSettings }>(GET_SETTINGS)
  return userSettings
}

export async function saveNotifications(preferences: NotificationPreferences) {
  const { updateNotifications } = await executeGraphQL<{ updateNotifications: NotificationPreferences }>(
    UPDATE_NOTIFICATIONS,
    { input: preferences },
  )
  return updateNotifications
}

export async function saveReadingPreferences(preferences: ReadingPreferences) {
  const { updateReadingPreferences } = await executeGraphQL<{ updateReadingPreferences: ReadingPreferences }>(
    UPDATE_READING,
    { input: preferences },
  )
  return updateReadingPreferences
}

export async function saveProfile(profile: ProfileSettings) {
  const { updateProfile } = await executeGraphQL<{ updateProfile: ProfileSettings }>(
    UPDATE_PROFILE,
    { input: profile },
  )
  return updateProfile
}
