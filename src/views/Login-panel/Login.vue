<template>
  <div class="login-page-wrapper">
    <div class="login-central-frame">
      
      <!-- Lado Izquierdo: Formulario -->
      <div class="login-form-side">

        <h1 class="login-tittle">Acceso al sistema.</h1>
        <hr class="login-divider"/>

        <!-- Formulario con handleLogin -->
        <form class="login-form" @submit.prevent="handleLogin">
            <!-- Email -->
            <div class="form-group">
                <label for="email" class="input-label">Email</label>
                <input 
                  type="text"
                  id="email"
                  v-model.trim="email"
                  :class="[
                    'form-input', 
                    { 
                      'input-error': isEmailTouched && !isEmailValid,
                      'input--error-highlight': emailErrorHighlight 
                    }
                  ]" 
                  @blur="isEmailTouched = true"
                  @input="emailErrorHighlight = false"
                  placeholder="ingresa tu correo"
                  autocomplete="email"
                />

                <span v-if="email.length > 0 && !isEmailValid" class="error-message">
                    Ingresa un correo electrónico válido.
                </span>
            </div>

            <!-- Contraseña -->
            <div class="form-group">
              <label for="password" class="input-label">Contraseña</label>
              
              <div class="input-container">
                  <input 
                    :type="showPassword ? 'text' : 'password'" 
                    id="password" 
                    v-model="password"
                    class="form-input password-input" 
                    :class="{ 'is-masked': !showPassword }"
                    placeholder="Ingresa tu contraseña"
                    autocomplete="current-password"
                  />
                  
                  <button 
                    type="button" 
                    class="toggle-password-btn" 
                    @click="showPassword = !showPassword"
                    :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
                  >
                    <!-- Transición de ícono -->
                    <Transition name="fade-rotate" mode="out-in">
                        <component 
                          :is="showPassword ? EyeOpenIcon : EyeClosedIcon" 
                          :key="showPassword ? 'open' : 'closed'"
                          class="password-icon"
                        />
                    </Transition>
                  </button>
              </div>
            </div>

            <!-- Botón Ingresar con estado de carga -->
            <button 
              type="submit" 
              class="login-submit-btn"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">Ingresar</span>
              <span v-else>Iniciando sesión...</span>
            </button>
        </form>

        <!-- Sección Olvidé mi contraseña -->
        <div class="forgot-password-container">
            <a href="#" class="forgot-password-link" @click.prevent="handleForgotPassword">
                Olvidé mi contraseña
            </a>
        </div>

      </div>
     
      <!-- Lado Derecho: Tarjeta Visual -->
      <div class="login-visual-card">
        <Logo class="Logo"/>
      </div>

    </div>
  </div>

  <!-- Modal de Recuperación (Única instancia limpia) -->
  <PasswordRecoveryModal 
    :is-open="isRecoveryOpen" 
    @close="isRecoveryOpen = false" 
    @confirm="handleConfirmRecovery"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Logo from '@/assets/logo.svg'
import EyeOpenIcon from '@/assets/icons/login/eye-open.svg?component'
import EyeClosedIcon from '@/assets/icons/login/eye-closed.svg?component'
import PasswordRecoveryModal from '@/views/Login-panel/component/PasswordRecoveryModal.vue'
import { useToast } from '@/composables/useToast'

// 1. Instancia de Toast
const toast = useToast()
const router = useRouter()

// 2. Datos de prueba (Mock Data)
const MOCK_USERS = [
  {
    id: 1,
    name: 'Administrador',
    email: 'admin@sistema.com',
    password: 'admin1234Password',
    role: 'admin',
    status: 'active'
  },
  {
    id: 2,
    name: 'Usuario Regular',
    email: 'user@sistema.com',
    password: 'user1234Password',
    role: 'operator',
    status: 'active'
  },
  {
    id: 3,
    name: 'Cuenta Suspendida',
    email: 'inactivo@sistema.com',
    password: 'password123',
    role: 'operator',
    status: 'inactive'
  }
]

// Estados del formulario
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)

// Estados de interacción visual y modal
const isEmailTouched = ref(false)
const emailErrorHighlight = ref(false)
const isRecoveryOpen = ref(false)
const isSendingRecovery = ref(false)

// Expresión regular estándar para validación de emails
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isEmailValid = computed(() => {
  return emailRegex.test(email.value)
})

// ==========================================
// LÓGICA DE INICIO DE SESIÓN
// ==========================================
const handleLogin = async () => {
  isEmailTouched.value = true

  if (!email.value) {
    emailErrorHighlight.value = true
    toast.warning('Por favor ingresa tu correo electrónico.', 'Campo requerido')
    return
  }

  if (!isEmailValid.value) {
    emailErrorHighlight.value = true
    toast.warning('El formato del correo electrónico no es válido.', 'Formato inválido')
    return
  }

  if (!password.value) {
    toast.warning('Por favor ingresa tu contraseña.', 'Campo requerido')
    return
  }

  try {
    isLoading.value = true
    await new Promise((resolve) => setTimeout(resolve, 500))

    const userFound = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.value.toLowerCase()
    )

    if (!userFound) {
      toast.error('No existe ningún usuario registrado con este correo.', 'Acceso denegado')
      return
    }

    if (userFound.password !== password.value) {
      toast.error('La contraseña ingresada es incorrecta.', 'Error de credenciales')
      return
    }

    if (userFound.status !== 'active') {
      toast.warning('Tu cuenta está temporalmente inactiva. Contacta a soporte.', 'Cuenta inactiva')
      return
    }

    // Guardamos la sesión
    localStorage.setItem(
      'auth_session',
      JSON.stringify({
        token: 'mock-jwt-token-987654321',
        user: {
          id: userFound.id,
          name: userFound.name,
          email: userFound.email,
          role: userFound.role
        }
      })
    )

    toast.success(`Bienvenido de nuevo, ${userFound.name}.`, 'Acceso exitoso')

    // 🌟 3. Redirección al Dashboard con un pequeño delay para apreciar el toast
    setTimeout(() => {
      router.push({ name: 'dashboard' })
    }, 400)

  } catch (error) {
    toast.error('Ocurrió un fallo al intentar conectar con el servidor.', 'Error de red')
  } finally {
    isLoading.value = false
  }
}
// ==========================================
// LÓGICA DE RECUPERACIÓN DE CONTRASEÑA
// ==========================================
const handleForgotPassword = () => {
  isEmailTouched.value = true
  
  if (!email.value || !isEmailValid.value) {
    emailErrorHighlight.value = true
    toast.warning(
      'Para enviar la solicitud ingrese un correo en el campo de email.',
      'Atención'
    )
    return
  }

  emailErrorHighlight.value = false
  isRecoveryOpen.value = true
}

const handleConfirmRecovery = async () => {
  if (isSendingRecovery.value) return
  isSendingRecovery.value = true

  isRecoveryOpen.value = false

  toast.success(
    `Se envió la solicitud al administrador. Revisa tu bandeja en ${email.value}.`,
    'Solicitud enviada'
  )

  setTimeout(() => {
    isSendingRecovery.value = false
  }, 400)
}
</script>

<style scoped></style>