import { createApp } from 'vue'
import App from './App.vue'
import { createPinia, PiniaVuePlugin } from 'pinia'

const pinia = createPinia()
createApp(App).use(pinia).mount('#app')
