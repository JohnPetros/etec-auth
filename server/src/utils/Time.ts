import dayjs from 'dayjs'

export class Time {
  currentDate() {
    return dayjs().toDate()
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'day').toDate()
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, 'hour').toDate()
  }
}
