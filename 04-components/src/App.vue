<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AppButton from './components/AppButton.vue'
import AppTextOne from './components/AppTextOne.vue'
import AppTextTwo from './components/AppTextTwo.vue'

const active = ref<'one' | 'two'>('one')
const myBtn = ref<InstanceType<typeof AppButton>>()
// const componentName = computed(() => {
//   if (active.value === 'one') {
//     return AppTextOne
//   }
//   return AppTextTwo
// })

const componentName = computed<typeof AppTextOne | typeof AppTextTwo | string>({
  get() {
    if (active.value === 'one') {
      return AppTextOne
    }
    return AppTextTwo
  },
  set(value) {
    console.log('componentName', value)
  }
})

function oneColor() {
  return active.value === 'one' ? 'primary' : ''
}

function twoColor() {
  return active.value === 'two' ? 'primary' : ''
}

onMounted(() => {
  // setTimeout(() => (componentName.value = 'new comp name'), 1500)
  console.log(myBtn.value)
})
</script>

<template>
  <main>
    <div class="container pt-1">
      <div class="card">
        <AsyncComponent />
        <h2>Динамические и асинхронные конпоненты</h2>

        <AppButton ref="myBtn" :color="oneColor()" @action="active = 'one'">One</AppButton>
        <AppButton :color="twoColor()" @action="active = 'two'">Two</AppButton>
      </div>

      <KeepAlive>
        <component :is="componentName"></component>
      </KeepAlive>
    </div>
  </main>
</template>

<style scoped></style>
