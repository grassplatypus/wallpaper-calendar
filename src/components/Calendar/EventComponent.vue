<script setup lang="ts">
import { computed } from 'vue'
import { CEventUIComponent } from '@/components/Calendar/EventProvider.js'

const props = defineProps({
  v: CEventUIComponent
})

const color = computed(() => props.v!.color)
const name = computed(() => props.v!.name)
const size = computed(() => props.v!.days)
const offset = computed(() => {
  let day = props.v!.startDate.getDay()
  if (day) return day * 8.05 + 0.05
  else return 0
})
const line = computed(() => {
  return props.v!.line
})
const type = computed(() => props.v!.shape)
</script>

<template>
  <div class="pseudo-container">
    <div :class="['event', type]">{{ name }}</div>
  </div>
</template>

<style scoped>
.event {
  font-size: 0.8rem;
  margin-bottom: 0.08rem;
  border: 1px solid v-bind(color);
  background-color: v-bind(color);
  width: calc(v-bind(size) * 8.05rem - 0.05rem);
  margin-left: calc(v-bind(offset) * 1rem);
  transition-duration: 0.3s;
  pointer-events: all;
  cursor: pointer;
  text-align: center;
  position: absolute;
  top: calc(v-bind(line) * 1.5rem + 1.8rem);
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
