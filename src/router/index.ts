import { createRouter, createWebHistory } from 'vue-router'
import type { Router } from 'vue-router'
import { routes as dashboardRoutes } from './dashboardRoutes'
import { routes as marketingRoutes } from './marketingRoutes'

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...marketingRoutes,
    ...dashboardRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/not-found.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // Scroll to top on route change unless position is saved
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
})

// Setup navigation guards after router is created
export async function setupRouterGuards(router: Router) {
  // Import auth store dynamically to avoid circular dependencies
  const { useAuthStore } = await import('@/stores/auth')

  // Global before guard - handles authentication and authorization
  router.beforeEach((to, from, next) => {
    console.log("beforeee ;)")
    const authStore = useAuthStore()
    const isAuthenticated = authStore.isAuthenticated

    // Check if route requires authentication
    if (to.meta.requiresAuth && !isAuthenticated) {
      // Redirect to login if route requires auth and user is not authenticated
      // Save the intended destination to redirect after login
      next({
        name: 'Login',
        query: { redirect: to.fullPath },
      })
      return
    }

    // Check if route is only for guests (login/signup pages)
    if (to.meta.requiresGuest && isAuthenticated) {
      // Redirect to dashboard if route requires guest and user is authenticated
      next({ name: 'Dashboard' })
      return
    }

    // Allow navigation
    next()
  })

  // Global after guard - can be used for analytics, page titles, etc.
  router.afterEach((to, from) => {
    // Update document title based on route meta or name
    const title = to.meta.title as string | undefined
    if (title) {
      document.title = `${title} | BookClub`
    } else if (to.name) {
      document.title = `${String(to.name)} | BookClub`
    } else {
      document.title = 'BookClub'
    }

    // Could add analytics tracking here
    // analytics.track('Page View', { path: to.fullPath })
  })

  // Error handler for navigation failures
  router.onError((error) => {
    console.error('Router error:', error)
    // Could send to error tracking service
  })
}

export default router
