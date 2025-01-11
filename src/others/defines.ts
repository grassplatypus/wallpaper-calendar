export class calendarSettingsObj {
  public pos: string[] = ['50%', '50%'] // 캘린더의 좌표
  public size: number = 0.8 // 캘린더의 크기 (배수)
  public apiKey: string = '' // Google 캘린더 API 키
}

export class clockSettingsObj {
  public lang: string = 'ko' // 언어
  public time24: boolean = true // 24시간 단위로 표시
  public dateOption: string = 'yymmdd' // 날짜 표시 방법 (yymmdd기본)
  public showSeconds: boolean = true // 초 단위 표시 여부
  public showMilliseconds: boolean = false
  // 글꼴 관련
  public fontSize: string = '2rem'
  public fontColor: string = 'rgba(24,55,214,0.49)'
  public pos: string[] = ['33%', '33%']
}

export interface iWallpaperSettings {
  calendarSettings: calendarSettingsObj | null
  clockSettings: clockSettingsObj | null
}
