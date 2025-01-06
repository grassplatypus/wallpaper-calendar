<script setup lang="ts">
import DateBoxComponent from '@/components/Calendar/DateBoxComponent.vue'
import EventBoxComponent from '@/components/Calendar/EventBoxComponent.vue'
import { CEvent, CEventUIComponent } from '@/components/Calendar/EventProvider'
import { DateFunctions } from '@/components/Calendar/DateFunctions'
import { computed } from 'vue'

const props = defineProps({
  year: Number,
  month: Number
})

// 지정된 년월이 며칠까지 있는지 반환하는 함수 (예: 2월에 28, 12월에 31)
function getDaysOfMonth(year: number, month: number) {
  let d = new Date()
  d.setFullYear(year, month - 1, 1)
  let nextMonth = new Date(d.getFullYear(), d.getMonth() + 1, 1)
  return new Date(nextMonth.getTime() - d.getTime()).getDate()
  // Date 간 직접 연산이 안되서 밀리초 변환 이후 연산
}

// 지정된 달의 첫 날의 요일 반환하는 함수
function getStartDow(year: number, month: number): number {
  return new Date(year, month - 1, 1).getDay()
}

// 지정된 좌표가 지정된 캘린더 년월상에 들어있는 일(day)인지 반환하는 함수
function isCurrentMonth(year: number, month: number, x: number, y: number): boolean {
  let d = (x - 1) * 7 + y - 1
  if (d < getStartDow(year, month))
    // 이전달 혹은 다음달 표시
    return false
  else return d < getDaysOfMonth(year, month) + getStartDow(year, month)
}

// 이벤트들을 표시되는 캘린더에 맞게 가공하여 6*7 배열로 반환하는 함수
function getEvents(list: CEvent[], year: number, month: number): Array<CEventUIComponent>[] {
  let result = Array(7)
    .fill(null)
    .map(() => Array<CEventUIComponent>(0)) // 주별로 이벤트 정리
  for (let i = 0; i < list.length; i++) {
    let eventByWeek = DateFunctions.splitEventByWeek(list[i], year, month)
    for (let j = 0; j < eventByWeek.length; j++) {
      let v = eventByWeek[j]
      let [x] = date2XY(v.startDate, year, month)
      if (1 <= x && x <= 6) result[x].push(v)
    }
  }
  return result
}

function processEvents(list: CEvent[], year: number, month: number): Array<CEventUIComponent>[] {
  let eventsByWeek = getEvents(list, year, month)
  // 일정 정렬 (시작일정이 더 빨리 시작하는 것, 더 긴것 순으로 먼저 오도록)
  for (let i = 0; i < eventsByWeek.length; i++) {
    eventsByWeek[i].sort((a, b) => {
      if (a.startDate > b.startDate) return 0
      else if (a.startDate < b.startDate) return 1
      else return Number(a.days > b.days)
    })
  }
  for (let i = 0; i < eventsByWeek.length; i++) {
    let week = new Array(7).fill(0)
    let events = eventsByWeek[i]
    let line = 0
    for (let j = 0; j < events.length; j++) {
      let event = events[j]
      for (let day = 0; day < event.days; day++) {
        if (week[event.startDate.getDay() + day] == 0) {
          line = 0
        } else line = week[event.startDate.getDay() + day]
        week[event.startDate.getDay() + day]++
      }
      event.line = line
    }
  }
  return eventsByWeek
}

// 지정된 캘린더 좌표상에 표시될 이벤트를 반환하는 함수
function getEventOfTheWeek(x: number): CEventUIComponent[] {
  return eventUI.value[x]
}

// 지정된 날짜에 대해 지정된 년월 캘린더에 어느 좌표에 위치하는지 반환하는 함수 (1 <= x, y)
function date2XY(date: Date, calYear: number, calMonth: number): number[] {
  let FirstDayOfCal = DateFunctions.getFullDate(calYear, calMonth, 1, 1) // 해당 년월 캘린더상 첫 줄 첫 번째 날 날짜 구하기
  date.setHours(0, 0, 0) // 날짜 계산이 달라질 것에 대비하여 시간을 00시 00분으로 표시
  let diff = DateFunctions.countDays(date, FirstDayOfCal) + 1
  let weekN = Math.floor(diff / 7) + 1
  let dayN = diff % 7
  return [weekN, dayN]
}

const event1 = new CEvent('Ev1', 'Ev1', new Date(2024, 10, 13), new Date(2024, 11, 1, 23, 59, 59), '', '#00ff00')
const event2 = new CEvent('Ev2', 'Ev2', new Date(2024, 10, 14), new Date(2024, 11, 1, 23, 59, 59), '', '#d8d817')
const event3 = new CEvent('Ev3', 'Ev3', new Date(2024, 10, 14), new Date(2024, 10, 14, 23, 59, 59), '', '#0099ff')
const event4 = new CEvent('Ev4', 'Ev4', new Date(2024, 10, 11), new Date(2024, 10, 13, 23, 59, 59), '', '#ff00b7')
const event5 = new CEvent('Ev5', 'Ev5', new Date(2024, 10, 10), new Date(2024, 10, 11, 23, 59, 59), '', '#2e055d')

let list = [event1, event2, event3, event5, event4]
const year = computed(() => {
  return props.year!
})
const month = computed(() => {
  return props.month!
})
const eventUI = computed(() => {
  return processEvents(list, year.value, month.value)
})
const getFullDate = DateFunctions.getFullDate
</script>

<template>
  <div class="calendar-container">
    <!-- 캘린더 틀 표시 -->
    <div class="table-container">
      <table class="calendar-table-layout">
        <tr v-for="x in 6" :key="x">
          <td v-for="y in 7" :key="y" class="table-box">
            <date-box-component
              :full-date="getFullDate(year, month, x, y)"
              :is-current-month="isCurrentMonth(year, month, x, y)"
            />
          </td>
        </tr>
      </table>
    </div>
    <!-- 이벤트 표시 -->
    <div class="event-container">
      <table class="calendar-table-layout hidden">
        <tr v-for="x in 6" :key="x">
          <event-box-component :event="getEventOfTheWeek(x)" :full-date="getFullDate(year, month, x, 1)" />
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
.calendar-table-layout {
  border: 0.05rem solid black;
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

.table-box {
  width: 8rem;
  height: 8.5rem;
  border: 0.05rem solid black;
  border-collapse: collapse;
  padding: 0;
}
</style>
