<template>
  <aside class="sidebar-container">
    
    <!-- 2. Navegación Central: Íconos centrados con separación de 28px -->
    <nav class="sidebar-navigation">
      <ul class="nav-menu">
        <li v-for="item in menuItems" :key="item.to" class="nav-item">
          <router-link 
            :to="item.to" 
            class="nav-link-icon" 
            :title="item.label"
            :aria-label="item.label"
            active-class="is-active"
          >
            <!-- Render dinámico del componente SVG (CalendarIcon, etc.) -->
            <component 
              v-if="typeof item.icon !== 'string'" 
              :is="item.icon" 
              class="sidebar-svg-icon" 
            />
        
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- 3. Área Inferior: Espacio para acciones secundarias o perfil -->
    <div class="sidebar-footer">
      <!-- Puedes agregar un botón de perfil o ajustes aquí si el diseño lo requiere -->
    </div>

  </aside>
</template>

<script setup>
import { useMenu } from '@/layout/composables/menuConfig' // O la ruta donde tengas useMenu

const { menuItems } = useMenu()
</script>