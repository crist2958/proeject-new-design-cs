<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <div class="permissions-modal-container">
      
      <!-- Botón de cierre flotante -->
      <button type="button" class="close-btn-red" @click="closeModal">
        <XIcon class="close-icon" />
      </button>

      <!-- Cabecera -->
      <div class="modal-header-section">
        <div class="user-badge-icon">
          <FileShieldIcon class="shield-svg" />
        </div>
        <div class="header-text">
          <h2 class="user-name">{{ user?.fullName }}</h2>
          <span class="user-role">{{ user?.company }}</span>
        </div>
      </div>

      <p class="permissions-description">
        Activa o desactiva lo que <strong>{{ user?.fullName }}</strong> puede hacer en cada sección.
      </p>

      <!-- Tabla de Permisos con Switches -->
      <div class="permissions-table-wrapper">
        <div class="permissions-table-header">
          <span class="col-section">Sección</span>
          <span class="col-action">Crear</span>
          <span class="col-action">Editar</span>
          <span class="col-action">Ver</span>
          <span class="col-action">Eliminar</span>
        </div>

        <div class="permissions-rows">
          <div v-for="(permission, index) in permissionsList" :key="index" class="permission-row">
            <span class="section-name">{{ permission.name }}</span>
            
            <div class="col-action" v-for="action in ['create', 'edit', 'view', 'delete']" :key="action">
              <label class="switch">
                <input type="checkbox" v-model="permission[action]" />
                <span class="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer del Modal -->
      <div class="permissions-modal-footer">
        <!-- Abre el modal de confirmación -->
        <button type="button" class="btn-revoke" @click="isConfirmModalOpen = true">
          QUITAR TODOS LOS PERMISOS
        </button>
        <button type="button" class="btn-save" @click="handleSave">
          <SaveIcon class="save-svg-icon" />
          <span>GUARDAR</span>
        </button>
      </div>

    </div>

    <!-- Modal de Confirmación Superpuesto -->
    <ConfirmRevokeModal
      v-if="isConfirmModalOpen"
      :is-open="isConfirmModalOpen"
      :user="user"
      @close="isConfirmModalOpen = false"
      @confirm="executeRevokeAll"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import XIcon from '@/assets/icons/recovery/x-03.svg?component'
import SaveIcon from '@/assets/icons/modal/save-01.svg?component'
import FileShieldIcon from '@/assets/icons/Table/file-shieldIcon.svg?component'
import ConfirmRevokeModal from '@/components/modals/ConfirmRevokeModal.vue'

// 1. Definición de Props (disponible globalmente en <script setup>)
const props = defineProps({
  isOpen: { type: Boolean, default: false },
  user: { type: Object, required: true }
})

// 2. Definición de Emits (disponible globalmente en <script setup>)
const emit = defineEmits(['close', 'save'])

const isConfirmModalOpen = ref(false)

const permissionsList = reactive([
  { name: 'Usuarios', create: false, edit: false, view: false, delete: false },
  { name: 'Roles', create: false, edit: false, view: false, delete: false },
  { name: 'Calendario', create: false, edit: false, view: true, delete: false },
  { name: 'Clientes', create: true, edit: true, view: true, delete: false },
  { name: 'Recepción', create: true, edit: true, view: true, delete: true },
  { name: 'Cotizaciones', create: true, edit: true, view: true, delete: true }
])

const closeModal = () => emit('close')

const executeRevokeAll = () => {
  permissionsList.forEach(item => {
    item.create = false
    item.edit = false
    item.view = false
    item.delete = false
  })
}

const handleSave = () => {
  emit('save', permissionsList)
  closeModal()
}
</script>