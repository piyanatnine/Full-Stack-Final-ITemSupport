import { Schema } from 'mongoose';
const HistorySchema = new Schema({
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
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        default: null
    }
})