<script setup lang="ts">
import DateBoxComponent from '@/components/Calendar/DateBoxComponent.vue'
import EventBoxComponent from '@/components/Calendar/EventBoxComponent.vue'
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
  width: calc(8.05rem * 7 + 0.05rem);
  height: calc(8.55rem * 6 + 0.05rem);
}

.hidden {
  border-color: transparent !important;
}

.table-box-container {
  padding: 0;
}

.table-box {
  width: 8rem;
  height: 8.5rem;
  padding: 0;
  border-right: 0.05rem solid gray;
  border-top: 0.05rem solid gray;
  transition-duration: 0.07s;
}

.table-box:hover {
  background: red;
}

.left-first-border {
  border-left: 0.05rem solid gray;
}

.bottom-last-border {
  border-bottom: 0.05rem solid gray;
}

.left-top-radius {
  border-top-left-radius: 10%;
}

.left-bottom-radius {
  border-bottom-left-radius: 10%;
}

.right-bottom-radius {
  border-bottom-right-radius: 10%;
}

.right-top-radius {
  border-top-right-radius: 10%;
}
</style>
