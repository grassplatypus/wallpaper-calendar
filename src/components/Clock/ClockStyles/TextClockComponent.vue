<script setup lang="ts">
import { computed, ref } from 'vue'
import { useWallpaperStore } from '@/others/stores'

const clockStore = useWallpaperStore().clockSettings
let t = ref(new Date())
function time() {
  t.value = new Date()
}

const year = computed(() => t.value.getFullYear().toString())
const month = computed(() => (t.value.getMonth() + 1).toString().padStart(2, '0'))
const day = computed(() => t.value.getDate().toString().padStart(2, '0'))

const hour = computed(() => t.value.getHours().toString().padStart(2, '0'))
const minute = computed(() => t.value.getMinutes().toString().padStart(2, '0'))
const second = computed(() => t.value.getSeconds().toString().padStart(2, '0'))

setInterval(time, 1000)
</script>

<template>
  <div class="text-clock">
    <div v-if="clockStore?.time24">{{ hour }}:{{ minute }}:{{ second }}</div>
    <div v-else>
      {{ Number(hour) > 12 ? (Number(hour) - 12).toString().padStart(2, '0') : hour }}:{{ minute }}:{{ second }}
    </div>
  </div>
</template>

<style scoped>
.text-clock {
  font-size: 5rem;
  font-weight: bold;
  color: skyblue;
}
</style>
