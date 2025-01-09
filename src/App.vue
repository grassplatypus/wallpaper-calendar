<script setup>
import Calendar from '@/components/Calendar/CalendarComponent.vue'
import { ref } from 'vue'
import Wallpaper from '@/components/Wallpaper/WallpaperComponent.vue'
import { defineStore } from 'pinia'
import {WallpaperSettings} from '@/others/defines.js'
import { watch } from 'node:fs'

const year = ref(2024)
const month = ref(11)

const wallpaperStore = defineStore('wallpaper-store', {
  state: (): WallpaperSettings => {
    return {
      // 시계 설정
      clockSettings: null,
      // 캘린더 설정
      calendarSettings: null,
    }
  }
})

// Copilot
// 애플리케이션 시작 시 localStorage에서 상태 복원
const savedState = localStorage.getItem('wallpaper-store')
if (savedState) {
  wallpaperStore.$state = JSON.parse(savedState)
}

// 상태 변경 시마다 localStorage에 저장
watch(
  () => mainStore.$state,
  (state) => {
    localStorage.setItem('wallpaper-store', JSON.stringify(state))
  },
  { deep: true }  // 깊은 감시를 위해 설정
)

function loadData() {

}
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
