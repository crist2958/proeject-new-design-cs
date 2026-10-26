<!-- component -->
<template>
  <div class="table-card" @click.stop>
      <!-- Barra superior interna: Filtros y Acciones -->
      <div class="table-top-actions">
        <div class="left-filters" @click.stop>
          <div class="filter-dropdown-wrapper">
            <button class="filter-dropdown-btn" @click="isDropdownOpen = !isDropdownOpen" type="button">
              <span class="filter-text-part">FILTROS</span>
              <span class="filter-divider"></span>
              <span class="filter-icon-part">
                <ChevronIcon 
                  class="chevron-icon" 
                  :class="{ 'is-rotated': isDropdownOpen }" 
                />
              </span>
            </button>

            <!-- Opciones de prueba -->
            <!-- Opciones de filtros dinámicas -->
            <div v-if="isDropdownOpen" class="filter-menu">
              <div
                v-for="(option, idx) in filterOptions"
                :key="idx"
                class="filter-option"
                @click="applyFilter(option)"
              >
                {{ option }}
              </div>
            </div>
          </div>
          <!--Filtros acumulables-->
          <div class="chip-container">
            <div v-for="(filter, index) in activeFilters" :key="index" class="chip-filter">
              <span>{{ filter }}</span>
              <button type="button" class="chip-remove" @click="removeFilter(index)">
                <XIcon class="chip-svg-icon" />
              </button>
            </div>
          </div>
        </div> 

        <div class="right-actions">
          <button class="btn btn-secondary" @click="$emit('export')">
            <DownloadIcon class="btn-svg-icon" />
            <span>DESCARGAR</span>
          </button>
          <button class="btn btn-primary" @click="$emit('add')">
            <PlusIcon class="btn-svg-icon" />
            <span>AGREGAR</span>
          </button>
        </div>
      </div>
      <div class="custom-data-table-container">
    <div class="table-scroll-wrapper">
      <table class="styled-table">
        <thead>
          <tr>
            <th 
              v-for="col in columns" 
              :key="col.key"
              :style="{ width: col.width || 'auto', textAlign: col.align || 'left' }"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="items.length === 0">
            <td :colspan="columns.length" class="empty-state">
              <slot name="empty">No se encontraron registros.</slot>
            </td>
          </tr>

          <tr 
            v-for="(item, index) in paginatedItems" 
            :key="item.id || index"
            :class="{ 'is-selected': selectedRowId === item.id }"
            @click="handleRowClick(item)"
          >
            <td 
              v-for="col in columns" 
              :key="col.key"
              :style="{ textAlign: col.align || 'left' }"
            >
              <!-- Slot dinámico por columna -->
              <slot :name="`cell(${col.key})`" :item="item" :value="item[col.key]" :index="index">
                {{ item[col.key] ?? '—' }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
    
    <div class="table-pagination-footer" v-if="items.length > 10">
      <div class="pagination-info">
        <slot name="pagination-info">
          Mostrando datos {{ paginationStart }} a {{ paginationEnd }} de {{ items.length }} entradas
        </slot>
      </div>

      <div class="pagination-controls">
        <button 
          class="page-btn arrow" 
          :disabled="currentPage === 1" 
          @click="$emit('update:currentPage', currentPage - 1)"
        >
          ‹
        </button>

        <button 
          v-for="page in totalPages" 
          :key="page"
          class="page-btn"
          :class="{ active: page === currentPage }"
          @click="$emit('update:currentPage', page)"
        >
          {{ page }}
        </button>
        <!--Boton siguiente-->
        <button 
          class="page-btn arrow" 
          :disabled="currentPage === totalPages" 
          @click="$emit('update:currentPage', currentPage + 1)"
        >
          ›
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import DownloadIcon from '@/assets/icons/Table/DowloadIcon.svg?component'
import PlusIcon from '@/assets/icons/Table/PlusIcon.svg?component'
import ChevronIcon from '@/assets/icons/Table/ChevronIcon.svg?component'
import XIcon from '@/assets/icons/Table/x-03.svg?component'

const props = defineProps({
  columns: { type: Array, required: true },
  items: { type: Array, required: true, default: () => [] },
  selectedRowId: { type: [Number, String], default: null },
  currentPage: { type: Number, default: 1 },
  itemsPerPage: { type: Number, default: 10 },
  //Permite recibir los filtros configurables desde la pantalla padre
  filterOptions: {
    type: Array,
    default: () => ['Estado: activo', 'Estado: inactivo', 'Rol: Microsoft']
  }
})

const emit = defineEmits(['row-click', 'update:currentPage', 'export', 'add', 'filter-change'])

const itemsPerPage = computed(() => props.itemsPerPage || 10)

const paginatedItems = computed(() => {
  const start = (props.currentPage - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return props.items.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(props.items.length / itemsPerPage.value) || 1
})

const paginationStart = computed(() => {
  if (props.items.length === 0) return 0
  return (props.currentPage - 1) * itemsPerPage.value + 1
})

const paginationEnd = computed(() => {
  const end = props.currentPage * itemsPerPage.value
  return end > props.items.length ? props.items.length : end
})

const isDropdownOpen = ref(false)

const activeFilters = ref(['Estado: activo'])
const applyFilter = (filterName) => {
  if (!activeFilters.value.includes(filterName)) {
    activeFilters.value.push(filterName)
    emit('filter-change', activeFilters.value) // Avisa al Dashboard que cambió un filtro
  }
  isDropdownOpen.value = false
}
const removeFilter = (index) => {
  activeFilters.value.splice(index, 1)
  emit('filter-change', activeFilters.value)
}
//const removeFilter = (index) => {
  //activeFilters.value.splice(index, 1)
//}

const handleRowClick = (item) => {
  emit('row-click', item)
}
</script>

<style scoped>

</style>