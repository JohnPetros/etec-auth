import { Model, Schema, model } from 'mongoose'
import { User } from '../entities/User'
import normalize from 'normalize-mongoose'

const UserSchema = new Schema<User>({
  _id: {
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
  },
  password: {
    type: String,
    required: true,
    private: true,
  },
})

UserSchema.plugin(normalize)

export const UserModel: Model<User> = model('user', UserSchema)
