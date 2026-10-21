<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <div class="modal-container">
      <div class="modal-header">
        <div class="header-titles">
          <span class="header-subtitle">{{ isEditMode ? 'EDITAR' : 'Registro' }}</span>
          <h2 class="header-title">{{ isEditMode ? userName : 'Nuevo Usuario' }}</h2>
          <p class="header-description">
            {{ isEditMode ? 'Modifica los datos para editar la cuenta' : 'Completa los datos para dar de alta una cuenta' }}
          </p>
        </div>
        
        <button type="button" class="close-btn" @click="closeModal">
          <XIcon class="close-icon" />
        </button>

        <!-- Avatar / Foto de perfil con borde blanco -->
        <div class="modal-avatar-wrapper">
          <div class="avatar-circle" :class="{ 'has-image': form.avatar }">
            <template v-if="form.avatar">
              <img :src="form.avatar" alt="Avatar" />
            </template>
            <template v-else>
              <CameraIcon class="camera-svg-icon" />
            </template>
          </div>
          <button type="button" class="avatar-add-btn">
            <PlusIcon class="plus-svg-icon" />
          </button>
        </div>
      </div>

      <!-- Cuerpo del Formulario -->
      <form class="modal-form" @submit.prevent="handleSubmit">
        <div class="form-grid">
          
          <div class="form-group">
            <label>Nombre de usuario</label>
            <input type="text" v-model="form.username" placeholder="J.Martinez" />
          </div>

          <div class="form-group">
            <label>Nombre</label>
            <input type="text" v-model="form.firstName" placeholder="Juana" />
          </div>

          <div class="form-group">
            <label>Apellido paterno</label>
            <input type="text" v-model="form.lastName" placeholder="Martinez" />
          </div>

          <div class="form-group">
            <label>Apellido Materno</label>
            <input type="text" v-model="form.surName" placeholder="Lopez" />
          </div>

          <div class="form-group">
            <label>Email</label>
            <input type="email" v-model="form.email" placeholder="nombre@correo.com" />
          </div>

          <div class="form-group">
            <label>Teléfono</label>
            <input type="tel" v-model="form.phone" placeholder="+52 962 000 0000" />
          </div>

        </div>

        <!-- Rol (Ocupa el 100% del ancho) -->
        <div class="form-group full-width">
          <div class="select-wrapper">
            <select v-model="form.role">
              <option value="" disabled selected>Rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Microsoft">Microsoft</option>
              <option value="Yahoo">Yahoo</option>
              <option value="Tesla">Tesla</option>
            </select>
            <span class="select-arrow">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
        </div>

        <!-- Contraseñas -->
        <div class="form-grid">
          <div class="form-group">
            <label>Contraseña</label>
            <input type="password" v-model="form.password" placeholder="Mínimo 8 caracteres" />
          </div>

          <div class="form-group">
            <label>Confirmar Contraseña</label>
            <input type="password" v-model="form.confirmPassword" placeholder="Mínimo 8 caracteres" />
          </div>
        </div>

        <div class="modal-footer">
          <button type="submit" class="btn-save">
            <SaveIcon class="save-svg-icon" />
            <span>GUARDAR</span>
          </button>
        </div>

      </form>

    </div>
  </div>
</template>

<script setup>
import { reactive, defineProps, defineEmits } from 'vue'
import XIcon from '@/assets/icons/Modal/x-03.svg?component'
import CameraIcon from '@/assets/icons/Modal/camera-01.svg?component'
import SaveIcon from '@/assets/icons/Modal/save-01.svg?component'
import PlusIcon from '@/assets/icons/Modal/plus-02.svg?component'
import '@/assets/layout/components/_user-modal.scss'

const props = defineProps({
  isEditMode: { type: Boolean, default: false },
  userName: { type: String, default: 'Jos.Maldonado' },
  initialData: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['close', 'save'])

const form = reactive({
  username: props.initialData.username || '',
  firstName: props.initialData.firstName || '',
  lastName: props.initialData.lastName || '',
  surName: props.initialData.surName || '',
  email: props.initialData.email || '',
  phone: props.initialData.phone || '',
  role: props.initialData.role || '',
  password: '',
  confirmPassword: '',
  avatar: props.initialData.avatar || null
})

const closeModal = () => emit('close')
const handleSubmit = () => emit('save', { ...form })
</script>