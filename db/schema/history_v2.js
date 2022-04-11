import { Schema } from 'mongoose';
const HistorySchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
      },
    item_name: {
        type: String,
        required: true,
        lowercase: true,
    },
    returned: {
        type: Boolean,
        required: true,
        default: false
    }
}, {timestamps: true})