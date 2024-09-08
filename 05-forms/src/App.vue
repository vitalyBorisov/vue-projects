<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { Errors } from './types/form.types'
import AppInput from './components/AppInput.vue'

const name = ref('')
const age = ref(23)
const city = ref('spb')
const relocate = ref('yes')
const skills = ref([])
const agree = ref(false)
const errors: Errors = reactive({
  name: null
})

function submitHandler() {
  if (formIsValid()) {
    console.group('Form Data')
    console.log('Name: ', name.value)
    console.log('Age: ', age.value)
    console.log('City: ', city.value)
    console.log('To Tokyo: ', relocate.value)
    console.log('Skills: ', skills.value)
    console.log('Agree:', agree.value)
    console.groupEnd()
  }
}

function formIsValid() {
  let isValid = true
  if (name.value.length === 0) {
    errors.name = 'Имя не может быть пустым'
    isValid = false
  } else {
    errors.name = null
  }

  return isValid
}
</script>

<template>
  <main>
    <div class="container">
      <form class="card" @submit.prevent="submitHandler">
        <h1>Анкета на Vue разработчика!</h1>
        <!-- <div class="form-control" :class="{ invalid: errors.name }">
          <label for="name"></label>
          <input type="text" id="name" placeholder="Введи имя" v-model.trim="name" />
          <small v-if="errors.name">{{ errors.name }}</small>
        </div> -->

        <AppInput
          placeholder="Введи имя"
          :error="errors.name"
          label="Как тебя зовут?"
          v-model="name"
        />

        <div class="form-control">
          <label for="age">Выбери возраст</label>
          <input type="number" id="age" max="70" v-model.number="age" />
        </div>

        <div class="form-control">
          <label for="city">Твой город</label>
          <select id="city" v-model="city">
            <option value="spb">Санкт-Петербург</option>
            <option value="msk">Москва</option>
            <option value="kzn">Казань</option>
            <option value="nsk">Новосибирск</option>
          </select>
        </div>

        <div class="form-checkbox">
          <span class="label">Готов к переезду в Токио?</span>
          <div class="checkbox">
            <label><input type="radio" name="trip" v-model="relocate" value="yes" /> Да</label>
          </div>

          <div class="checkbox">
            <label><input type="radio" name="trip" v-model="relocate" value="no" /> Нет</label>
          </div>
        </div>

        <div class="form-checkbox">
          <span class="label">Что знаешь во Vue?</span>
          <div class="checkbox">
            <label
              ><input type="checkbox" v-model="skills" name="skills" value="vuex" /> Vuex</label
            >
          </div>
          <div class="checkbox">
            <label
              ><input type="checkbox" v-model="skills" name="skills" value="cli" /> Vue CLI</label
            >
          </div>
          <div class="checkbox">
            <label
              ><input type="checkbox" v-model="skills" name="skills" value="router" /> Vue
              Router</label
            >
          </div>
        </div>

        <div class="form-checkbox">
          <span class="label">Правила нашей компании</span>
          <div class="checkbox">
            <label><input type="checkbox" v-model="agree" /> С правилами согласен</label>
          </div>
        </div>

        <button type="submit" class="btn primary">Отправить</button>
      </form>
    </div>
  </main>
</template>

<style scoped>
.form-control small {
  color: #e53935;
}

.form-control.invalid input {
  border-color: #e53935;
}
</style>
