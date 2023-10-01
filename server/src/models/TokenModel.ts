import { Model, Schema, model } from 'mongoose'
import { Token } from '../entities/Token'

const TokenSchema = new Schema<Token>({
  id: {
    type: String,
    index: true,
  },
  content: {
    type: String,
    index: true,
  },
  expires_in: {
    type: Date,
    required: true,
  },
  user_id: {
    type: String,
  },
})


TokenSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export const TokenModel: Model<Token> = model('token', TokenSchema)
