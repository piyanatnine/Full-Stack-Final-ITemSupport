import { composeWithMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'

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

export const Reservationmodel = model("reservations", ReservationSchema)
export const ReservationTC = composeWithMongoose(Reservationmodel)