<script setup>
import Calendar from '@/components/Calendar/CalendarComponent.vue'
import { ref } from 'vue'
import Wallpaper from '@/components/Wallpaper/WallpaperComponent.vue'

const year = ref(2024)
const month = ref(11)
</script>

<template>
  <Wallpaper>
    <Calendar :year="year" :month="month" />
    <div>
      <p>Year</p>
      <input type="number" v-model="year" />

      <p>Month</p>
      <input type="number" v-model="month" />
    </div>
  </Wallpaper>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
}
</style>
