import dayjs from 'dayjs'

export class Time {
  addDays(days: number): Date {
    return dayjs().add(days, 'day').toDate()
  }
}
