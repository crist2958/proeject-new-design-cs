<template>
  <div class="dashboard-layout">
    <header class="dashboard-header">
      <div class="user-info">
        <h2>Panel Principal</h2>
        <p v-if="currentUser">Sesión iniciada como: <strong>{{ currentUser.name }}</strong> ({{ currentUser.role }})</p>
      </div>

      <button type="button" class="logout-btn" @click="handleLogout">
        Cerrar Sesión
      </button>
    </header>

    <main class="dashboard-content">
      <div class="placeholder-card">
        <h3>Bienvenido al Sistema</h3>
        <p>Aquí comenzaremos a maquetar los módulos, barras laterales y métricas del sistema.</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const toast = useToast()
const currentUser = ref(null)

onMounted(() => {
  const session = localStorage.getItem('auth_session')
  if (session) {
    const parsed = JSON.parse(session)
    currentUser.value = parsed.user
  }
})

const handleLogout = () => {
  localStorage.removeItem('auth_session')
  toast.warning('Has cerrado tu sesión correctamente.', 'Sesión finalizada')
  router.push({ name: 'login' })
}
</script>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  background-color: #121212;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  padding: 24px 32px;
  box-sizing: border-box;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #2B2B2B;
  padding-bottom: 20px;
}

.user-info h2 {
  margin: 0 0 6px 0;
  font-size: 24px;
}

.user-info p {
  margin: 0;
  color: #9D9D9D;
  font-size: 14px;
}

.logout-btn {
  background-color: #FF4D4D;
  color: #FFFFFF;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

.logout-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.dashboard-content {
  margin-top: 32px;
}

.placeholder-card {
  background-color: #1C1C1C;
  border: 1px solid #2B2B2B;
  border-radius: 12px;
  padding: 32px;
}
</style>