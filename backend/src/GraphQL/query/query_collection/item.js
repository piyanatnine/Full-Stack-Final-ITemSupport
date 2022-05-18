import { schemaComposer } from "graphql-compose";
import { Itemmodel, ItemTC } from "../../../models/item";

export const item = ItemTC.getResolver("findMany")
export const itemID = ItemTC.getResolver("findById")
export const itemCount = ItemTC.getResolver("count")

