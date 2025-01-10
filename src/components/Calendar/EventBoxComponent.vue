<script setup lang="ts">
import EventComponent from '@/components/Calendar/EventComponent.vue'
import { computed } from 'vue'
import { useDateStore } from '@/others/stores'
import { EventFunctions } from '@/components/Calendar/EventFunctions'
import { Example } from '@/test/example'

const props = defineProps({
  x: Number
})
const dateStore = useDateStore()

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
  width: 8rem;
  height: 8.5rem;
  position: relative;
  padding: 1.6rem 0 0;
}
</style>
