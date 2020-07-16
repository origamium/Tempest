import { RequestInitializeActionType } from "./requestInitialize";
import { FinishInitializeActionType } from "./finishInitialize";
import { RequestSaveDataStoreActionType } from "./requestSaveDataStore";

export enum dataStoreActionsIdentifier {
    REQUEST_INITIALIZE = "REQUEST_INITIALIZE",
    END_INITIALIZE = "END_INITIALIZE",
    REQUEST_SAVE_DATA_STORE = "REQUEST_SAVE_DATA_STORE",
}

export type dataStoreActions =
    | RequestInitializeActionType
    | FinishInitializeActionType
    | RequestSaveDataStoreActionType;
