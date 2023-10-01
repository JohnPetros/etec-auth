import { Model, Schema, model } from 'mongoose'
import { User } from '../entities/User'

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
  },
  auth_attempts: {
    type: Number,
    default: 0,
    required: true,
    private: true,
  },
  blocked_util: {
    type: Date,
    default: null,
    required: true,
    private: true,
  },
})

UserSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()

    delete returnedObject.password
    delete returnedObject.auth_attempts
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export const UserModel: Model<User> = model('user', UserSchema)
