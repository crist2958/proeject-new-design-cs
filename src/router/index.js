import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/Login-panel/Login.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

// Guardia global de navegación
router.beforeEach((to, from, next) => {
  const session = localStorage.getItem('auth_session')
  const isAuthenticated = !!session

  // Si la ruta requiere autenticación y no está autenticado -> al login
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'login' })
  }

  // Si el usuario ya está autenticado e intenta ir al login -> al dashboard
  if (to.meta.guestOnly && isAuthenticated) {
    return next({ name: 'dashboard' })
  }

  next()
})

export default router
