<script setup lang="ts">
import EventComponent from '@/components/Calendar/EventComponent.vue'
import { computed } from 'vue'
import { CEventUIComponent } from '@/components/Calendar/EventProvider.js'

const props = defineProps({
  fullDate: Date,
  event: Array<CEventUIComponent>
})

const isSat = computed(() => props.fullDate!.getDay() == 6)
const isSun = computed(() => props.fullDate!.getDay() == 0)
const year = computed(() => props.fullDate!.getFullYear())
const month = computed(() => props.fullDate!.getMonth())
const date = computed(() => props.fullDate!.getDate())

function msg(mess: string) {
  alert(mess)
}
</script>

<template>
  <div class="event-box">
    <event-component @click.stop="msg('watch out')" v-for="v in props.event" :key="v.id" :v="v" />
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
