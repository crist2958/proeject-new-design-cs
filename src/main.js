import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// estilos globales
import './assets/layout/layout.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
