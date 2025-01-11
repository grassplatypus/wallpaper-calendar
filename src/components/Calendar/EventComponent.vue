<script setup lang="ts">
import { computed, ref } from 'vue'
import { CEventUIComponent } from '@/components/Calendar/EventProvider.js'
import { useWallpaperStore } from '@/others/stores'
import '@/others/variables.css'
import { useCssVar } from '@vueuse/core'

const props = defineProps({
  v: CEventUIComponent
})

let boxWidth = Number(useCssVar('--calendar-box-width', ref(null)).value!.slice(0, -3))
let boxHeight = Number(useCssVar('--calendar-box-height', ref(null)).value!.slice(0, -3))
let borderThickness = Number(useCssVar('--calendar-border-thickness', ref(null)).value!.slice(0, -3))

const wallpaperStore = useWallpaperStore()
const size = computed(() => wallpaperStore.calendarSettings!.size)
const color = computed(() => props.v!.color)
const name = computed(() => props.v!.name)
const days = computed(() => props.v!.days)
const offset = computed(() => {
  let day = props.v!.startDate.getDay()
  if (day) return day * (boxWidth * size.value + borderThickness) + borderThickness
  else return 0
})
const line = computed(() => {
  return props.v!.line
})
const type = computed(() => props.v!.shape)
const textcolor = computed(() => getContrastYIQ(color.value))

// Copilot 코드
function getContrastYIQ(hexcolor: string): string {
  // '#' 기호 제거
  hexcolor = hexcolor.replace('#', '')

  // RGB 값 추출
  var r = parseInt(hexcolor.slice(0, 2), 16) // 빨간색 값
  var g = parseInt(hexcolor.slice(2, 4), 16) // 녹색 값
  var b = parseInt(hexcolor.slice(4, 6), 16) // 파란색 값

  // YIQ 색 공간의 밝기(y) 계산 (공식 그대로 씀)
  var y = (r * 299 + g * 587 + b * 114) / 1000

  // 밝기가 128 이상이면 검은색 반환, 그렇지 않으면 흰색 반환
  return y >= 128 ? 'black' : 'white'
}
</script>

<template>
  <div class="pseudo-container">
    <div :class="['event', type]">{{ name }}</div>
  </div>
</template>

<style scoped>
.event {
  font-size: calc(0.8rem * v-bind(size));
  margin-bottom: 0.08rem;
  border: 1px solid v-bind(color);
  background-color: v-bind(color);
  width: calc(
    v-bind(days) * (var(--calendar-box-width) * v-bind(size) + var(--calendar-border-thickness)) -
      var(--calendar-border-thickness)
  );
  margin-left: calc(v-bind(offset) * 1rem);
  transition-duration: var(--calendar-event-transition-duration);
  pointer-events: all;
  cursor: pointer;
  text-align: center;
  position: absolute;
  top: calc((v-bind(line) * 1.5rem) * v-bind(size) + 1.8rem);
  font-weight: bold;
  color: v-bind(textcolor);
}

.event:hover {
  filter: saturate(2);
}

.pseudo-container:deep(.EventEndRadius) {
  border-radius: 0 7px 7px 0;
}

.pseudo-container:deep(.EventStartRadius) {
  border-radius: 7px 0 0 7px;
}

.pseudo-container:deep(.EventNoRadius) {
  border-radius: 0;
}

.pseudo-container:deep(.EventBothRadius) {
  border-radius: 5px;
}
</style>
