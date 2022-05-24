import { schemaComposer } from "graphql-compose";
import { HistoryModel, HistoryTC } from "../../../models/history";

export const createHistoryBN = HistoryTC.getResolver("createOne")
export const deleteHistoryBN = HistoryTC.getResolver("removeOne")
export const updateHistoryBN = HistoryTC.getResolver("updateOne")

schemaComposer.Mutation.addFields({
    updateHistory:{
        type : HistoryTC,
        args : {
            _id: "MongoID!",
            ItemCode : "String!",
        },
        resolve : async (_, {ItemCode}) => {
            const HistoryData = await HistoryModel.findOne({itemCode: ItemCode, _id: _id})
            if (HistoryData){
                const StatusItem = HistoryData.get("status")
                if (StatusItem == "borrowing"){
                    return await HistoryModel.updateOne({
                        itemCode : ItemCode
                    },{
                        status : "returned"
                    })
                }
            }
            return HistoryData
        }
    },
    createHistory:{
        type : HistoryTC,
        args : {
            username : "String!",
            itemCode : "String!",
            status : "String"
        },
        resolve : async (_, {username , itemCode, status}) => {
            if (status == ""){ status = "borrowing" }
            return await HistoryModel.create({
                username : username,
                itemCode : itemCode,
                status : status
            })
        }

    }
})