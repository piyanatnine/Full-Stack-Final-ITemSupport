import { UserTC } from '../../../models/user'

export const user = UserTC.getResolver('findMany')
export const userId = UserTC.getResolver('findById')