import { composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'

const CategorySchema = new Schema({
    id: {
        type: Number,
        required: true,
      },
    name: {
        type: String,
        required: true,
        lowercase: true,
    }
})

export const categoryModel = model('category_items', CategorySchema)
export const categoryTC = composeWithMongoose(categoryModel)