<script setup lang="ts">
import { provide, reactive, ref } from 'vue'
import AppNews from './components/AppNews.vue'
import type { News } from './types/provide'

const now = ref(new Date().toLocaleDateString())
const openRate = ref(0)
const readRate = ref(0)
const news: News[] = reactive([
  {
    title: 'Джо Байден победил на выборах в США',
    id: 1,
    isOpen: false,
    wasRead: false
  },
  {
    title: 'Vue 3 успешно работает',
    id: 2,
    isOpen: false,
    wasRead: false
  }
])

provide('news', { title: 'Список всех новостей', news })

function openNews() {
  openRate.value++
}

function readNews(id: number) {
  const idx = news.findIndex((news) => news.id === id)
  news[idx].wasRead = true
  readRate.value++
}

function unreadNews(id: number) {
  const unreadNews = news.find((news) => news.id === id)
  if (unreadNews) {
    unreadNews.wasRead = false
    readRate.value--
  }
}
</script>

<template>
  <main>
    <div class="container pt-1">
      <div class="card">
        <h2>Актуальные новости {{ now }}</h2>
        <span
          >Открыто: <strong>{{ openRate }} </strong> | Прочитано:
          <strong>{{ readRate }}</strong></span
        >
      </div>
      <AppNews
        v-for="item in news"
        :key="item.id"
        :title="item.title"
        :id="item.id"
        :is-open="item.isOpen"
        :was-read="item.wasRead"
        @open-news="openNews"
        @read-news="readNews"
        @unmark="unreadNews"
      />
    </div>
  </main>
</template>

<style scoped>
h2 {
  color: red;
}
</style>
s
