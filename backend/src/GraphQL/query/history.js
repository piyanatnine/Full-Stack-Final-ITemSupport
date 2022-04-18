import { HistoryTC } from "../../models/history";

export const history = HistoryTC.getResolver('findMany')
export const historyId = HistoryTC.getResolver('findById')