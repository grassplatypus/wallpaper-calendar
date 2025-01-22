import { CEvent } from '@/components/Calendar/EventProvider'
export class Example {
  private static event1 = new CEvent(
    'Ev1',
    'Ev1',
    new Date(2024, 10, 13),
    new Date(2024, 11, 1, 23, 59, 59),
    '',
    '#00ff00'
  )
  private static event2 = new CEvent(
    'Ev2',
    'Ev2',
    new Date(2024, 10, 14),
    new Date(2024, 11, 1, 23, 59, 59),
    '',
    '#d8d817'
  )
  private static event3 = new CEvent(
    'Ev3',
    'Ev3',
    new Date(2024, 10, 14),
    new Date(2024, 10, 14, 23, 59, 59),
    '',
    '#0099ff'
  )
  private static event4 = new CEvent(
    'Ev4',
    'Ev4',
    new Date(2024, 10, 11),
    new Date(2024, 10, 13, 23, 59, 59),
    '',
    '#ff00b7'
  )
  private static event5 = new CEvent(
    'Ev5',
    'Ev5',
    new Date(2024, 10, 10),
    new Date(2024, 10, 11, 23, 59, 59),
    '',
    '#2e055d'
  )

  public static testEvents = [Example.event1, Example.event2, Example.event3, Example.event5, Example.event4]
}
