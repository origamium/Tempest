import { RequestRestoreActionType } from "./requestRestore";
import { FinishRestoreActionType } from "./finishRestore";
import { RequestSaveDataStoreActionType } from "./requestSaveDataStore";
import { RequestInitializeActionType } from "./requestInitialize";

export enum dataStoreActionsIdentifier {
    REQUEST_RESTORE = "REQUEST_RESTORE",
    REQUEST_INITIALIZE = "REQUEST_INITIALIZE",
    FINISH_RESTORE = "FINISH_RESTORE",
    REQUEST_SAVE_DATA_STORE = "REQUEST_SAVE_DATA_STORE",
}

export type dataStoreActions =
    | RequestRestoreActionType
    | FinishRestoreActionType
    | RequestSaveDataStoreActionType
    | RequestInitializeActionType;
