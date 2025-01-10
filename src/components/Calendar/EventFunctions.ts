import { type CEvent, CEventUIComponent } from '@/components/Calendar/EventProvider'
import { DateFunctions } from '@/components/Calendar/DateFunctions'

export class EventFunctions {
  // 이벤트들을 표시되는 캘린더에 맞게 가공하여 6*7 배열로 반환하는 함수
  public static getEvents(list: CEvent[], year: number, month: number): Array<CEventUIComponent>[] {
    const result = Array(7)
      .fill(null)
      .map(() => Array<CEventUIComponent>(0)) // 주별로 이벤트 정리
    for (let i = 0; i < list.length; i++) {
      const eventByWeek = DateFunctions.splitEventByWeek(list[i], year, month)
      for (let j = 0; j < eventByWeek.length; j++) {
        const v = eventByWeek[j]
        const [x] = EventFunctions.date2XY(v.startDate, year, month)
        if (1 <= x && x <= 6) result[x].push(v)
      }
    }
    return result
  }

  public static processEvents(list: CEvent[], year: number, month: number): Array<CEventUIComponent>[] {
    const eventsByWeek = EventFunctions.getEvents(list, year, month)
    // 일정 정렬 (시작일정이 더 빨리 시작하는 것, 더 긴것 순으로 먼저 오도록)
    for (let i = 0; i < eventsByWeek.length; i++) {
      eventsByWeek[i].sort((a, b) => {
        if (a.startDate > b.startDate) return 0
        else if (a.startDate < b.startDate) return 1
        else return Number(a.days > b.days)
      })
    }
    for (let i = 0; i < eventsByWeek.length; i++) {
      const week = new Array(7).fill(0)
      const events = eventsByWeek[i]
      let line = 0
      for (let j = 0; j < events.length; j++) {
        const event = events[j]
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
  public static getEventOfTheWeek(list: Array<CEventUIComponent>[], x: number): CEventUIComponent[] {
    return list[x]
  }

  public static date2XY(date: Date, calYear: number, calMonth: number): number[] {
    const FirstDayOfCal = DateFunctions.getFullDate(calYear, calMonth, 1, 1) // 해당 년월 캘린더상 첫 줄 첫 번째 날 날짜 구하기
    date.setHours(0, 0, 0) // 날짜 계산이 달라질 것에 대비하여 시간을 00시 00분으로 표시
    const diff = DateFunctions.countDays(date, FirstDayOfCal) + 1
    const weekN = Math.floor(diff / 7) + 1
    const dayN = diff % 7
    return [weekN, dayN]
  }
}
