import { composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    default: null,
  },
  imageUrl: {
      type: String,
      default: null
  },
  privilege: {
      type: Schema.Types.Number,
      required: true,
      default: 1  
  }
})

export const UserModel = model('user', UserSchema)
export const UserTC = composeWithMongoose(UserModel)