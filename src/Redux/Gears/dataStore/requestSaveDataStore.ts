import { Action } from "redux";
import { RootObject } from "../../Logics/SavingData/StoredObject/RootObject";
import { dataStoreActionsIdentifier } from "./index";

export interface RequestSaveDataStoreActionType extends Action {
    type: dataStoreActionsIdentifier.REQUEST_SAVE_DATA_STORE;
    payload: {
        storedObject: RootObject;
    };
}

export const requestSaveDataStore = (storedObject: RootObject): RequestSaveDataStoreActionType => ({
    type: dataStoreActionsIdentifier.REQUEST_SAVE_DATA_STORE,
    payload: {
        storedObject,
    },
});
