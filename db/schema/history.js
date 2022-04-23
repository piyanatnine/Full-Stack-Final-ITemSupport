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
    status: {
        type: String,
        required: true,
        default: "borrowing"
    }
}, {timestamps: true})

