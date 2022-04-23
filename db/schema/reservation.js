import { Schema } from 'mongoose';
const ReservationSchema = new Schema({
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
    reservedTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "waiting"
    }
}, {timestamps: true})

//status: {'waiting', 'complated', 'canceled'}