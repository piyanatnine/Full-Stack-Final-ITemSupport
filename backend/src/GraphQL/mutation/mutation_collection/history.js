import { HistoryTC } from "../../../models/history";

export const createHistory = HistoryTC.getResolver("createOne")
export const deleteHistory = HistoryTC.getResolver("removeOne")
export const updateHistory = HistoryTC.getResolver("updateOne")

