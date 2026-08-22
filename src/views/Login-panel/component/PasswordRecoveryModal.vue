<template>
  <Transition name="fade-backdrop">
    <!-- 🌟 Se eliminó @click.self="handleClose" del overlay -->
    <div 
      v-if="isOpen" 
      class="recovery-modal-overlay"
    >
      <!-- Máscara SVG para curvas de 18px -->
      <svg width="0" height="0" class="svg-clip-def">
        <defs>
          <clipPath id="recoveryCardClip" clipPathUnits="userSpaceOnUse">
            <path d="
              M 18,0
              H 269
              A 18,18 0 0 1 287,18
              V 45
              A 18,18 0 0 0 305,63
              H 332
              A 18,18 0 0 1 350,81
              V 332
              A 18,18 0 0 1 332,350
              H 18
              A 18,18 0 0 1 0,332
              V 18
              A 18,18 0 0 1 18,0
              Z
            " />
          </clipPath>
        </defs>
      </svg>

      <!-- Transición de escala con rebote -->
      <Transition name="modal-pop" appear>
        <div class="recovery-modal-container">
          
          <!-- Cuadro con degradado e ícono de la campana -->
          <div class="recovery-bell-badge">
            <BellIcon class="recovery-bell-icon" />
          </div>

          <!-- Tarjeta principal con el recorte y contenido centrado -->
          <div class="recovery-modal-card">
            <h2 class="recovery-title">
              Confirmación de <br /> solicitud
            </h2>

            <hr class="recovery-divider" />

            <p class="recovery-description">
              Se enviará un aviso al administrador para gestionar tu cambio de contraseña. Te notificaremos en tu correo electrónico registrado tan pronto como tu nueva clave esté lista.
            </p>

            <!-- Botón de confirmar con protección de clic múltiple -->
            <button 
              type="button" 
              class="recovery-confirm-btn"
              :disabled="isSubmitting"
              @click="handleConfirm"
            >
              confirmar
            </button>
          </div>

          <!-- 🌟 Único punto de cierre: Botón en la esquina superior derecha -->
          <button 
            type="button" 
            class="recovery-close-btn" 
            :disabled="isSubmitting"
            @click="handleClose"
            aria-label="Cerrar modal"
          >
            <CloseIcon class="recovery-close-icon" />
          </button>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue'
import CloseIcon from '@/assets/icons/recovery/x-03.svg?component'
import BellIcon from '@/assets/icons/recovery/bell-ringing-02.svg?component'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'confirm'])

// Bloqueo reactivo para evitar múltiples envíos
const isSubmitting = ref(false)

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    isSubmitting.value = false
  }
})

const handleConfirm = () => {
  if (isSubmitting.value) return
  isSubmitting.value = true
  emit('confirm')
}

const handleClose = () => {
  if (isSubmitting.value) return
  emit('close')
}
</script>