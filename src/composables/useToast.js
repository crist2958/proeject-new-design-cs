import { ref } from 'vue'

const toasts = ref([])

export function useToast() {
  const addToast = ({ title, message, type = 'info', duration = 4000 }) => {
    const id = Date.now() + Math.random()

    const toast = { id, title, message, type }
    toasts.value.push(toast)

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
  }

  const removeToast = (id) => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  return {
    toasts,
    removeToast,
    success: (message, title = 'Éxito', duration) =>
      addToast({ title, message, type: 'success', duration }),
    warning: (message, title = 'Advertencia', duration) =>
      addToast({ title, message, type: 'warning', duration }),
    error: (message, title = 'Error', duration) =>
      addToast({ title, message, type: 'error', duration }),
  }
}