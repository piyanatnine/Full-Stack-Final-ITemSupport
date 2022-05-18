import { schemaComposer } from "graphql-compose";
import mongooseConnect from "../../../../mongoose-connect";
import { Itemmodel, ItemTC } from "../../../models/item";

export const item = ItemTC.getResolver("findMany")
export const itemID = ItemTC.getResolver("findById")
export const itemCount = ItemTC.getResolver("count")

