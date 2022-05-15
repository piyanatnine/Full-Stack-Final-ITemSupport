import { ItemTC } from "../../../models/item";

export const item = ItemTC.getResolver("findMany")
export const itemID = ItemTC.getResolver("findById")