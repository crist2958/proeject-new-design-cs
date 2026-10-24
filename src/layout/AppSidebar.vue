<template>
  <aside class="sidebar-container">
    
    <!-- Navegación Central -->
    <nav class="sidebar-navigation">
      <ul class="nav-menu">
        <li v-for="item in menuItems" :key="item.to" class="nav-item">
          <router-link 
            :to="item.to" 
            class="nav-link-icon" 
            :aria-label="item.label"
            active-class="is-active"
          >
            <!-- Render dinámico del ícono SVG -->
            <component 
              v-if="typeof item.icon !== 'string'" 
              :is="item.icon" 
              class="sidebar-svg-icon" 
            />

            <!-- Tooltip / Etiqueta lateral flotante al hacer hover -->
            <span class="sidebar-tooltip">{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="sidebar-footer"></div>

  </aside>
</template>

<script setup>
import { useMenu } from '@/layout/composables/menuConfig'

const { menuItems } = useMenu()
</script>