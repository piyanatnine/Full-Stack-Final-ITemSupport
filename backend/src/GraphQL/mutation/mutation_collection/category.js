import { categoryTC } from "../../../models/category"

export const createCatagory = categoryTC.getResolver("createOne")
export const deleteCatagory = categoryTC.getResolver("removeOne")