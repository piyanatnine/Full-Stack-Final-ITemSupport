import { composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'

const historyschema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
      },
    itemCode: {
        type: String,
        required: true,
        lowercase: true,
    },
    status: {
        type: String,
        required: true,
        default: "borrowing"
    }
}, {timestamps: true})

export const HistoryModel = model('historys', historyschema)
export const HistoryTC = composeWithMongoose(HistoryModel)