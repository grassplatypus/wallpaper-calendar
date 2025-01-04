const calendarElement = document.getElementById('calendar')

// 일정 배열 (각 일정에 color 속성 추가)
const schedules = [
  { title: '회의', start: new Date(2025, 0, 5), end: new Date(2025, 0, 7), color: 'lightblue' },
  { title: '프로젝트 마감', start: new Date(2025, 0, 15), end: new Date(2025, 0, 16), color: 'lightcoral' },
  { title: '출장', start: new Date(2025, 0, 20), end: new Date(2025, 0, 25), color: 'lightgreen' },
  { title: '수업', start: new Date(2025, 0, 15), end: new Date(2025, 0, 18), color: 'lightpink' },
  { title: '수업3', start: new Date(2025, 0, 17), end: new Date(2025, 0, 20), color: 'red' }
]

// 일정을 길이에 따라 정렬
schedules.sort((a, b) => b.end - b.start - (a.end - a.start))

// 현재 날짜와 월의 첫 번째 날과 마지막 날을 가져옴
const currentDate = new Date()
const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

// 월의 첫 번째 날 이전에 채워질 빈 칸 개수를 계산
const emptySlots = firstDay.getDay()

// 캘린더를 생성
for (let i = 0; i < emptySlots; i++) {
  const emptySlot = document.createElement('div')
  calendarElement.appendChild(emptySlot)
}

for (let i = 1; i <= lastDay.getDate(); i++) {
  const dayElement = document.createElement('div')
  dayElement.classList.add('day')
  dayElement.innerHTML = `<div class="date">${i}</div><div class="schedules"></div>`

  calendarElement.appendChild(dayElement)
}

// 일정 표시
const scheduleLines = new Map()
schedules.forEach((schedule) => {
  const start = schedule.start.getDate()
  const end = schedule.end.getDate()

  let lineHeight = 1
  for (let i = start; i <= end; i++) {
    if (!scheduleLines.has(i)) {
      scheduleLines.set(i, [])
    }
    while (scheduleLines.get(i).includes(lineHeight)) {
      lineHeight++
    }
  }

  for (let i = start; i <= end; i++) {
    scheduleLines.get(i).push(lineHeight)
    const dayElement = calendarElement.querySelector(`.day:nth-child(${i + emptySlots}) .schedules`)
    if (dayElement) {
      const scheduleElement = document.createElement('div')
      scheduleElement.classList.add('schedule')
      scheduleElement.textContent = schedule.title
      scheduleElement.style.marginTop = `${(lineHeight - 1) * 20}px`
      scheduleElement.style.backgroundColor = schedule.color // 일정 색깔 설정
      dayElement.appendChild(scheduleElement)
    }
  }
})

// 동일한 높이 유지를 위해 빈 요소 추가
const maxLinesPerDay = new Map()
for (let [day, lines] of scheduleLines) {
  maxLinesPerDay.set(day, Math.max(...lines))
}

// 각 날짜에 대해 최대 라인 높이 계산 후 빈 요소 추가
for (let i = 1; i <= lastDay.getDate(); i++) {
  const dayElement = calendarElement.querySelector(`.day:nth-child(${i + emptySlots}) .schedules`)
  const maxLineHeight = Math.max(...Array.from(maxLinesPerDay.values()))
  for (let j = 1; j <= maxLineHeight; j++) {
    if (!scheduleLines.get(i) || !scheduleLines.get(i).includes(j)) {
      const fillerElement = document.createElement('div')
      fillerElement.style.visibility = 'hidden'
      fillerElement.style.height = '20px'
      dayElement.appendChild(fillerElement)
    }
  }
}
