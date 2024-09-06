<script setup lang="ts">
import type { TProvideNews } from '@/types/provide'
import { inject } from 'vue'

const { title, news } = inject('news') as TProvideNews
</script>

<template>
  <hr />
  <h1>{{ title }}</h1>
  <ul>
    <li v-for="item in news" :key="item.id">
      {{ item.title }} <span v-if="item.wasRead">!!!</span>
    </li>
  </ul>
</template>
