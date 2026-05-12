import './styles.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router, { setupRouterGuards } from './router'

const app = createApp(App)

// Setup Pinia first (required by router guards)
app.use(createPinia())

// Setup router guards before mounting (async)
await setupRouterGuards(router)

// Setup router
app.use(router)

// Mount app
app.mount('#app')
