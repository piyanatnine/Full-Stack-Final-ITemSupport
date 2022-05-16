import { schemaComposer } from "graphql-compose";
import mongooesConnect from "../../../../mongooes-connect";
import { Itemmodel, ItemTC } from "../../../models/item";

export const item = ItemTC.getResolver("findMany")
export const itemID = ItemTC.getResolver("findById")


