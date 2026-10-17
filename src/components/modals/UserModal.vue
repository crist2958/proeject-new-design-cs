<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click.self="handleClose">
      <div class="modal-container">
        <!-- Cabecera lila con texto e icono de foto -->
        <div class="modal-header">
          <div class="header-info">
            <span class="sub-label">Registro</span>
            <h3 class="main-title">Nuevo Usuario</h3>
            <p class="helper-text">Completa los datos para dar de alta una cuenta</p>
          </div>

          <button class="btn-close" type="button" @click="handleClose" aria-label="Cerrar">
            <CloseIcon class="svg-icon-close" />
          </button>

          <!-- Avatar circular grande con borde punteado -->
          <div class="avatar-uploader">
            <div class="avatar-ring">
              <CameraIcon class="camera-svg" />
            </div>
            <button class="avatar-badge-btn" type="button">+</button>
          </div>
        </div>

        <!-- Cuerpo del formulario -->
        <form class="modal-form" @submit.prevent="handleSubmit">
          <div class="form-row">
            <div class="form-field">
              <label>Nombre de usuario</label>
              <input v-model="form.username" type="text" placeholder="J.Martinez" required />
            </div>
            <div class="form-field">
              <label>Nombre</label>
              <input v-model="form.name" type="text" placeholder="Juana" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label>Apellido paterno</label>
              <input v-model="form.lastNamePaternal" type="text" placeholder="Martinez" required />
            </div>
            <div class="form-field">
              <label>Apellido Materno</label>
              <input v-model="form.lastNameMaternal" type="text" placeholder="Lopez" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label>Email</label>
              <input v-model="form.email" type="email" placeholder="nombre@correo.com" required />
            </div>
            <div class="form-field">
              <label>Teléfono</label>
              <input v-model="form.phone" type="tel" placeholder="+52 962 000 0000" />
            </div>
          </div>

          <div class="form-row single-column">
            <div class="form-field">
              <label>Rol</label>
              <div class="select-container">
                <select v-model="form.role" required>
                  <option value="" disabled selected>Selecciona un rol</option>
                  <option v-for="r in roles" :key="r" :value="r">{{ r }}</option>
                </select>
                <ChevronIcon class="select-chevron-svg" />
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label>Contraseña</label>
              <input v-model="form.password" type="password" placeholder="Mínimo 8 caracteres" required />
            </div>
            <div class="form-field">
              <label>Confirmar Contraseña</label>
              <input v-model="form.confirmPassword" type="password" placeholder="Mínimo 8 caracteres" required />
            </div>
          </div>

          <!-- Pie del modal con botón Guardar -->
          <div class="form-actions">
            <button class="btn-submit-save" type="submit">
              <SaveIcon class="save-svg" />
              <span>GUARDAR</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { reactive } from 'vue'

// Íconos SVG locales
import CameraIcon from '@/assets/icons/modal/camera-01.svg?component'
import SaveIcon from '@/assets/icons/modal/save-01.svg?component'
//import CloseIcon from '@/assets/icons/recovery/x-03.svg?component'
import CloseIcon from '@/assets/icons/modal/X-icon.svg?component'
import ChevronIcon from '@/assets/icons/Table/ChevronIcon.svg?component'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'save'])

const form = reactive({
  username: '',
  name: '',
  lastNamePaternal: '',
  lastNameMaternal: '',
  email: '',
  phone: '',
  role: '',
  password: '',
  confirmPassword: ''
})

const roles = ['Administrador', 'Operador', 'Invitado']

const resetForm = () => {
  form.username = ''
  form.name = ''
  form.lastNamePaternal = ''
  form.lastNameMaternal = ''
  form.email = ''
  form.phone = ''
  form.role = ''
  form.password = ''
  form.confirmPassword = ''
}

const handleClose = () => {
  emit('close')
}

const handleSubmit = () => {
  emit('save', { ...form })
  resetForm()
  emit('close')
}
</script>