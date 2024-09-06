<script setup lang="ts">
import AppBlock from './components/AppBlock.vue'
import AppList from './components/AppList.vue'
</script>

<template>
  <main>
    <div class="container pt-1">
      <div class="card">
        <h2>Slots</h2>
      </div>

      <AppList>
        <template #default="{ index, iter }">
          <span style="color: #c25205">
            <strong>{{ index + 1 }}</strong>
            Item: {{ iter }}
          </span>
        </template>
      </AppList>

      <AppBlock>
        <p>Это самый важный текст для нового блока</p>
        <template #header>
          <h3>Это заголовок!</h3>
        </template>
        <template v-slot:footer>
          <hr />
          <small>Это footer</small>
        </template>
      </AppBlock>
    </div>
  </main>
</template>

<style scoped></style>
