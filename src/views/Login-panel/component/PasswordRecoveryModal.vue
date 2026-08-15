<template>
  <Transition name="fade-backdrop">
    <div 
      v-if="isOpen" 
      class="recovery-modal-overlay" 
      @click.self="$emit('close')"
    >
      <div class="recovery-modal-card">
        <!-- Aquí iremos maquetando los elementos internos del modal -->
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

defineEmits(['close'])
</script>