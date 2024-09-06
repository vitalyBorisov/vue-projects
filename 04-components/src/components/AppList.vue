<script setup lang="ts"></script>

<template>
  <div class="card">
    <ul>
      <li v-for="(item, index) in 5" :key="item">
        <slot :iter="item" :index="index"></slot>
      </li>
    </ul>
  </div>
</template>
