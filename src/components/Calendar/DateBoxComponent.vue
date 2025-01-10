<script setup lang="ts">
import { computed } from 'vue'
import { useDateStore } from '@/others/stores'
import { DateFunctions } from '@/components/Calendar/DateFunctions'

const props = defineProps({
  x: Number,
  y: Number
})
const dateStore = useDateStore()
const dateOfThisBox = computed(() => DateFunctions.getFullDate(dateStore.year, dateStore.month, props.x!, props.y!))

const isSat = computed(() => dateOfThisBox!.value.getDay() == 6)
const isSun = computed(() => dateOfThisBox!.value.getDay() == 0)
// dateOfThisBox를 쓰면 캘린더에서 메인이 되는 월이 아닌 해당 날짜 기준 월이 사용되어 문제 발생
const year = computed(() => dateStore.year)
const month = computed(() => dateStore.month) // 실제 우리가 쓰는 월
const boxDate = computed(() => dateOfThisBox!.value.getDate())
const boxMonth = computed(() => dateOfThisBox!.value.getMonth() + 1) // 실제 박스의 월 (+1해서 표시)
const isCurrentMonth = computed(() => DateFunctions.isCurrentMonth(year.value, month.value, props.x!, props.y!))

function msg(mess: string) {
  alert(mess)
}
</script>

<template>
  <div class="datebox" @click="msg('yeah!')">
    <div class="day-text">
      <span v-if="isCurrentMonth" :class="{ sat: isSat, sun: isSun }">{{ boxDate }}</span>
      <span v-else class="gray" :class="{ sat: isSat, sun: isSun }">{{ boxMonth }}/{{ boxDate }}</span>
    </div>
  </div>
</template>

<style scoped>
.datebox {
  width: 8rem;
  height: 8.5rem;
  position: relative;
}

.day-text {
  padding: 0 0.3rem 0 0;
  text-align: right;
}

.day-text:deep(span) {
  font-size: 1.1rem;
  font-weight: bold;
}

.day-text:deep(.gray) {
  color: gray;
  font-weight: normal;
}

.day-text:deep(.sat) {
  color: deepskyblue;
}

.day-text:deep(.sun) {
  color: orangered;
}
</style>
