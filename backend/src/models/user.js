import { composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    }
}
)

export const UserModel = model('user', UserSchema)

export const UserTC = composeWithMongoose(UserModel)