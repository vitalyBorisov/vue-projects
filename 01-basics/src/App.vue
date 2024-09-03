<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const title = ref('Список заметок');
const placeholderString = ref('Введите название заметки');
const inputValue = ref('');
const notes = ref(['Заметка 1', 'Заметка 2']);

const doubleCountComputed = computed(() => {
  return notes.value.length * 2;
});

function addNewNote() {
  if (inputValue.value !== '') {
    notes.value.push(inputValue.value);
    inputValue.value = '';
  }
}

function toUpperCase(item: string) {
  return item.toUpperCase();
}

function removeNote(index: number) {
  notes.value.splice(index, 1);
}

watch(inputValue, (value) => {
  if (value.length > 10) {
    inputValue.value = '';
  }
});
</script>

<template>
  <header>
    <div class="wrapper"></div>
  </header>

  <main>
    <div class="container">
      <div class="card">
        <h1
          :style="{
            color: inputValue.length < 5 ? 'darkred' : 'darkblue',
            fontSize: inputValue.length < 6 ? '2rem' : '1.5rem'
          }"
        >
          {{ title }}
        </h1>
        <div class="form-control">
          <input
            type="text"
            :placeholder="placeholderString"
            v-model="inputValue"
            @keypress.enter="addNewNote"
          />
        </div>
        <button class="btn" @click="addNewNote">Добавить</button>
        <hr />
        <ul class="list" v-if="notes.length !== 0">
          <li v-for="(note, index) in notes" :key="index" class="list-item">
            <span :class="note.length > 5 ? 'primary' : 'bold'"
              >({{ index + 1 }}) {{ toUpperCase(note) }}</span
            >
            <button class="btn danger" @click="removeNote(index)">Удалить</button>
          </li>
          <hr />
          <li>
            <strong>Общее колчество: {{ notes.length }}</strong> | Удвоенное:
            {{ doubleCountComputed }}
          </li>
        </ul>
        <div v-else-if="notes.length === 0">Заметок пока нет. Добавьте первую</div>
      </div>
    </div>
  </main>
</template>
