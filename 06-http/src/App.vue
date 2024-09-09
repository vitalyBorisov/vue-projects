<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios, { AxiosError } from 'axios'

import AppPeopleList from './components/AppPeopleList.vue'
import AppAlert from './components/AppAlert.vue'
import AppLoader from './components/AppLoader.vue'

const name = ref('')
const people = ref<Array<{ id: string; firstName: string }>>([])
const alert = ref<{ type: string; title: string; text: string } | null>(null)
const loading = ref(false)

async function createPerson() {
  const response = await fetch(
    'https://vue-with-http-faf28-default-rtdb.europe-west1.firebasedatabase.app/people.json',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: name.value
      })
    }
  )
  const firebaseData = await response.json()

  console.log(firebaseData)
  people.value.push({
    firstName: name.value,
    id: firebaseData.name
  })
  console.log(people.value)
  name.value = ''
}

function loadPeople() {
  loading.value = true
  setTimeout(async () => {
    try {
      const { data } = await axios.get(
        'https://vue-with-http-faf28-default-rtdb.europe-west1.firebasedatabase.app/people.json'
      )
      if (!data) {
        throw new Error('Список людей пуст')
      }
      people.value = Object.keys(data).map((key) => {
        return {
          id: key,
          ...data[key]
        }
      })
      loading.value = false
    } catch (error) {
      alert.value = {
        type: 'danger',
        title: 'Ошибка!',
        text: (error as AxiosError).message
      }
      loading.value = false
      console.log((error as AxiosError).message)
    }
  }, 1500)
}

async function removePerson(id: string) {
  try {
    const name = people.value.find((person) => person.id === id)?.firstName
    await axios.delete(
      `https://vue-with-http-faf28-default-rtdb.europe-west1.firebasedatabase.app/people/${id}.json`
    )
    people.value = people.value.filter((person) => person.id !== id)
    alert.value = {
      type: 'primary',
      title: 'Успешно!',
      text: `Пользователь с именем "${name}" был удален`
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(loadPeople)
</script>

<template>
  <main>
    <div class="container">
      <AppAlert :alert="alert" @close="alert = null"></AppAlert>
      <form class="card" @submit.prevent="createPerson">
        <h2>Работа с базой данных</h2>

        <div class="form-control">
          <label for="name">Введите имя</label>
          <input type="text" id="name" v-model.trim="name" />
        </div>

        <button class="btn primary" :disabled="name.length === 0">Создать человека</button>
      </form>
      <AppLoader v-if="loading"></AppLoader>
      <AppPeopleList
        v-else
        :people="people"
        @load="loadPeople"
        @remove="removePerson"
      ></AppPeopleList>
    </div>
  </main>
</template>

<style scoped></style>
