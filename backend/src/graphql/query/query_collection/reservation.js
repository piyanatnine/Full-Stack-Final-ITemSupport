import { ReservationTC } from "../../../models/reservation"

export const Reservation = ReservationTC.getResolver("findMany")
export const ReservationID = ReservationTC.getResolver("findById")