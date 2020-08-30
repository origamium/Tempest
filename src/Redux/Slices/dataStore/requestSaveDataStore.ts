import { Action } from "redux";
import { dataStoreActionsIdentifier } from "./index";
import { PartialRootObject } from "./type";

export interface RequestSaveDataStoreActionType extends Action {
    type: dataStoreActionsIdentifier.REQUEST_SAVE_DATA_STORE;
    payload: {
        storedObject: PartialRootObject;
    };
}

export const requestSaveDataStore = (storedObject: PartialRootObject): RequestSaveDataStoreActionType => ({
    type: dataStoreActionsIdentifier.REQUEST_SAVE_DATA_STORE,
    payload: {
        storedObject,
    },
});
