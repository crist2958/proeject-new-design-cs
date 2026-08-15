<template>
  <RouterView />
  <ToastNotification />
</template>

<script setup>
import { RouterView } from 'vue-router'
import ToastNotification from '@/components/toast-notification/ToastNotification.vue'
</script>

<style scoped></style>
