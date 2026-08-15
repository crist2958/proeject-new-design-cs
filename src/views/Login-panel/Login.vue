<template>
  <div class="login-page-wrapper">
    <div class="login-central-frame">
      
      <!-- Lado Izquierdo -->
      <div class="login-form-side">

        <h1 class="login-tittle">Acceso al sistema.</h1>
        <hr class="login-divider"/>

        <!-- Formulario -->
        <form class="login-form" @submit.prevent>
            <!-- email -->
             <div class="form-group">
                <label for="email" class="input-label">Email</label>
                <input 
                type="text"
                id="email"
                v-model="email"
                :class="[
                  'form-input', 
                  { 
                    'input-error': isEmailTouched && !isEmailValid,
                    'input--error-highlight': emailErrorHighlight 
                  }
                ]" 
                @blur="isEmailTouched = true"
                @input="emailErrorHighlight = false"
                placeholder="ingresa tu correo">

                <span v-if="email.length > 0 && !isEmailValid" class="error-message">
                    Ingresa un correo electrónico válido.
                </span>

             </div>

             <!-- contraseña -->
            <div class="form-group">
              <label for="password" class="input-label">Contraseña</label>
              
              <div class="input-container">
                  <input 
                  :type="showPassword ? 'text' : 'password'" 
                  id="password" 
                  class="form-input password-input" 
                  :class="{ 'is-masked': !showPassword}"
                  placeholder="Ingresa tu contraseña"
                  />
                  
                  <button 
                  type="button" 
                  class="toggle-password-btn" 
                  @click="showPassword = !showPassword"
                  :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
                  >
                  <!-- Transición -->
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

             <button type="submit" class="login-submit-btn">
                Ingresar
             </button>

        </form>

        <!-- seccion olvide mi contraseña -->
        <div class="forgot-password-container">
            <a href="#" class="forgot-password-link" @click.prevent="handleForgotPassword">
                Olvide mi contraseña
            </a>
        </div>

        <PasswordRecoveryModal 
          :is-open="isRecoveryOpen" 
          @close="isRecoveryOpen = false" 
        />

    </div>
     
      <!-- Lado Derecho -->
      <div class="login-visual-card">
        <Logo class="Logo"/>
      </div>

    </div>
  </div>
</template>

<script setup>
import Logo from '@/assets/logo.svg'
import { ref, computed } from 'vue';
import EyeOpenIcon from '@/assets/icons/login/eye-open.svg?component'
import EyeClosedIcon from '@/assets/icons/login/eye-closed.svg?component'
import PasswordRecoveryModal from '@/views/Login-panel/component/PasswordRecoveryModal.vue'
import { useToast } from '@/composables/useToast';

const toast = useToast()
const emailErrorHighlight = ref(false)
const isRecoveryOpen = ref(false)
const showPassword = ref(false)
const email = ref('')

// 🌟 AGREGADO: Definición de la variable isEmailTouched
const isEmailTouched = ref(false)

// Expresión regular estándar para validar correos
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isEmailValid = computed(() => {
  return emailRegex.test(email.value)
})

const handleForgotPassword = () => {
  isEmailTouched.value = true
  
  // Validación básica del correo
  if (!email.value || !isEmailValid.value) {
    // Activamos el resplandor blanco en el input
    emailErrorHighlight.value = true
    
    // Disparas el toast amarillo
    toast.warning(
      'Para enviar la solicitud ingrese un correo en el campo de email.',
      'Atención'
    )
    return
  }

  // Si pasa la validación
  emailErrorHighlight.value = false
  isRecoveryOpen.value = true
}
</script>

<style scoped></style>