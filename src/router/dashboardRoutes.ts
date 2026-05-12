import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: () => import('@/layouts/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/DashboardOverview.vue'),
        meta: { title: 'Dashboard' },
      },
      {
        path: 'clubs',
        name: 'DashboardClubs',
        component: () => import('@/views/dashboard/DashboardClubs.vue'),
        meta: { title: 'My Clubs' },
      },
      {
        path: 'books',
        name: 'DashboardBooks',
        component: () => import('@/views/dashboard/DashboardBooks.vue'),
        meta: { title: 'My Books' },
      },
      {
        path: 'discover',
        name: 'DashboardDiscover',
        component: () => import('@/views/dashboard/DashboardDiscover.vue'),
        meta: { title: 'Discover' },
      },
      {
        path: 'calendar',
        name: 'DashboardCalendar',
        component: () => import('@/views/dashboard/DashboardCalendar.vue'),
        meta: { title: 'Calendar' },
      },
      {
        path: 'settings',
        name: 'DashboardSettings',
        component: () => import('@/views/dashboard/DashboardSettings.vue'),
        meta: { title: 'Settings' },
      },
    ],
  },
]

export default routes
