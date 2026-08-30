import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login-panel/Login.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/',
      component: AppLayout,
      redirect: '/dashboard',
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/Dashboard.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login',
    },
  ],
})

// Guardia de navegación
router.beforeEach((to, from, next) => {
  const session = localStorage.getItem('auth_session')
  const isAuthenticated = !!session

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const isGuestOnly = to.matched.some((record) => record.meta.guestOnly)

  if (requiresAuth && !isAuthenticated) {
    return next({ name: 'login' })
  }

  if (isGuestOnly && isAuthenticated) {
    return next({ name: 'dashboard' })
  }

  next()
})

export default router