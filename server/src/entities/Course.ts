import { Subject } from "./Subject"

export interface Course {
  id: string
  title: string
  subjects: Subject[]
}
