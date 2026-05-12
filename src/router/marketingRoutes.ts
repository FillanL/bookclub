import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/HomePageLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/HomePage.vue'),
        meta: { title: 'Home' },
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/auth/LoginPage.vue'),
        meta: { requiresGuest: true, title: 'Login' },
      },
      {
        path: 'signup',
        name: 'SignUp',
        component: () => import('@/views/auth/SignUpPage.vue'),
        meta: { requiresGuest: true, title: 'Sign Up' },
      },
    ],
  },
]
