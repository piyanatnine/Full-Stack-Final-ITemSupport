import { schemaComposer } from "graphql-compose";
import { Reservationmodel, ReservationTC } from "../../../models/reservation";

export const createReservation = ReservationTC.getResolver("createOne")
export const deleteReservation = ReservationTC.getResolver("removeOne")
export const updateReservation = ReservationTC.getResolver("updateOne")
