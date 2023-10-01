import { Model, Schema, model } from 'mongoose'
import { Subject } from '../entities/Subject'

const SubjectSchema = new Schema<Subject>({
  id: {
    type: String,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: 'course',
    required: true,
  },
})


SubjectSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    
    delete returnedObject.course_id.id
    returnedObject.course = returnedObject.course_id
    delete returnedObject.course_id

    delete returnedObject._id
    delete returnedObject.__v
  },
})

export const SubjectModel: Model<Subject> = model('subject', SubjectSchema)
