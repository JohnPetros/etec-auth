import type { Subject } from "./subject"

export type Course = {
  id: string
  title: string
  icon: string
  subjects: Subject[]
}
