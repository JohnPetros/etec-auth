import { Model, Schema, model } from 'mongoose'
import { Course } from '../entities/Course'

const CourseSchema = new Schema<Course>({
  id: {
    type: String,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
})

CourseSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export const CourseModel: Model<Course> = model('course', CourseSchema)
