import { GraphQLScalarType, Kind, parseValue } from "graphql"
import { schemaComposer } from "graphql-compose"
import { Reservationmodel, ReservationTC } from "../../../models/reservation"

export const Reservation = ReservationTC.getResolver("findMany")
export const ReservationID = ReservationTC.getResolver("findById")