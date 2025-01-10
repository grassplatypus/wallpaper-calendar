import { defineStore } from 'pinia'
import type { iWallpaperSettings } from '@/others/defines'

export const useWallpaperStore = defineStore('wallpaper-store', {
  state: (): iWallpaperSettings => {
    return {
      // 시계 설정
      clockSettings: null,
      // 캘린더 설정
      calendarSettings: null
    }
  }
})
export const useDateStore = defineStore('date-store', {
  state: () => {
    return {
      // 이 모든 프로퍼티들은 자동으로 타입이 추론됩니다.
      year: 0,
      month: 0,
      day: 0
    }
  }
})
