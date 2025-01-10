export interface iCalendarSettings {
  axis: number[] // 캘린더의 좌표
  size: number[] // 캘린더의 크기
  apiKey: string // Google 캘린더 API 키
}

export interface iClockSettings {
  lang: string // 언어
  time24: boolean // 24시간 단위로 표시
  dateOption: string // 날짜 표시 방법 (yymmdd기본)
  showSeconds: boolean // 초 단위 표시 여부
}

export interface iWallpaperSettings {
  calendarSettings: iCalendarSettings | null
  clockSettings: iClockSettings | null
}
