<!-- component -->
<template>
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

    <!-- Paginador genérico inferior -->
    <div class="table-pagination-footer" v-if="showPagination">
      <div class="pagination-info">
        <slot name="pagination-info">
          Showing data {{ pagination.from || 1 }} to {{ pagination.to || items.length }} of {{ pagination.total || items.length }} entries
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
const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  items: {
    type: Array,
    required: true,
    default: () => []
  },
  selectedRowId: {
    type: [Number, String],
    default: null
  },
  showPagination: {
    type: Boolean,
    default: true
  },
  currentPage: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number,
    default: 5
  },
  pagination: {
    type: Object,
    default: () => ({ from: 1, to: 8, total: '256K' })
  }
})

const emit = defineEmits(['row-click', 'update:currentPage'])

const handleRowClick = (item) => {
  emit('row-click', item)
}
</script>

<style scoped>

</style>