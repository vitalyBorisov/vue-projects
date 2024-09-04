import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import App2 from './App-2.vue'

const app = createApp(App)

app.mount('#app')

createApp(App2).mount('#app2')

// setTimeout(() => {
//   app.unmount()
// }, 2000)

let title = 'Vue 3'
const message = 'Заголовок это: ' + title

console.log(message)

title = 'Angular 10'

console.log(message)

const data = {
  title: 'Vue 3',
  message: 'Заголовок это: Vue 3'
}

const proxy = new Proxy(data, {
  //   get(target, p) {
  //     console.log(target)
  //     console.log(p)
  //   },
  set(target, key, value) {
    if (key === 'title') {
      target.message = 'Заголовок это: ' + value
    }
    target[key as keyof typeof target] = value

    return true
  }
})

proxy.title = 'Angular 10'

console.log(proxy)
