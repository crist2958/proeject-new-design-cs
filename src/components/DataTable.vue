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
            v-for="(item, index) in items" 
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
    

  

    <!-- Paginador genérico inferior -->
    <!-- Paginador genérico inferior (Traducido al español y visible para pruebas con más de 5 elementos) -->
    <div class="table-pagination-footer" v-if="items.length > 5">
      <div class="pagination-info">
        <slot name="pagination-info">
          Mostrando datos {{ pagination.from || 1 }} a {{ pagination.to || items.length }} de {{ pagination.total || items.length }} entradas
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
          v-for="page in [1, 2, 3, 4]" 
          :key="page"
          class="page-btn"
          :class="{ active: page === currentPage }"
          @click="$emit('update:currentPage', page)"
        >
          {{ page }}
        </button>

        <span class="pagination-dots">...</span>

        <button 
          class="page-btn"
          :class="{ active: currentPage === 40 }"
          @click="$emit('update:currentPage', 40)"
        >
          40
        </button>

        <button 
          class="page-btn arrow" 
          :disabled="currentPage === 40" 
          @click="$emit('update:currentPage', currentPage + 1)"
        >
          ›
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DownloadIcon from '@/assets/icons/Table/DowloadIcon.svg?component'
import PlusIcon from '@/assets/icons/Table/PlusIcon.svg?component'
import ChevronIcon from '@/assets/icons/Table/ChevronIcon.svg?component'
import XIcon from '@/assets/icons/Table/x-03.svg?component'

const props = defineProps({
  columns: { type: Array, required: true },
  items: { type: Array, required: true, default: () => [] },
  selectedRowId: { type: [Number, String], default: null },
  currentPage: { type: Number, default: 1 },
  pagination: { type: Object, default: () => ({ from: 1, to: 8, total: '256K' }) },
  //Permite recibir los filtros configurables desde la pantalla padre
  filterOptions: {
    type: Array,
    default: () => ['Estado: activo', 'Estado: inactivo', 'Rol: Microsoft']
  }
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
const emit = defineEmits(['row-click', 'update:currentPage', 'export', 'add', 'filter-change'])

const handleRowClick = (item) => {
  emit('row-click', item)
}
</script>

<style scoped>

</style>