import { Action } from "redux";
import { dataStoreActionsIdentifier } from "./index";
import { DataStoreType } from "./reducer";

export interface FinishRestoreActionType extends Action {
    type: dataStoreActionsIdentifier.FINISH_RESTORE;
    payload: {
        dataStore: DataStoreType;
    };
}

export const finishRestoreAction = (dataStore: DataStoreType): FinishRestoreActionType => ({
    type: dataStoreActionsIdentifier.FINISH_RESTORE,
    payload: {
        dataStore,
    },
});
