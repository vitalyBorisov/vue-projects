import './assets/main.css'

import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import TheHeader from './components/TheHeader.vue'

const app = createApp(App)

// global
app.component('TheHeader', TheHeader)
app.component(
  'AsyncComponent',
  defineAsyncComponent(() => {
    return import('./components/AppAsyncComponent.vue')
  })
)

app.mount('#app')
