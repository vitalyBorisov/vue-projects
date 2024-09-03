<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

const myHtml = ref('<h1>Vue 3 App</h1>')
const title = ref('Я есть Грут')
const person = reactive({
  firstName: 'John',
  lastName: 'Doe',
  age: 27
})
const items = ref([1, 2])
const myInput = ref()

const evenItems = computed(() => items.value.filter((i) => i % 2 == 0))

function addItem(event: KeyboardEvent) {
  items.value.unshift(myInput.value.value)
  myInput.value.value = ''
  console.log(event.key)
}

function remove(index: number) {
  items.value.splice(index, 1)
}

function log(item: string | number) {
  console.log('Log item: ', item)
}
</script>

<template>
  <header>
    <div class="wrapper"></div>
  </header>

  <main>
    <div class="container">
      <div class="card center">
        <div v-html="myHtml"></div>
        <!-- <h2 v-text="title"></h2>
        <h2 v-once>{{ title }}</h2>
        <h2 v-pre>{{ title }}</h2>

        <button class="btn" @click="title = 'Теперь я другое название'">Изменить название</button> -->

        <div class="form-control">
          <input type="text" @keyup.shift.enter.exact="addItem($event)" ref="myInput" />
        </div>

        <ul class="list" v-if="items.length">
          <li
            class="list-item"
            v-for="(item, index) in items"
            @click.right.prevent="remove(index), log(item)"
            :key="item"
          >
            <strong>{{ item }}</strong
            >&nbsp;
            <input type="text" @click.stop />
          </li>
          <!-- <li class="list-item" v-for="(value, key) in person" :key="key">
            <strong>{{ key }}</strong> {{ value }}
          </li> -->
        </ul>
        <h3 v-show="items.length === 0">Элементов нет</h3>
      </div>
    </div>
  </main>
</template>

<style>
[v-cloak] {
  display: none;
}
</style>
