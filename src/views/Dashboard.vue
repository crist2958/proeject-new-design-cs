<!-- dashboard  -->

<template>
  <div class="main-page-wrapper" @click="deselectUser">
    <!-- Encabezado de la página -->
    <div class="page-title-row">
      <h1 class="page-title">Usuarios</h1>
    </div>

    <!-- Contenedor blanco principal de la tabla -->
     <!-- Componente DataTable limpio con eventos conectados -->
    <DataTable
      :columns="tableColumns"
      :items="userList"
      :selected-row-id="selectedUser?.id"
      :current-page="currentPage"
      :filter-options="['Estado: activo', 'Estado: inactivo', 'Rol: Microsoft', 'Rol: Admin']"
      @row-click="selectRow"
      @update:currentPage="currentPage = $event"
      @export="toast.info('Descargando reporte...', 'Exportar')"
      @add="isModalOpen = true"
      @filter-change="handleFilterChange"
    >
      <!-- Custom slot para Status -->
      <template #cell(status)="{ value }">
        <span class="status-pill" :class="value.toLowerCase()">
          {{ value }}
        </span>
      </template>
    </DataTable>

    <!-- Barra Flotante de Acciones Rápidas (Se queda en el Dashboard) -->
    <div v-if="selectedUser" class="floating-action-bar" @click.stop>
      <button 
        v-for="action in floatingActions" 
        :key="action.id"
        class="floating-btn"
        :class="{ delete: action.isDelete }"
        @click="handleAction(action.id)"
      >
        <span class="floating-icon">
          <component :is="action.icon" />
        </span>
        <span class="btn-label">
          {{ action.label }}
        </span>
      </button>
    </div>

    <!-- Modal para registro de usuarios -->
    <UserFormModal 
      :is-open="isModalOpen"
      @close="isModalOpen = false"
      @save="handleCreateUser"
    />
    
  </div>
</template>

<script setup>
import { ref, markRaw, computed } from 'vue'
import DataTable from '@/components/DataTable.vue'
import { useToast } from '@/composables/useToast'
import EditIcon from '@/assets/icons/Table/EditIcon.svg?component'
import FileShieldIcon from '@/assets/icons/Table/file-shieldIcon.svg?component'
import ToggleLeftIcon from '@/assets/icons/Table/toogle-leftIcon.svg?component'
import TrasIcon from '@/assets/icons/Table/TrasIcon.svg?component'

const toast = useToast()
const currentPage = ref(1)

// Definición de las columnas
const tableColumns = [
  { key: 'fullName', label: 'Nombre completo' },
  { key: 'company', label: 'Rol' },
  { key: 'phone', label: 'Numero de teléfono' },
  { key: 'email', label: 'Email' },
  { key: 'country', label: 'Pais' },
  { key: 'status', label: 'Estado', align: 'center' }
]

// Datos simulados de ejemplo para la vista
const userList = ref([
  { id: 1, fullName: 'Jane Cooper', company: 'Microsoft', phone: '(225) 555-0118', email: 'jane@microsoft.com', country: 'Estados Unidos', status: 'Activo' },
  { id: 2, fullName: 'Floyd Miles', company: 'Yahoo', phone: '(205) 555-0100', email: 'floyd@yahoo.com', country: 'Kiribati', status: 'Inactivo' },
  { id: 3, fullName: 'Ronald Richards', company: 'Adobe', phone: '(302) 555-0107', email: 'ronald@adobe.com', country: 'Israel', status: 'Inactivo' },
  { id: 4, fullName: 'Marvin McKinney', company: 'Tesla', phone: '(252) 555-0126', email: 'marvin@tesla.com', country: 'Iran', status: 'Activo' },
  { id: 5, fullName: 'Jerome Bell', company: 'Google', phone: '(629) 555-0129', email: 'jerome@google.com', country: 'Reunion', status: 'Activo' },
  { id: 6, fullName: 'Kathryn Murphy', company: 'Microsoft', phone: '(406) 555-0120', email: 'kathryn@microsoft.com', country: 'Curacao', status: 'Activo' },
  { id: 7, fullName: 'Jacob Jones', company: 'Yahoo', phone: '(208) 555-0112', email: 'jacob@yahoo.com', country: 'Brazil', status: 'Activo' },
  { id: 8, fullName: 'Kristin Watson', company: 'Facebook', phone: '(208) 555-0112', email: 'kristin@facebook.com', country: 'Åland Islands', status: 'Inactivo' }
])

// 2. Configuración declarativa de la barra flotante con markRaw
const floatingActions = computed(() => [
  {
    id: 'edit',
    label: 'Editar',
    icon: markRaw(EditIcon),
    isDelete: false
  },
  {
    id: 'permissions',
    label: 'Permisos',
    icon: markRaw(FileShieldIcon),
    isDelete: false
  },
  {
    id: 'toggle-status',
    label: selectedUser.value?.status === 'Active' ? 'Inactivar' : 'Activar',
    icon: markRaw(ToggleLeftIcon),
    isDelete: false
  },
  {
    id: 'delete',
    label: 'Eliminar',
    icon: markRaw(TrasIcon),
    isDelete: true
  }
])

// 3. Manejador centralizado de acciones
const handleAction = (actionId) => {
  if (!selectedUser.value) return

  switch (actionId) {
    case 'edit':
      toast.warning(`Editar: ${selectedUser.value.fullName}`, 'Acción')
      break
    case 'permissions':
      toast.info(`Permisos: ${selectedUser.value.fullName}`, 'Acción')
      break
    case 'toggle-status':
      selectedUser.value.status = selectedUser.value.status === 'Active' ? 'Inactive' : 'Active'
      break
    case 'delete':
      toast.error(`Eliminado: ${selectedUser.value.fullName}`, 'Acción')
      break
  }
}

//const selectedUser = ref(userList.value[2])
// Inicia sin ningún usuario seleccionado
const selectedUser = ref(null)

// Métodos de selección y filtros
const selectRow = (item) => { selectedUser.value = item }
const deselectUser = () => { selectedUser.value = null; isDropdownOpen.value = false }


const handleFilterChange = (filters) => {
  console.log('Filtros activos actuales:', filters)
}

// Seleccionar usuario al hacer clic en su fila
/*const selectRow = (item) => {
  selectedUser.value = item
}*/

// Deseleccionar al hacer clic afuera
/*const deselectUser = () => {
  selectedUser.value = null
  isDropdownOpen.value = false
}*/

// Funciones para los filtros
/*const applyFilter = (filterName) => {
  activeFilter.value = filterName
  isDropdownOpen.value = false
}*/

/*const removeFilter = () => {
  activeFilter.value = null
}*/
</script>