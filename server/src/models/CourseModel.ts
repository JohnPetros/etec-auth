import { Model, Schema, model } from 'mongoose'
import normalize from 'normalize-mongoose'
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
  subjects: [{
    type: Schema.Types.ObjectId,
    ref: 'subject',
    required: true,
  }]
})

CourseSchema.plugin(normalize)

CourseSchema.set('toObject', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})



export const CourseModel: Model<Course> = model('course', CourseSchema)
