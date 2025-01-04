<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  fullDate: Date,
  isCurrentMonth: Boolean
})

const isSat = computed(() => props.fullDate!.getDay() == 6)
const isSun = computed(() => props.fullDate!.getDay() == 0)
const year = computed(() => props.fullDate!.getFullYear())
const month = computed(() => props.fullDate!.getMonth())
const date = computed(() => props.fullDate!.getDate())
const isCurrentMonth = computed(() => props.isCurrentMonth!)

function msg(mess: string) {
  alert(mess)
}
</script>

<template>
  <div class="datebox" @click="msg('yeah!')">
    <div class="day-text">
      <span :class="{ gray: isCurrentMonth, sat: isSat, sun: isSun }">{{ date }}</span>
    </div>
  </div>
</template>

<style scoped>
.datebox {
  width: 8rem;
  height: 8.5rem;
  position: relative;
  transition-duration: 0.07s;
}

.datebox:hover {
  background: lightgray;
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
  color: gray !important;
  font-weight: normal;
}

.day-text:deep(.sat) {
  color: deepskyblue;
}

.day-text:deep(.sun) {
  color: orangered;
}
</style>
