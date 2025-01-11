<script setup lang="ts">
import { computed, watch } from 'vue'
import { useDateStore, useWallpaperStore } from '@/others/stores'
import Calendar from '@/components/Calendar/CalendarComponent.vue'
import Wallpaper from '@/components/Wallpaper/WallpaperComponent.vue'
import Clock from '@/components/Clock/ClockComponent.vue'
import { calendarSettingsObj, clockSettingsObj } from '@/others/defines'

const dateStore = useDateStore()
const wallpaperStore = useWallpaperStore()

const year = computed(() => {
  return dateStore.year
})
const month = computed(() => {
  return dateStore.month
})

function init() {
  // 애플리케이션 시작 시 localStorage에서 상태 복원
  const savedState = localStorage.getItem('wallpaper-store')
  if (savedState) {
    wallpaperStore.$state = JSON.parse(savedState)
  } else {
    wallpaperStore.clockSettings = new clockSettingsObj()
    wallpaperStore.calendarSettings = new calendarSettingsObj()
  }
  // Copilot
  // 상태 변경 시마다 localStorage에 저장
  watch(
    () => wallpaperStore.$state,
    (state) => {
      localStorage.setItem('wallpaper-store', JSON.stringify(state))
    },
    { deep: true } // 깊은 감시를 위해 설정
  )

  dateStore.year = 2024
  dateStore.month = 11
  dateStore.day = 1
  wallpaperStore.clockSettings.time24 = true
}

init()
</script>

<template>
  <Wallpaper>
    <Calendar />
    <div>
      <p>Year</p>
      <input type="number" v-model="dateStore.year" />

      <p>Month</p>
      <input type="number" v-model="dateStore.month" />
    </div>
    <Clock />
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
