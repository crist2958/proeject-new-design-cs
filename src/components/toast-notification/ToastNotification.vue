<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast-slide">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="toast-card"
          :class="`toast--${toast.type}`"
        >
          <!-- Círculo Exterior (50x50) -->
          <div class="toast-icon-outer">
            <!-- Círculo Interior (40x40) -->
            <div class="toast-icon-inner">
              <CheckIcon v-if="toast.type === 'success'" class="toast-icon-svg" />
              <AlertTriangleIcon v-else-if="toast.type === 'warning'" class="toast-icon-svg" />
              <XCircleIcon v-else-if="toast.type === 'error'" class="toast-icon-svg" />
            </div>
          </div>

          <!-- Contenido de texto en 2 líneas -->
          <div class="toast-content">
            <span v-if="toast.title" class="toast-title">{{ toast.title }}</span>
            <p class="toast-message">{{ toast.message }}</p>
          </div>

          <!-- Botón de cerrar -->
          <button type="button" class="toast-close-btn" @click="removeToast(toast.id)">
            &times;
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { useToast } from '@/composables/useToast'
// Carga de los 3 íconos SVG
import CheckIcon from '@/assets/icons/toast-notification/check-contained.svg?component'
import AlertTriangleIcon from '@/assets/icons/toast-notification/alert-triangle.svg?component'
import XCircleIcon from '@/assets/icons/toast-notification/x-circle-contained.svg?component'

const { toasts, removeToast } = useToast()
</script>