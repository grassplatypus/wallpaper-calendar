// 캘린더에 표시하기 위해 필요한 정보만을 담은 객체
import { EventType } from './Types'

export class CEventUIComponent {
  private _name: string
  private _id: string
  private _color: string
  private _days: number // 며칠에 걸쳐 이어진 이벤트 인지 결정
  private _shape: EventType
  private _startDate: Date
  private _line: number

  public constructor(name: string, id: string, color: string, days: number, shape: EventType, startDate: Date) {
    this._name = name
    this._id = id
    this._color = color
    this._days = days
    this._shape = shape
    this._startDate = startDate
    this._line = 0
  }

  public get line(): number {
    return this._line
  }

  public set line(value: number) {
    this._line = value
  }

  public get name(): string {
    return this._name
  }
  public get id(): string {
    return this._id
  }
  public get color(): string {
    return this._color
  }
  public get days(): number {
    return this._days
  }
  public get shape(): EventType {
    return this._shape
  }
  public get startDate(): Date {
    return this._startDate
  }
}

export class CEvent {
  private _name: string
  private _id: string
  private _startDate: Date
  private _endDate: Date
  private _alarm: string // 알림 정보도 불러올 수 있나?
  private _color: string

  public constructor(name: string, id: string, startDate: Date, endDate: Date, alarm: string, color: string) {
    this._name = name
    this._id = id
    this._startDate = startDate
    this._endDate = endDate
    this._alarm = alarm
    this._color = color
  }

  get name(): string {
    return this._name
  }
  get id(): string {
    return this._id
  }
  get startDate(): Date {
    return this._startDate
  }
  get endDate(): Date {
    return this._endDate
  }
  get alarm(): string {
    return this._alarm
  }
  get color(): string {
    return this._color
  }
}
