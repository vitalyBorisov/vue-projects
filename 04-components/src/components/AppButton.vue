<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: '',
    validator(value: string) {
      return ['', 'primary', 'danger'].includes(value)
    }
  }
})

function btnLog() {
  console.log('Button log')
}
</script>

<template>
  <button class="btn" :class="color" @click="$emit('action')">
    <slot></slot>
  </button>
</template>
