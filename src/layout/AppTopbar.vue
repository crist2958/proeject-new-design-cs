<template>
  <header class="layout-topbar">
    <div class="topbar-left">
      <button type="button" class="menu-toggle-btn" @click="onMenuToggle" aria-label="Toggle Menu">
        <span class="menu-icon">☰</span>
      </button>
      <h2 class="topbar-title">Sistema de Gestión</h2>
    </div>

    <div class="topbar-right">
      <div v-if="currentUser" class="user-badge">
        <span class="user-name">{{ currentUser.name }}</span>
        <span class="user-role">{{ currentUser.role }}</span>
      </div>

      <button type="button" class="topbar-logout-btn" @click="handleLogout">
        Salir
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'
import { useLayout } from './composables/layout'

const router = useRouter()
const toast = useToast()
const { onMenuToggle } = useLayout()
const currentUser = ref(null)

onMounted(() => {
  const session = localStorage.getItem('auth_session')
  if (session) {
    try {
      currentUser.value = JSON.parse(session).user
    } catch {
      localStorage.removeItem('auth_session')
    }
  }
})

const handleLogout = () => {
  localStorage.removeItem('auth_session')
  toast.warning('Has cerrado tu sesión correctamente.', 'Sesión finalizada')
  router.push({ name: 'login' })
}
</script>