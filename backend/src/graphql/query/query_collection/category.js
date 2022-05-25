import { categoryTC } from "../../../models/category";

export const category = categoryTC.getResolver('findMany')
export const categoryId = categoryTC.getResolver('findById')