<template>
  <div class="confirm-backdrop" @click.self="closeModal">
    <div class="confirm-modal-container">
      
      <!-- Ícono de Alerta en la esquina superior izquierda -->
      <div class="alert-badge-icon">
        <AlertTriangleIcon class="alert-svg" />
      </div>

      <!-- Botón X Rojo en la esquina superior derecha -->
      <button type="button" class="confirm-close-btn" @click="closeModal">
        <XIcon class="close-icon" />
      </button>

      <!-- Mensaje principal -->
      <h3 class="confirm-title">¿Quitar todos los<br />permisos?</h3>

      <p class="confirm-description">
        Esta acción desactivará <strong>crear, ver, editar y eliminar</strong> en todas las secciones para el usuario <strong>{{ user?.fullName }}</strong>. Podrás volver a activarlos después.
      </p>

      <!-- Botón Confirmar -->
      <button type="button" class="btn-confirm-action" @click="confirmRevoke">
        CONFIRMAR
      </button>

    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import XIcon from '@/assets/icons/recovery/x-03.svg?component'
import AlertTriangleIcon from '@/assets/icons/toast-notification/alert-triangle.svg?component'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  user: { type: Object, required: true }
})

const emit = defineEmits(['close', 'confirm'])

const closeModal = () => emit('close')

const confirmRevoke = () => {
  emit('confirm')
  closeModal()
}
</script>