export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: Date
}

export interface Book {
  id: string
  title: string
  author: string
  coverUrl?: string
  description: string
  isbn?: string
}

export interface ClubMember {
  id: string
  name: string
  role: 'owner' | 'member'
}

export interface ChapterPlan {
  id: string
  title: string
  reference: string
  order: number
  completedByMemberIds: string[]
  targetMeetingDate?: string
}

export interface NotificationPreferences {
  meetingReminders: boolean
  chapterCompletionAlerts: boolean
  dailyDigest: boolean
}

export interface ReadingPreferences {
  cadence: 'daily' | 'weekly' | 'biweekly'
  defaultMeetingDay: 'monday' | 'wednesday' | 'friday' | 'saturday'
  timezone: string
}

export interface ProfileSettings {
  displayName: string
  email: string
  avatarUrl?: string
}

export interface UserSettings {
  profile: ProfileSettings
  notifications: NotificationPreferences
  reading: ReadingPreferences
}

export interface BookClub {
  id: string
  name: string
  description: string
  ownerId: string
  members: ClubMember[]
  readingPlan: ChapterPlan[]
  currentBook?: Book
  createdAt: Date
}

export interface ReadingSession {
  id: string
  bookClubId: string
  bookId: string
  startDate: Date
  endDate?: Date
  status: 'active' | 'completed' | 'planned'
}

export type Theme = 'light' | 'dark'

export interface AuthCredentials {
  email: string
  password: string
}

export interface SignUpData extends AuthCredentials {
  name: string
  confirmPassword: string
}
