import { Model, Schema, model } from 'mongoose'
import normalize from 'normalize-mongoose'
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
    required: true,
  },
})

SubjectSchema.plugin(normalize)

SubjectSchema.set('toObject', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export const SubjectModel: Model<Subject> = model('subject', SubjectSchema)
