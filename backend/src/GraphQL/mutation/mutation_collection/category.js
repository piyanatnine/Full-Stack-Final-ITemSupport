import { schemaComposer } from "graphql-compose"
import { categoryModel, categoryTC } from "../../../models/category"


export const deleteCatagory = categoryTC.getResolver("removeOne")
export const updateCatagory = categoryTC.getResolver("updateOne")
schemaComposer.Mutation.addFields({
    createCatagory:{
        type : categoryTC,
        args : {
            name : "String!",
            prefix : "String!"    
            },
        resolve : async (_, {name, prefix}) => {
            let id = await categoryModel.findOne({name : name})
            if (!id) {
                let all_id = await categoryModel.countDocuments()
                const create = await categoryModel.create({name : name,id : all_id, prefix : prefix})
                return create
            }   
            return id
        }
    }
})