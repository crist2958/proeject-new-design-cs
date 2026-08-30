<template>
  <div class="layout-wrapper" :class="containerClass">
    <!-- Header Superior -->
    <AppTopbar />

    <!-- Sidebar Único (sin envoltorio duplicado) -->
    <AppSidebar />

    <!-- Contenedor Principal -->
    <div class="layout-main-container">
      <main class="layout-main">
        <router-view />
      </main>

      <AppFooter />
    </div>

    <!-- Máscara sólo para responsive -->
    <div class="layout-mask" @click="onMaskClick"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import AppTopbar from './AppTopbar.vue'
import AppSidebar from './AppSidebar.vue'
import AppFooter from './AppFooter.vue'
import { useLayout } from './composables/layout'

const { layoutConfig, layoutState } = useLayout()

const containerClass = computed(() => ({
  'layout-theme-dark': layoutConfig.darkTheme?.value ?? layoutConfig.darkTheme,
  'layout-overlay': (layoutConfig.menuMode?.value ?? layoutConfig.menuMode) === 'overlay',
  'layout-static': (layoutConfig.menuMode?.value ?? layoutConfig.menuMode) === 'static',
  'layout-static-inactive': layoutState.staticMenuDesktopInactive?.value ?? layoutState.staticMenuDesktopInactive,
  'layout-overlay-active': layoutState.overlayMenuActive?.value ?? layoutState.overlayMenuActive,
  'layout-mobile-active': layoutState.staticMenuMobileActive?.value ?? layoutState.staticMenuMobileActive
}))

const onMaskClick = () => {
  if (layoutState.overlayMenuActive?.value !== undefined) {
    layoutState.overlayMenuActive.value = false
    layoutState.staticMenuMobileActive.value = false
    layoutState.menuHoverActive.value = false
  } else {
    layoutState.overlayMenuActive = false
    layoutState.staticMenuMobileActive = false
    layoutState.menuHoverActive = false
  }
}
</script>