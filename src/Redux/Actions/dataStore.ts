import { RootObject } from "../Logics/SavingData/StoredObject/RootObject";
import { Action } from "redux";

export enum dataStoreActionsIdentifier {
    REQUEST_INITIALIZE = "REQUEST_INITIALIZE",
    END_INITIALIZE = "END_INITIALIZE",
    REQUEST_SAVE_DATA_STORE = "REQUEST_SAVE_DATA_STORE",
}

export interface RequestInitializeActionType extends Action {
    type: dataStoreActionsIdentifier.REQUEST_INITIALIZE;
}

export const requestInitializeAction = (): RequestInitializeActionType => ({
    type: dataStoreActionsIdentifier.REQUEST_INITIALIZE,
});

export interface FinishInitializeActionType extends Action {
    type: dataStoreActionsIdentifier.END_INITIALIZE;
    payload: {
        storedObject?: RootObject;
    };
}

export const finishInitializeAction = (storedObject?: RootObject): FinishInitializeActionType => ({
    type: dataStoreActionsIdentifier.END_INITIALIZE,
    payload: {
        storedObject,
    },
});

export interface RequestSaveDataStoreActionType extends Action {
    type: dataStoreActionsIdentifier.REQUEST_SAVE_DATA_STORE;
    payload: {
        storedObject: RootObject;
    };
}

export const requestSaveDataStoreAction = (storedObject: RootObject): RequestSaveDataStoreActionType => ({
    type: dataStoreActionsIdentifier.REQUEST_SAVE_DATA_STORE,
    payload: {
        storedObject,
    },
});

export type dataStoreActions =
    | RequestInitializeActionType
    | FinishInitializeActionType
    | RequestSaveDataStoreActionType;
