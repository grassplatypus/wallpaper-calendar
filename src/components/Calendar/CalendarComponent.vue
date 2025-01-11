<script setup lang="ts">
import DateBoxComponent from '@/components/Calendar/DateBoxComponent.vue'
import EventBoxComponent from '@/components/Calendar/EventBoxComponent.vue'
import { useWallpaperStore } from '@/others/stores'
import { computed } from 'vue'
import '@/others/variables.css'
const wallpaperStore = useWallpaperStore()
const size = computed(() => wallpaperStore.calendarSettings!.size)
</script>

<template>
  <div class="calendar-container">
    <!-- 캘린더 틀 표시 -->
    <div class="table-container">
      <table class="calendar-table-layout">
        <tr v-for="x in 6" :key="x">
          <td v-for="y in 7" :key="y" class="table-box-container">
            <date-box-component
              :x="x"
              :y="y"
              class="table-box"
              :class="{
                'left-first-border': y == 1,
                'bottom-last-border': x == 6,
                'left-top-radius': x == 1 && y == 1,
                'left-bottom-radius': x == 6 && y == 1,
                'right-bottom-radius': x == 6 && y == 7,
                'right-top-radius': x == 1 && y == 7
              }"
            />
          </td>
        </tr>
      </table>
    </div>
    <!-- 이벤트 표시 -->
    <div class="event-container">
      <table class="calendar-table-layout hidden">
        <tr v-for="x in 6" :key="x">
          <event-box-component :x="x" />
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
.calendar-table-layout {
  border-collapse: collapse;
  padding: 0;
  width: 100%;
  height: 100%;
}

.table-container {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  border-radius: 30%;
}

.event-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
  /* 이 테이블은 커서 이벤트를 막고 개별 이벤트 객체는 커서 이벤트 허용 */
}

.calendar-container {
  position: relative;
  width: calc(
    calc(calc(var(--calendar-box-width) * v-bind(size)) + var(--calendar-border-thickness)) * 7 +
      var(--calendar-border-thickness)
  );
  height: calc(
    calc(calc(var(--calendar-box-height) * v-bind(size)) + var(--calendar-border-thickness)) * 6 +
      var(--calendar-border-thickness)
  );
}

.hidden {
  border-color: transparent !important;
}

.table-box-container {
  width: calc(var(--calendar-box-width) * v-bind(size));
  height: calc(var(--calendar-box-height) * v-bind(size));
  padding: 0;
}

.table-box {
  width: 100%;
  height: 100%;
  border-right: var(--calendar-border-thickness) solid var(--calendar-border-color);
  border-top: var(--calendar-border-thickness) solid var(--calendar-border-color);
  transition-duration: var(--calendar-box-transition-duration);
}

.table-box:hover {
  background: var(--calendar-box-hover-color);
}

.left-first-border {
  border-left: var(--calendar-border-thickness) solid var(--calendar-border-color);
}

.bottom-last-border {
  border-bottom: var(--calendar-border-thickness) solid var(--calendar-border-color);
}

.left-top-radius {
  border-top-left-radius: var(--calendar-border-radius);
}

.left-bottom-radius {
  border-bottom-left-radius: var(--calendar-border-radius);
}

.right-bottom-radius {
  border-bottom-right-radius: var(--calendar-border-radius);
}

.right-top-radius {
  border-top-right-radius: var(--calendar-border-radius);
}
</style>
