import { composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'

const ItemSchema = new Schema({
    itemCode: {
        type: String,
        required: true,
        index: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: null
    },
    imageUrl: {
        type: String,
        default: null
    },
    owned: {
        type: Schema.Types.Number,
        required: true,
        default: 0
    },
    inStock: {
        type: Schema.Types.Number,
        required: true,
        default: 0
    },
})

export const Itemmodel = model('items', ItemSchema)
export const ItemTC = composeWithMongoose(Itemmodel)