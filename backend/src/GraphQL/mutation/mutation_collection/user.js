import { UserTC } from "../../../models/user";

export const createUser = UserTC.getResolver("createOne")
export const deleteUser = UserTC.getResolver("removeOne")
export const updateUser = UserTC.getResolver("updateOne")
