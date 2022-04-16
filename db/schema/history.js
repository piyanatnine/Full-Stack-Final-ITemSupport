import { Schema } from 'mongoose';
const HistorySchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        ref: "users"
      },
    itemCode: {
        type: String,
        required: true,
        lowercase: true,
        ref: "items"
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        default: null
    }
})