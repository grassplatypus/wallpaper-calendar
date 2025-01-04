import { EventType } from './Types';
import { CEvent, CEventUIComponent } from './EventProvider';

export class DateFunctions {
    public static splitEventByWeek(event: CEvent, currentYear: number, currentMonth: number): CEventUIComponent[] {
        // 지정된 캘린더 첫번째 일요일의 날짜
        const startDayOfCal = this.getFullDate(currentYear, currentMonth, 1, 1);
        // 지정된 캘린더 마지막 토요일의 날짜
        const endDayOfCal = this.getNextDay(this.getFullDate(currentYear, currentMonth, 6, 7));

        let startDate = event.startDate,
            endDate = event.endDate;
        // 캘린더 양 끝을 초과하는 범위로 일정이 만들어져 있는지 확인
        let calStartOverflow = false,
            calEndOverflow = false;
        // 이벤트 시작과 끝 범위를 현재 표시되는 캘린더 사이에 들어오도록 맞춤.
        if (event.startDate < startDayOfCal) {
            startDate = startDayOfCal;
            calStartOverflow = true;
        }
        if (endDayOfCal < event.endDate) {
            endDate = endDayOfCal;
            calEndOverflow = true;
        }

        let startWeek = 1,
            endWeek = 1;
        for (let weekPtr = startDayOfCal; this.getNextWeek(weekPtr) <= startDate; startWeek++) {
            weekPtr = this.getNextWeek(weekPtr);
        }
        for (let weekPtr = startDayOfCal; this.getNextWeek(weekPtr) <= endDate; endWeek++) {
            weekPtr = this.getNextWeek(weekPtr);
        }
        const result = new Array<CEventUIComponent>();
        let nextWeekFirstDayPtr = startDayOfCal;
        for (let i = 0; i < startWeek; i++) nextWeekFirstDayPtr = this.getNextWeek(nextWeekFirstDayPtr); // 다음 주의 첫날을 기록하는 포인터 (그래야 subtract할 때 정확히 날 수가 나옴)
        let weekFirstDayPtr = this.getPrevWeek(nextWeekFirstDayPtr);

        if (startWeek == endWeek) {
            // 다음 줄로 이벤트가 안넘어감
            result.push(
                new CEventUIComponent(
                    event.name,
                    event.id,
                    event.color,
                    this.countDays(endDate, startDate),
                    EventType.EventBothRadius,
                    startDate
                )
            );
        } else {
            for (let i = startWeek; i <= endWeek; i++) {
                if (i == startWeek) {
                    // 여러 주에 걸쳐있는 이벤트의 첫번째 주
                    result.push(
                        new CEventUIComponent(
                            event.name,
                            event.id,
                            event.color,
                            this.countDays(nextWeekFirstDayPtr, startDate),
                            calStartOverflow ? EventType.EventNoRadius : EventType.EventStartRadius,
                            startDate
                        )
                    );
                } else if (i == endWeek) {
                    // 여러 주에 걸쳐있는 이벤트의 마지막 주
                    result.push(
                        new CEventUIComponent(
                            event.name,
                            event.id,
                            event.color,
                            this.countDays(endDate, weekFirstDayPtr),
                            calEndOverflow ? EventType.EventNoRadius : EventType.EventEndRadius,
                            weekFirstDayPtr
                        )
                    );
                } else {
                    // 중간 주
                    result.push(
                        new CEventUIComponent(
                            event.name,
                            event.id,
                            event.color,
                            this.countDays(nextWeekFirstDayPtr, weekFirstDayPtr),
                            EventType.EventNoRadius,
                            weekFirstDayPtr
                        )
                    );
                }
                nextWeekFirstDayPtr = this.getNextWeek(nextWeekFirstDayPtr);
                weekFirstDayPtr = this.getNextWeek(weekFirstDayPtr);
            }
        }

        return result;
    }

    // a - b를 통해 며칠 차이 나는지 반환. (예: 12월 1일과 12월 4일은 3이 반환됨.)
    public static countDays(a: Date, b: Date): number {
        return Math.round((a.valueOf() - b.valueOf()) / (24 * 60 * 60 * 1000));
    }

    public static getNextDay(date: Date): Date {
        const d = new Date(date.getTime());
        return new Date(d.setDate(d.getDate() + 1));
    }

    public static getNextWeek(date: Date): Date {
        const d = new Date(date.getTime());
        return new Date(d.setDate(d.getDate() + 7));
    }

    public static getPrevWeek(date: Date): Date {
        const d = new Date(date.getTime());
        return new Date(d.setDate(d.getDate() - 7));
    }

    public static setToMid(date: Date): Date {
        const d = new Date(date.getTime());
        return new Date(d.setHours(0, 0, 0, 0));
    }

    public static getDaysOfMonth(year: number, month: number) {
        const d = new Date();
        d.setFullYear(year, month - 1, 1);
        const nextMonth = new Date(d.getFullYear(), d.getMonth() + 1, 1);
        return new Date(nextMonth.getTime() - d.getTime()).getDate();
        // Date 간 직접 연산이 안되서 밀리초 변환 이후 연산
    }

    public static getStartDow(year: number, month: number): number {
        return new Date(year, month - 1, 1).getDay();
    }

    public static getFullDate(year: number, month: number, x: number, y: number) {
        const d = (x - 1) * 7 + y - 1;
        if (d < this.getStartDow(year, month)) {
            // 이전 달
            return new Date(year, month - 1, d - this.getStartDow(year, month) + 1);
        } else if (d > this.getDaysOfMonth(year, month) + this.getStartDow(year, month)) {
            // 다음 달
            const days = this.getDaysOfMonth(year, month);
            return new Date(year, month, d - this.getStartDow(year, month) - days + 1);
        } else {
            // 이번 달
            return new Date(year, month - 1, d - this.getStartDow(year, month) + 1);
        }
    }
}
