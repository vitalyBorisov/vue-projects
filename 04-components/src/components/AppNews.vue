<script setup lang="ts">
import { ref } from 'vue'
import AppButton from './AppButton.vue'
import AppNewsList from './AppNewsList.vue'

const props = defineProps({
  wasRead: Boolean,
  title: { type: String, required: true },
  id: { type: Number, required: true },
  isOpen: {
    type: Boolean,
    required: false,
    default: false,
    validator(value: boolean) {
      return value === true || value === false
    }
  }
})

const emit = defineEmits({
  openNews: null,
  readNews(id: number) {
    if (id) {
      return true
    }
    console.warn('Нет параметра id для emit readNews')
    return false
  },
  unmark: null
})

const isNewsOpen = ref(props.isOpen)

function open() {
  isNewsOpen.value = !isNewsOpen.value
  if (isNewsOpen.value) {
    emit('openNews')
  }
}

function mark() {
  isNewsOpen.value = false
  emit('readNews', props.id)
}

// function unmark() {
//   emit('unmark', props.id)
// }
</script>

<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <AppButton @action="open">{{ isNewsOpen ? 'Закрыть' : 'Открыть' }}</AppButton>
    <AppButton color="danger" v-if="wasRead" @action="$emit('unmark', id)"
      >Отметить непрочитанной</AppButton
    >

    <div v-if="isNewsOpen">
      <hr />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, reiciendis voluptates deleniti
        dolore consequuntur laborum?
      </p>
      <AppButton v-if="!wasRead" color="primary" @action="mark">Прочесть новость</AppButton>
      <AppNewsList />
    </div>
  </div>
</template>
