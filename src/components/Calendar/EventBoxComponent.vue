<script setup lang="ts">
import EventComponent from '@/components/Calendar/EventComponent.vue'
import { computed } from 'vue'
import { useDateStore, useWallpaperStore } from '@/others/stores'
import { EventFunctions } from '@/components/Calendar/EventFunctions'
import { Example } from '@/test/example'
import '@/others/variables.css'

const dateStore = useDateStore()
const wallpaperStore = useWallpaperStore()
const size = computed(() => wallpaperStore.calendarSettings!.size)

const props = defineProps({
  x: Number
})
const eventsByWeek = computed(() => {
  return EventFunctions.processEvents(Example.testEvents, dateStore.year, dateStore.month)
})
const eventsOfTheWeek = computed(() => EventFunctions.getEventOfTheWeek(eventsByWeek.value, props.x!))

function msg(mess: string) {
  alert(mess)
}
</script>

<template>
  <div class="event-box">
    <event-component @click.stop="msg('watch out')" v-for="v in eventsOfTheWeek" :key="v.id" :v="v" />
  </div>
</template>

<style scoped>
.event-box {
  width: calc(var(--calendar-box-width) * v-bind(size));
  height: calc(var(--calendar-box-height) * v-bind(size));
  position: relative;
  /* padding: 1.6rem 0 0; */
}
</style>
