import { GraphQLList, GraphQLNonNull } from "graphql";
import { schemaComposer } from "graphql-compose";
import { categoryModel } from "../../../models/category";
import { Itemmodel, ItemTC } from "../../../models/item";

export const deleteItem = ItemTC.getResolver('removeOne')
export const updateItem = ItemTC.getResolver('updateOne')



schemaComposer.Mutation.addFields({
    createItem : {
        type : ItemTC,
        args:{
            name: "String!",
            itemCode : "String",
            description : "String",
            ImageUrl : "String!",
            tags : new GraphQLNonNull(new GraphQLList(ItemTC.getFieldType("tags")))        
        },
        resolve : async (_, {name, itemCode, description, ImageUrl, tags}) => {
            const prefixId = tags[0][0]
            const findOnCategory = await categoryModel.findOne({name : prefixId})
            let prefixstr = findOnCategory.get("prefix")
            if (!findOnCategory){
                return{
                    itemCode : "can not find prefix on tags",
                    name: "error",
                    description : "error",
                    ImageUrl : "error",
                    tags : ["error"]
                }
            }
            let itemCategoryCount = await Itemmodel.countDocuments({tags : tags[0]})
            let itemCount = parseInt(itemCategoryCount) + 1
            if (parseInt(itemCategoryCount) < 10){itemCategoryCount = "0"+itemCount.toString()}
           
            const itemCodestr = prefixstr +  itemCategoryCount
            return Itemmodel.create({
                itemCode : itemCodestr,
                name: name,
                description : description,
                imageUrl : ImageUrl,
                tags : tags[0]})
        }
        
    }
})