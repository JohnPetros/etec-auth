import { Model, Schema, model } from 'mongoose'
import { User } from '../entities/User'
import normalize from 'normalize-mongoose'

const UserSchema = new Schema<User>({
  id: {
    type: String,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    private: true,
  },
  is_verified: {
    type: Boolean,
    default: false,
    required: true,
  }
})

UserSchema.plugin(normalize)

UserSchema.set('toObject', {
  virtuals: true
});

UserSchema.set('toObject', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export const UserModel: Model<User> = model('user', UserSchema)
