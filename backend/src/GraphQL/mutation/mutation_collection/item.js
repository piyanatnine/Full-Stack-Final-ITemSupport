import { ItemTC } from "../../../models/item";

export const createItem = ItemTC.getResolver('createOne')
export const deleteItem = ItemTC.getResolver('removeOne')
export const updateItem = ItemTC.getResolver('updateOne')
