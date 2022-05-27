import { schemaComposer } from "graphql-compose";
import { HistoryModel } from "../../../models/history";
import { Reservationmodel, ReservationTC } from "../../../models/reservation";

export const deleteReservation = ReservationTC.getResolver("removeOne")
export const updateReservation = ReservationTC.getResolver("updateOne")

schemaComposer.Mutation.addFields({
    createReservation:{
        type: ReservationTC,
        args: {
            username : "String!",
            itemCode : "String!",
            status : "String",
            reservedTime : "Date!"
        },
        resolve : async (_, {username, itemCode, status, reservedTime}) => {
            const reservationdata = await Reservationmodel.findOne({itemCode: itemCode})
            const historydata = await HistoryModel.findOne({itemCode: itemCode})
            if (reservationdata && (reservationdata.status == "waiting") && (historydata.status == "borrowing")){
                return {
                    username : "Error: item already reserved"
                };
            }
            return await Reservationmodel.create({
                username : username,
                itemCode : itemCode,
                status : status,
                reservedTime : reservedTime
            })
        }
    }
})