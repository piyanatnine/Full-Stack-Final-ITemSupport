import { schemaComposer } from "graphql-compose"
import { categoryModel, categoryTC } from "../../../models/category"


export const deleteCatagory = categoryTC.getResolver("removeOne")

schemaComposer.Mutation.addFields({
    createCatagory:{
        type : categoryTC,
        args : {name : "String!"},
        resolve : async (_, {name}) => {
            let id = await categoryModel.findOne({name : name})
            if (!id) {
                let all_id = await categoryModel.countDocuments()
                const create = await categoryModel.create({name : name,id : all_id})
                return create
            }   
            return id
        }
    }
})