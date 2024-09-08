<script setup lang="ts">
import { ref } from 'vue'

const id = ref('input-' + Math.random())
defineProps({
  placeholder: String,
  label: String,
  error: [String, null]
})

const name = defineModel()

function change(event: Event) {
  name.value = (event.target as HTMLInputElement).value
}
</script>

<template>
  <div class="form-control" :class="{ invalid: error }">
    <label :for="id">{{ label }}</label>
    <input type="text" :id="id" :placeholder="placeholder" :value="name" @input="change" />
    <small v-if="error">{{ error }}</small>
  </div>
</template>
